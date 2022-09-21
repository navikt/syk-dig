import { proxiedApiRouteConfig, proxyApiRouteRequest } from '@navikt/next-api-proxy';
import { logger } from '@navikt/next-logger';
import { grantAzureOboToken, isInvalidTokenSet } from '@navikt/next-auth-wonderwall';

import { withAuthenticatedApi } from '../../auth/withAuth';
import { getServerEnv, isLocalOrDemo } from '../../utils/env';

const env = getServerEnv();

const handler = withAuthenticatedApi(async (req, res, accessToken) => {
    logger.info('Proxying request to syk-dig GraphQL API');

    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not supported' });
        return;
    }

    if (isLocalOrDemo) {
        res.status(418).json({ message: 'Not supported in local or demo, why are you not mocking?' });
        return;
    }

    const bearerToken = await grantAzureOboToken(accessToken, env.SYK_DIG_BACKEND_SCOPE);
    if (isInvalidTokenSet(bearerToken)) {
        if (bearerToken.error instanceof Error) {
            logger.error(new Error(bearerToken.message, { cause: bearerToken.error }));
        } else {
            logger.error(`${bearerToken.errorType}: ${bearerToken.message}`);
        }
        return;
    }

    try {
        await proxyApiRouteRequest({
            hostname: env.SYK_DIG_BACKEND_HOST,
            path: '/graphql',
            https: false,
            req,
            res,
            bearerToken,
        });
    } catch (error: unknown) {
        logger.error(error);
        res.status(500).json({ message: 'Unable to proxy request' });
    }
});

export const config = proxiedApiRouteConfig;

export default withAuthenticatedApi(handler);
