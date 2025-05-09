import { DefaultValues } from 'react-hook-form'

import { DiagnoseFragment, OppgaveValuesFragment, PeriodeType } from '../../graphql/queries/graphql.generated'
import { toDate } from '../../utils/dateUtils'
import { DiagnoseFormValue, DiagnoseSystem } from '../FormComponents/DiagnosePicker/diagnose-combobox/types'

import { UtenlanskFormValues } from './SykmeldingForm'

type DefaultFormValues = DefaultValues<UtenlanskFormValues>

function mapToDiagnoseValues(diagnose: DiagnoseFragment): DiagnoseFormValue {
    return {
        system: (diagnose.system ?? 'ICD10') as DiagnoseSystem,
        code: diagnose.kode,
        text: diagnose.tekst ?? null,
    }
}

export function createDefaultValues(values: OppgaveValuesFragment): DefaultFormValues {
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
        periode:
            values.perioder && values.perioder.length > 0
                ? values.perioder?.map((periode) => ({
                      sykmeldingstype: periode.type,
                      grad: periode.grad ?? undefined,
                      range: {
                          fom: toDate(periode.fom),
                          tom: toDate(periode.tom),
                      },
                  }))
                : [
                      {
                          sykmeldingstype: PeriodeType.AktivitetIkkeMulig,
                          range: { fom: undefined, tom: undefined },
                          grad: undefined,
                      },
                  ],
        behandletTidspunkt: values.behandletTidspunkt,
        erAdresseUtland: values.erAdresseUtland ?? false,
        avvisningsgrunnAnnet: '',
        mangelfullSykmelding: false,
    }
}
