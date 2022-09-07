import getConfig from 'next/config';

interface PublicEnv {
    runtimeEnv: 'local' | 'test' | 'demo' | 'dev' | 'production';
}

type ServerEnv = Record<
    | 'AZURE_APP_CLIENT_ID'
    | 'AZURE_APP_CLIENT_SECRET'
    | 'AZURE_OPENID_CONFIG_TOKEN_ENDPOINT'
    | 'AZURE_APP_WELL_KNOWN_URL'
    | 'AZURE_APP_PRE_AUTHORIZED_APPS',
    string
>;

export function getPublicEnv(): PublicEnv {
    const { publicRuntimeConfig } = getConfig();

    return publicRuntimeConfig;
}

export function getServerEnv(): ServerEnv {
    const { serverRuntimeConfig } = getConfig();

    return serverRuntimeConfig;
}

export const isLocalOrDemo = process.env.NODE_ENV !== 'production' || getPublicEnv().runtimeEnv === 'demo';
