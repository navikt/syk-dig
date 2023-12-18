import Fuse from 'fuse.js'
import { ICD10, ICPC2 } from '@navikt/diagnosekoder'

import { DiagnoseSuggestion } from './_types'

const fuseIcd10 = new Fuse(ICD10, { keys: ['code', 'text'], threshold: 0.2 })
const fuseIcpc2 = new Fuse(ICPC2, { keys: ['code', 'text'], threshold: 0.2 })

export function searchSystem(system: 'icd10' | 'icpc2', value: string): DiagnoseSuggestion[] {
    if (system === 'icd10') {
        if ((value ?? '').trim() === '') {
            return ICD10.slice(0, 100)
        }

        return fuseIcd10
            .search(value)
            .map((it) => it.item)
            .slice(0, 100)
    } else {
        if ((value ?? '').trim() === '') {
            return ICD10.slice(0, 100)
        }

        return fuseIcpc2
            .search(value)
            .map((it) => it.item)
            .slice(0, 100)
    }
}
