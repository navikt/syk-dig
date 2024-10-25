import { IToggle } from '@unleash/nextjs'

import { bundledEnv } from '../utils/env'

import { EXPECTED_TOGGLES } from './toggles'

export function localDevelopmentToggles(): IToggle[] {
    return EXPECTED_TOGGLES.map(
        (it): IToggle => ({
            name: it,
            enabled: true,
            impressionData: false,
            variant: {
                name: 'disabled',
                enabled: false,
            },
        }),
    )
}

export function getUnleashEnvironment(): 'development' | 'production' {
    switch (bundledEnv.NEXT_PUBLIC_RUNTIME_ENV) {
        case 'dev':
        case 'test':
        case 'local':
        case 'demo':
            return 'development'
        case 'production':
            return 'production'
    }
}
