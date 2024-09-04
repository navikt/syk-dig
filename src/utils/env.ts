import { z, ZodError } from 'zod'

export type BundledEnv = z.infer<typeof bundledEnvSchema>
const bundledEnvSchema = z.object({
    NEXT_PUBLIC_RUNTIME_ENVIRONMENT: z.union([
        z.literal('local'),
        z.literal('test'),
        z.literal('demo'),
        z.literal('dev'),
        z.literal('production'),
    ]),
    NEXT_PUBLIC_GOSYS_URL: z.string(),
    NEXT_PUBLIC_MODIA_URL: z.string(),
    NEXT_PUBLIC_ASSET_PREFIX: z.string().optional(),
})

export type ServerEnv = z.infer<typeof serverEnvSchema>
export const serverEnvSchema = z.object({
    SYK_DIG_BACKEND_SCOPE: z.string(),
    SYK_DIG_BACKEND_HOST: z.string(),
    SMREGISTRERING_BACKEND_SCOPE: z.string(),
    SMREGISTRERING_BACKEND_HOST: z.string(),
    MODIACONTEXTHOLDER_SCOPE: z.string(),
    MODIACONTEXTHOLDER_HOST: z.string(),
    // Provided my nais
    AZURE_APP_CLIENT_ID: z.string(),
    AZURE_APP_CLIENT_SECRET: z.string(),
    AZURE_OPENID_CONFIG_TOKEN_ENDPOINT: z.string(),
    AZURE_APP_WELL_KNOWN_URL: z.string(),
    AZURE_APP_PRE_AUTHORIZED_APPS: z.string(),
    // for unleash
    UNLEASH_SERVER_API_URL: z.string().optional(),
    UNLEASH_SERVER_API_TOKEN: z.string().optional(),
})

export const bundledEnv = bundledEnvSchema.parse({
    NEXT_PUBLIC_RUNTIME_ENVIRONMENT: process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT,
    NEXT_PUBLIC_MODIA_URL: process.env.NEXT_PUBLIC_MODIA_URL,
    NEXT_PUBLIC_GOSYS_URL: process.env.NEXT_PUBLIC_GOSYS_URL,
    NEXT_PUBLIC_ASSET_PREFIX: process.env.NEXT_PUBLIC_ASSET_PREFIX,
} satisfies Record<keyof BundledEnv, string | undefined>)

const getRawServerConfig = (): Partial<unknown> =>
    ({
        // Provided by nais-*.yml
        SYK_DIG_BACKEND_SCOPE: process.env.SYK_DIG_BACKEND_SCOPE,
        SYK_DIG_BACKEND_HOST: process.env.SYK_DIG_BACKEND_HOST,
        SMREGISTRERING_BACKEND_SCOPE: process.env.SMREGISTRERING_BACKEND_SCOPE,
        SMREGISTRERING_BACKEND_HOST: process.env.SMREGISTRERING_BACKEND_HOST,
        MODIACONTEXTHOLDER_SCOPE: process.env.MODIACONTEXTHOLDER_SCOPE,
        MODIACONTEXTHOLDER_HOST: process.env.MODIACONTEXTHOLDER_HOST,
        // Provided by nais
        AZURE_APP_CLIENT_ID: process.env.AZURE_APP_CLIENT_ID,
        AZURE_APP_CLIENT_SECRET: process.env.AZURE_APP_CLIENT_SECRET,
        AZURE_OPENID_CONFIG_TOKEN_ENDPOINT: process.env.AZURE_OPENID_CONFIG_TOKEN_ENDPOINT,
        AZURE_APP_WELL_KNOWN_URL: process.env.AZURE_APP_WELL_KNOWN_URL,
        AZURE_APP_PRE_AUTHORIZED_APPS: process.env.AZURE_APP_PRE_AUTHORIZED_APPS,
        // for unleash
        UNLEASH_SERVER_API_URL: process.env.UNLEASH_SERVER_API_URL,
        UNLEASH_SERVER_API_TOKEN: process.env.UNLEASH_SERVER_API_TOKEN,
    }) satisfies Record<keyof ServerEnv, string | undefined>

/**
 * Server envs are lazy loaded and verified using Zod.
 */
export function getServerEnv(): ServerEnv & BundledEnv {
    try {
        return { ...serverEnvSchema.parse(getRawServerConfig()), ...bundledEnvSchema.parse(bundledEnv) }
    } catch (e) {
        if (e instanceof ZodError) {
            throw new Error(
                `The following envs are missing: ${
                    e.errors
                        .filter((it) => it.message === 'Required')
                        .map((it) => it.path.join('.'))
                        .join(', ') || 'None are missing, but zod is not happy. Look at cause'
                }`,
                { cause: e },
            )
        } else {
            throw e
        }
    }
}

export const isLocalOrDemo =
    process.env.NODE_ENV !== 'production' || bundledEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === 'demo'
