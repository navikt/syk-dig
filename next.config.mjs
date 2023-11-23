import bundleAnalyzer from '@next/bundle-analyzer'

const ContentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' https://*.nav.no;
    style-src 'self' 'unsafe-inline' https://cdn.nav.no;
    img-src 'self' blob: data:;
    font-src 'self' https://cdn.nav.no;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
    worker-src 'self';
    connect-src 'self' https://*.nav.no;
`

/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        // if (process.env.NODE_ENV === 'development') return []

        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
                    },
                ],
            },
        ]
    },
    output: 'standalone',
    reactStrictMode: true,
    assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX,
    experimental: {
        serverComponentsExternalPackages: ['@navikt/next-logger', 'next-logger'],
    },
    eslint: {
        ignoreDuringBuilds: true,
        dirs: ['src'],
    },
}

export default process.env.ANALYZE === 'true' ? bundleAnalyzer()(nextConfig) : nextConfig
