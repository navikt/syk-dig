/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX,
    pageExtensions: ['page.tsx', 'page.ts', 'api.ts'],
    eslint: {
        ignoreDuringBuilds: true,
        dirs: ['src'],
    },
}

module.exports = nextConfig
