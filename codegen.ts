import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    overwrite: true,
    schema: ['schema.json', './src/**/*.graphqls'],
    documents: './src/**/*.graphql',
    hooks: {
        afterAllFileWrite: ['prettier --write'],
    },
    generates: {
        './src/graphql/queries/possible-types.generated.ts': {
            plugins: ['fragment-matcher'],
        },
        './src/graphql/queries/graphql.generated.ts': {
            plugins: [
                'typescript',
                'typescript-operations',
                'typed-document-node',
                {
                    add: {
                        placement: 'prepend',
                        content: '/* eslint-disable @typescript-eslint/no-explicit-any */',
                    },
                },
            ],
            config: {
                exportFragmentSpreadSubTypes: true,
                scalars: { Date: 'string', DateTime: 'string' },
                dedupeFragments: true,
                nonOptionalTypename: true,
            },
        },
    },
}

export default config
