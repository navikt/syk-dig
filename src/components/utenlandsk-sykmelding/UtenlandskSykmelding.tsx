import {ReactElement} from "react";
import {PaneView} from "../split-view-layout/persistent-layout";
import SplitDocumentView from "../split-view-layout/SplitDocumentView";
import {OppgaveDocuments} from "../utenlandsk-oppgave/UtenlandskOppgaveView";
import {useQuery} from "@apollo/client";

type Props = PaneView & {
    sykmeldingId: string
}

function UtenlandskSykmeldingView({sykmeldingId, layout} : Props) : ReactElement {
   /* const sykmeldingQuery = useQuery(SykmeldingBySykmeldingId, {
    variables*/

    return (
    <SplitDocumentView
        title="Utenlandsk sykmelding"
        ingress="Under kan du korrigere opplysningene i en allerede registrert utenlandsk papirsykmelding"
        documentView={}
        closeReturnsTo="modia"
        defaultLayout={layout}>

        </SplitDocumentView>
    )
}

export default UtenlandskSykmeldingView
