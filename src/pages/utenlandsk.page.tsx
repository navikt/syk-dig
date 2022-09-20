import PageWrapper from '../components/PageWrapper/PageWrapper';
import SykmeldingForm from '../components/Sykmelding/SykmeldingForm';

function Utenlandsk(): JSX.Element {
    return (
        <PageWrapper title="Digitalisering av Sykmeldinger">
            <SykmeldingForm />
        </PageWrapper>
    );
}

export default Utenlandsk;
