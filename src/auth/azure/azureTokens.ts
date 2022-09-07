import getAuthClient from '../oidcClient';
import tokenCache from '../tokenCache';

export async function getOboAccessToken(userToken: string, scope: string): Promise<string> {
    const cacheKey = `${userToken}-${scope}`;
    const tokenInCache: string | undefined = tokenCache.get(cacheKey);
    if (tokenInCache) {
        return tokenInCache;
    }

    const oidcClient = await getAuthClient();

    const oboTokenSet = await oidcClient.grant({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
        requested_token_use: 'on_behalf_of',
        scope,
        assertion: userToken,
    });

    if (!oboTokenSet.access_token) {
        throw new Error('OBO token from grant is undefined');
    }

    return oboTokenSet.access_token;
}
