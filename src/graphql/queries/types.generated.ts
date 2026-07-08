/* oxlint-disable */
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string }
    String: { input: string; output: string }
    Boolean: { input: boolean; output: boolean }
    Int: { input: number; output: number }
    Float: { input: number; output: number }
    Date: { input: string; output: string }
    DateTime: { input: string; output: string }
    UUID: { input: unknown; output: unknown }
    _FieldSet: { input: unknown; output: unknown }
}

export type AktivitetIkkeMulig = {
    __typename: 'AktivitetIkkeMulig'
    arbeidsrelatertArsak: Maybe<ArbeidsrelatertArsak>
    medisinskArsak: Maybe<MedisinskArsak>
}

export type AktivitetIkkeMuligValues = {
    arbeidsrelatertArsak: InputMaybe<ArbeidsrelatertArsakValues>
    medisinskArsak: InputMaybe<MedisinskArsakValues>
}

export type AnnenFraversArsak = {
    __typename: 'AnnenFraversArsak'
    beskrivelse: Maybe<Scalars['String']['output']>
    grunn: Maybe<Array<AnnenFraversArsakGrunn>>
}

export enum AnnenFraversArsakGrunn {
    Abort = 'ABORT',
    ArbeidsrettetTiltak = 'ARBEIDSRETTET_TILTAK',
    BehandlingForhindrerArbeid = 'BEHANDLING_FORHINDRER_ARBEID',
    BehandlingSterilisering = 'BEHANDLING_STERILISERING',
    Donor = 'DONOR',
    GodkjentHelseinstitusjon = 'GODKJENT_HELSEINSTITUSJON',
    MottarTilskuddGrunnetHelsetilstand = 'MOTTAR_TILSKUDD_GRUNNET_HELSETILSTAND',
    NodvendigKontrollundenrsokelse = 'NODVENDIG_KONTROLLUNDENRSOKELSE',
    Smittefare = 'SMITTEFARE',
    UforGrunnetBarnloshet = 'UFOR_GRUNNET_BARNLOSHET',
}

export type AnnenFraversArsakValues = {
    beskrivelse: InputMaybe<Scalars['String']['input']>
    grunn: Array<AnnenFraversArsakGrunn>
}

export type Arbeidsgiver = {
    __typename: 'Arbeidsgiver'
    harArbeidsgiver: Maybe<HarArbeidsgiver>
    navn: Maybe<Scalars['String']['output']>
    stillingsprosent: Maybe<Scalars['Int']['output']>
    yrkesbetegnelse: Maybe<Scalars['String']['output']>
}

export type ArbeidsgiverValues = {
    harArbeidsgiver: HarArbeidsgiver
    navn: InputMaybe<Scalars['String']['input']>
    stillingsprosent: InputMaybe<Scalars['Int']['input']>
    yrkesbetegnelse: InputMaybe<Scalars['String']['input']>
}

export type ArbeidsrelatertArsak = {
    __typename: 'ArbeidsrelatertArsak'
    arsak: Array<ArbeidsrelatertArsakType>
    beskrivelse: Maybe<Scalars['String']['output']>
}

export enum ArbeidsrelatertArsakType {
    Annet = 'ANNET',
    ManglendeTilrettelegging = 'MANGLENDE_TILRETTELEGGING',
}

export type ArbeidsrelatertArsakValues = {
    arsak: Array<ArbeidsrelatertArsakType>
    beskrivelse: InputMaybe<Scalars['String']['input']>
}

export enum Avvisingsgrunn {
    Annet = 'ANNET',
    BasertPaaTelefonkontakt = 'BASERT_PAA_TELEFONKONTAKT',
    Duplikat = 'DUPLIKAT',
    ForLangPeriode = 'FOR_LANG_PERIODE',
    LopendeAap = 'LOPENDE_AAP',
    ManglendeDiagnose = 'MANGLENDE_DIAGNOSE',
    ManglendeOrginalSykmelding = 'MANGLENDE_ORGINAL_SYKMELDING',
    ManglendePeriodeEllerSluttdato = 'MANGLENDE_PERIODE_ELLER_SLUTTDATO',
    ManglendeUnderskriftEllerStempelFraSykmelder = 'MANGLENDE_UNDERSKRIFT_ELLER_STEMPEL_FRA_SYKMELDER',
    MaxdatoOppnaadd = 'MAXDATO_OPPNAADD',
    Risikosak = 'RISIKOSAK',
    TilbakedatertSykmelding = 'TILBAKEDATERT_SYKMELDING',
    VarsletISaken = 'VARSLET_I_SAKEN',
}

