import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import { defineConfig } from 'eslint/config'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import tsmEslintReact from '@navikt/tsm-eslint-react'

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    ...tsmEslintReact,
    {
        extends: [eslintPluginPrettierRecommended],
        rules: { 'prettier/prettier': 'warn' },
    },
    {
        rules: {
            // Look at enabling this, but it crashes with some react-hook-form internals atm
            'react-hooks/refs': 'off',
            // We dont even use react copmiler?!
            'react-hooks/incompatible-library': 'off',
        },
    },
    {
        files: ['e2e/**/*.ts'],
        rules: {
            'import/no-extraneous-dependencies': 'off',
        },
    },
])

export default eslintConfig
