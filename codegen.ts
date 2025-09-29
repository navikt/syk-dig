import { CodegenConfig } from '@graphql-codegen/cli'

const eslintDisabler = { add: { content: '/* eslint-disable */' } }

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
        './src/mocks/mock-resolvers.generated.ts': {
            plugins: ['typescript', 'typescript-resolvers', eslintDisabler],
            config: {
                enumsAsTypes: true,
                scalars: { DateTime: 'string', DateOnly: 'string', JSON: 'unknown' },
                nonOptionalTypename: true,
            },
        },
    },
}

export default config