export type Behandler = {
    __typename: 'Behandler'
    etternavn: Scalars['String']['output']
    fnr: Scalars['String']['output']
    fornavn: Scalars['String']['output']
    hpr: Maybe<Scalars['String']['output']>
    mellomnavn: Maybe<Scalars['String']['output']>
    tlf: Maybe<Scalars['String']['output']>
}

export type BehandlerValues = {
    hpr: InputMaybe<Scalars['String']['input']>
    tlf: InputMaybe<Scalars['String']['input']>
}

export type Bostedsadresse = Matrikkeladresse | UkjentBosted | UtenlandskAdresse | Vegadresse

export type DiagnoseInput = {
    kode: Scalars['String']['input']
    system: Scalars['String']['input']
}

export type DiagnoseSchema = {
    __typename: 'DiagnoseSchema'
    kode: Maybe<Scalars['String']['output']>
    system: Maybe<Scalars['String']['output']>
    tekst: Maybe<Scalars['String']['output']>
}

export type DiagnoseValue = {
    __typename: 'DiagnoseValue'
    kode: Scalars['String']['output']
    system: Scalars['String']['output']
    tekst: Maybe<Scalars['String']['output']>
}

export type DiagnoseValues = {
    kode: Scalars['String']['input']
    system: Scalars['String']['input']
    tekst: InputMaybe<Scalars['String']['input']>
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

export enum DigitaliseringsoppgaveStatusEnum {
    Avvist = 'AVVIST',
    Ferdigstilt = 'FERDIGSTILT',
    FinnesIkke = 'FINNES_IKKE',
    IkkeEnSykmelding = 'IKKE_EN_SYKMELDING',
}

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

export enum ErrorDetail {
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
    DeadlineExceeded = 'DEADLINE_EXCEEDED',
    /**
     * The server detected that the client is exhibiting a behavior that
     * might be generating excessive load.
     *
     * HTTP Mapping: 429 Too Many Requests or 420 Enhance Your Calm
     * Error Type: UNAVAILABLE
     */
    EnhanceYourCalm = 'ENHANCE_YOUR_CALM',
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
    FieldNotFound = 'FIELD_NOT_FOUND',
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
    InvalidArgument = 'INVALID_ARGUMENT',
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
    InvalidCursor = 'INVALID_CURSOR',
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
    MissingResource = 'MISSING_RESOURCE',
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
    ServiceError = 'SERVICE_ERROR',
    /**
     * Request failed due to network errors.
     *
     * HTTP Mapping: 503 Unavailable
     * Error Type: UNAVAILABLE
     */
    TcpFailure = 'TCP_FAILURE',
    /**
     * Request throttled based on server concurrency limits.
     *
     * HTTP Mapping: 503 Unavailable
     * Error Type: UNAVAILABLE
     */
    ThrottledConcurrency = 'THROTTLED_CONCURRENCY',
    /**
     * Request throttled based on server CPU limits
     *
     * HTTP Mapping: 503 Unavailable.
     * Error Type: UNAVAILABLE
     */
    ThrottledCpu = 'THROTTLED_CPU',
    /**
     * The operation is not implemented or is not currently supported/enabled.
     *
     * HTTP Mapping: 501 Not Implemented
     * Error Type: BAD_REQUEST
     */
    Unimplemented = 'UNIMPLEMENTED',
    /**
     * Unknown error.
     *
     * This error should only be returned when no other error detail applies.
     * If a client sees an unknown errorDetail, it will be interpreted as UNKNOWN.
     *
     * HTTP Mapping: 500 Internal Server Error
     */
    Unknown = 'UNKNOWN',
}

export enum ErrorType {
    /**
     * Bad Request.
     *
     * There is a problem with the request.
     * Retrying the same request is not likely to succeed.
     * An example would be a query or argument that cannot be deserialized.
     *
     * HTTP Mapping: 400 Bad Request
     */
    BadRequest = 'BAD_REQUEST',
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
    FailedPrecondition = 'FAILED_PRECONDITION',
    /**
     * Internal error.
     *
     * An unexpected internal error was encountered. This means that some
     * invariants expected by the underlying system have been broken.
     * This error code is reserved for serious errors.
     *
     * HTTP Mapping: 500 Internal Server Error
     */
    Internal = 'INTERNAL',
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
    NotFound = 'NOT_FOUND',
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
    PermissionDenied = 'PERMISSION_DENIED',
    /**
     * The request does not have valid authentication credentials.
     *
     * This is intended to be returned only for routes that require
     * authentication.
     *
     * HTTP Mapping: 401 Unauthorized
     */
    Unauthenticated = 'UNAUTHENTICATED',
    /**
     * Currently Unavailable.
     *
     * The service is currently unavailable.  This is most likely a
     * transient condition, which can be corrected by retrying with
     * a backoff.
     *
     * HTTP Mapping: 503 Unavailable
     */
    Unavailable = 'UNAVAILABLE',
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
    Unknown = 'UNKNOWN',
}

export type Godkjenning = {
    __typename: 'Godkjenning'
    autorisasjon: Maybe<Kode>
    helsepersonellkategori: Maybe<Kode>
}

export type Gradert = {
    __typename: 'Gradert'
    grad: Maybe<Scalars['Int']['output']>
    reisetilskudd: Scalars['Boolean']['output']
}

export type GradertValues = {
    grad: Scalars['Int']['input']
    reisetilskudd: Scalars['Boolean']['input']
}

export enum HarArbeidsgiver {
    EnArbeidsgiver = 'EN_ARBEIDSGIVER',
    FlereArbeidsgivere = 'FLERE_ARBEIDSGIVERE',
    IngenArbeidsgiver = 'INGEN_ARBEIDSGIVER',
}

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
    oppgaveId: Maybe<Scalars['String']['output']>
    status: JournalpostStatusEnum
}

