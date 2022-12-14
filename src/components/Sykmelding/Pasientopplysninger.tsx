import SykmeldingSection from '../SykmeldingSection/SykmeldingSection'
import PersonInfo from '../FormComponents/Pasientopplysninger/PersonInfo'
import DatoSykmeldingenBleSkrevet from '../FormComponents/Pasientopplysninger/DatoSykmeldingenBleSkrevet'
import CountryPicker from '../FormComponents/CountryPicker/CountryPicker'
import { Person } from '../../graphql/queries/graphql.generated'

interface PasientopplysningerProps {
    fnr: string
    person: Person
}

function Pasientopplysninger({ fnr, person }: PasientopplysningerProps): JSX.Element {
    return (
        <SykmeldingSection id="pasientopplysninger-seksjon" title="Pasientopplysninger">
            <PersonInfo fnr={fnr} person={person} />
            <CountryPicker name="land" />
            <DatoSykmeldingenBleSkrevet />
        </SykmeldingSection>
    )
}

export default Pasientopplysninger
