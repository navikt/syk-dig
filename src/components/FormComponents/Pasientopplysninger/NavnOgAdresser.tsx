import { BodyShort, Heading } from '@navikt/ds-react'

import { Person } from '../../../graphql/queries/graphql.generated'

import Bostedsadresse from './Adresser/Bostedsadresse'
import Oppholdsadresse from './Adresser/Oppholdsadresse'
import styles from './NavnOgAdresser.module.css'

type NavnOgAdresserProps = {
    person: Person
}

function NavnOgAdresser({ person }: NavnOgAdresserProps): JSX.Element {
    return (
        <>
            <div className={styles.navn}>
                <Heading level="3" size="xsmall">
                    Navn
                </Heading>
                <BodyShort id="navn">{person.navn}</BodyShort>
            </div>
            <div className={styles.adresser}>
                {person.bostedsadresse && <Bostedsadresse bostedsadresse={person.bostedsadresse} />}
                {person.oppholdsadresse && <Oppholdsadresse oppholdsadresse={person.oppholdsadresse} />}
            </div>
        </>
    )
}

export default NavnOgAdresser
