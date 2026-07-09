import { ReactElement } from 'react'

import { Person } from '../../graphql/queries/types.generated'
import FormSection from '../form-layout/FormSection'
import { CountryPicker } from '../FormComponents/CountryPicker/CountryPicker'
import PersonInfo from '../FormComponents/Pasientopplysninger/PersonInfo'

interface PasientopplysningerProps {
    fnr: string
    person: Person
}

function Pasientopplysninger({ fnr, person }: PasientopplysningerProps): ReactElement {
    return (
        <FormSection id="pasientopplysninger-seksjon" title="Pasientopplysninger">
            <PersonInfo fnr={fnr} person={person} />
            <CountryPicker name="land" />
        </FormSection>
    )
}

export default Pasientopplysninger
