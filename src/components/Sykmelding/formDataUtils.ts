import { DefaultValues } from 'react-hook-form/dist/types/form'

import { DiagnoseFragment, OppgaveValues, PeriodeType } from '../../graphql/queries/graphql.generated'
import { toDate } from '../../utils/dateUtils'

import { DiagnoseFormValue, DiagnoseSystem } from './DiagnoseFormSection'
import { SykmeldingFormValues } from './SykmeldingForm'

type DefaultFormValues = DefaultValues<SykmeldingFormValues>

function mapToDiagnoseValues(diagnose: DiagnoseFragment): DiagnoseFormValue {
    return {
        system: (diagnose.system ?? 'ICD10') as DiagnoseSystem,
        code: diagnose.kode,
        text: diagnose.tekst ?? null,
    }
}

export function createDefaultValues(values: OppgaveValues): DefaultFormValues {
    return {
        land: values.skrevetLand ?? '',
        diagnoser: {
            hoveddiagnose: values.hoveddiagnose
                ? mapToDiagnoseValues(values.hoveddiagnose)
                : { system: 'ICD10', code: undefined, text: undefined },
            bidiagnoser:
                values.biDiagnoser?.map((diagnose) =>
                    diagnose ? mapToDiagnoseValues(diagnose) : { system: 'ICD10', code: undefined, text: undefined },
                ) ?? [],
        },
        periode: values.perioder?.map((periode) => ({
            sykmeldingstype: periode.type,
            grad: periode.grad ?? undefined,
            range: {
                fom: toDate(periode.fom),
                tom: toDate(periode.tom),
            },
        })) ?? [
            {
                sykmeldingstype: PeriodeType.AktivitetIkkeMulig,
                range: { fom: undefined, tom: undefined },
                grad: undefined,
            },
        ],
        behandletTidspunkt: values.behandletTidspunkt,
        folkeRegistertAdresseErBrakkeEllerTilsvarende: values.folkeRegistertAdresseErBrakkeEllerTilsvarende ?? false,
    }
}
