/* eslint-disable @typescript-eslint/no-explicit-any */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    _FieldSet: any;
};

export type Bostedsadresse = {
    __typename: 'Bostedsadresse';
    coAdressenavn?: Maybe<Scalars['String']>;
    matrikkeladresse?: Maybe<Matrikkeladresse>;
    ukjentBosted?: Maybe<UkjentBosted>;
    utenlandskAdresse?: Maybe<UtenlandskAdresse>;
    vegadresse?: Maybe<Vegadresse>;
};

export type DiagnoseValue = {
    __typename: 'DiagnoseValue';
    kode: Scalars['String'];
    system: Scalars['String'];
    tekst?: Maybe<Scalars['String']>;
};

export type Digitaliseringsoppgave = {
    __typename: 'Digitaliseringsoppgave';
    oppgaveId: Scalars['String'];
    person: Person;
    type: SykmeldingsType;
    values: OppgaveValues;
};

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

export type Journalpost = {
    __typename: 'Journalpost';
    journalstatus?: Maybe<Journalstatus>;
};

/**
 *  * Status på journalposten i arkivet, f.eks. **MOTTATT** eller **JOURNALFOERT**. Journalstatusen gir et indikasjon på hvor i journalførings- eller dokumentproduksjonsprosessen journalposten befinner seg.
 *  * Journalposter som er resultat av en feilsituasjon og ikke skal hensyntas for saksbehandlinghar egne koder, som **UTGAAR** eller **AVBRUTT**.
 */
export enum Journalstatus {
    /**
     *  Utgående dokumenter og notater kan avbrytes mens de er under arbeid, og ikke enda er ferdigstilt. Statusen **AVBRUTT** brukes stort sett ved feilsituasjoner knyttet til vedtaksproduksjon.
     *  * Statusen kan forekomme for utgående dokumenter og notater.
     */
    Avbrutt = 'AVBRUTT',
    /**
     *  Dokumentet er sendt til bruker. Statusen benyttes også når dokumentet er tilgjengeliggjort for bruker på DittNAV, og bruker er varslet.
     *  * Statusen kan forekomme for utgående dokumenter og notater.
     */
    Ekspedert = 'EKSPEDERT',
    /**
     *  Journalposten har blitt unntatt fra saksbehandling etter at den feilaktig har blitt knyttet til en sak. Det er ikke mulig å slette en saksrelasjon, istedet settes saksrelasjonen til feilregistrert.
     *  * Statusen kan forekomme for alle journalposttyper.
     */
    Feilregistrert = 'FEILREGISTRERT',
    /**
     *  Journalposten med tilhørende dokumenter er ferdigstilt, og journalen er i prinsippet låst for videre endringer.
     *  * Tilsvarer statusen **JOURNALFOERT** for inngående dokumenter.
     */
    Ferdigstilt = 'FERDIGSTILT',
    /**
     *  Journalposten er ferdigstilt og ansvaret for videre behandling av forsendelsen er overført til fagsystemet.
     *  * Journalposter med status **JOURNALFOERT** oppfyller minimumskrav til metadata i arkivet, som for eksempel tema, sak, bruker og avsender.
     */
    Journalfoert = 'JOURNALFOERT',
    /**
     *  Journalposten er mottatt, men ikke journalført. *"Mottatt"* er et annet ord for *"arkivert"* eller *"midlertidig journalført"*
     *  * Statusen vil kun forekomme for inngående dokumenter.
     */
    Mottatt = 'MOTTATT',
    /**
     *  Midlertidig status på vei mot **MOTTATT**.
     *  Dersom en journalpost blir stående i status **OPPLASTING_DOKUMENT** over tid, tyder dette på at noe har gått feil under opplasting av vedlegg ved arkivering.
     *  * Statusen kan kun forekomme for inngående dokumenter.
     */
    OpplastingDokument = 'OPPLASTING_DOKUMENT',
    /**
     *  Statusen benyttes bl.a. i forbindelse med brevproduksjon for å reservere 'plass' i journalen for dokumenter som skal populeres på et senere tidspunkt.
     *  Tilsvarer statusen **OPPLASTING_DOKUMENT** for inngående dokumenter.
     *  * Statusen kan forekomme for utgående dokumenter og notater
     */
    Reservert = 'RESERVERT',
    /**  Dersom statusfeltet i Joark er tomt, mappes dette til **UKJENT** */
    Ukjent = 'UKJENT',
    /**
     *  Journalposten har ikke noen kjent bruker.
     *  ** NB: ** **UKJENT_BRUKER** er ikke en midlertidig status, men benyttes der det ikke er mulig å journalføre fordi man ikke klarer å identifisere brukeren forsendelsen gjelder.
     *  * Statusen kan kun forekomme for inngående dokumenter.
     */
    UkjentBruker = 'UKJENT_BRUKER',
    /**
     *  Journalposten er opprettet i arkivet, men fremdeles under arbeid.
     *  * Statusen kan forekomme for utgående dokumenter og notater.
     */
    UnderArbeid = 'UNDER_ARBEID',
    /**
     *  Journalposten er unntatt fra saksbehandling. Status **UTGAAR** brukes stort sett ved feilsituasjoner knyttet til skanning eller journalføring.
     *  * Statusen vil kun forekomme for inngående dokumenter
     */
    Utgaar = 'UTGAAR',
}