export enum JournalpostStatusEnum {
    FeilKanal = 'FEIL_KANAL',
    FeilTema = 'FEIL_TEMA',
    FeilType = 'FEIL_TYPE',
    ManglendeJournalpost = 'MANGLENDE_JOURNALPOST',
    ManglerFnr = 'MANGLER_FNR',
    Opprettet = 'OPPRETTET',
}

export type Kode = {
    __typename: 'Kode'
    aktiv: Scalars['Boolean']['output']
    oid: Scalars['Int']['output']
    verdi: Maybe<Scalars['String']['output']>
}

export type KontaktMedPasient = {
    __typename: 'KontaktMedPasient'
    begrunnelseIkkeKontakt: Maybe<Scalars['String']['output']>
    kontaktDato: Maybe<Scalars['String']['output']>
}

export type KontaktMedPasientValues = {
    begrunnelseIkkeKontakt: InputMaybe<Scalars['String']['input']>
    kontaktDato: InputMaybe<Scalars['Date']['input']>
}

export type LagreNasjonalOppgaveStatus = {
    __typename: 'LagreNasjonalOppgaveStatus'
    oppgaveId: Scalars['String']['output']
    status: LagreNasjonalOppgaveStatusEnum
}

export enum LagreNasjonalOppgaveStatusEnum {
    Avvist = 'AVVIST',
    Ferdigstilt = 'FERDIGSTILT',
    FinnesIkke = 'FINNES_IKKE',
    IkkeEnSykmelding = 'IKKE_EN_SYKMELDING',
    IkkeFerdigstilt = 'IKKE_FERDIGSTILT',
    Oppdatert = 'OPPDATERT',
}

export type LagreOppgaveResult = LagreNasjonalOppgaveStatus | ValidationResult

export type Matrikkeladresse = {
    __typename: 'Matrikkeladresse'
    bruksenhetsnummer: Maybe<Scalars['String']['output']>
    postnummer: Maybe<Scalars['String']['output']>
    poststed: Maybe<Scalars['String']['output']>
    tilleggsnavn: Maybe<Scalars['String']['output']>
}

export type MedisinskArsak = {
    __typename: 'MedisinskArsak'
    arsak: Array<MedisinskArsakType>
    beskrivelse: Maybe<Scalars['String']['output']>
}

export enum MedisinskArsakType {
    AktivitetForhindrerBedring = 'AKTIVITET_FORHINDRER_BEDRING',
    AktivitetForverrerTilstand = 'AKTIVITET_FORVERRER_TILSTAND',
    Annet = 'ANNET',
    TilstandHindrerAktivitet = 'TILSTAND_HINDRER_AKTIVITET',
}

