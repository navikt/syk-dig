import { BodyShort, Heading } from '@navikt/ds-react';

import { BostedsadresseFragment } from '../../../../graphql/queries/graphql.generated';

import Vegadresse from './Vegadresse';
import Matrikkeladresse from './Matrikkeladresse';
import UtenlandskAdresse from './Utenlandskadresse';

type BostedsadresseProps = {
    bostedsadresse: BostedsadresseFragment | null;
};

function Bostedsadresse({ bostedsadresse }: BostedsadresseProps): JSX.Element | null {
    return (
        <div>
            <Heading level="3" size="xsmall">
                Bostedsadresse
            </Heading>
            <BostedsadresseVariant bostedsadresse={bostedsadresse} />
        </div>
    );
}

function BostedsadresseVariant({ bostedsadresse }: BostedsadresseProps): JSX.Element {
    if (!bostedsadresse) {
        return <BodyShort>Bostedsadresse mangler</BodyShort>;
    }

    switch (bostedsadresse.__typename) {
        case 'Vegadresse':
            return <Vegadresse vegadresse={bostedsadresse} />;
        case 'Matrikkeladresse':
            return <Matrikkeladresse matrikkeladresse={bostedsadresse} />;
        case 'UtenlandskAdresse':
            return <UtenlandskAdresse utenlandskAdresse={bostedsadresse} />;
        case 'UkjentBosted':
            return <BodyShort>{`Kommunenummer: ${bostedsadresse.bostedskommune}`}</BodyShort>;
    }
}

export default Bostedsadresse;
