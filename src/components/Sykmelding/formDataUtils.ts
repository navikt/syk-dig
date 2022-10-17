import { DefaultValues } from 'react-hook-form/dist/types/form';

import { DiagnoseFragment, OppgaveValues } from '../../graphql/queries/graphql.generated';
import { Periodetype } from '../FormComponents/Sykmeldingsperiode/PeriodeSelect';

import { DiagnoseFormValue, DiagnoseSystem } from './DiagnoseFormSection';
import { SykmeldingFormValues } from './SykmeldingForm';

type DefaultFormValues = DefaultValues<SykmeldingFormValues>;

function mapToDiagnoseValues(diagnose: DiagnoseFragment): DiagnoseFormValue {
    return {
        system: (diagnose.system ?? 'ICD10') as DiagnoseSystem,
        code: diagnose.kode,
        text: diagnose.tekst ?? null,
    };
}

export function createDefaultValues(values: OppgaveValues): DefaultFormValues {
    return {
        fnr: values.fnrPasient ?? '',
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
        periode: [
            {
                sykmeldingstype: Periodetype.AktivitetIkkeMulig,
                grad: undefined,
                fom: undefined,
                tom: undefined,
            },
        ],
    };
}
