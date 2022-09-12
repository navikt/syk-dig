import { proxiedApiRouteConfig, proxyApiRouteRequest } from '@navikt/next-api-proxy';
import { logger } from '@navikt/next-logger';

import { withAuthenticatedApi } from '../../auth/withAuth';
import { getServerEnv, isLocalOrDemo } from '../../utils/env';
import { getOboAccessToken } from '../../auth/azure/azureTokens';

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

    const bearerToken = await getOboAccessToken(accessToken, env.SYK_DIG_BACKEND_SCOPE);

    // TODO remove:
    logger.info(`Debug pls remove: OBO token for ${env.SYK_DIG_BACKEND_SCOPE}: ${bearerToken}`);

    try {
        await proxyApiRouteRequest({
            hostname: env.SYK_DIG_BACKEND_HOST,
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