export type Matrikkeladresse = {
    __typename: 'Matrikkeladresse';
    bruksenhetsnummer?: Maybe<Scalars['String']>;
    kommunenummer?: Maybe<Scalars['String']>;
    postnummer?: Maybe<Scalars['String']>;
    tilleggsnavn?: Maybe<Scalars['String']>;
};

export type ModiaContext = {
    __typename: 'ModiaContext';
    aktivEnhet?: Maybe<Scalars['String']>;
    enheter: Array<ModiaEnhet>;
    ident: Scalars['String'];
    navn: Scalars['String'];
};

export type ModiaEnhet = {
    __typename: 'ModiaEnhet';
    enhetId: Scalars['String'];
    navn: Scalars['String'];
};

export type Mutation = {
    __typename: 'Mutation';
    lagre: Digitaliseringsoppgave;
    updateModiaEnhet?: Maybe<ModiaContext>;
};

export type MutationLagreArgs = {
    oppgaveId: Scalars['String'];
    status: SykmeldingUnderArbeidStatus;
    values: SykmeldingUnderArbeidValues;
};

export type MutationUpdateModiaEnhetArgs = {
    enhetId: Scalars['String'];
};

export type Navn = {
    __typename: 'Navn';
    etternavn: Scalars['String'];
    fornavn: Scalars['String'];
    mellomnavn?: Maybe<Scalars['String']>;
};

export type OppgaveValues = {
    __typename: 'OppgaveValues';
    behandletTidspunkt?: Maybe<Scalars['String']>;
    biDiagnoser?: Maybe<Array<DiagnoseValue>>;
    fnrPasient?: Maybe<Scalars['String']>;
    hoveddiagnose?: Maybe<DiagnoseValue>;
    skrevetLand?: Maybe<Scalars['String']>;
};

export type Oppholdsadresse = {
    __typename: 'Oppholdsadresse';
    coAdressenavn?: Maybe<Scalars['String']>;
    matrikkeladresse?: Maybe<Matrikkeladresse>;
    oppholdAnnetSted?: Maybe<Scalars['String']>;
    utenlandskAdresse?: Maybe<UtenlandskAdresse>;
    vegadresse?: Maybe<Vegadresse>;
};

export type PdlPerson = {
    __typename: 'PdlPerson';
    bostedsadresse: Array<Bostedsadresse>;
    navn: Array<Navn>;
    oppholdsadresse: Array<Oppholdsadresse>;
};

export type PdlPersonBostedsadresseArgs = {
    historikk?: InputMaybe<Scalars['Boolean']>;
};

export type PdlPersonNavnArgs = {
    historikk?: InputMaybe<Scalars['Boolean']>;
};

export type PdlPersonOppholdsadresseArgs = {
    historikk?: InputMaybe<Scalars['Boolean']>;
};

export type PdlQuery = {
    __typename: 'PdlQuery';
    hentPerson?: Maybe<PdlPerson>;
};

export type PdlQueryHentPersonArgs = {
    ident: Scalars['ID'];
};

export type Person = {
    __typename: 'Person';
    fnr: Scalars['String'];
    navn?: Maybe<Scalars['String']>;
};

export type Query = {
    __typename: 'Query';
    _service?: Maybe<_Service>;
    modia?: Maybe<ModiaContext>;
    oppgave: Digitaliseringsoppgave;
};

export type QueryOppgaveArgs = {
    oppgaveId: Scalars['String'];
};

/**  Query roten til SAF GraphQL API. */
export type SafQuery = {
    __typename: 'SafQuery';
    /**
     *  * Query returnerer metadata for en journalpost.
     *  * Fysiske dokumentet tilknyttet journalposten kan hentes i saf - REST hentdokument
     */
    journalpost?: Maybe<Journalpost>;
};

