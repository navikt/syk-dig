import { Profile } from '@navikt/ds-icons';

import SykmeldingSection from '../SykmeldingSection/SykmeldingSection';
import Fodselsnummer from '../FormComponents/Pasientopplysninger/Fodselsnummer';
import DatoSykmeldingenBleSkrevet from '../FormComponents/Pasientopplysninger/DatoSykmeldingenBleSkrevet';
import CountryPicker from '../FormComponents/CountryPicker/CountryPicker';

function Pasientopplysninger(): JSX.Element {
    return (
        <SykmeldingSection id="pasientopplysninger-seksjon" title="Pasientopplysninger" Icon={Profile}>
            <Fodselsnummer />
            <DatoSykmeldingenBleSkrevet />
            <CountryPicker name="land" />
        </SykmeldingSection>
    );
}

export default Pasientopplysninger;