export type MedisinskArsakValues = {
    arsak: Array<MedisinskArsakType>
    beskrivelse: InputMaybe<Scalars['String']['input']>
}

export type MedisinskVurdering = {
    __typename: 'MedisinskVurdering'
    annenFraversArsak: Maybe<AnnenFraversArsak>
    biDiagnoser: Array<DiagnoseSchema>
    hovedDiagnose: Maybe<DiagnoseSchema>
    svangerskap: Scalars['Boolean']['output']
    yrkesskade: Scalars['Boolean']['output']
    yrkesskadeDato: Maybe<Scalars['String']['output']>
}

export type MedisinskVurderingValues = {
    annenFraversArsak: InputMaybe<AnnenFraversArsakValues>
    biDiagnoser: Array<DiagnoseValues>
    hovedDiagnose: InputMaybe<DiagnoseValues>
    svangerskap: Scalars['Boolean']['input']
    yrkesskade: Scalars['Boolean']['input']
    yrkesskadeDato: InputMaybe<Scalars['Date']['input']>
}

export type MeldingTilNav = {
    __typename: 'MeldingTilNAV'
    beskrivBistand: Maybe<Scalars['String']['output']>
    bistandUmiddelbart: Scalars['Boolean']['output']
}

export type MeldingTilNavValues = {
    beskrivBistand: InputMaybe<Scalars['String']['input']>
    bistandUmiddelbart: Scalars['Boolean']['input']
}

export type Mutation = {
    __typename: 'Mutation'
    avvis: Maybe<DigitaliseringsoppgaveStatus>
    avvisNasjonalOppgave: Maybe<LagreNasjonalOppgaveStatus>
    dokument: Maybe<Document>
    lagre: Maybe<DigitaliseringsoppgaveResult>
    lagreNasjonalOppgave: Maybe<LagreOppgaveResult>
    oppdaterDigitalisertSykmelding: Maybe<OppdatertSykmeldingStatus>
    oppgaveTilbakeTilGosys: Maybe<DigitaliseringsoppgaveStatus>
    oppgaveTilbakeTilGosysNasjonal: Maybe<LagreNasjonalOppgaveStatus>
    sykmeldingFraJournalpost: JournalpostStatus
}

export type MutationAvvisArgs = {
    avvisningsgrunn: Avvisingsgrunn
    avvisningsgrunnAnnet: InputMaybe<Scalars['String']['input']>
    enhetId: Scalars['String']['input']
    oppgaveId: Scalars['String']['input']
}

export type MutationAvvisNasjonalOppgaveArgs = {
    avvisningsgrunn: InputMaybe<Scalars['String']['input']>
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
    status: InputMaybe<SykmeldingUnderArbeidStatus>
    sykmeldingValues: NasjonalSykmeldingValues
}

export type MutationOppdaterDigitalisertSykmeldingArgs = {
    enhetId: Scalars['String']['input']
    sykmeldingId: Scalars['String']['input']
    values: SykmeldingUnderArbeidValues
}

export type MutationOppgaveTilbakeTilGosysArgs = {
    navEnhet: InputMaybe<Scalars['String']['input']>
    oppgaveId: Scalars['String']['input']
}

export type MutationOppgaveTilbakeTilGosysNasjonalArgs = {
    navEnhet: InputMaybe<Scalars['String']['input']>
    oppgaveId: Scalars['String']['input']
}

export type MutationSykmeldingFraJournalpostArgs = {
    journalpostId: Scalars['String']['input']
    navEnhet: InputMaybe<Scalars['String']['input']>
    norsk: Scalars['Boolean']['input']
}

export enum NasjonalOppdatertSykmeldingStatusEnum {
    Avvist = 'AVVIST',
    Ferdigstilt = 'FERDIGSTILT',
    FinnesIkke = 'FINNES_IKKE',
    IkkeEnSykmelding = 'IKKE_EN_SYKMELDING',
    IkkeFerdigstilt = 'IKKE_FERDIGSTILT',
    Oppdatert = 'OPPDATERT',
}

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

export enum NasjonalOppgaveStatusEnum {
    Avvist = 'AVVIST',
    Ferdigstilt = 'FERDIGSTILT',
    FinnesIkke = 'FINNES_IKKE',
    IkkeEnSykmelding = 'IKKE_EN_SYKMELDING',
    IkkeFerdigstilt = 'IKKE_FERDIGSTILT',
}

