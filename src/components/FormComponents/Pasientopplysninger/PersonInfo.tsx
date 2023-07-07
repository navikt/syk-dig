import { BodyShort, Heading } from '@navikt/ds-react'
import { ReactElement } from 'react'

import { Person } from '../../../graphql/queries/graphql.generated'

import Bostedsadresse from './Adresser/Bostedsadresse'
import Oppholdsadresse from './Adresser/Oppholdsadresse'
import styles from './NavnOgAdresser.module.css'

type PersonInfoProps = {
    fnr: string
    person: Person
}

function PersonInfo({ fnr, person }: PersonInfoProps): ReactElement {
    return (
        <>
            <div className={styles.personInfo}>
                <div className={styles.fnr}>
                    <Heading level="3" size="xsmall">
                        Fødselsnummer
                    </Heading>
                    <BodyShort id="fnr">{fnr}</BodyShort>
                </div>
                <div className={styles.navn}>
                    <Heading level="3" size="xsmall">
                        Navn
                    </Heading>
                    <BodyShort id="navn">{person.navn}</BodyShort>
                </div>
            </div>
            <div className={styles.adresser}>
                {person.bostedsadresse && <Bostedsadresse bostedsadresse={person.bostedsadresse} />}
                {person.oppholdsadresse && <Oppholdsadresse oppholdsadresse={person.oppholdsadresse} />}
            </div>
        </>
    )
}

export default PersonInfo
