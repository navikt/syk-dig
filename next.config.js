/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    assetPrefix: process.env.ASSET_PREFIX,
    pageExtensions: ['page.tsx', 'page.ts', 'api.ts'],
    eslint: {
        ignoreDuringBuilds: true,
        dirs: ['src'],
    },
    serverRuntimeConfig: {
        // nais injected env variables
        AZURE_APP_CLIENT_ID: process.env.AZURE_APP_CLIENT_ID,
        AZURE_APP_CLIENT_SECRET: process.env.AZURE_APP_CLIENT_SECRET,
        AZURE_OPENID_CONFIG_TOKEN_ENDPOINT: process.env.AZURE_OPENID_CONFIG_TOKEN_ENDPOINT,
        AZURE_APP_WELL_KNOWN_URL: process.env.AZURE_APP_WELL_KNOWN_URL,
        AZURE_APP_PRE_AUTHORIZED_APPS: process.env.AZURE_APP_PRE_AUTHORIZED_APPS,
    },
    publicRuntimeConfig: {
        runtimeEnv: process.env.RUNTIME_ENVIRONMENT,
    },
};

module.exports = nextConfig;