/**  Query roten til SAF GraphQL API. */
export type SafQueryJournalpostArgs = {
    journalpostId: Scalars['String'];
};

export enum SykmeldingUnderArbeidStatus {
    Ferdigstilt = 'FERDIGSTILT',
    UnderArbeid = 'UNDER_ARBEID',
}

export type SykmeldingUnderArbeidValues = {
    behandletTidspunkt?: InputMaybe<Scalars['String']>;
    fnrPasient?: InputMaybe<Scalars['String']>;
    skrevetLand?: InputMaybe<Scalars['String']>;
};

export enum SykmeldingsType {
    Innenlands = 'INNENLANDS',
    Utenlands = 'UTENLANDS',
}

export type UkjentBosted = {
    __typename: 'UkjentBosted';
    bostedskommune?: Maybe<Scalars['String']>;
};

export type UtenlandskAdresse = {
    __typename: 'UtenlandskAdresse';
    adressenavnNummer?: Maybe<Scalars['String']>;
    bySted?: Maybe<Scalars['String']>;
    bygningEtasjeLeilighet?: Maybe<Scalars['String']>;
    landkode: Scalars['String'];
    postboksNummerNavn?: Maybe<Scalars['String']>;
    postkode?: Maybe<Scalars['String']>;
    regionDistriktOmraade?: Maybe<Scalars['String']>;
};

export type Vegadresse = {
    __typename: 'Vegadresse';
    adressenavn?: Maybe<Scalars['String']>;
    bruksenhetsnummer?: Maybe<Scalars['String']>;
    bydelsnummer?: Maybe<Scalars['String']>;
    husbokstav?: Maybe<Scalars['String']>;
    husnummer?: Maybe<Scalars['String']>;
    kommunenummer?: Maybe<Scalars['String']>;
    postnummer?: Maybe<Scalars['String']>;
    tilleggsnavn?: Maybe<Scalars['String']>;
};

export type _Service = {
    __typename: '_Service';
    sdl: Scalars['String'];
};

export type ModiaFragment = {
    __typename: 'ModiaContext';
    navn: string;
    aktivEnhet?: string | null;
    ident: string;
    enheter: Array<{ __typename: 'ModiaEnhet'; navn: string; enhetId: string }>;
};

export type ModiaContextQueryVariables = Exact<{ [key: string]: never }>;

export type ModiaContextQuery = {
    __typename: 'Query';
    modia?: {
        __typename: 'ModiaContext';
        navn: string;
        aktivEnhet?: string | null;
        ident: string;
        enheter: Array<{ __typename: 'ModiaEnhet'; navn: string; enhetId: string }>;
    } | null;
};

export type UpdateAktivEnhetMutationVariables = Exact<{
    enhetId: Scalars['String'];
}>;

export type UpdateAktivEnhetMutation = {
    __typename: 'Mutation';
    updateModiaEnhet?: {
        __typename: 'ModiaContext';
        navn: string;
        aktivEnhet?: string | null;
        ident: string;
        enheter: Array<{ __typename: 'ModiaEnhet'; navn: string; enhetId: string }>;
    } | null;
};

export type DiagnoseFragment = { __typename: 'DiagnoseValue'; kode: string; tekst?: string | null; system: string };

export type OppgaveValuesFragment = {
    __typename: 'OppgaveValues';
    fnrPasient?: string | null;
    behandletTidspunkt?: string | null;
    skrevetLand?: string | null;
    hoveddiagnose?: { __typename: 'DiagnoseValue'; kode: string; tekst?: string | null; system: string } | null;
    biDiagnoser?: Array<{ __typename: 'DiagnoseValue'; kode: string; tekst?: string | null; system: string }> | null;
};

export type OppgaveFragment = {
    __typename: 'Digitaliseringsoppgave';
    oppgaveId: string;
    person: { __typename: 'Person'; fnr: string; navn?: string | null };
    values: {
        __typename: 'OppgaveValues';
        fnrPasient?: string | null;
        behandletTidspunkt?: string | null;
        skrevetLand?: string | null;
        hoveddiagnose?: { __typename: 'DiagnoseValue'; kode: string; tekst?: string | null; system: string } | null;
        biDiagnoser?: Array<{
            __typename: 'DiagnoseValue';
            kode: string;
            tekst?: string | null;
            system: string;
        }> | null;
    };
};

