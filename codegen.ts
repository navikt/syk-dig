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
        './src/graphql/queries/types.generated.ts': {
            plugins: [oxlintDisabler, 'typescript'],
            config: {
                enumsAsTypes: false,
                avoidOptionals: true,
                scalars: { Date: 'string', DateTime: 'string' },
                nonOptionalTypename: true,
            },
        },
        './src/graphql/queries/graphql.generated.ts': {
            plugins: [
                oxlintDisabler,
                { add: { content: `export * from './types.generated'` } },
                'typescript-operations',
                'typed-document-node',
            ],
            config: {
                enumType: 'native',
                exportFragmentSpreadSubTypes: true,
                importSchemaTypesFrom: './src/graphql/queries/types.generated.ts',
                namespacedImportName: 'Types',
                scalars: { Date: 'string', DateTime: 'string' },
                dedupeFragments: true,
                nonOptionalTypename: true,
            },
        },
        './src/mocks/mock-resolvers.generated.ts': {
            plugins: ['typescript', 'typescript-resolvers', oxlintDisabler],
            config: {
                enumsAsTypes: true,
                scalars: { Date: 'string', DateTime: 'string' },
                nonOptionalTypename: true,
            },
        },
    },
}

export default config
