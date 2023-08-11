import bundleAnalyzer from '@next/bundle-analyzer'

const ContentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' https://*.nav.no;
    style-src 'self' 'unsafe-inline' https://cdn.nav.no;
    img-src 'self' data:;
    font-src 'self' https://cdn.nav.no;
    worker-src 'self';
    connect-src 'self' https://*.nav.no;
`

/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
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
    // Until jest supports ESM-modules, or we replace jest with vitest
    transpilePackages: ['nextleton'],
    assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX,
    pageExtensions: ['page.tsx', 'page.ts', 'api.ts'],
    eslint: {
        ignoreDuringBuilds: true,
        dirs: ['src'],
    },
    productionBrowserSourceMaps: true,
}

export default bundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
})(nextConfig)
