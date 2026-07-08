import tsmBase from '@navikt/tsm-oxlint'
import tsmReact from '@navikt/tsm-oxlint/react'
import { defineConfig } from 'oxlint'

export default defineConfig({
    extends: [tsmBase, tsmReact],
    plugins: ['nextjs', 'vitest'],
    options: { typeCheck: true, typeAware: true },
    overrides: [
        {
            files: ['libs/*-mock/**/*.{ts,tsx}'],
            rules: {
                // TODO: Consider turning on
                'typescript/no-base-to-string': 'off',
                'typescript/no-non-null-assertion': 'off',
            },
        },
        {
            files: ['**/*.{test,integration}.{ts,tsx}'],
            rules: {
                'typescript/no-non-null-assertion': 'off',
            },
        },
    ],
})
