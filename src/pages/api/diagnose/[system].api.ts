import Fuse from 'fuse.js'
import { logger } from '@navikt/next-logger'
import { Diagnosekode, ICD10, ICPC2 } from '@navikt/diagnosekoder'

import { withAuthenticatedApi } from '../../../auth/withAuth'

export type { Diagnosekode as DiagnoseSuggestion }

const fuseIcd10 = new Fuse(ICD10, { keys: ['code', 'text'], threshold: 0.2 })
const fuseIcpc2 = new Fuse(ICPC2, { keys: ['code', 'text'], threshold: 0.2 })

export interface DiagnoseSearchResult {
    suggestions: Diagnosekode[]
}

const diagnoseSearch = withAuthenticatedApi<DiagnoseSearchResult>(async (req, res) => {
    const { system, value } = req.query

    if (req.method !== 'GET') {
        logger.error(`Got request for diagnose search with method ${req.method}`)
        res.status(405).json({ message: 'Method not supported' })
        return
    }

    if (system !== 'icd10' && system !== 'icpc2') {
        logger.error(`Invalid system used for diagnose search: ${system}`)
        res.status(400).json({ message: `${system} is not a valid kodesystem` })
        return
    }

    if (value == null || typeof value !== 'string') {
        logger.error(`Missing or invalid value used for diagnose search: "${value}"`)
        res.status(400).json({ message: `Missing search value query parameter` })
        return
    }

    res.status(200).json({ suggestions: searchSystem(system, value) })
})

export function searchSystem(system: 'icd10' | 'icpc2', value: string): Diagnosekode[] {
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
            return ICPC2.slice(0, 100)
        }

        return fuseIcpc2
            .search(value)
            .map((it) => it.item)
            .slice(0, 100)
    }
}

export default diagnoseSearch
