/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string }
    String: { input: string; output: string }
    Boolean: { input: boolean; output: boolean }
    Int: { input: number; output: number }
    Float: { input: number; output: number }
    Date: { input: any; output: any }
    DateTime: { input: string; output: string }
    UUID: { input: any; output: any }
    _FieldSet: { input: any; output: any }
}

export type AktivitetIkkeMulig = {
    __typename: 'AktivitetIkkeMulig'
    arbeidsrelatertArsak?: Maybe<ArbeidsrelatertArsak>
    medisinskArsak?: Maybe<MedisinskArsak>
}

export type AktivitetIkkeMuligValues = {
    arbeidsrelatertArsak?: InputMaybe<ArbeidsrelatertArsakValues>
    medisinskArsak?: InputMaybe<MedisinskArsakValues>
}

export type AnnenFraversArsak = {
    __typename: 'AnnenFraversArsak'
    beskrivelse?: Maybe<Scalars['String']['output']>
    grunn?: Maybe<Array<AnnenFraversArsakGrunn>>
}

export type AnnenFraversArsakGrunn =
    | 'ABORT'
    | 'ARBEIDSRETTET_TILTAK'
    | 'BEHANDLING_FORHINDRER_ARBEID'
    | 'BEHANDLING_STERILISERING'
    | 'DONOR'
    | 'GODKJENT_HELSEINSTITUSJON'
    | 'MOTTAR_TILSKUDD_GRUNNET_HELSETILSTAND'
    | 'NODVENDIG_KONTROLLUNDENRSOKELSE'
    | 'SMITTEFARE'
    | 'UFOR_GRUNNET_BARNLOSHET'

export type AnnenFraversArsakValues = {
    beskrivelse?: InputMaybe<Scalars['String']['input']>
    grunn: Array<AnnenFraversArsakGrunn>
}

export type Arbeidsgiver = {
    __typename: 'Arbeidsgiver'
    harArbeidsgiver?: Maybe<HarArbeidsgiver>
    navn?: Maybe<Scalars['String']['output']>
    stillingsprosent?: Maybe<Scalars['Int']['output']>
    yrkesbetegnelse?: Maybe<Scalars['String']['output']>
}

export type ArbeidsgiverValues = {
    harArbeidsgiver: HarArbeidsgiver
    navn?: InputMaybe<Scalars['String']['input']>
    stillingsprosent?: InputMaybe<Scalars['Int']['input']>
    yrkesbetegnelse?: InputMaybe<Scalars['String']['input']>
}

export type ArbeidsrelatertArsak = {
    __typename: 'ArbeidsrelatertArsak'
    arsak: Array<ArbeidsrelatertArsakType>
    beskrivelse?: Maybe<Scalars['String']['output']>
}

export type ArbeidsrelatertArsakType = 'ANNET' | 'MANGLENDE_TILRETTELEGGING'

export type ArbeidsrelatertArsakValues = {
    arsak: Array<ArbeidsrelatertArsakType>
    beskrivelse?: InputMaybe<Scalars['String']['input']>
}

export type Avvisingsgrunn =
    | 'ANNET'
    | 'BASERT_PAA_TELEFONKONTAKT'
    | 'DUPLIKAT'
    | 'FOR_LANG_PERIODE'
    | 'LOPENDE_AAP'
    | 'MANGLENDE_DIAGNOSE'
    | 'MANGLENDE_ORGINAL_SYKMELDING'
    | 'MANGLENDE_PERIODE_ELLER_SLUTTDATO'
    | 'MANGLENDE_UNDERSKRIFT_ELLER_STEMPEL_FRA_SYKMELDER'
    | 'MAXDATO_OPPNAADD'
    | 'RISIKOSAK'
    | 'TILBAKEDATERT_SYKMELDING'
    | 'VARSLET_I_SAKEN'

export type Behandler = {
    __typename: 'Behandler'
    etternavn: Scalars['String']['output']
    fnr: Scalars['String']['output']
    fornavn: Scalars['String']['output']
    hpr?: Maybe<Scalars['String']['output']>
    mellomnavn?: Maybe<Scalars['String']['output']>
    tlf?: Maybe<Scalars['String']['output']>
}

export type BehandlerValues = {
    hpr?: InputMaybe<Scalars['String']['input']>
    tlf?: InputMaybe<Scalars['String']['input']>
}

export type Bostedsadresse = Matrikkeladresse | UkjentBosted | UtenlandskAdresse | Vegadresse

export type DiagnoseInput = {
    kode: Scalars['String']['input']
    system: Scalars['String']['input']
}

export type DiagnoseSchema = {
    __typename: 'DiagnoseSchema'
    kode?: Maybe<Scalars['String']['output']>
    system?: Maybe<Scalars['String']['output']>
    tekst?: Maybe<Scalars['String']['output']>
}

export type DiagnoseValue = {
    __typename: 'DiagnoseValue'
    kode: Scalars['String']['output']
    system: Scalars['String']['output']
    tekst?: Maybe<Scalars['String']['output']>
}

export type DiagnoseValues = {
    kode: Scalars['String']['input']
    system: Scalars['String']['input']
    tekst?: InputMaybe<Scalars['String']['input']>
}

export type Digitaliseringsoppgave = {
    __typename: 'Digitaliseringsoppgave'
    documents: Array<Document>
    oppgaveId: Scalars['String']['output']
    person: Person
    type: SykmeldingsType
    values: OppgaveValues
}

export type DigitaliseringsoppgaveResult = Digitaliseringsoppgave | DigitaliseringsoppgaveStatus

export type DigitaliseringsoppgaveStatus = {
    __typename: 'DigitaliseringsoppgaveStatus'
    oppgaveId: Scalars['String']['output']
    status: DigitaliseringsoppgaveStatusEnum
}

export type DigitaliseringsoppgaveStatusEnum = 'AVVIST' | 'FERDIGSTILT' | 'FINNES_IKKE' | 'IKKE_EN_SYKMELDING'

export type DigitalisertSykmelding = {
    __typename: 'DigitalisertSykmelding'
    documents: Array<Document>
    oppgaveId: Scalars['String']['output']
    person: Person
    sykmeldingId: Scalars['String']['output']
    type: SykmeldingsType
    values: OppgaveValues
}

export type DigitalisertSykmeldingResult = DigitalisertSykmelding | OppdatertSykmeldingStatus

export type Document = {
    __typename: 'Document'
    dokumentInfoId: Scalars['String']['output']
    tittel: Scalars['String']['output']
}

export type ErrorDetail =
    /**
     * The deadline expired before the operation could complete.
     *
     * For operations that change the state of the system, this error
     * may be returned even if the operation has completed successfully.
     * For example, a successful response from a server could have been
     * delayed long enough for the deadline to expire.
     *
     * HTTP Mapping: 504 Gateway Timeout
     * Error Type: UNAVAILABLE
     */
    | 'DEADLINE_EXCEEDED'
    /**
     * The server detected that the client is exhibiting a behavior that
     * might be generating excessive load.
     *
     * HTTP Mapping: 429 Too Many Requests or 420 Enhance Your Calm
     * Error Type: UNAVAILABLE
     */
    | 'ENHANCE_YOUR_CALM'
    /**
     * The requested field is not found in the schema.
     *
     * This differs from `NOT_FOUND` in that `NOT_FOUND` should be used when a
     * query is valid, but is unable to return a result (if, for example, a
     * specific video id doesn't exist). `FIELD_NOT_FOUND` is intended to be
     * returned by the server to signify that the requested field is not known to exist.
     * This may be returned in lieu of failing the entire query.
     * See also `PERMISSION_DENIED` for cases where the
     * requested field is invalid only for the given user or class of users.
     *
     * HTTP Mapping: 404 Not Found
     * Error Type: BAD_REQUEST
     */
    | 'FIELD_NOT_FOUND'
    /**
     * The client specified an invalid argument.
     *
     * Note that this differs from `FAILED_PRECONDITION`.
     * `INVALID_ARGUMENT` indicates arguments that are problematic
     * regardless of the state of the system (e.g., a malformed file name).
     *
     * HTTP Mapping: 400 Bad Request
     * Error Type: BAD_REQUEST
     */
    | 'INVALID_ARGUMENT'
    /**
     * The provided cursor is not valid.
     *
     * The most common usage for this error is when a client is paginating
     * through a list that uses stateful cursors. In that case, the provided
     * cursor may be expired.
     *
     * HTTP Mapping: 404 Not Found
     * Error Type: NOT_FOUND
     */
    | 'INVALID_CURSOR'
    /**
     * Unable to perform operation because a required resource is missing.
     *
     * Example: Client is attempting to refresh a list, but the specified
     * list is expired. This requires an action by the client to get a new list.
     *
     * If the user is simply trying GET a resource that is not found,
     * use the NOT_FOUND error type. FAILED_PRECONDITION.MISSING_RESOURCE
     * is to be used particularly when the user is performing an operation
     * that requires a particular resource to exist.
     *
     * HTTP Mapping: 400 Bad Request or 500 Internal Server Error
     * Error Type: FAILED_PRECONDITION
     */
    | 'MISSING_RESOURCE'
    /**
     * Service Error.
     *
     * There is a problem with an upstream service.
     *
     * This may be returned if a gateway receives an unknown error from a service
     * or if a service is unreachable.
     * If a request times out which waiting on a response from a service,
     * `DEADLINE_EXCEEDED` may be returned instead.
     * If a service returns a more specific error Type, the specific error Type may
     * be returned instead.
     *
     * HTTP Mapping: 502 Bad Gateway
     * Error Type: UNAVAILABLE
     */
    | 'SERVICE_ERROR'
    /**
     * Request failed due to network errors.
     *
     * HTTP Mapping: 503 Unavailable
     * Error Type: UNAVAILABLE
     */
    | 'TCP_FAILURE'
    /**
     * Request throttled based on server concurrency limits.
     *
     * HTTP Mapping: 503 Unavailable
     * Error Type: UNAVAILABLE
     */
    | 'THROTTLED_CONCURRENCY'
    /**
     * Request throttled based on server CPU limits
     *
     * HTTP Mapping: 503 Unavailable.
     * Error Type: UNAVAILABLE
     */
    | 'THROTTLED_CPU'
    /**
     * The operation is not implemented or is not currently supported/enabled.
     *
     * HTTP Mapping: 501 Not Implemented
     * Error Type: BAD_REQUEST
     */
    | 'UNIMPLEMENTED'
    /**
     * Unknown error.
     *
     * This error should only be returned when no other error detail applies.
     * If a client sees an unknown errorDetail, it will be interpreted as UNKNOWN.
     *
     * HTTP Mapping: 500 Internal Server Error
     */
    | 'UNKNOWN'

