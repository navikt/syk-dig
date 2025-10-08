import { NextConfig } from 'next'

const nextConfig: NextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX,
    serverExternalPackages: ['@navikt/next-logger', 'next-logger', 'pino', 'graphql', '@whatwg-node'],
    experimental: {
        optimizePackageImports: ['@navikt/ds-react', '@navikt/aksel-icons'],
    },
    eslint: {
        ignoreDuringBuilds: true,
        dirs: ['src'],
    },
    async redirects() {
        return [
            /* k8s ingress yeets all old smreg stuff to /smreg-legacy,
               use nextjs rewrites to rewrite to correct path parameter */
            {
                source: '/smreg-legacy',
                destination: '/nasjonal/:oppgaveId',
                has: [{ type: 'query', key: 'oppgaveid', value: '(?<oppgaveId>.*)' }],
                permanent: true,
            },
            {
                source: '/smreg-legacy',
                destination: '/nasjonal/ferdigstilt/:sykmeldingId',
                has: [{ type: 'query', key: 'sykmeldingid', value: '(?<sykmeldingId>.*)' }],
                permanent: true,
            },
        ]
    },
}

export default nextConfig
