import { ReactElement } from 'react'

import FormSection from '../form-layout/FormSection'
import PersonInfo from '../FormComponents/Pasientopplysninger/PersonInfo'
import CountryPicker from '../FormComponents/CountryPicker/CountryPicker'
import { Person } from '../../graphql/queries/graphql.generated'

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
