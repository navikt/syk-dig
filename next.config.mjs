import bundleAnalyzer from '@next/bundle-analyzer'

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX,
    experimental: {
        optimizePackageImports: ['@navikt/ds-react', '@navikt/aksel-icons'],
        serverComponentsExternalPackages: ['@navikt/next-logger', 'next-logger'],
    },
    eslint: {
        ignoreDuringBuilds: true,
        dirs: ['src'],
    },
}

export default process.env.ANALYZE === 'true' ? bundleAnalyzer()(nextConfig) : nextConfig
