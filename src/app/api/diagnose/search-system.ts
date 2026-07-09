import { ICD10, ICPC2 } from '@navikt/tsm-diagnoser'
import Fuse from 'fuse.js'
import * as R from 'remeda'

import { Diagnose, DiagnoseSystem } from '../../../components/FormComponents/DiagnosePicker/diagnose-combobox/types'
import { raise } from '../../../utils/tsUtils'

const icd10Fuse = new Fuse(
    ICD10.map((it) => ({
        ...it,
        // Remove the period to match the format of the old diagnose-library
        code: it.code.replace('.', ''),
    })),
    { keys: ['code', 'text', 'system'], threshold: 0.2 },
)
const icpc2Fuse = new Fuse(ICPC2, { keys: ['code', 'text', 'system'], threshold: 0.2 })

export function searchDiagnose(query: string, systems: DiagnoseSystem[]): Diagnose[] {
    return R.pipe(
        systems,
        R.map(getSystemFuse),
        R.map((it) => it.search(query)),
        R.flat(),
        R.map(
            (it) =>
                ({
                    system: it.item.system as DiagnoseSystem,
                    code: it.item.code,
                    text: it.item.text,
                    score: it.score ?? null,
                }) satisfies Diagnose & { score: number | null },
        ),
        R.take(100),
    )
}

function getSystemFuse(system: DiagnoseSystem): typeof icd10Fuse | typeof icpc2Fuse {
    switch (system) {
        case 'ICD10':
            return icd10Fuse
        case 'ICPC2':
            return icpc2Fuse
    }
}

export function getDiagnoseText(system: DiagnoseSystem, code: string): string {
    const diagnose = getSystem(system).find((it) => it.code.replace('.', '') === code)
    if (!diagnose) {
        raise(`No diagnose found in ${system} with code ${code}`)
    }

    return diagnose.text
}

function getSystem(system: DiagnoseSystem): typeof ICD10 | typeof ICPC2 {
    switch (system) {
        case 'ICD10':
            return ICD10
        case 'ICPC2':
            return ICPC2
    }
}
