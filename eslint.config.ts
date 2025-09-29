import { defineConfig } from 'eslint/config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
})

const eslintConfig = defineConfig([
    ...compat.extends('@navikt/teamsykmelding', 'next/core-web-vitals', 'next/typescript'),
    {
        files: ['e2e/**'],
        rules: { 'testing-library/prefer-screen-queries': 'off', 'testing-library/no-node-access': 'off' },
    },
])

export default eslintConfig