export type NasjonalSykmelding = {
    __typename: 'NasjonalSykmelding'
    arbeidsgiver: Maybe<Arbeidsgiver>
    behandler: Maybe<Behandler>
    behandletTidspunkt: Maybe<Scalars['Date']['output']>
    datoOpprettet: Maybe<Scalars['String']['output']>
    fnr: Maybe<Scalars['String']['output']>
    harUtdypendeOpplysninger: Maybe<Scalars['Boolean']['output']>
    journalpostId: Scalars['String']['output']
    kontaktMedPasient: Maybe<KontaktMedPasient>
    medisinskVurdering: Maybe<MedisinskVurdering>
    meldingTilArbeidsgiver: Maybe<Scalars['String']['output']>
    meldingTilNAV: Maybe<MeldingTilNav>
    perioder: Array<Periode>
    skjermesForPasient: Maybe<Scalars['Boolean']['output']>
    syketilfelleStartDato: Maybe<Scalars['String']['output']>
    sykmeldingId: Maybe<Scalars['String']['output']>
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
    meldingTilArbeidsgiver: InputMaybe<Scalars['String']['input']>
    meldingTilNAV: InputMaybe<MeldingTilNavValues>
    pasientFnr: Scalars['String']['input']
    perioder: Array<PeriodeValues>
    skjermesForPasient: Scalars['Boolean']['input']
    sykmelderFnr: Scalars['String']['input']
}

export type Navn = {
    __typename: 'Navn'
    etternavn: Scalars['String']['output']
    fornavn: Scalars['String']['output']
    mellomnavn: Maybe<Scalars['String']['output']>
}

export type OppdatertSykmeldingStatus = {
    __typename: 'OppdatertSykmeldingStatus'
    status: Maybe<OppdatertSykmeldingStatusEnum>
    sykmeldingId: Scalars['String']['output']
}

export enum OppdatertSykmeldingStatusEnum {
    Avvist = 'AVVIST',
    Ferdigstilt = 'FERDIGSTILT',
    FinnesIkke = 'FINNES_IKKE',
    IkkeEnSykmelding = 'IKKE_EN_SYKMELDING',
    IkkeFerdigstilt = 'IKKE_FERDIGSTILT',
    Oppdatert = 'OPPDATERT',
}

export type OppgaveValues = {
    __typename: 'OppgaveValues'
    behandletTidspunkt: Maybe<Scalars['DateTime']['output']>
    biDiagnoser: Maybe<Array<DiagnoseValue>>
    /** Adressen er oppholds-, post- eller kontaktadresse i utlandet */
    erAdresseUtland: Maybe<Scalars['Boolean']['output']>
    fnrPasient: Scalars['String']['output']
    folkeRegistertAdresseErBrakkeEllerTilsvarende: Maybe<Scalars['Boolean']['output']>
    hoveddiagnose: Maybe<DiagnoseValue>
    perioder: Maybe<Array<PeriodeValue>>
    skrevetLand: Maybe<Scalars['String']['output']>
}

export type OppholdAnnetSted = {
    __typename: 'OppholdAnnetSted'
    type: Maybe<Scalars['String']['output']>
}

export type Oppholdsadresse = Matrikkeladresse | OppholdAnnetSted | UtenlandskAdresse | Vegadresse

export type Periode = {
    __typename: 'Periode'
    aktivitetIkkeMulig: Maybe<AktivitetIkkeMulig>
    avventendeInnspillTilArbeidsgiver: Maybe<Scalars['String']['output']>
    behandlingsdager: Maybe<Scalars['Int']['output']>
    fom: Scalars['Date']['output']
    gradert: Maybe<Gradert>
    reisetilskudd: Maybe<Scalars['Boolean']['output']>
    tom: Scalars['Date']['output']
}

export type PeriodeInput = {
    fom: Scalars['Date']['input']
    grad: InputMaybe<Scalars['Int']['input']>
    tom: Scalars['Date']['input']
    type: PeriodeType
}

export enum PeriodeType {
    AktivitetIkkeMulig = 'AKTIVITET_IKKE_MULIG',
    Gradert = 'GRADERT',
}

export type PeriodeValue = {
    __typename: 'PeriodeValue'
    fom: Scalars['Date']['output']
    grad: Maybe<Scalars['Int']['output']>
    tom: Scalars['Date']['output']
    type: PeriodeType
}

