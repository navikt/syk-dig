import { CodegenConfig } from '@graphql-codegen/cli'

const oxlintDisabler = { add: { content: '/* oxlint-disable */' } }

const config: CodegenConfig = {
    overwrite: true,
    schema: ['schema.json', './src/**/*.graphqls'],
    documents: './src/**/*.graphql',
    hooks: {
        afterAllFileWrite: ['oxfmt'],
    },
    generates: {
        './src/graphql/queries/possible-types.generated.ts': {
            plugins: ['fragment-matcher'],
        },
        './src/graphql/queries/graphql.generated.ts': {
            plugins: ['typescript', 'typescript-operations', 'typed-document-node', oxlintDisabler],
            config: {
                exportFragmentSpreadSubTypes: true,
                scalars: { Date: 'string', DateTime: 'string' },
                dedupeFragments: true,
                nonOptionalTypename: true,
            },
        },
        './src/mocks/mock-resolvers.generated.ts': {
            plugins: ['typescript', 'typescript-resolvers', oxlintDisabler],
            config: {
                enumsAsTypes: true,
                scalars: { DateTime: 'string', DateOnly: 'string', JSON: 'unknown' },
                nonOptionalTypename: true,
            },
        },
    },
}

export default config
