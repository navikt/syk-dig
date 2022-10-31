import getConfig from 'next/config'

interface PublicEnv {
    runtimeEnv: 'local' | 'test' | 'demo' | 'dev' | 'production'
    gosysUrl: string
    modiaUrl: string
}

type ServerEnv = Record<
    // nais injected env vars
    | 'AZURE_APP_CLIENT_ID'
    | 'AZURE_APP_CLIENT_SECRET'
    | 'AZURE_OPENID_CONFIG_TOKEN_ENDPOINT'
    | 'AZURE_APP_WELL_KNOWN_URL'
    | 'AZURE_APP_PRE_AUTHORIZED_APPS'
    // naiserator injected env vars
    | 'SYK_DIG_BACKEND_SCOPE'
    | 'SYK_DIG_BACKEND_HOST'
    | 'MODIACONTEXTHOLDER_SCOPE'
    | 'MODIACONTEXTHOLDER_HOST',
    string
>

export function getPublicEnv(): PublicEnv {
    const { publicRuntimeConfig } = getConfig()

    return publicRuntimeConfig
}

export function getServerEnv(): ServerEnv {
    const { serverRuntimeConfig } = getConfig()

    return serverRuntimeConfig
}

export const isLocalOrDemo = process.env.NODE_ENV !== 'production' || getPublicEnv().runtimeEnv === 'demo'