export type ErrorType =
    /**
     * Bad Request.
     *
     * There is a problem with the request.
     * Retrying the same request is not likely to succeed.
     * An example would be a query or argument that cannot be deserialized.
     *
     * HTTP Mapping: 400 Bad Request
     */
    | 'BAD_REQUEST'
    /**
     * The operation was rejected because the system is not in a state
     * required for the operation's execution.  For example, the directory
     * to be deleted is non-empty, an rmdir operation is applied to
     * a non-directory, etc.
     *
     * Service implementers can use the following guidelines to decide
     * between `FAILED_PRECONDITION` and `UNAVAILABLE`:
     *
     * - Use `UNAVAILABLE` if the client can retry just the failing call.
     * - Use `FAILED_PRECONDITION` if the client should not retry until
     * the system state has been explicitly fixed.  E.g., if an "rmdir"
     *      fails because the directory is non-empty, `FAILED_PRECONDITION`
     * should be returned since the client should not retry unless
     * the files are deleted from the directory.
     *
     * HTTP Mapping: 400 Bad Request or 500 Internal Server Error
     */
    | 'FAILED_PRECONDITION'
    /**
     * Internal error.
     *
     * An unexpected internal error was encountered. This means that some
     * invariants expected by the underlying system have been broken.
     * This error code is reserved for serious errors.
     *
     * HTTP Mapping: 500 Internal Server Error
     */
    | 'INTERNAL'
    /**
     * The requested entity was not found.
     *
     * This could apply to a resource that has never existed (e.g. bad resource id),
     * or a resource that no longer exists (e.g. cache expired.)
     *
     * Note to server developers: if a request is denied for an entire class
     * of users, such as gradual feature rollout or undocumented allowlist,
     * `NOT_FOUND` may be used. If a request is denied for some users within
     * a class of users, such as user-based access control, `PERMISSION_DENIED`
     * must be used.
     *
     * HTTP Mapping: 404 Not Found
     */
    | 'NOT_FOUND'
    /**
     * The caller does not have permission to execute the specified
     * operation.
     *
     * `PERMISSION_DENIED` must not be used for rejections
     * caused by exhausting some resource or quota.
     * `PERMISSION_DENIED` must not be used if the caller
     * cannot be identified (use `UNAUTHENTICATED`
     * instead for those errors).
     *
     * This error Type does not imply the
     * request is valid or the requested entity exists or satisfies
     * other pre-conditions.
     *
     * HTTP Mapping: 403 Forbidden
     */
    | 'PERMISSION_DENIED'
    /**
     * The request does not have valid authentication credentials.
     *
     * This is intended to be returned only for routes that require
     * authentication.
     *
     * HTTP Mapping: 401 Unauthorized
     */
    | 'UNAUTHENTICATED'
    /**
     * Currently Unavailable.
     *
     * The service is currently unavailable.  This is most likely a
     * transient condition, which can be corrected by retrying with
     * a backoff.
     *
     * HTTP Mapping: 503 Unavailable
     */
    | 'UNAVAILABLE'
    /**
     * Unknown error.
     *
     * For example, this error may be returned when
     * an error code received from another address space belongs to
     * an error space that is not known in this address space.  Also
     * errors raised by APIs that do not return enough error information
     * may be converted to this error.
     *
     * If a client sees an unknown errorType, it will be interpreted as UNKNOWN.
     * Unknown errors MUST NOT trigger any special behavior. These MAY be treated
     * by an implementation as being equivalent to INTERNAL.
     *
     * When possible, a more specific error should be provided.
     *
     * HTTP Mapping: 520 Unknown Error
     */
    | 'UNKNOWN'

export type Godkjenning = {
    __typename: 'Godkjenning'
    autorisasjon?: Maybe<Kode>
    helsepersonellkategori?: Maybe<Kode>
}

export type Gradert = {
    __typename: 'Gradert'
    grad?: Maybe<Scalars['Int']['output']>
    reisetilskudd: Scalars['Boolean']['output']
}

export type GradertValues = {
    grad: Scalars['Int']['input']
    reisetilskudd: Scalars['Boolean']['input']
}

export type HarArbeidsgiver = 'EN_ARBEIDSGIVER' | 'FLERE_ARBEIDSGIVERE' | 'INGEN_ARBEIDSGIVER'

export type HarArbeidsgiverInfo = {
    codeValue: Scalars['String']['input']
    text: Scalars['String']['input']
    value: HarArbeidsgiver
}

export type Journalpost = {
    __typename: 'Journalpost'
    dokumenter: Array<Document>
    fnr: Scalars['String']['output']
    journalpostId: Scalars['String']['output']
    journalstatus: Scalars['String']['output']
}

export type JournalpostResult = Journalpost | JournalpostStatus

export type JournalpostStatus = {
    __typename: 'JournalpostStatus'
    journalpostId: Scalars['String']['output']
    oppgaveId?: Maybe<Scalars['String']['output']>
    status: JournalpostStatusEnum
}

export type JournalpostStatusEnum =
    | 'FEIL_KANAL'
    | 'FEIL_TEMA'
    | 'FEIL_TYPE'
    | 'MANGLENDE_JOURNALPOST'
    | 'MANGLER_FNR'
    | 'OPPRETTET'

export type Kode = {
    __typename: 'Kode'
    aktiv: Scalars['Boolean']['output']
    oid: Scalars['Int']['output']
    verdi?: Maybe<Scalars['String']['output']>
}

export type KontaktMedPasient = {
    __typename: 'KontaktMedPasient'
    begrunnelseIkkeKontakt?: Maybe<Scalars['String']['output']>
    kontaktDato?: Maybe<Scalars['String']['output']>
}

export type KontaktMedPasientValues = {
    begrunnelseIkkeKontakt?: InputMaybe<Scalars['String']['input']>
    kontaktDato?: InputMaybe<Scalars['Date']['input']>
}

export type LagreNasjonalOppgaveStatus = {
    __typename: 'LagreNasjonalOppgaveStatus'
    oppgaveId: Scalars['String']['output']
    status: LagreNasjonalOppgaveStatusEnum
}

export type LagreNasjonalOppgaveStatusEnum =
    | 'AVVIST'
    | 'FERDIGSTILT'
    | 'FINNES_IKKE'
    | 'IKKE_EN_SYKMELDING'
    | 'IKKE_FERDIGSTILT'
    | 'OPPDATERT'

export type LagreOppgaveResult = LagreNasjonalOppgaveStatus | ValidationResult

export type Matrikkeladresse = {
    __typename: 'Matrikkeladresse'
    bruksenhetsnummer?: Maybe<Scalars['String']['output']>
    postnummer?: Maybe<Scalars['String']['output']>
    poststed?: Maybe<Scalars['String']['output']>
    tilleggsnavn?: Maybe<Scalars['String']['output']>
}

export type MedisinskArsak = {
    __typename: 'MedisinskArsak'
    arsak: Array<MedisinskArsakType>
    beskrivelse?: Maybe<Scalars['String']['output']>
}

export type MedisinskArsakType =
    | 'AKTIVITET_FORHINDRER_BEDRING'
    | 'AKTIVITET_FORVERRER_TILSTAND'
    | 'ANNET'
    | 'TILSTAND_HINDRER_AKTIVITET'

