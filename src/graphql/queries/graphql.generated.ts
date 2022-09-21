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
};

export type Adresse = {
    __typename: 'Adresse';
    gateadresse?: Maybe<Scalars['String']>;
    land?: Maybe<Scalars['String']>;
    postnummer?: Maybe<Scalars['String']>;
    poststed?: Maybe<Scalars['String']>;
    type?: Maybe<Scalars['String']>;
};

export type Arbeidsgiver = {
    __typename: 'Arbeidsgiver';
    navn: Scalars['String'];
    orgnummer?: Maybe<Scalars['String']>;
};

export type ArbeidsgiverInput = {
    navn: Scalars['String'];
    orgnummer?: InputMaybe<Scalars['String']>;
};

export type Digitaliseringsoppgave = {
    __typename: 'Digitaliseringsoppgave';
    oppgaveId: Scalars['String'];
    pdf?: Maybe<Scalars['String']>;
    person: Person;
    sykmeldingId: Scalars['String'];
};

export type DigitaliseringsoppgaveRespons = {
    __typename: 'DigitaliseringsoppgaveRespons';
    digitaliseringsoppgave?: Maybe<Digitaliseringsoppgave>;
    error?: Maybe<Scalars['String']>;
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
    minMutation: Arbeidsgiver;
    updateModiaEnhet?: Maybe<ModiaContext>;
};

export type MutationMinMutationArgs = {
    arbeidsgiver: ArbeidsgiverInput;
};

export type MutationUpdateModiaEnhetArgs = {
    enhetId: Scalars['String'];
};

export type Person = {
    __typename: 'Person';
    adresser: Array<Adresse>;
    fnr: Scalars['String'];
    navn?: Maybe<Scalars['String']>;
};

export type Query = {
    __typename: 'Query';
    arbeidsgivere: Array<Arbeidsgiver>;
    modia?: Maybe<ModiaContext>;
    oppgave?: Maybe<DigitaliseringsoppgaveRespons>;
    utenlandssykmelding: Array<UtenlandsSykmelding>;
};

export type QueryOppgaveArgs = {
    oppgaveId: Scalars['String'];
};

export type QueryUtenlandssykmeldingArgs = {
    id: Scalars['String'];
};

export type UtenlandsSykmelding = {
    __typename: 'UtenlandsSykmelding';
    fnr: Scalars['String'];
    id: Scalars['String'];
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

export type ArbeidsgivereTestQueryQueryVariables = Exact<{ [key: string]: never }>;

export type ArbeidsgivereTestQueryQuery = {
    __typename: 'Query';
    arbeidsgivere: Array<{ __typename: 'Arbeidsgiver'; navn: string; orgnummer?: string | null }>;
};

export type OppgaveByIdQueryVariables = Exact<{
    oppgaveId: Scalars['String'];
}>;

export type OppgaveByIdQuery = {
    __typename: 'Query';
    oppgave?: {
        __typename: 'DigitaliseringsoppgaveRespons';
        error?: string | null;
        digitaliseringsoppgave?: {
            __typename: 'Digitaliseringsoppgave';
            oppgaveId: string;
            sykmeldingId: string;
            pdf?: string | null;
            person: { __typename: 'Person'; fnr: string; navn?: string | null };
        } | null;
    } | null;
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
export const ArbeidsgivereTestQueryDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'ArbeidsgivereTestQuery' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsgivere' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'navn' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'orgnummer' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<ArbeidsgivereTestQueryQuery, ArbeidsgivereTestQueryQueryVariables>;
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
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'digitaliseringsoppgave' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'sykmeldingId' } },
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
                                            { kind: 'Field', name: { kind: 'Name', value: 'pdf' } },
                                        ],
                                    },
                                },
                                { kind: 'Field', name: { kind: 'Name', value: 'error' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<OppgaveByIdQuery, OppgaveByIdQueryVariables>;
