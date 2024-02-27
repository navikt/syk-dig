import { ReactElement } from 'react'

import { Person } from '../../../graphql/queries/graphql.generated'
import FormInfo from '../../form-layout/FormInfo'

import Bostedsadresse from './Adresser/Bostedsadresse'
import Oppholdsadresse from './Adresser/Oppholdsadresse'

type PersonInfoProps = {
    fnr: string
    person: Person
}

function PersonInfo({ fnr, person }: PersonInfoProps): ReactElement {
    return (
        <>
            <div className="grid grid-cols-2 gap-8 mr-32 mb-16">
                <FormInfo title="Fødselsnummer">{fnr}</FormInfo>
                <FormInfo title="Navn">{person.navn}</FormInfo>
                {person.bostedsadresse && (
                    <FormInfo title="Bostedsadresse">
                        <Bostedsadresse bostedsadresse={person.bostedsadresse} />
                    </FormInfo>
                )}
                {person.oppholdsadresse && (
                    <FormInfo title="Oppholdsadresse">
                        <Oppholdsadresse oppholdsadresse={person.oppholdsadresse} />
                    </FormInfo>
                )}
            </div>
        </>
    )
}

export default PersonInfo