export type MedisinskArsakValues = {
    arsak: Array<MedisinskArsakType>
    beskrivelse?: InputMaybe<Scalars['String']['input']>
}

export type MedisinskVurdering = {
    __typename: 'MedisinskVurdering'
    annenFraversArsak?: Maybe<AnnenFraversArsak>
    biDiagnoser: Array<DiagnoseSchema>
    hovedDiagnose?: Maybe<DiagnoseSchema>
    svangerskap: Scalars['Boolean']['output']
    yrkesskade: Scalars['Boolean']['output']
    yrkesskadeDato?: Maybe<Scalars['String']['output']>
}

export type MedisinskVurderingValues = {
    annenFraversArsak?: InputMaybe<AnnenFraversArsakValues>
    biDiagnoser: Array<DiagnoseValues>
    hovedDiagnose?: InputMaybe<DiagnoseValues>
    svangerskap: Scalars['Boolean']['input']
    yrkesskade: Scalars['Boolean']['input']
    yrkesskadeDato?: InputMaybe<Scalars['Date']['input']>
}

export type MeldingTilNav = {
    __typename: 'MeldingTilNAV'
    beskrivBistand?: Maybe<Scalars['String']['output']>
    bistandUmiddelbart: Scalars['Boolean']['output']
}

export type MeldingTilNavValues = {
    beskrivBistand?: InputMaybe<Scalars['String']['input']>
    bistandUmiddelbart: Scalars['Boolean']['input']
}

export type Mutation = {
    __typename: 'Mutation'
    avvis?: Maybe<DigitaliseringsoppgaveStatus>
    avvisNasjonalOppgave?: Maybe<LagreNasjonalOppgaveStatus>
    dokument?: Maybe<Document>
    lagre?: Maybe<DigitaliseringsoppgaveResult>
    lagreNasjonalOppgave?: Maybe<LagreOppgaveResult>
    oppdaterDigitalisertSykmelding?: Maybe<OppdatertSykmeldingStatus>
    oppgaveTilbakeTilGosys?: Maybe<DigitaliseringsoppgaveStatus>
    oppgaveTilbakeTilGosysNasjonal?: Maybe<LagreNasjonalOppgaveStatus>
    sykmeldingFraJournalpost: JournalpostStatus
}

export type MutationAvvisArgs = {
    avvisningsgrunn: Avvisingsgrunn
    avvisningsgrunnAnnet?: InputMaybe<Scalars['String']['input']>
    enhetId: Scalars['String']['input']
    oppgaveId: Scalars['String']['input']
}

export type MutationAvvisNasjonalOppgaveArgs = {
    avvisningsgrunn?: InputMaybe<Scalars['String']['input']>
    navEnhet: Scalars['String']['input']
    oppgaveId: Scalars['String']['input']
}

export type MutationDokumentArgs = {
    dokumentInfoId: Scalars['String']['input']
    oppgaveId: Scalars['String']['input']
    tittel: Scalars['String']['input']
}

export type MutationLagreArgs = {
    enhetId: Scalars['String']['input']
    oppgaveId: Scalars['String']['input']
    status: SykmeldingUnderArbeidStatus
    values: SykmeldingUnderArbeidValues
}

export type MutationLagreNasjonalOppgaveArgs = {
    navEnhet: Scalars['String']['input']
    oppgaveId: Scalars['String']['input']
    status?: InputMaybe<SykmeldingUnderArbeidStatus>
    sykmeldingValues: NasjonalSykmeldingValues
}

export type MutationOppdaterDigitalisertSykmeldingArgs = {
    enhetId: Scalars['String']['input']
    sykmeldingId: Scalars['String']['input']
    values: SykmeldingUnderArbeidValues
}

export type MutationOppgaveTilbakeTilGosysArgs = {
    navEnhet?: InputMaybe<Scalars['String']['input']>
    oppgaveId: Scalars['String']['input']
}

export type MutationOppgaveTilbakeTilGosysNasjonalArgs = {
    navEnhet?: InputMaybe<Scalars['String']['input']>
    oppgaveId: Scalars['String']['input']
}

export type MutationSykmeldingFraJournalpostArgs = {
    journalpostId: Scalars['String']['input']
    navEnhet?: InputMaybe<Scalars['String']['input']>
    norsk: Scalars['Boolean']['input']
}

export type NasjonalOppdatertSykmeldingStatusEnum =
    | 'AVVIST'
    | 'FERDIGSTILT'
    | 'FINNES_IKKE'
    | 'IKKE_EN_SYKMELDING'
    | 'IKKE_FERDIGSTILT'
    | 'OPPDATERT'

export type NasjonalOppgave = {
    __typename: 'NasjonalOppgave'
    documents: Array<Document>
    nasjonalSykmelding: NasjonalSykmelding
    oppgaveId: Scalars['String']['output']
}

export type NasjonalOppgaveResult = NasjonalOppgave | NasjonalOppgaveStatus

export type NasjonalOppgaveStatus = {
    __typename: 'NasjonalOppgaveStatus'
    oppgaveId: Scalars['String']['output']
    status: NasjonalOppgaveStatusEnum
}

export type NasjonalOppgaveStatusEnum =
    | 'AVVIST'
    | 'FERDIGSTILT'
    | 'FINNES_IKKE'
    | 'IKKE_EN_SYKMELDING'
    | 'IKKE_FERDIGSTILT'

export type NasjonalSykmelding = {
    __typename: 'NasjonalSykmelding'
    arbeidsgiver?: Maybe<Arbeidsgiver>
    behandler?: Maybe<Behandler>
    behandletTidspunkt?: Maybe<Scalars['Date']['output']>
    datoOpprettet?: Maybe<Scalars['String']['output']>
    fnr?: Maybe<Scalars['String']['output']>
    harUtdypendeOpplysninger?: Maybe<Scalars['Boolean']['output']>
    journalpostId: Scalars['String']['output']
    kontaktMedPasient?: Maybe<KontaktMedPasient>
    medisinskVurdering?: Maybe<MedisinskVurdering>
    meldingTilArbeidsgiver?: Maybe<Scalars['String']['output']>
    meldingTilNAV?: Maybe<MeldingTilNav>
    perioder: Array<Periode>
    skjermesForPasient?: Maybe<Scalars['Boolean']['output']>
    syketilfelleStartDato?: Maybe<Scalars['String']['output']>
    sykmeldingId?: Maybe<Scalars['String']['output']>
}

export type NasjonalSykmeldingResult = NasjonalOppgave | NasjonalSykmeldingStatus

export type NasjonalSykmeldingStatus = {
    __typename: 'NasjonalSykmeldingStatus'
    status: NasjonalOppdatertSykmeldingStatusEnum
    sykmeldingId: Scalars['String']['output']
}

export type NasjonalSykmeldingValues = {
    arbeidsgiver: ArbeidsgiverValues
    behandler: BehandlerValues
    behandletDato: Scalars['Date']['input']
    harUtdypendeOpplysninger: Scalars['Boolean']['input']
    kontaktMedPasient: KontaktMedPasientValues
    medisinskVurdering: MedisinskVurderingValues
    meldingTilArbeidsgiver?: InputMaybe<Scalars['String']['input']>
    meldingTilNAV?: InputMaybe<MeldingTilNavValues>
    pasientFnr: Scalars['String']['input']
    perioder: Array<PeriodeValues>
    skjermesForPasient: Scalars['Boolean']['input']
    sykmelderFnr: Scalars['String']['input']
}

export type Navn = {
    __typename: 'Navn'
    etternavn: Scalars['String']['output']
    fornavn: Scalars['String']['output']
    mellomnavn?: Maybe<Scalars['String']['output']>
}

export type OppdatertSykmeldingStatus = {
    __typename: 'OppdatertSykmeldingStatus'
    status?: Maybe<OppdatertSykmeldingStatusEnum>
    sykmeldingId: Scalars['String']['output']
}

export type OppdatertSykmeldingStatusEnum =
    | 'AVVIST'
    | 'FERDIGSTILT'
    | 'FINNES_IKKE'
    | 'IKKE_EN_SYKMELDING'
    | 'IKKE_FERDIGSTILT'
    | 'OPPDATERT'

export type OppgaveValues = {
    __typename: 'OppgaveValues'
    behandletTidspunkt?: Maybe<Scalars['DateTime']['output']>
    biDiagnoser?: Maybe<Array<DiagnoseValue>>
    /** Adressen er oppholds-, post- eller kontaktadresse i utlandet */
    erAdresseUtland?: Maybe<Scalars['Boolean']['output']>
    fnrPasient: Scalars['String']['output']
    folkeRegistertAdresseErBrakkeEllerTilsvarende?: Maybe<Scalars['Boolean']['output']>
    hoveddiagnose?: Maybe<DiagnoseValue>
    perioder?: Maybe<Array<PeriodeValue>>
    skrevetLand?: Maybe<Scalars['String']['output']>
}

