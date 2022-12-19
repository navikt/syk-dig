/* eslint-disable @typescript-eslint/no-explicit-any */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
    /** An RFC-3339 compliant Full Date Scalar */
    Date: string
    /** An RFC-3339 compliant DateTime Scalar */
    DateTime: string
    /** A universally unique identifier compliant UUID Scalar */
    UUID: any
    _FieldSet: any
}

export type Bostedsadresse = Matrikkeladresse | UkjentBosted | UtenlandskAdresse | Vegadresse

export type DiagnoseInput = {
    kode: Scalars['String']
    system: Scalars['String']
}

export type DiagnoseValue = {
    __typename: 'DiagnoseValue'
    kode: Scalars['String']
    system: Scalars['String']
    tekst?: Maybe<Scalars['String']>
}

export type Digitaliseringsoppgave = {
    __typename: 'Digitaliseringsoppgave'
    oppgaveId: Scalars['String']
    person: Person
    type: SykmeldingsType
    values: OppgaveValues
}

export type DigitaliseringsoppgaveResult = Digitaliseringsoppgave | DigitaliseringsoppgaveStatus

export type DigitaliseringsoppgaveStatus = {
    __typename: 'DigitaliseringsoppgaveStatus'
    oppgaveId: Scalars['String']
    status: DigitaliseringsoppgaveStatusEnum
}