export type OppgaveByIdQueryVariables = Exact<{
    oppgaveId: Scalars['String'];
}>;

export type OppgaveByIdQuery = {
    __typename: 'Query';
    oppgave: {
        __typename: 'Digitaliseringsoppgave';
        oppgaveId: string;
        person: { __typename: 'Person'; fnr: string; navn?: string | null };
        values: {
            __typename: 'OppgaveValues';
            fnrPasient?: string | null;
            behandletTidspunkt?: string | null;
            skrevetLand?: string | null;
            hoveddiagnose?: { __typename: 'DiagnoseValue'; kode: string; tekst?: string | null; system: string } | null;
            biDiagnoser?: Array<{
                __typename: 'DiagnoseValue';
                kode: string;
                tekst?: string | null;
                system: string;
            }> | null;
        };
    };
};

export type SaveOppgaveMutationVariables = Exact<{
    id: Scalars['String'];
    values: SykmeldingUnderArbeidValues;
    status: SykmeldingUnderArbeidStatus;
}>;

export type SaveOppgaveMutation = {
    __typename: 'Mutation';
    lagre: {
        __typename: 'Digitaliseringsoppgave';
        oppgaveId: string;
        person: { __typename: 'Person'; fnr: string; navn?: string | null };
        values: {
            __typename: 'OppgaveValues';
            fnrPasient?: string | null;
            behandletTidspunkt?: string | null;
            skrevetLand?: string | null;
            hoveddiagnose?: { __typename: 'DiagnoseValue'; kode: string; tekst?: string | null; system: string } | null;
            biDiagnoser?: Array<{
                __typename: 'DiagnoseValue';
                kode: string;
                tekst?: string | null;
                system: string;
            }> | null;
        };
    };
};

export const ModiaFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Modia' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ModiaContext' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'navn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'aktivEnhet' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'ident' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'enheter' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'navn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'enhetId' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<ModiaFragment, unknown>;
export const DiagnoseFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Diagnose' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DiagnoseValue' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<DiagnoseFragment, unknown>;
export const OppgaveValuesFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'OppgaveValues' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppgaveValues' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fnrPasient' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandletTidspunkt' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'skrevetLand' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hoveddiagnose' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Diagnose' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'biDiagnoser' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Diagnose' } }],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<OppgaveValuesFragment, unknown>;
export const OppgaveFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Oppgave' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Digitaliseringsoppgave' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'person' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'fnr' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'navn' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'values' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'OppgaveValues' } }],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<OppgaveFragment, unknown>;
export const ModiaContextDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'ModiaContext' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'modia' },
                        directives: [{ kind: 'Directive', name: { kind: 'Name', value: 'client' } }],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Modia' } }],
                        },
                    },
                ],
            },
        },
        ...ModiaFragmentDoc.definitions,
    ],
} as unknown as DocumentNode<ModiaContextQuery, ModiaContextQueryVariables>;
export const UpdateAktivEnhetDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateAktivEnhet' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'enhetId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updateModiaEnhet' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'enhetId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'enhetId' } },
                            },
                        ],
                        directives: [{ kind: 'Directive', name: { kind: 'Name', value: 'client' } }],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Modia' } }],
                        },
                    },
                ],
            },
        },
        ...ModiaFragmentDoc.definitions,
    ],
} as unknown as DocumentNode<UpdateAktivEnhetMutation, UpdateAktivEnhetMutationVariables>;
export const OppgaveByIdDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'OppgaveById' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'oppgaveId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'oppgave' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'oppgaveId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'oppgaveId' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Oppgave' } }],
                        },
                    },
                ],
            },
        },
        ...OppgaveFragmentDoc.definitions,
        ...OppgaveValuesFragmentDoc.definitions,
        ...DiagnoseFragmentDoc.definitions,
    ],
} as unknown as DocumentNode<OppgaveByIdQuery, OppgaveByIdQueryVariables>;
export const SaveOppgaveDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'SaveOppgave' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'values' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'SykmeldingUnderArbeidValues' } },
                    },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'SykmeldingUnderArbeidStatus' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lagre' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'oppgaveId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'values' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'values' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'status' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Oppgave' } }],
                        },
                    },
                ],
            },
        },
        ...OppgaveFragmentDoc.definitions,
        ...OppgaveValuesFragmentDoc.definitions,
        ...DiagnoseFragmentDoc.definitions,
    ],
} as unknown as DocumentNode<SaveOppgaveMutation, SaveOppgaveMutationVariables>;