export type OppholdAnnetSted = {
    __typename: 'OppholdAnnetSted'
    type?: Maybe<Scalars['String']['output']>
}

export type Oppholdsadresse = Matrikkeladresse | OppholdAnnetSted | UtenlandskAdresse | Vegadresse

export type Periode = {
    __typename: 'Periode'
    aktivitetIkkeMulig?: Maybe<AktivitetIkkeMulig>
    avventendeInnspillTilArbeidsgiver?: Maybe<Scalars['String']['output']>
    behandlingsdager?: Maybe<Scalars['Int']['output']>
    fom: Scalars['Date']['output']
    gradert?: Maybe<Gradert>
    reisetilskudd?: Maybe<Scalars['Boolean']['output']>
    tom: Scalars['Date']['output']
}

export type PeriodeInput = {
    fom: Scalars['Date']['input']
    grad?: InputMaybe<Scalars['Int']['input']>
    tom: Scalars['Date']['input']
    type: PeriodeType
}

export type PeriodeType = 'AKTIVITET_IKKE_MULIG' | 'GRADERT'

export type PeriodeValue = {
    __typename: 'PeriodeValue'
    fom: Scalars['Date']['output']
    grad?: Maybe<Scalars['Int']['output']>
    tom: Scalars['Date']['output']
    type: PeriodeType
}

export type PeriodeValues = {
    aktivitetIkkeMulig?: InputMaybe<AktivitetIkkeMuligValues>
    avventendeInnspillTilArbeidsgiver?: InputMaybe<Scalars['String']['input']>
    behandlingsdager?: InputMaybe<Scalars['Int']['input']>
    fom: Scalars['Date']['input']
    gradert?: InputMaybe<GradertValues>
    reisetilskudd?: InputMaybe<Scalars['Boolean']['input']>
    tom: Scalars['Date']['input']
}

export type Person = {
    __typename: 'Person'
    bostedsadresse?: Maybe<Bostedsadresse>
    navn?: Maybe<Scalars['String']['output']>
    oppholdsadresse?: Maybe<Oppholdsadresse>
}

export type Query = {
    __typename: 'Query'
    _service: _Service
    digitalisertSykmelding?: Maybe<DigitalisertSykmeldingResult>
    journalpost: JournalpostResult
    nasjonalFerdigstiltOppgave?: Maybe<NasjonalSykmeldingResult>
    nasjonalOppgave?: Maybe<NasjonalOppgaveResult>
    oppgave?: Maybe<DigitaliseringsoppgaveResult>
    pasientNavn?: Maybe<Navn>
    sykmelder?: Maybe<Sykmelder>
}

export type QueryDigitalisertSykmeldingArgs = {
    sykmeldingId: Scalars['String']['input']
}

export type QueryJournalpostArgs = {
    id: Scalars['String']['input']
}

export type QueryNasjonalFerdigstiltOppgaveArgs = {
    sykmeldingId: Scalars['String']['input']
}

export type QueryNasjonalOppgaveArgs = {
    oppgaveId: Scalars['String']['input']
}

export type QueryOppgaveArgs = {
    oppgaveId: Scalars['String']['input']
}

export type QuerySykmelderArgs = {
    hprNummer: Scalars['String']['input']
}

export type RuleInfo = {
    __typename: 'RuleInfo'
    messageForSender: Scalars['String']['output']
    messageForUser: Scalars['String']['output']
    ruleName: Scalars['String']['output']
    ruleStatus: Status
}

export type Status = 'INVALID' | 'MANUAL_PROCESSING' | 'OK'

export type Sykmelder = {
    __typename: 'Sykmelder'
    aktorId?: Maybe<Scalars['String']['output']>
    etternavn?: Maybe<Scalars['String']['output']>
    fnr?: Maybe<Scalars['String']['output']>
    fornavn?: Maybe<Scalars['String']['output']>
    godkjenninger?: Maybe<Array<Godkjenning>>
    hprNummer?: Maybe<Scalars['String']['output']>
    mellomnavn?: Maybe<Scalars['String']['output']>
}

export type SykmeldingStatus = {
    __typename: 'SykmeldingStatus'
    oppgaveId: Scalars['String']['output']
    status: DigitaliseringsoppgaveStatusEnum
}

export type SykmeldingUnderArbeidStatus = 'FERDIGSTILT' | 'UNDER_ARBEID'

export type SykmeldingUnderArbeidValues = {
    behandletTidspunkt?: InputMaybe<Scalars['Date']['input']>
    biDiagnoser?: InputMaybe<Array<DiagnoseInput>>
    /** Adressen er oppholds-, post- eller kontaktadresse i utlandet */
    erAdresseUtland?: InputMaybe<Scalars['Boolean']['input']>
    fnrPasient: Scalars['String']['input']
    folkeRegistertAdresseErBrakkeEllerTilsvarende?: InputMaybe<Scalars['Boolean']['input']>
    hovedDiagnose?: InputMaybe<DiagnoseInput>
    perioder?: InputMaybe<Array<PeriodeInput>>
    skrevetLand?: InputMaybe<Scalars['String']['input']>
}

export type SykmeldingsType = 'INNENLANDS' | 'UTENLANDS'

export type UkjentBosted = {
    __typename: 'UkjentBosted'
    bostedskommune?: Maybe<Scalars['String']['output']>
}

export type UtenlandskAdresse = {
    __typename: 'UtenlandskAdresse'
    adressenavnNummer?: Maybe<Scalars['String']['output']>
    bySted?: Maybe<Scalars['String']['output']>
    landkode: Scalars['String']['output']
    postboksNummerNavn?: Maybe<Scalars['String']['output']>
    postkode?: Maybe<Scalars['String']['output']>
}

export type ValidationResult = {
    __typename: 'ValidationResult'
    ruleHits: Array<RuleInfo>
    status: Status
}

export type Vegadresse = {
    __typename: 'Vegadresse'
    adressenavn?: Maybe<Scalars['String']['output']>
    husbokstav?: Maybe<Scalars['String']['output']>
    husnummer?: Maybe<Scalars['String']['output']>
    postnummer?: Maybe<Scalars['String']['output']>
    poststed?: Maybe<Scalars['String']['output']>
}

