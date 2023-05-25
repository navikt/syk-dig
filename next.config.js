// Because of some weird minifcation bug with MSW, we need to disable minification when we create a bundle with MSW. 🥵
const isMsw = process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    swcMinify: !isMsw,
    webpack: isMsw
        ? (config) => {
              config.optimization.minimizer = []
              return config
          }
        : undefined,
    assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX,
    pageExtensions: ['page.tsx', 'page.ts', 'api.ts'],
    eslint: {
        ignoreDuringBuilds: true,
        dirs: ['src'],
    },
    productionBrowserSourceMaps: true,
}

module.exports = nextConfig
