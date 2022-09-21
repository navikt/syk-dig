import { GetServerSidePropsContext, GetServerSidePropsResult, NextApiRequest, NextApiResponse } from 'next';
import { logger } from '@navikt/next-logger';
import { validateAzureToken } from '@navikt/next-auth-wonderwall';

import { isLocalOrDemo } from '../utils/env';
import { RequiredPageProps } from '../pages/_app.page';

type ApiHandler = (req: NextApiRequest, res: NextApiResponse, accessToken: string) => void | Promise<unknown>;
type PageHandler = (
    context: GetServerSidePropsContext,
    accessToken: string,
) => Promise<GetServerSidePropsResult<RequiredPageProps>>;

/**
 * Used to authenticate Next.JS pages. Assumes application is behind
 * Wonderwall (https://doc.nais.io/security/auth/azure-ad/sidecar/). Will automatically redirect to login if
 * Wonderwall-cookie is missing.
 *
 */
export function withAuthenticatedPage(handler: PageHandler) {
    return async function withBearerTokenHandler(
        context: GetServerSidePropsContext,
    ): Promise<ReturnType<NonNullable<typeof handler>>> {
        if (isLocalOrDemo) {
            logger.info('Is running locally or in demo, skipping authentication for page');
            return handler(context, 'fake-local-token');
        }

        const request = context.req;
        const bearerToken: string | null | undefined = request.headers['authorization'];

        if (!bearerToken) {
            logger.info('Could not find any bearer token on the request. Redirecting to login.');
            return {
                redirect: { destination: `/oauth2/login?redirect=${context.resolvedUrl}`, permanent: false },
            };
        }

        const tokenValidationResult = await validateAzureToken(bearerToken);
        if (tokenValidationResult !== 'valid') {
            logger.error(
                `Invalid JWT token found (${tokenValidationResult.errorType} ${tokenValidationResult.message}), redirecting to login.`,
            );

            return {
                redirect: { destination: `/oauth2/login?redirect=${context.resolvedUrl}`, permanent: false },
            };
        }

        return handler(context, bearerToken.replace('Bearer ', ''));
    };
}

/**
 * Used to authenticate Next.JS pages. Assumes application is behind
 * Wonderwall (https://doc.nais.io/security/auth/idporten/sidecar/). Will deny requests if Wonderwall cookie is missing.
 */
export function withAuthenticatedApi(handler: ApiHandler): ApiHandler {
    return async function withBearerTokenHandler(req, res) {
        if (isLocalOrDemo) {
            logger.info('Is running locally or in demo, skipping authentication for API');
            return handler(req, res, 'fake-local-token');
        }

        const bearerToken: string | null | undefined = req.headers['authorization'];
        if (!bearerToken) {
            logger.error('Could not find any bearer token on the request. Denying request. This should not happen');
            res.status(401).json({ message: 'Access denied' });
            return;
        }

        const tokenValidationResult = await validateAzureToken(bearerToken);
        if (tokenValidationResult !== 'valid') {
            logger.info(
                `Invalid JWT token on API request for path ${req.url} (${tokenValidationResult.errorType} ${tokenValidationResult.message})`,
            );
            res.status(401).json({ message: 'Access denied' });
            return;
        }

        return handler(req, res, bearerToken.replace('Bearer ', ''));
    };
}