export type _Service = {
    __typename: '_Service'
    sdl: Scalars['String']['output']
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<
    TResult,
    TParent = Record<PropertyKey, never>,
    TContext = Record<PropertyKey, never>,
    TArgs = Record<PropertyKey, never>,
> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
    resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
    | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
    | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
    TResult,
    TKey extends string,
    TParent = Record<PropertyKey, never>,
    TContext = Record<PropertyKey, never>,
    TArgs = Record<PropertyKey, never>,
> =
    | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
    | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
    parent: TParent,
    context: TContext,
    info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
    obj: T,
    context: TContext,
    info: GraphQLResolveInfo,
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
    TResult = Record<PropertyKey, never>,
    TParent = Record<PropertyKey, never>,
    TContext = Record<PropertyKey, never>,
    TArgs = Record<PropertyKey, never>,
> = (
    next: NextResolverFn<TResult>,
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
    Bostedsadresse: Matrikkeladresse | UkjentBosted | UtenlandskAdresse | Vegadresse
    DigitaliseringsoppgaveResult:
        | (Omit<Digitaliseringsoppgave, 'person'> & { person: _RefType['Person'] })
        | DigitaliseringsoppgaveStatus
    DigitalisertSykmeldingResult:
        | (Omit<DigitalisertSykmelding, 'person'> & { person: _RefType['Person'] })
        | OppdatertSykmeldingStatus
    JournalpostResult: Journalpost | JournalpostStatus
    LagreOppgaveResult: LagreNasjonalOppgaveStatus | ValidationResult
    NasjonalOppgaveResult: NasjonalOppgave | NasjonalOppgaveStatus
    NasjonalSykmeldingResult: NasjonalOppgave | NasjonalSykmeldingStatus
    Oppholdsadresse: Matrikkeladresse | OppholdAnnetSted | UtenlandskAdresse | Vegadresse
}

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
    AktivitetIkkeMulig: ResolverTypeWrapper<AktivitetIkkeMulig>
    AktivitetIkkeMuligValues: AktivitetIkkeMuligValues
    AnnenFraversArsak: ResolverTypeWrapper<AnnenFraversArsak>
    AnnenFraversArsakGrunn: AnnenFraversArsakGrunn
    AnnenFraversArsakValues: AnnenFraversArsakValues
    Arbeidsgiver: ResolverTypeWrapper<Arbeidsgiver>
    ArbeidsgiverValues: ArbeidsgiverValues
    ArbeidsrelatertArsak: ResolverTypeWrapper<ArbeidsrelatertArsak>
    ArbeidsrelatertArsakType: ArbeidsrelatertArsakType
    ArbeidsrelatertArsakValues: ArbeidsrelatertArsakValues
    Avvisingsgrunn: Avvisingsgrunn
    Behandler: ResolverTypeWrapper<Behandler>
    BehandlerValues: BehandlerValues
    Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>
    Bostedsadresse: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['Bostedsadresse']>
    Date: ResolverTypeWrapper<Scalars['Date']['output']>
    DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>
    DiagnoseInput: DiagnoseInput
    DiagnoseSchema: ResolverTypeWrapper<DiagnoseSchema>
    DiagnoseValue: ResolverTypeWrapper<DiagnoseValue>
    DiagnoseValues: DiagnoseValues
    Digitaliseringsoppgave: ResolverTypeWrapper<
        Omit<Digitaliseringsoppgave, 'person'> & { person: ResolversTypes['Person'] }
    >
    DigitaliseringsoppgaveResult: ResolverTypeWrapper<
        ResolversUnionTypes<ResolversTypes>['DigitaliseringsoppgaveResult']
    >
    DigitaliseringsoppgaveStatus: ResolverTypeWrapper<DigitaliseringsoppgaveStatus>
    DigitaliseringsoppgaveStatusEnum: DigitaliseringsoppgaveStatusEnum
    DigitalisertSykmelding: ResolverTypeWrapper<
        Omit<DigitalisertSykmelding, 'person'> & { person: ResolversTypes['Person'] }
    >
    DigitalisertSykmeldingResult: ResolverTypeWrapper<
        ResolversUnionTypes<ResolversTypes>['DigitalisertSykmeldingResult']
    >
    Document: ResolverTypeWrapper<Document>
    ErrorDetail: ErrorDetail
    ErrorType: ErrorType
    Godkjenning: ResolverTypeWrapper<Godkjenning>
    Gradert: ResolverTypeWrapper<Gradert>
    GradertValues: GradertValues
    HarArbeidsgiver: HarArbeidsgiver
    HarArbeidsgiverInfo: HarArbeidsgiverInfo
    Int: ResolverTypeWrapper<Scalars['Int']['output']>
    Journalpost: ResolverTypeWrapper<Journalpost>
    JournalpostResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['JournalpostResult']>
    JournalpostStatus: ResolverTypeWrapper<JournalpostStatus>
    JournalpostStatusEnum: JournalpostStatusEnum
    Kode: ResolverTypeWrapper<Kode>
    KontaktMedPasient: ResolverTypeWrapper<KontaktMedPasient>
    KontaktMedPasientValues: KontaktMedPasientValues
    LagreNasjonalOppgaveStatus: ResolverTypeWrapper<LagreNasjonalOppgaveStatus>
    LagreNasjonalOppgaveStatusEnum: LagreNasjonalOppgaveStatusEnum
    LagreOppgaveResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['LagreOppgaveResult']>
    Matrikkeladresse: ResolverTypeWrapper<Matrikkeladresse>
    MedisinskArsak: ResolverTypeWrapper<MedisinskArsak>
    MedisinskArsakType: MedisinskArsakType
    MedisinskArsakValues: MedisinskArsakValues
    MedisinskVurdering: ResolverTypeWrapper<MedisinskVurdering>
    MedisinskVurderingValues: MedisinskVurderingValues
    MeldingTilNAV: ResolverTypeWrapper<MeldingTilNav>
    MeldingTilNAVValues: MeldingTilNavValues
    Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>
    NasjonalOppdatertSykmeldingStatusEnum: NasjonalOppdatertSykmeldingStatusEnum
    NasjonalOppgave: ResolverTypeWrapper<NasjonalOppgave>
    NasjonalOppgaveResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['NasjonalOppgaveResult']>
    NasjonalOppgaveStatus: ResolverTypeWrapper<NasjonalOppgaveStatus>
    NasjonalOppgaveStatusEnum: NasjonalOppgaveStatusEnum
    NasjonalSykmelding: ResolverTypeWrapper<NasjonalSykmelding>
    NasjonalSykmeldingResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['NasjonalSykmeldingResult']>
    NasjonalSykmeldingStatus: ResolverTypeWrapper<NasjonalSykmeldingStatus>
    NasjonalSykmeldingValues: NasjonalSykmeldingValues
    Navn: ResolverTypeWrapper<Navn>
    OppdatertSykmeldingStatus: ResolverTypeWrapper<OppdatertSykmeldingStatus>
    OppdatertSykmeldingStatusEnum: OppdatertSykmeldingStatusEnum
    OppgaveValues: ResolverTypeWrapper<OppgaveValues>
    OppholdAnnetSted: ResolverTypeWrapper<OppholdAnnetSted>
    Oppholdsadresse: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['Oppholdsadresse']>
    Periode: ResolverTypeWrapper<Periode>
    PeriodeInput: PeriodeInput
    PeriodeType: PeriodeType
    PeriodeValue: ResolverTypeWrapper<PeriodeValue>
    PeriodeValues: PeriodeValues
    Person: ResolverTypeWrapper<
        Omit<Person, 'bostedsadresse' | 'oppholdsadresse'> & {
            bostedsadresse?: Maybe<ResolversTypes['Bostedsadresse']>
            oppholdsadresse?: Maybe<ResolversTypes['Oppholdsadresse']>
        }
    >
    Query: ResolverTypeWrapper<Record<PropertyKey, never>>
    RuleInfo: ResolverTypeWrapper<RuleInfo>
    Status: Status
    String: ResolverTypeWrapper<Scalars['String']['output']>
    Sykmelder: ResolverTypeWrapper<Sykmelder>
    SykmeldingStatus: ResolverTypeWrapper<SykmeldingStatus>
    SykmeldingUnderArbeidStatus: SykmeldingUnderArbeidStatus
    SykmeldingUnderArbeidValues: SykmeldingUnderArbeidValues
    SykmeldingsType: SykmeldingsType
    UUID: ResolverTypeWrapper<Scalars['UUID']['output']>
    UkjentBosted: ResolverTypeWrapper<UkjentBosted>
    UtenlandskAdresse: ResolverTypeWrapper<UtenlandskAdresse>
    ValidationResult: ResolverTypeWrapper<ValidationResult>
    Vegadresse: ResolverTypeWrapper<Vegadresse>
    _FieldSet: ResolverTypeWrapper<Scalars['_FieldSet']['output']>
    _Service: ResolverTypeWrapper<_Service>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
    AktivitetIkkeMulig: AktivitetIkkeMulig
    AktivitetIkkeMuligValues: AktivitetIkkeMuligValues
    AnnenFraversArsak: AnnenFraversArsak
    AnnenFraversArsakValues: AnnenFraversArsakValues
    Arbeidsgiver: Arbeidsgiver
    ArbeidsgiverValues: ArbeidsgiverValues
    ArbeidsrelatertArsak: ArbeidsrelatertArsak
    ArbeidsrelatertArsakValues: ArbeidsrelatertArsakValues
    Behandler: Behandler
    BehandlerValues: BehandlerValues
    Boolean: Scalars['Boolean']['output']
    Bostedsadresse: ResolversUnionTypes<ResolversParentTypes>['Bostedsadresse']
    Date: Scalars['Date']['output']
    DateTime: Scalars['DateTime']['output']
    DiagnoseInput: DiagnoseInput
    DiagnoseSchema: DiagnoseSchema
    DiagnoseValue: DiagnoseValue
    DiagnoseValues: DiagnoseValues
    Digitaliseringsoppgave: Omit<Digitaliseringsoppgave, 'person'> & { person: ResolversParentTypes['Person'] }
    DigitaliseringsoppgaveResult: ResolversUnionTypes<ResolversParentTypes>['DigitaliseringsoppgaveResult']
    DigitaliseringsoppgaveStatus: DigitaliseringsoppgaveStatus
    DigitalisertSykmelding: Omit<DigitalisertSykmelding, 'person'> & { person: ResolversParentTypes['Person'] }
    DigitalisertSykmeldingResult: ResolversUnionTypes<ResolversParentTypes>['DigitalisertSykmeldingResult']
    Document: Document
    Godkjenning: Godkjenning
    Gradert: Gradert
    GradertValues: GradertValues
    HarArbeidsgiverInfo: HarArbeidsgiverInfo
    Int: Scalars['Int']['output']
    Journalpost: Journalpost
    JournalpostResult: ResolversUnionTypes<ResolversParentTypes>['JournalpostResult']
    JournalpostStatus: JournalpostStatus
    Kode: Kode
    KontaktMedPasient: KontaktMedPasient
    KontaktMedPasientValues: KontaktMedPasientValues
    LagreNasjonalOppgaveStatus: LagreNasjonalOppgaveStatus
    LagreOppgaveResult: ResolversUnionTypes<ResolversParentTypes>['LagreOppgaveResult']
    Matrikkeladresse: Matrikkeladresse
    MedisinskArsak: MedisinskArsak
    MedisinskArsakValues: MedisinskArsakValues
    MedisinskVurdering: MedisinskVurdering
    MedisinskVurderingValues: MedisinskVurderingValues
    MeldingTilNAV: MeldingTilNav
    MeldingTilNAVValues: MeldingTilNavValues
    Mutation: Record<PropertyKey, never>
    NasjonalOppgave: NasjonalOppgave
    NasjonalOppgaveResult: ResolversUnionTypes<ResolversParentTypes>['NasjonalOppgaveResult']
    NasjonalOppgaveStatus: NasjonalOppgaveStatus
    NasjonalSykmelding: NasjonalSykmelding
    NasjonalSykmeldingResult: ResolversUnionTypes<ResolversParentTypes>['NasjonalSykmeldingResult']
    NasjonalSykmeldingStatus: NasjonalSykmeldingStatus
    NasjonalSykmeldingValues: NasjonalSykmeldingValues
    Navn: Navn
    OppdatertSykmeldingStatus: OppdatertSykmeldingStatus
    OppgaveValues: OppgaveValues
    OppholdAnnetSted: OppholdAnnetSted
    Oppholdsadresse: ResolversUnionTypes<ResolversParentTypes>['Oppholdsadresse']
    Periode: Periode
    PeriodeInput: PeriodeInput
    PeriodeValue: PeriodeValue
    PeriodeValues: PeriodeValues
    Person: Omit<Person, 'bostedsadresse' | 'oppholdsadresse'> & {
        bostedsadresse?: Maybe<ResolversParentTypes['Bostedsadresse']>
        oppholdsadresse?: Maybe<ResolversParentTypes['Oppholdsadresse']>
    }
    Query: Record<PropertyKey, never>
    RuleInfo: RuleInfo
    String: Scalars['String']['output']
    Sykmelder: Sykmelder
    SykmeldingStatus: SykmeldingStatus
    SykmeldingUnderArbeidValues: SykmeldingUnderArbeidValues
    UUID: Scalars['UUID']['output']
    UkjentBosted: UkjentBosted
    UtenlandskAdresse: UtenlandskAdresse
    ValidationResult: ValidationResult
    Vegadresse: Vegadresse
    _FieldSet: Scalars['_FieldSet']['output']
    _Service: _Service
}

