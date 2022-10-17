import { BodyShort, Heading } from '@navikt/ds-react';

import { OppholdsadresseFragment } from '../../../../graphql/queries/graphql.generated';

import Vegadresse from './Vegadresse';
import Matrikkeladresse from './Matrikkeladresse';
import UtenlandskAdresse from './Utenlandskadresse';

type OppholdsadresseProps = {
    adresser: OppholdsadresseFragment;
};

type OppholdAnnetType = 'MILITAER' | 'PENDLER' | 'UTENRIKS' | 'PAA_SVALBARD' | string;

function oppholdAnnet(value: OppholdAnnetType): string {
    switch (value) {
        case 'MILITAER':
            return 'Militær';
        case 'PENDLER':
            return 'Pendler';
        case 'UTENRIKS':
            return 'Utenriks';
        case 'PAA_SVALBARD':
            return 'På Svalbard';
        default:
            return value;
    }
}

function Oppholdsadresse({ adresser }: OppholdsadresseProps): JSX.Element {
    return (
        <div>
            <Heading level="3" size="xsmall">
                Oppholdsadresse
            </Heading>
            <FirstAvailableAddress adresser={adresser} />
        </div>
    );
}

function FirstAvailableAddress({ adresser }: OppholdsadresseProps): JSX.Element {
    if (adresser.vegadresse) {
        return <Vegadresse vegadresse={adresser.vegadresse} />;
    } else if (adresser.matrikkeladresse) {
        return <Matrikkeladresse matrikkeladresse={adresser.matrikkeladresse} />;
    } else if (adresser.utenlandskAdresse) {
        return <UtenlandskAdresse utenlandskAdresse={adresser.utenlandskAdresse} />;
    } else if (adresser.oppholdAnnetSted) {
        return <BodyShort>{`Annet opphold: ${oppholdAnnet(adresser.oppholdAnnetSted)}`}</BodyShort>;
    }
    return <BodyShort>Oppholdsadresse mangler</BodyShort>;
}

export default Oppholdsadresse;
