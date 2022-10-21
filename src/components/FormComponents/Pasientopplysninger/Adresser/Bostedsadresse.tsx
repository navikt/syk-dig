import { BodyShort, Heading } from '@navikt/ds-react';

import { BostedsadresseFragment } from '../../../../graphql/queries/graphql.generated';

import Vegadresse from './Vegadresse';
import Matrikkeladresse from './Matrikkeladresse';
import UtenlandskAdresse from './Utenlandskadresse';

type BostedsadresseProps = {
    adresser: BostedsadresseFragment;
};

function Bostedsadresse({ adresser }: BostedsadresseProps): JSX.Element | null {
    return (
        <div>
            <Heading level="3" size="xsmall">
                Bostedsadresse
            </Heading>
            <FirstAvailableAddress adresser={adresser} />
        </div>
    );
}

function FirstAvailableAddress({ adresser }: BostedsadresseProps): JSX.Element {
    if (adresser.vegadresse) {
        return <Vegadresse vegadresse={adresser.vegadresse} />;
    } else if (adresser.matrikkeladresse) {
        return <Matrikkeladresse matrikkeladresse={adresser.matrikkeladresse} />;
    } else if (adresser.utenlandskAdresse) {
        return <UtenlandskAdresse utenlandskAdresse={adresser.utenlandskAdresse} />;
    } else if (adresser.ukjentBosted) {
        return <BodyShort>{`Kommunenummer: ${adresser.ukjentBosted.bostedskommune}`}</BodyShort>;
    }
    return <BodyShort>Bostedsadresse mangler</BodyShort>;
}

export default Bostedsadresse;