export type ExtendsDirectiveArgs = {}

export type ExtendsDirectiveResolver<
    Result,
    Parent,
    ContextType = any,
    Args = ExtendsDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type ExternalDirectiveArgs = {}

export type ExternalDirectiveResolver<
    Result,
    Parent,
    ContextType = any,
    Args = ExternalDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type KeyDirectiveArgs = {
    fields: Scalars['_FieldSet']['input']
}

export type KeyDirectiveResolver<Result, Parent, ContextType = any, Args = KeyDirectiveArgs> = DirectiveResolverFn<
    Result,
    Parent,
    ContextType,
    Args
>

export type ProvidesDirectiveArgs = {
    fields: Scalars['_FieldSet']['input']
}

export type ProvidesDirectiveResolver<
    Result,
    Parent,
    ContextType = any,
    Args = ProvidesDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type RequiresDirectiveArgs = {
    fields: Scalars['_FieldSet']['input']
}

export type RequiresDirectiveResolver<
    Result,
    Parent,
    ContextType = any,
    Args = RequiresDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type AktivitetIkkeMuligResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['AktivitetIkkeMulig'] = ResolversParentTypes['AktivitetIkkeMulig'],
> = {
    arbeidsrelatertArsak?: Resolver<Maybe<ResolversTypes['ArbeidsrelatertArsak']>, ParentType, ContextType>
    medisinskArsak?: Resolver<Maybe<ResolversTypes['MedisinskArsak']>, ParentType, ContextType>
}

export type AnnenFraversArsakResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['AnnenFraversArsak'] = ResolversParentTypes['AnnenFraversArsak'],
> = {
    beskrivelse?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    grunn?: Resolver<Maybe<Array<ResolversTypes['AnnenFraversArsakGrunn']>>, ParentType, ContextType>
}

