import { Profile } from '@navikt/ds-icons'

import SykmeldingSection from '../SykmeldingSection/SykmeldingSection'
import Fodselsnummer from '../FormComponents/Pasientopplysninger/Fodselsnummer'
import NavnOgAdresser from '../FormComponents/Pasientopplysninger/NavnOgAdresser'
import DatoSykmeldingenBleSkrevet from '../FormComponents/Pasientopplysninger/DatoSykmeldingenBleSkrevet'
import CountryPicker from '../FormComponents/CountryPicker/CountryPicker'
import { Person } from '../../graphql/queries/graphql.generated'

interface PasientopplysningerProps {
    fnr: string
    person: Person
}

function Pasientopplysninger({ fnr, person }: PasientopplysningerProps): JSX.Element {
    return (
        <SykmeldingSection id="pasientopplysninger-seksjon" title="Pasientopplysninger" Icon={Profile}>
            <Fodselsnummer fnr={fnr} />
            <NavnOgAdresser person={person} />
            <DatoSykmeldingenBleSkrevet />
            <CountryPicker name="land" />
        </SykmeldingSection>
    )
}

export default Pasientopplysninger
