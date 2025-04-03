import {
    NasjonalOppgaveByIdDocument,
    NasjonalOppgaveFragment,
    Navn,
    PasientDocument,
    Sykmelder,
    SykmelderDocument,
} from '../../../graphql/queries/graphql.generated'
import { createMock } from '../../../utils/test/apolloTestUtils'

import { createNasjonalOppgave, createPasientNavn, createSykmelder } from './testData/dataCreators'

const nasjonalOppgave: NasjonalOppgaveFragment = createNasjonalOppgave({ oppgaveId: '123456789' })
export const oppgaveMock = createMock({
    request: { query: NasjonalOppgaveByIdDocument, variables: { oppgaveId: '123456789' } },
    result: { data: { __typename: 'Query', nasjonalOppgave: nasjonalOppgave } },
})

const pasientNavn: Navn = createPasientNavn()
export const pasientNavnMock = createMock({
    request: { query: PasientDocument },
    result: { data: { __typename: 'Query', pasientNavn: pasientNavn } },
})

const sykmelder: Sykmelder = createSykmelder()
export const sykmelderMock = createMock({
    request: { query: SykmelderDocument, variables: { hprNummer: '007125186' } },
    result: { data: { __typename: 'Query', sykmelder: sykmelder } },
})