export enum DigitaliseringsoppgaveStatusEnum {
    Ferdigstilt = 'FERDIGSTILT',
    FinnesIkke = 'FINNES_IKKE',
    IkkeEnSykmelding = 'IKKE_EN_SYKMELDING',
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

export type Matrikkeladresse = {
    __typename: 'Matrikkeladresse'
    bruksenhetsnummer?: Maybe<Scalars['String']>
    postnummer?: Maybe<Scalars['String']>
    poststed?: Maybe<Scalars['String']>
    tilleggsnavn?: Maybe<Scalars['String']>
}

export type ModiaContext = {
    __typename: 'ModiaContext'
    aktivEnhet?: Maybe<Scalars['String']>
    enheter: Array<ModiaEnhet>
    ident: Scalars['String']
    navn: Scalars['String']
}

export type ModiaEnhet = {
    __typename: 'ModiaEnhet'
    enhetId: Scalars['String']
    navn: Scalars['String']
}

export type Mutation = {
    __typename: 'Mutation'
    lagre?: Maybe<DigitaliseringsoppgaveResult>
    oppgaveTilbakeTilGosys?: Maybe<DigitaliseringsoppgaveStatus>
    updateModiaEnhet?: Maybe<ModiaContext>
}

export type MutationLagreArgs = {
    enhetId: Scalars['String']
    oppgaveId: Scalars['String']
    status: SykmeldingUnderArbeidStatus
    values: SykmeldingUnderArbeidValues
}

export type MutationOppgaveTilbakeTilGosysArgs = {
    oppgaveId: Scalars['String']
}

export type MutationUpdateModiaEnhetArgs = {
    enhetId: Scalars['String']
}

export type Navn = {
    __typename: 'Navn'
    etternavn: Scalars['String']
    fornavn: Scalars['String']
    mellomnavn?: Maybe<Scalars['String']>
}

export type OppgaveValues = {
    __typename: 'OppgaveValues'
    behandletTidspunkt?: Maybe<Scalars['DateTime']>
    biDiagnoser?: Maybe<Array<DiagnoseValue>>
    fnrPasient: Scalars['String']
    harAndreRelevanteOpplysninger?: Maybe<Scalars['Boolean']>
    hoveddiagnose?: Maybe<DiagnoseValue>
    perioder?: Maybe<Array<PeriodeValue>>
    skrevetLand?: Maybe<Scalars['String']>
}

export type OppholdAnnetSted = {
    __typename: 'OppholdAnnetSted'
    type?: Maybe<Scalars['String']>
}

export type Oppholdsadresse = Matrikkeladresse | OppholdAnnetSted | UtenlandskAdresse | Vegadresse

export type PeriodeInput = {
    fom: Scalars['Date']
    grad?: InputMaybe<Scalars['Int']>
    tom: Scalars['Date']
    type: PeriodeType
}

export enum PeriodeType {
    AktivitetIkkeMulig = 'AKTIVITET_IKKE_MULIG',
    Avventende = 'AVVENTENDE',
    Behandlingsdager = 'BEHANDLINGSDAGER',
    Gradert = 'GRADERT',
    Reisetilskudd = 'REISETILSKUDD',
}

export type PeriodeValue = {
    __typename: 'PeriodeValue'
    fom: Scalars['Date']
    grad?: Maybe<Scalars['Int']>
    tom: Scalars['Date']
    type: PeriodeType
}

export type Person = {
    __typename: 'Person'
    bostedsadresse?: Maybe<Bostedsadresse>
    navn?: Maybe<Scalars['String']>
    oppholdsadresse?: Maybe<Oppholdsadresse>
}

export type Query = {
    __typename: 'Query'
    _service: _Service
    modia?: Maybe<ModiaContext>
    oppgave?: Maybe<DigitaliseringsoppgaveResult>
}

export type QueryOppgaveArgs = {
    oppgaveId: Scalars['String']
}

export enum SykmeldingUnderArbeidStatus {
    Ferdigstilt = 'FERDIGSTILT',
    UnderArbeid = 'UNDER_ARBEID',
}

export type SykmeldingUnderArbeidValues = {
    behandletTidspunkt?: InputMaybe<Scalars['Date']>
    biDiagnoser?: InputMaybe<Array<DiagnoseInput>>
    fnrPasient: Scalars['String']
    harAndreRelevanteOpplysninger?: InputMaybe<Scalars['Boolean']>
    hovedDiagnose?: InputMaybe<DiagnoseInput>
    perioder?: InputMaybe<Array<PeriodeInput>>
    skrevetLand?: InputMaybe<Scalars['String']>
}

export enum SykmeldingsType {
    Innenlands = 'INNENLANDS',
    Utenlands = 'UTENLANDS',
}

export type UkjentBosted = {
    __typename: 'UkjentBosted'
    bostedskommune?: Maybe<Scalars['String']>
}

export type UtenlandskAdresse = {
    __typename: 'UtenlandskAdresse'
    adressenavnNummer?: Maybe<Scalars['String']>
    bySted?: Maybe<Scalars['String']>
    landkode: Scalars['String']
    postboksNummerNavn?: Maybe<Scalars['String']>
    postkode?: Maybe<Scalars['String']>
}

export type Vegadresse = {
    __typename: 'Vegadresse'
    adressenavn?: Maybe<Scalars['String']>
    husbokstav?: Maybe<Scalars['String']>
    husnummer?: Maybe<Scalars['String']>
    postnummer?: Maybe<Scalars['String']>
    poststed?: Maybe<Scalars['String']>
}

export type _Service = {
    __typename: '_Service'
    sdl: Scalars['String']
}

export type ModiaFragment = {
    __typename: 'ModiaContext'
    navn: string
    aktivEnhet?: string | null
    ident: string
    enheter: Array<{ __typename: 'ModiaEnhet'; navn: string; enhetId: string }>
}

export type ModiaContextQueryVariables = Exact<{ [key: string]: never }>

export type ModiaContextQuery = {
    __typename: 'Query'
    modia?: {
        __typename: 'ModiaContext'
        navn: string
        aktivEnhet?: string | null
        ident: string
        enheter: Array<{ __typename: 'ModiaEnhet'; navn: string; enhetId: string }>
    } | null
}

export type UpdateAktivEnhetMutationVariables = Exact<{
    enhetId: Scalars['String']
}>

export type UpdateAktivEnhetMutation = {
    __typename: 'Mutation'
    updateModiaEnhet?: {
        __typename: 'ModiaContext'
        navn: string
        aktivEnhet?: string | null
        ident: string
        enheter: Array<{ __typename: 'ModiaEnhet'; navn: string; enhetId: string }>
    } | null
}

export type PeriodeFragment = {
    __typename: 'PeriodeValue'
    fom: string
    tom: string
    type: PeriodeType
    grad?: number | null
}

export type DiagnoseFragment = { __typename: 'DiagnoseValue'; kode: string; tekst?: string | null; system: string }

export type OppgaveValuesFragment = {
    __typename: 'OppgaveValues'
    fnrPasient: string
    behandletTidspunkt?: string | null
    skrevetLand?: string | null
    harAndreRelevanteOpplysninger?: boolean | null
    perioder?: Array<{
        __typename: 'PeriodeValue'
        fom: string
        tom: string
        type: PeriodeType
        grad?: number | null
    }> | null
    hoveddiagnose?: { __typename: 'DiagnoseValue'; kode: string; tekst?: string | null; system: string } | null
    biDiagnoser?: Array<{ __typename: 'DiagnoseValue'; kode: string; tekst?: string | null; system: string }> | null
}

export type OppgaveFragment = {
    __typename: 'Digitaliseringsoppgave'
    oppgaveId: string
    person: {
        __typename: 'Person'
        navn?: string | null
        bostedsadresse?:
            | {
                  __typename: 'Matrikkeladresse'
                  bruksenhetsnummer?: string | null
                  postnummer?: string | null
                  poststed?: string | null
                  tilleggsnavn?: string | null
              }
            | { __typename: 'UkjentBosted'; bostedskommune?: string | null }
            | {
                  __typename: 'UtenlandskAdresse'
                  adressenavnNummer?: string | null
                  bySted?: string | null
                  landkode: string
                  postboksNummerNavn?: string | null
                  postkode?: string | null
              }
            | {
                  __typename: 'Vegadresse'
                  adressenavn?: string | null
                  husbokstav?: string | null
                  husnummer?: string | null
                  postnummer?: string | null
                  poststed?: string | null
              }
            | null
        oppholdsadresse?:
            | {
                  __typename: 'Matrikkeladresse'
                  bruksenhetsnummer?: string | null
                  postnummer?: string | null
                  poststed?: string | null
                  tilleggsnavn?: string | null
              }
            | { __typename: 'OppholdAnnetSted'; type?: string | null }
            | {
                  __typename: 'UtenlandskAdresse'
                  adressenavnNummer?: string | null
                  bySted?: string | null
                  landkode: string
                  postboksNummerNavn?: string | null
                  postkode?: string | null
              }
            | {
                  __typename: 'Vegadresse'
                  adressenavn?: string | null
                  husbokstav?: string | null
                  husnummer?: string | null
                  postnummer?: string | null
                  poststed?: string | null
              }
            | null
    }
    values: {
        __typename: 'OppgaveValues'
        fnrPasient: string
        behandletTidspunkt?: string | null
        skrevetLand?: string | null
        harAndreRelevanteOpplysninger?: boolean | null
        perioder?: Array<{
            __typename: 'PeriodeValue'
            fom: string
            tom: string
            type: PeriodeType
            grad?: number | null
        }> | null
        hoveddiagnose?: { __typename: 'DiagnoseValue'; kode: string; tekst?: string | null; system: string } | null
        biDiagnoser?: Array<{ __typename: 'DiagnoseValue'; kode: string; tekst?: string | null; system: string }> | null
    }
}

export type Bostedsadresse_Matrikkeladresse_Fragment = {
    __typename: 'Matrikkeladresse'
    bruksenhetsnummer?: string | null
    postnummer?: string | null
    poststed?: string | null
    tilleggsnavn?: string | null
}

export type Bostedsadresse_UkjentBosted_Fragment = { __typename: 'UkjentBosted'; bostedskommune?: string | null }

export type Bostedsadresse_UtenlandskAdresse_Fragment = {
    __typename: 'UtenlandskAdresse'
    adressenavnNummer?: string | null
    bySted?: string | null
    landkode: string
    postboksNummerNavn?: string | null
    postkode?: string | null
}

export type Bostedsadresse_Vegadresse_Fragment = {
    __typename: 'Vegadresse'
    adressenavn?: string | null
    husbokstav?: string | null
    husnummer?: string | null
    postnummer?: string | null
    poststed?: string | null
}

export type BostedsadresseFragment =
    | Bostedsadresse_Matrikkeladresse_Fragment
    | Bostedsadresse_UkjentBosted_Fragment
    | Bostedsadresse_UtenlandskAdresse_Fragment
    | Bostedsadresse_Vegadresse_Fragment

export type Oppholdsadresse_Matrikkeladresse_Fragment = {
    __typename: 'Matrikkeladresse'
    bruksenhetsnummer?: string | null
    postnummer?: string | null
    poststed?: string | null
    tilleggsnavn?: string | null
}

export type Oppholdsadresse_OppholdAnnetSted_Fragment = { __typename: 'OppholdAnnetSted'; type?: string | null }

export type Oppholdsadresse_UtenlandskAdresse_Fragment = {
    __typename: 'UtenlandskAdresse'
    adressenavnNummer?: string | null
    bySted?: string | null
    landkode: string
    postboksNummerNavn?: string | null
    postkode?: string | null
}

export type Oppholdsadresse_Vegadresse_Fragment = {
    __typename: 'Vegadresse'
    adressenavn?: string | null
    husbokstav?: string | null
    husnummer?: string | null
    postnummer?: string | null
    poststed?: string | null
}

export type OppholdsadresseFragment =
    | Oppholdsadresse_Matrikkeladresse_Fragment
    | Oppholdsadresse_OppholdAnnetSted_Fragment
    | Oppholdsadresse_UtenlandskAdresse_Fragment
    | Oppholdsadresse_Vegadresse_Fragment

export type MatrikkeladresseFragment = {
    __typename: 'Matrikkeladresse'
    bruksenhetsnummer?: string | null
    postnummer?: string | null
    poststed?: string | null
    tilleggsnavn?: string | null
}

export type UkjentBostedFragment = { __typename: 'UkjentBosted'; bostedskommune?: string | null }

export type UtenlandskAdresseFragment = {
    __typename: 'UtenlandskAdresse'
    adressenavnNummer?: string | null
    bySted?: string | null
    landkode: string
    postboksNummerNavn?: string | null
    postkode?: string | null
}

export type VegadresseFragment = {
    __typename: 'Vegadresse'
    adressenavn?: string | null
    husbokstav?: string | null
    husnummer?: string | null
    postnummer?: string | null
    poststed?: string | null
}

export type OppholdAnnetFragment = { __typename: 'OppholdAnnetSted'; type?: string | null }

export type DigitaliseringsoppgaveStatusFragment = {
    __typename: 'DigitaliseringsoppgaveStatus'
    oppgaveId: string
    status: DigitaliseringsoppgaveStatusEnum
}

export type DigitaliseringOppgaveResult_Digitaliseringsoppgave_Fragment = {
    __typename: 'Digitaliseringsoppgave'
    oppgaveId: string
    person: {
        __typename: 'Person'
        navn?: string | null
        bostedsadresse?:
            | {
                  __typename: 'Matrikkeladresse'
                  bruksenhetsnummer?: string | null
                  postnummer?: string | null
                  poststed?: string | null
                  tilleggsnavn?: string | null
              }
            | { __typename: 'UkjentBosted'; bostedskommune?: string | null }
            | {
                  __typename: 'UtenlandskAdresse'
                  adressenavnNummer?: string | null
                  bySted?: string | null
                  landkode: string
                  postboksNummerNavn?: string | null
                  postkode?: string | null
              }
            | {
                  __typename: 'Vegadresse'
                  adressenavn?: string | null
                  husbokstav?: string | null
                  husnummer?: string | null
                  postnummer?: string | null
                  poststed?: string | null
              }
            | null
        oppholdsadresse?:
            | {
                  __typename: 'Matrikkeladresse'
                  bruksenhetsnummer?: string | null
                  postnummer?: string | null
                  poststed?: string | null
                  tilleggsnavn?: string | null
              }
            | { __typename: 'OppholdAnnetSted'; type?: string | null }
            | {
                  __typename: 'UtenlandskAdresse'
                  adressenavnNummer?: string | null
                  bySted?: string | null
                  landkode: string
                  postboksNummerNavn?: string | null
                  postkode?: string | null
              }
            | {
                  __typename: 'Vegadresse'
                  adressenavn?: string | null
                  husbokstav?: string | null
                  husnummer?: string | null
                  postnummer?: string | null
                  poststed?: string | null
              }
            | null
    }
    values: {
        __typename: 'OppgaveValues'
        fnrPasient: string
        behandletTidspunkt?: string | null
        skrevetLand?: string | null
        harAndreRelevanteOpplysninger?: boolean | null
        perioder?: Array<{
            __typename: 'PeriodeValue'
            fom: string
            tom: string
            type: PeriodeType
            grad?: number | null
        }> | null
        hoveddiagnose?: { __typename: 'DiagnoseValue'; kode: string; tekst?: string | null; system: string } | null
        biDiagnoser?: Array<{ __typename: 'DiagnoseValue'; kode: string; tekst?: string | null; system: string }> | null
    }
}

export type DigitaliseringOppgaveResult_DigitaliseringsoppgaveStatus_Fragment = {
    __typename: 'DigitaliseringsoppgaveStatus'
    oppgaveId: string
    status: DigitaliseringsoppgaveStatusEnum
}

export type DigitaliseringOppgaveResultFragment =
    | DigitaliseringOppgaveResult_Digitaliseringsoppgave_Fragment
    | DigitaliseringOppgaveResult_DigitaliseringsoppgaveStatus_Fragment

export type OppgaveByIdQueryVariables = Exact<{
    oppgaveId: Scalars['String']
}>

export type OppgaveByIdQuery = {
    __typename: 'Query'
    oppgave?:
        | {
              __typename: 'Digitaliseringsoppgave'
              oppgaveId: string
              person: {
                  __typename: 'Person'
                  navn?: string | null
                  bostedsadresse?:
                      | {
                            __typename: 'Matrikkeladresse'
                            bruksenhetsnummer?: string | null
                            postnummer?: string | null
                            poststed?: string | null
                            tilleggsnavn?: string | null
                        }
                      | { __typename: 'UkjentBosted'; bostedskommune?: string | null }
                      | {
                            __typename: 'UtenlandskAdresse'
                            adressenavnNummer?: string | null
                            bySted?: string | null
                            landkode: string
                            postboksNummerNavn?: string | null
                            postkode?: string | null
                        }
                      | {
                            __typename: 'Vegadresse'
                            adressenavn?: string | null
                            husbokstav?: string | null
                            husnummer?: string | null
                            postnummer?: string | null
                            poststed?: string | null
                        }
                      | null
                  oppholdsadresse?:
                      | {
                            __typename: 'Matrikkeladresse'
                            bruksenhetsnummer?: string | null
                            postnummer?: string | null
                            poststed?: string | null
                            tilleggsnavn?: string | null
                        }
                      | { __typename: 'OppholdAnnetSted'; type?: string | null }
                      | {
                            __typename: 'UtenlandskAdresse'
                            adressenavnNummer?: string | null
                            bySted?: string | null
                            landkode: string
                            postboksNummerNavn?: string | null
                            postkode?: string | null
                        }
                      | {
                            __typename: 'Vegadresse'
                            adressenavn?: string | null
                            husbokstav?: string | null
                            husnummer?: string | null
                            postnummer?: string | null
                            poststed?: string | null
                        }
                      | null
              }
              values: {
                  __typename: 'OppgaveValues'
                  fnrPasient: string
                  behandletTidspunkt?: string | null
                  skrevetLand?: string | null
                  harAndreRelevanteOpplysninger?: boolean | null
                  perioder?: Array<{
                      __typename: 'PeriodeValue'
                      fom: string
                      tom: string
                      type: PeriodeType
                      grad?: number | null
                  }> | null
                  hoveddiagnose?: {
                      __typename: 'DiagnoseValue'
                      kode: string
                      tekst?: string | null
                      system: string
                  } | null
                  biDiagnoser?: Array<{
                      __typename: 'DiagnoseValue'
                      kode: string
                      tekst?: string | null
                      system: string
                  }> | null
              }
          }
        | { __typename: 'DigitaliseringsoppgaveStatus'; oppgaveId: string; status: DigitaliseringsoppgaveStatusEnum }
        | null
}

export type SaveOppgaveMutationVariables = Exact<{
    id: Scalars['String']
    values: SykmeldingUnderArbeidValues
    status: SykmeldingUnderArbeidStatus
    enhetId: Scalars['String']
}>

export type SaveOppgaveMutation = {
    __typename: 'Mutation'
    lagre?:
        | {
              __typename: 'Digitaliseringsoppgave'
              oppgaveId: string
              person: {
                  __typename: 'Person'
                  navn?: string | null
                  bostedsadresse?:
                      | {
                            __typename: 'Matrikkeladresse'
                            bruksenhetsnummer?: string | null
                            postnummer?: string | null
                            poststed?: string | null
                            tilleggsnavn?: string | null
                        }
                      | { __typename: 'UkjentBosted'; bostedskommune?: string | null }
                      | {
                            __typename: 'UtenlandskAdresse'
                            adressenavnNummer?: string | null
                            bySted?: string | null
                            landkode: string
                            postboksNummerNavn?: string | null
                            postkode?: string | null
                        }
                      | {
                            __typename: 'Vegadresse'
                            adressenavn?: string | null
                            husbokstav?: string | null
                            husnummer?: string | null
                            postnummer?: string | null
                            poststed?: string | null
                        }
                      | null
                  oppholdsadresse?:
                      | {
                            __typename: 'Matrikkeladresse'
                            bruksenhetsnummer?: string | null
                            postnummer?: string | null
                            poststed?: string | null
                            tilleggsnavn?: string | null
                        }
                      | { __typename: 'OppholdAnnetSted'; type?: string | null }
                      | {
                            __typename: 'UtenlandskAdresse'
                            adressenavnNummer?: string | null
                            bySted?: string | null
                            landkode: string
                            postboksNummerNavn?: string | null
                            postkode?: string | null
                        }
                      | {
                            __typename: 'Vegadresse'
                            adressenavn?: string | null
                            husbokstav?: string | null
                            husnummer?: string | null
                            postnummer?: string | null
                            poststed?: string | null
                        }
                      | null
              }
              values: {
                  __typename: 'OppgaveValues'
                  fnrPasient: string
                  behandletTidspunkt?: string | null
                  skrevetLand?: string | null
                  harAndreRelevanteOpplysninger?: boolean | null
                  perioder?: Array<{
                      __typename: 'PeriodeValue'
                      fom: string
                      tom: string
                      type: PeriodeType
                      grad?: number | null
                  }> | null
                  hoveddiagnose?: {
                      __typename: 'DiagnoseValue'
                      kode: string
                      tekst?: string | null
                      system: string
                  } | null
                  biDiagnoser?: Array<{
                      __typename: 'DiagnoseValue'
                      kode: string
                      tekst?: string | null
                      system: string
                  }> | null
              }
          }
        | { __typename: 'DigitaliseringsoppgaveStatus'; oppgaveId: string; status: DigitaliseringsoppgaveStatusEnum }
        | null
}

export type TilbakeTilGosysMutationVariables = Exact<{
    oppgaveId: Scalars['String']
}>

export type TilbakeTilGosysMutation = {
    __typename: 'Mutation'
    oppgaveTilbakeTilGosys?: {
        __typename: 'DigitaliseringsoppgaveStatus'
        oppgaveId: string
        status: DigitaliseringsoppgaveStatusEnum
    } | null
}

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
} as unknown as DocumentNode<ModiaFragment, unknown>
export const VegadresseFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Vegadresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vegadresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'adressenavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'husbokstav' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'husnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'poststed' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<VegadresseFragment, unknown>
export const MatrikkeladresseFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Matrikkeladresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Matrikkeladresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'bruksenhetsnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'poststed' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tilleggsnavn' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<MatrikkeladresseFragment, unknown>
export const UtenlandskAdresseFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'UtenlandskAdresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'adressenavnNummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'bySted' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'landkode' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postboksNummerNavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postkode' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<UtenlandskAdresseFragment, unknown>
export const UkjentBostedFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'UkjentBosted' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UkjentBosted' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'bostedskommune' } }],
            },
        },
    ],
} as unknown as DocumentNode<UkjentBostedFragment, unknown>
export const BostedsadresseFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Bostedsadresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Bostedsadresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vegadresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Vegadresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Matrikkeladresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Matrikkeladresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UkjentBosted' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'UkjentBosted' } }],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<BostedsadresseFragment, unknown>
export const OppholdAnnetFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'OppholdAnnet' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppholdAnnetSted' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'type' } }],
            },
        },
    ],
} as unknown as DocumentNode<OppholdAnnetFragment, unknown>
export const OppholdsadresseFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Oppholdsadresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Oppholdsadresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vegadresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Vegadresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Matrikkeladresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Matrikkeladresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppholdAnnetSted' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'OppholdAnnet' } }],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<OppholdsadresseFragment, unknown>
export const PeriodeFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Periode' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PeriodeValue' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'grad' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<PeriodeFragment, unknown>
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
} as unknown as DocumentNode<DiagnoseFragment, unknown>
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
                        name: { kind: 'Name', value: 'perioder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Periode' } }],
                        },
                    },
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
                    { kind: 'Field', name: { kind: 'Name', value: 'harAndreRelevanteOpplysninger' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<OppgaveValuesFragment, unknown>
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
                                { kind: 'Field', name: { kind: 'Name', value: 'navn' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'bostedsadresse' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'FragmentSpread', name: { kind: 'Name', value: 'Bostedsadresse' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'oppholdsadresse' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'FragmentSpread',
                                                name: { kind: 'Name', value: 'Oppholdsadresse' },
                                            },
                                        ],
                                    },
                                },
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
} as unknown as DocumentNode<OppgaveFragment, unknown>
export const DigitaliseringsoppgaveStatusFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'DigitaliseringsoppgaveStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DigitaliseringsoppgaveStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<DigitaliseringsoppgaveStatusFragment, unknown>
export const DigitaliseringOppgaveResultFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'DigitaliseringOppgaveResult' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DigitaliseringsoppgaveResult' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'FragmentSpread', name: { kind: 'Name', value: 'Oppgave' } },
                    { kind: 'FragmentSpread', name: { kind: 'Name', value: 'DigitaliseringsoppgaveStatus' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<DigitaliseringOppgaveResultFragment, unknown>
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
} as unknown as DocumentNode<ModiaContextQuery, ModiaContextQueryVariables>
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
} as unknown as DocumentNode<UpdateAktivEnhetMutation, UpdateAktivEnhetMutationVariables>
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
                            selections: [
                                {
                                    kind: 'FragmentSpread',
                                    name: { kind: 'Name', value: 'DigitaliseringOppgaveResult' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        ...DigitaliseringOppgaveResultFragmentDoc.definitions,
        ...OppgaveFragmentDoc.definitions,
        ...BostedsadresseFragmentDoc.definitions,
        ...VegadresseFragmentDoc.definitions,
        ...MatrikkeladresseFragmentDoc.definitions,
        ...UtenlandskAdresseFragmentDoc.definitions,
        ...UkjentBostedFragmentDoc.definitions,
        ...OppholdsadresseFragmentDoc.definitions,
        ...OppholdAnnetFragmentDoc.definitions,
        ...OppgaveValuesFragmentDoc.definitions,
        ...PeriodeFragmentDoc.definitions,
        ...DiagnoseFragmentDoc.definitions,
        ...DigitaliseringsoppgaveStatusFragmentDoc.definitions,
    ],
} as unknown as DocumentNode<OppgaveByIdQuery, OppgaveByIdQueryVariables>
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
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'enhetId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'enhetId' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'FragmentSpread',
                                    name: { kind: 'Name', value: 'DigitaliseringOppgaveResult' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        ...DigitaliseringOppgaveResultFragmentDoc.definitions,
        ...OppgaveFragmentDoc.definitions,
        ...BostedsadresseFragmentDoc.definitions,
        ...VegadresseFragmentDoc.definitions,
        ...MatrikkeladresseFragmentDoc.definitions,
        ...UtenlandskAdresseFragmentDoc.definitions,
        ...UkjentBostedFragmentDoc.definitions,
        ...OppholdsadresseFragmentDoc.definitions,
        ...OppholdAnnetFragmentDoc.definitions,
        ...OppgaveValuesFragmentDoc.definitions,
        ...PeriodeFragmentDoc.definitions,
        ...DiagnoseFragmentDoc.definitions,
        ...DigitaliseringsoppgaveStatusFragmentDoc.definitions,
    ],
} as unknown as DocumentNode<SaveOppgaveMutation, SaveOppgaveMutationVariables>
export const TilbakeTilGosysDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'TilbakeTilGosys' },
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
                        name: { kind: 'Name', value: 'oppgaveTilbakeTilGosys' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'oppgaveId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'oppgaveId' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'FragmentSpread',
                                    name: { kind: 'Name', value: 'DigitaliseringsoppgaveStatus' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        ...DigitaliseringsoppgaveStatusFragmentDoc.definitions,
    ],
} as unknown as DocumentNode<TilbakeTilGosysMutation, TilbakeTilGosysMutationVariables>