export type PeriodeValues = {
    aktivitetIkkeMulig: InputMaybe<AktivitetIkkeMuligValues>
    avventendeInnspillTilArbeidsgiver: InputMaybe<Scalars['String']['input']>
    behandlingsdager: InputMaybe<Scalars['Int']['input']>
    fom: Scalars['Date']['input']
    gradert: InputMaybe<GradertValues>
    reisetilskudd: InputMaybe<Scalars['Boolean']['input']>
    tom: Scalars['Date']['input']
}

export type Person = {
    __typename: 'Person'
    bostedsadresse: Maybe<Bostedsadresse>
    navn: Maybe<Scalars['String']['output']>
    oppholdsadresse: Maybe<Oppholdsadresse>
}

export type Query = {
    __typename: 'Query'
    _service: _Service
    digitalisertSykmelding: Maybe<DigitalisertSykmeldingResult>
    journalpost: JournalpostResult
    nasjonalFerdigstiltOppgave: Maybe<NasjonalSykmeldingResult>
    nasjonalOppgave: Maybe<NasjonalOppgaveResult>
    oppgave: Maybe<DigitaliseringsoppgaveResult>
    pasientNavn: Maybe<Navn>
    sykmelder: Maybe<Sykmelder>
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

export enum Status {
    Invalid = 'INVALID',
    ManualProcessing = 'MANUAL_PROCESSING',
    Ok = 'OK',
}

export type Sykmelder = {
    __typename: 'Sykmelder'
    aktorId: Maybe<Scalars['String']['output']>
    etternavn: Maybe<Scalars['String']['output']>
    fnr: Maybe<Scalars['String']['output']>
    fornavn: Maybe<Scalars['String']['output']>
    godkjenninger: Maybe<Array<Godkjenning>>
    hprNummer: Maybe<Scalars['String']['output']>
    mellomnavn: Maybe<Scalars['String']['output']>
}

export type SykmeldingStatus = {
    __typename: 'SykmeldingStatus'
    oppgaveId: Scalars['String']['output']
    status: DigitaliseringsoppgaveStatusEnum
}

export enum SykmeldingUnderArbeidStatus {
    Ferdigstilt = 'FERDIGSTILT',
    UnderArbeid = 'UNDER_ARBEID',
}

export type SykmeldingUnderArbeidValues = {
    behandletTidspunkt: InputMaybe<Scalars['Date']['input']>
    biDiagnoser: InputMaybe<Array<DiagnoseInput>>
    /** Adressen er oppholds-, post- eller kontaktadresse i utlandet */
    erAdresseUtland: InputMaybe<Scalars['Boolean']['input']>
    fnrPasient: Scalars['String']['input']
    folkeRegistertAdresseErBrakkeEllerTilsvarende: InputMaybe<Scalars['Boolean']['input']>
    hovedDiagnose: InputMaybe<DiagnoseInput>
    perioder: InputMaybe<Array<PeriodeInput>>
    skrevetLand: InputMaybe<Scalars['String']['input']>
}

export enum SykmeldingsType {
    Innenlands = 'INNENLANDS',
    Utenlands = 'UTENLANDS',
}

export type UkjentBosted = {
    __typename: 'UkjentBosted'
    bostedskommune: Maybe<Scalars['String']['output']>
}

export type UtenlandskAdresse = {
    __typename: 'UtenlandskAdresse'
    adressenavnNummer: Maybe<Scalars['String']['output']>
    bySted: Maybe<Scalars['String']['output']>
    landkode: Scalars['String']['output']
    postboksNummerNavn: Maybe<Scalars['String']['output']>
    postkode: Maybe<Scalars['String']['output']>
}

export type ValidationResult = {
    __typename: 'ValidationResult'
    ruleHits: Array<RuleInfo>
    status: Status
}

export type Vegadresse = {
    __typename: 'Vegadresse'
    adressenavn: Maybe<Scalars['String']['output']>
    husbokstav: Maybe<Scalars['String']['output']>
    husnummer: Maybe<Scalars['String']['output']>
    postnummer: Maybe<Scalars['String']['output']>
    poststed: Maybe<Scalars['String']['output']>
}

export type _Service = {
    __typename: '_Service'
    sdl: Scalars['String']['output']
}
