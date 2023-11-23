import Fuse from 'fuse.js'

import icd10 from '../data/icd10.json'
import icpc2 from '../data/icpc2.json'

import { DiagnoseSuggestion } from './_types'

const fuseIcd10 = new Fuse(icd10, { keys: ['code', 'text'], threshold: 0.2 })
const fuseIcpc2 = new Fuse(icpc2, { keys: ['code', 'text'], threshold: 0.2 })

export function searchSystem(system: 'icd10' | 'icpc2', value: string): DiagnoseSuggestion[] {
    if (system === 'icd10') {
        if ((value ?? '').trim() === '') {
            return icd10.slice(0, 100)
        }

        return fuseIcd10
            .search(value)
            .map((it) => it.item)
            .slice(0, 100)
    } else {
        if ((value ?? '').trim() === '') {
            return icpc2.slice(0, 100)
        }

        return fuseIcpc2
            .search(value)
            .map((it) => it.item)
            .slice(0, 100)
    }
}
