import { BodyShort, Heading } from '@navikt/ds-react'

import styles from './Fodselsnummer.module.css'

interface Props {
    fnr: string
}

function Fodselsnummer({ fnr }: Props): JSX.Element {
    return (
        <div className={styles.fodselsnummer}>
            <div>
                <Heading level="3" size="xsmall">
                    Fødselsnummer
                </Heading>
                <BodyShort id="fnr">{fnr}</BodyShort>
            </div>
        </div>
    )
}

export default Fodselsnummer