export type ArbeidsgiverResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Arbeidsgiver'] = ResolversParentTypes['Arbeidsgiver'],
> = {
    harArbeidsgiver?: Resolver<Maybe<ResolversTypes['HarArbeidsgiver']>, ParentType, ContextType>
    navn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    stillingsprosent?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
    yrkesbetegnelse?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type ArbeidsrelatertArsakResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['ArbeidsrelatertArsak'] = ResolversParentTypes['ArbeidsrelatertArsak'],
> = {
    arsak?: Resolver<Array<ResolversTypes['ArbeidsrelatertArsakType']>, ParentType, ContextType>
    beskrivelse?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type BehandlerResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Behandler'] = ResolversParentTypes['Behandler'],
> = {
    etternavn?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    fnr?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    fornavn?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    hpr?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    mellomnavn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    tlf?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type BostedsadresseResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Bostedsadresse'] = ResolversParentTypes['Bostedsadresse'],
> = {
    __resolveType: TypeResolveFn<
        'Matrikkeladresse' | 'UkjentBosted' | 'UtenlandskAdresse' | 'Vegadresse',
        ParentType,
        ContextType
    >
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
    name: 'Date'
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
    name: 'DateTime'
}

export type DiagnoseSchemaResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['DiagnoseSchema'] = ResolversParentTypes['DiagnoseSchema'],
> = {
    kode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    system?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    tekst?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type DiagnoseValueResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['DiagnoseValue'] = ResolversParentTypes['DiagnoseValue'],
> = {
    kode?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    system?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    tekst?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type DigitaliseringsoppgaveResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Digitaliseringsoppgave'] = ResolversParentTypes['Digitaliseringsoppgave'],
> = {
    documents?: Resolver<Array<ResolversTypes['Document']>, ParentType, ContextType>
    oppgaveId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    person?: Resolver<ResolversTypes['Person'], ParentType, ContextType>
    type?: Resolver<ResolversTypes['SykmeldingsType'], ParentType, ContextType>
    values?: Resolver<ResolversTypes['OppgaveValues'], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DigitaliseringsoppgaveResultResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['DigitaliseringsoppgaveResult'] = ResolversParentTypes['DigitaliseringsoppgaveResult'],
> = {
    __resolveType: TypeResolveFn<'Digitaliseringsoppgave' | 'DigitaliseringsoppgaveStatus', ParentType, ContextType>
}

export type DigitaliseringsoppgaveStatusResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['DigitaliseringsoppgaveStatus'] = ResolversParentTypes['DigitaliseringsoppgaveStatus'],
> = {
    oppgaveId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    status?: Resolver<ResolversTypes['DigitaliseringsoppgaveStatusEnum'], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DigitalisertSykmeldingResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['DigitalisertSykmelding'] = ResolversParentTypes['DigitalisertSykmelding'],
> = {
    documents?: Resolver<Array<ResolversTypes['Document']>, ParentType, ContextType>
    oppgaveId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    person?: Resolver<ResolversTypes['Person'], ParentType, ContextType>
    sykmeldingId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    type?: Resolver<ResolversTypes['SykmeldingsType'], ParentType, ContextType>
    values?: Resolver<ResolversTypes['OppgaveValues'], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type DigitalisertSykmeldingResultResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['DigitalisertSykmeldingResult'] = ResolversParentTypes['DigitalisertSykmeldingResult'],
> = {
    __resolveType: TypeResolveFn<'DigitalisertSykmelding' | 'OppdatertSykmeldingStatus', ParentType, ContextType>
}

export type DocumentResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Document'] = ResolversParentTypes['Document'],
> = {
    dokumentInfoId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    tittel?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export type GodkjenningResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Godkjenning'] = ResolversParentTypes['Godkjenning'],
> = {
    autorisasjon?: Resolver<Maybe<ResolversTypes['Kode']>, ParentType, ContextType>
    helsepersonellkategori?: Resolver<Maybe<ResolversTypes['Kode']>, ParentType, ContextType>
}

export type GradertResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Gradert'] = ResolversParentTypes['Gradert'],
> = {
    grad?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
    reisetilskudd?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
}

export type JournalpostResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Journalpost'] = ResolversParentTypes['Journalpost'],
> = {
    dokumenter?: Resolver<Array<ResolversTypes['Document']>, ParentType, ContextType>
    fnr?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    journalpostId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    journalstatus?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type JournalpostResultResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['JournalpostResult'] = ResolversParentTypes['JournalpostResult'],
> = {
    __resolveType: TypeResolveFn<'Journalpost' | 'JournalpostStatus', ParentType, ContextType>
}

export type JournalpostStatusResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['JournalpostStatus'] = ResolversParentTypes['JournalpostStatus'],
> = {
    journalpostId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    oppgaveId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    status?: Resolver<ResolversTypes['JournalpostStatusEnum'], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type KodeResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Kode'] = ResolversParentTypes['Kode'],
> = {
    aktiv?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
    oid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
    verdi?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type KontaktMedPasientResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['KontaktMedPasient'] = ResolversParentTypes['KontaktMedPasient'],
> = {
    begrunnelseIkkeKontakt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    kontaktDato?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type LagreNasjonalOppgaveStatusResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['LagreNasjonalOppgaveStatus'] = ResolversParentTypes['LagreNasjonalOppgaveStatus'],
> = {
    oppgaveId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    status?: Resolver<ResolversTypes['LagreNasjonalOppgaveStatusEnum'], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type LagreOppgaveResultResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['LagreOppgaveResult'] = ResolversParentTypes['LagreOppgaveResult'],
> = {
    __resolveType: TypeResolveFn<'LagreNasjonalOppgaveStatus' | 'ValidationResult', ParentType, ContextType>
}

export type MatrikkeladresseResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Matrikkeladresse'] = ResolversParentTypes['Matrikkeladresse'],
> = {
    bruksenhetsnummer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    postnummer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    poststed?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    tilleggsnavn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MedisinskArsakResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['MedisinskArsak'] = ResolversParentTypes['MedisinskArsak'],
> = {
    arsak?: Resolver<Array<ResolversTypes['MedisinskArsakType']>, ParentType, ContextType>
    beskrivelse?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type MedisinskVurderingResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['MedisinskVurdering'] = ResolversParentTypes['MedisinskVurdering'],
> = {
    annenFraversArsak?: Resolver<Maybe<ResolversTypes['AnnenFraversArsak']>, ParentType, ContextType>
    biDiagnoser?: Resolver<Array<ResolversTypes['DiagnoseSchema']>, ParentType, ContextType>
    hovedDiagnose?: Resolver<Maybe<ResolversTypes['DiagnoseSchema']>, ParentType, ContextType>
    svangerskap?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
    yrkesskade?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
    yrkesskadeDato?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type MeldingTilNavResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['MeldingTilNAV'] = ResolversParentTypes['MeldingTilNAV'],
> = {
    beskrivBistand?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    bistandUmiddelbart?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
}

export type MutationResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
    avvis?: Resolver<
        Maybe<ResolversTypes['DigitaliseringsoppgaveStatus']>,
        ParentType,
        ContextType,
        RequireFields<MutationAvvisArgs, 'avvisningsgrunn' | 'enhetId' | 'oppgaveId'>
    >
    avvisNasjonalOppgave?: Resolver<
        Maybe<ResolversTypes['LagreNasjonalOppgaveStatus']>,
        ParentType,
        ContextType,
        RequireFields<MutationAvvisNasjonalOppgaveArgs, 'navEnhet' | 'oppgaveId'>
    >
    dokument?: Resolver<
        Maybe<ResolversTypes['Document']>,
        ParentType,
        ContextType,
        RequireFields<MutationDokumentArgs, 'dokumentInfoId' | 'oppgaveId' | 'tittel'>
    >
    lagre?: Resolver<
        Maybe<ResolversTypes['DigitaliseringsoppgaveResult']>,
        ParentType,
        ContextType,
        RequireFields<MutationLagreArgs, 'enhetId' | 'oppgaveId' | 'status' | 'values'>
    >
    lagreNasjonalOppgave?: Resolver<
        Maybe<ResolversTypes['LagreOppgaveResult']>,
        ParentType,
        ContextType,
        RequireFields<MutationLagreNasjonalOppgaveArgs, 'navEnhet' | 'oppgaveId' | 'sykmeldingValues'>
    >
    oppdaterDigitalisertSykmelding?: Resolver<
        Maybe<ResolversTypes['OppdatertSykmeldingStatus']>,
        ParentType,
        ContextType,
        RequireFields<MutationOppdaterDigitalisertSykmeldingArgs, 'enhetId' | 'sykmeldingId' | 'values'>
    >
    oppgaveTilbakeTilGosys?: Resolver<
        Maybe<ResolversTypes['DigitaliseringsoppgaveStatus']>,
        ParentType,
        ContextType,
        RequireFields<MutationOppgaveTilbakeTilGosysArgs, 'oppgaveId'>
    >
    oppgaveTilbakeTilGosysNasjonal?: Resolver<
        Maybe<ResolversTypes['LagreNasjonalOppgaveStatus']>,
        ParentType,
        ContextType,
        RequireFields<MutationOppgaveTilbakeTilGosysNasjonalArgs, 'oppgaveId'>
    >
    sykmeldingFraJournalpost?: Resolver<
        ResolversTypes['JournalpostStatus'],
        ParentType,
        ContextType,
        RequireFields<MutationSykmeldingFraJournalpostArgs, 'journalpostId' | 'norsk'>
    >
}

export type NasjonalOppgaveResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['NasjonalOppgave'] = ResolversParentTypes['NasjonalOppgave'],
> = {
    documents?: Resolver<Array<ResolversTypes['Document']>, ParentType, ContextType>
    nasjonalSykmelding?: Resolver<ResolversTypes['NasjonalSykmelding'], ParentType, ContextType>
    oppgaveId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type NasjonalOppgaveResultResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['NasjonalOppgaveResult'] = ResolversParentTypes['NasjonalOppgaveResult'],
> = {
    __resolveType: TypeResolveFn<'NasjonalOppgave' | 'NasjonalOppgaveStatus', ParentType, ContextType>
}

export type NasjonalOppgaveStatusResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['NasjonalOppgaveStatus'] = ResolversParentTypes['NasjonalOppgaveStatus'],
> = {
    oppgaveId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    status?: Resolver<ResolversTypes['NasjonalOppgaveStatusEnum'], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type NasjonalSykmeldingResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['NasjonalSykmelding'] = ResolversParentTypes['NasjonalSykmelding'],
> = {
    arbeidsgiver?: Resolver<Maybe<ResolversTypes['Arbeidsgiver']>, ParentType, ContextType>
    behandler?: Resolver<Maybe<ResolversTypes['Behandler']>, ParentType, ContextType>
    behandletTidspunkt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>
    datoOpprettet?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    fnr?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    harUtdypendeOpplysninger?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
    journalpostId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    kontaktMedPasient?: Resolver<Maybe<ResolversTypes['KontaktMedPasient']>, ParentType, ContextType>
    medisinskVurdering?: Resolver<Maybe<ResolversTypes['MedisinskVurdering']>, ParentType, ContextType>
    meldingTilArbeidsgiver?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    meldingTilNAV?: Resolver<Maybe<ResolversTypes['MeldingTilNAV']>, ParentType, ContextType>
    perioder?: Resolver<Array<ResolversTypes['Periode']>, ParentType, ContextType>
    skjermesForPasient?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
    syketilfelleStartDato?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    sykmeldingId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type NasjonalSykmeldingResultResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['NasjonalSykmeldingResult'] = ResolversParentTypes['NasjonalSykmeldingResult'],
> = {
    __resolveType: TypeResolveFn<'NasjonalOppgave' | 'NasjonalSykmeldingStatus', ParentType, ContextType>
}

export type NasjonalSykmeldingStatusResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['NasjonalSykmeldingStatus'] = ResolversParentTypes['NasjonalSykmeldingStatus'],
> = {
    status?: Resolver<ResolversTypes['NasjonalOppdatertSykmeldingStatusEnum'], ParentType, ContextType>
    sykmeldingId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type NavnResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Navn'] = ResolversParentTypes['Navn'],
> = {
    etternavn?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    fornavn?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    mellomnavn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type OppdatertSykmeldingStatusResolvers<
    ContextType = any,
    ParentType extends
        ResolversParentTypes['OppdatertSykmeldingStatus'] = ResolversParentTypes['OppdatertSykmeldingStatus'],
> = {
    status?: Resolver<Maybe<ResolversTypes['OppdatertSykmeldingStatusEnum']>, ParentType, ContextType>
    sykmeldingId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type OppgaveValuesResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['OppgaveValues'] = ResolversParentTypes['OppgaveValues'],
> = {
    behandletTidspunkt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>
    biDiagnoser?: Resolver<Maybe<Array<ResolversTypes['DiagnoseValue']>>, ParentType, ContextType>
    erAdresseUtland?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
    fnrPasient?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    folkeRegistertAdresseErBrakkeEllerTilsvarende?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
    hoveddiagnose?: Resolver<Maybe<ResolversTypes['DiagnoseValue']>, ParentType, ContextType>
    perioder?: Resolver<Maybe<Array<ResolversTypes['PeriodeValue']>>, ParentType, ContextType>
    skrevetLand?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type OppholdAnnetStedResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['OppholdAnnetSted'] = ResolversParentTypes['OppholdAnnetSted'],
> = {
    type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type OppholdsadresseResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Oppholdsadresse'] = ResolversParentTypes['Oppholdsadresse'],
> = {
    __resolveType: TypeResolveFn<
        'Matrikkeladresse' | 'OppholdAnnetSted' | 'UtenlandskAdresse' | 'Vegadresse',
        ParentType,
        ContextType
    >
}

export type PeriodeResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Periode'] = ResolversParentTypes['Periode'],
> = {
    aktivitetIkkeMulig?: Resolver<Maybe<ResolversTypes['AktivitetIkkeMulig']>, ParentType, ContextType>
    avventendeInnspillTilArbeidsgiver?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    behandlingsdager?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
    fom?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
    gradert?: Resolver<Maybe<ResolversTypes['Gradert']>, ParentType, ContextType>
    reisetilskudd?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
    tom?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
}

export type PeriodeValueResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['PeriodeValue'] = ResolversParentTypes['PeriodeValue'],
> = {
    fom?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
    grad?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
    tom?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
    type?: Resolver<ResolversTypes['PeriodeType'], ParentType, ContextType>
}

export type PersonResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Person'] = ResolversParentTypes['Person'],
> = {
    bostedsadresse?: Resolver<Maybe<ResolversTypes['Bostedsadresse']>, ParentType, ContextType>
    navn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    oppholdsadresse?: Resolver<Maybe<ResolversTypes['Oppholdsadresse']>, ParentType, ContextType>
}

export type QueryResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
    _service?: Resolver<ResolversTypes['_Service'], ParentType, ContextType>
    digitalisertSykmelding?: Resolver<
        Maybe<ResolversTypes['DigitalisertSykmeldingResult']>,
        ParentType,
        ContextType,
        RequireFields<QueryDigitalisertSykmeldingArgs, 'sykmeldingId'>
    >
    journalpost?: Resolver<
        ResolversTypes['JournalpostResult'],
        ParentType,
        ContextType,
        RequireFields<QueryJournalpostArgs, 'id'>
    >
    nasjonalFerdigstiltOppgave?: Resolver<
        Maybe<ResolversTypes['NasjonalSykmeldingResult']>,
        ParentType,
        ContextType,
        RequireFields<QueryNasjonalFerdigstiltOppgaveArgs, 'sykmeldingId'>
    >
    nasjonalOppgave?: Resolver<
        Maybe<ResolversTypes['NasjonalOppgaveResult']>,
        ParentType,
        ContextType,
        RequireFields<QueryNasjonalOppgaveArgs, 'oppgaveId'>
    >
    oppgave?: Resolver<
        Maybe<ResolversTypes['DigitaliseringsoppgaveResult']>,
        ParentType,
        ContextType,
        RequireFields<QueryOppgaveArgs, 'oppgaveId'>
    >
    pasientNavn?: Resolver<Maybe<ResolversTypes['Navn']>, ParentType, ContextType>
    sykmelder?: Resolver<
        Maybe<ResolversTypes['Sykmelder']>,
        ParentType,
        ContextType,
        RequireFields<QuerySykmelderArgs, 'hprNummer'>
    >
}

export type RuleInfoResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['RuleInfo'] = ResolversParentTypes['RuleInfo'],
> = {
    messageForSender?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    messageForUser?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    ruleName?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    ruleStatus?: Resolver<ResolversTypes['Status'], ParentType, ContextType>
}

export type SykmelderResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Sykmelder'] = ResolversParentTypes['Sykmelder'],
> = {
    aktorId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    etternavn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    fnr?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    fornavn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    godkjenninger?: Resolver<Maybe<Array<ResolversTypes['Godkjenning']>>, ParentType, ContextType>
    hprNummer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    mellomnavn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type SykmeldingStatusResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['SykmeldingStatus'] = ResolversParentTypes['SykmeldingStatus'],
> = {
    oppgaveId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    status?: Resolver<ResolversTypes['DigitaliseringsoppgaveStatusEnum'], ParentType, ContextType>
}

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
    name: 'UUID'
}

export type UkjentBostedResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['UkjentBosted'] = ResolversParentTypes['UkjentBosted'],
> = {
    bostedskommune?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UtenlandskAdresseResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['UtenlandskAdresse'] = ResolversParentTypes['UtenlandskAdresse'],
> = {
    adressenavnNummer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    bySted?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    landkode?: Resolver<ResolversTypes['String'], ParentType, ContextType>
    postboksNummerNavn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    postkode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ValidationResultResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['ValidationResult'] = ResolversParentTypes['ValidationResult'],
> = {
    ruleHits?: Resolver<Array<ResolversTypes['RuleInfo']>, ParentType, ContextType>
    status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type VegadresseResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Vegadresse'] = ResolversParentTypes['Vegadresse'],
> = {
    adressenavn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    husbokstav?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    husnummer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    postnummer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    poststed?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface _FieldSetScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['_FieldSet'], any> {
    name: '_FieldSet'
}

export type _ServiceResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['_Service'] = ResolversParentTypes['_Service'],
> = {
    sdl?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
    AktivitetIkkeMulig?: AktivitetIkkeMuligResolvers<ContextType>
    AnnenFraversArsak?: AnnenFraversArsakResolvers<ContextType>
    Arbeidsgiver?: ArbeidsgiverResolvers<ContextType>
    ArbeidsrelatertArsak?: ArbeidsrelatertArsakResolvers<ContextType>
    Behandler?: BehandlerResolvers<ContextType>
    Bostedsadresse?: BostedsadresseResolvers<ContextType>
    Date?: GraphQLScalarType
    DateTime?: GraphQLScalarType
    DiagnoseSchema?: DiagnoseSchemaResolvers<ContextType>
    DiagnoseValue?: DiagnoseValueResolvers<ContextType>
    Digitaliseringsoppgave?: DigitaliseringsoppgaveResolvers<ContextType>
    DigitaliseringsoppgaveResult?: DigitaliseringsoppgaveResultResolvers<ContextType>
    DigitaliseringsoppgaveStatus?: DigitaliseringsoppgaveStatusResolvers<ContextType>
    DigitalisertSykmelding?: DigitalisertSykmeldingResolvers<ContextType>
    DigitalisertSykmeldingResult?: DigitalisertSykmeldingResultResolvers<ContextType>
    Document?: DocumentResolvers<ContextType>
    Godkjenning?: GodkjenningResolvers<ContextType>
    Gradert?: GradertResolvers<ContextType>
    Journalpost?: JournalpostResolvers<ContextType>
    JournalpostResult?: JournalpostResultResolvers<ContextType>
    JournalpostStatus?: JournalpostStatusResolvers<ContextType>
    Kode?: KodeResolvers<ContextType>
    KontaktMedPasient?: KontaktMedPasientResolvers<ContextType>
    LagreNasjonalOppgaveStatus?: LagreNasjonalOppgaveStatusResolvers<ContextType>
    LagreOppgaveResult?: LagreOppgaveResultResolvers<ContextType>
    Matrikkeladresse?: MatrikkeladresseResolvers<ContextType>
    MedisinskArsak?: MedisinskArsakResolvers<ContextType>
    MedisinskVurdering?: MedisinskVurderingResolvers<ContextType>
    MeldingTilNAV?: MeldingTilNavResolvers<ContextType>
    Mutation?: MutationResolvers<ContextType>
    NasjonalOppgave?: NasjonalOppgaveResolvers<ContextType>
    NasjonalOppgaveResult?: NasjonalOppgaveResultResolvers<ContextType>
    NasjonalOppgaveStatus?: NasjonalOppgaveStatusResolvers<ContextType>
    NasjonalSykmelding?: NasjonalSykmeldingResolvers<ContextType>
    NasjonalSykmeldingResult?: NasjonalSykmeldingResultResolvers<ContextType>
    NasjonalSykmeldingStatus?: NasjonalSykmeldingStatusResolvers<ContextType>
    Navn?: NavnResolvers<ContextType>
    OppdatertSykmeldingStatus?: OppdatertSykmeldingStatusResolvers<ContextType>
    OppgaveValues?: OppgaveValuesResolvers<ContextType>
    OppholdAnnetSted?: OppholdAnnetStedResolvers<ContextType>
    Oppholdsadresse?: OppholdsadresseResolvers<ContextType>
    Periode?: PeriodeResolvers<ContextType>
    PeriodeValue?: PeriodeValueResolvers<ContextType>
    Person?: PersonResolvers<ContextType>
    Query?: QueryResolvers<ContextType>
    RuleInfo?: RuleInfoResolvers<ContextType>
    Sykmelder?: SykmelderResolvers<ContextType>
    SykmeldingStatus?: SykmeldingStatusResolvers<ContextType>
    UUID?: GraphQLScalarType
    UkjentBosted?: UkjentBostedResolvers<ContextType>
    UtenlandskAdresse?: UtenlandskAdresseResolvers<ContextType>
    ValidationResult?: ValidationResultResolvers<ContextType>
    Vegadresse?: VegadresseResolvers<ContextType>
    _FieldSet?: GraphQLScalarType
    _Service?: _ServiceResolvers<ContextType>
}

export type DirectiveResolvers<ContextType = any> = {
    extends?: ExtendsDirectiveResolver<any, any, ContextType>
    external?: ExternalDirectiveResolver<any, any, ContextType>
    key?: KeyDirectiveResolver<any, any, ContextType>
    provides?: ProvidesDirectiveResolver<any, any, ContextType>
    requires?: RequiresDirectiveResolver<any, any, ContextType>
}
