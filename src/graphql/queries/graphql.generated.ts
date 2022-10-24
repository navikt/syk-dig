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
    Date: string;
    DateTime: string;
    UUID: any;
};

export type Bostedsadresse = Matrikkeladresse | UkjentBosted | UtenlandskAdresse | Vegadresse;

export type DiagnoseInput = {
    kode: Scalars['String'];
    system: Scalars['String'];
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

export type Matrikkeladresse = {
    __typename: 'Matrikkeladresse';
    bruksenhetsnummer?: Maybe<Scalars['String']>;
    postnummer?: Maybe<Scalars['String']>;
    poststed?: Maybe<Scalars['String']>;
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
    behandletTidspunkt?: Maybe<Scalars['DateTime']>;
    biDiagnoser?: Maybe<Array<DiagnoseValue>>;
    fnrPasient?: Maybe<Scalars['String']>;
    hoveddiagnose?: Maybe<DiagnoseValue>;
    perioder?: Maybe<Array<PeriodeValue>>;
    skrevetLand?: Maybe<Scalars['String']>;
};

export type OppholdAnnetSted = {
    __typename: 'OppholdAnnetSted';
    type?: Maybe<Scalars['String']>;
};

export type Oppholdsadresse = Matrikkeladresse | OppholdAnnetSted | UtenlandskAdresse | Vegadresse;

export type PeriodeInput = {
    fom: Scalars['Date'];
    grad?: InputMaybe<Scalars['Int']>;
    tom: Scalars['Date'];
    type: PeriodeType;
};

export enum PeriodeType {
    AktivitetIkkeMulig = 'AKTIVITET_IKKE_MULIG',
    Avventende = 'AVVENTENDE',
    Behandlingsdager = 'BEHANDLINGSDAGER',
    Gradert = 'GRADERT',
    Reisetilskudd = 'REISETILSKUDD',
}

export type PeriodeValue = {
    __typename: 'PeriodeValue';
    fom: Scalars['Date'];
    grad?: Maybe<Scalars['Int']>;
    tom: Scalars['Date'];
    type: PeriodeType;
};

export type Person = {
    __typename: 'Person';
    bostedsadresse?: Maybe<Bostedsadresse>;
    fnr: Scalars['String'];
    navn?: Maybe<Scalars['String']>;
    oppholdsadresse?: Maybe<Oppholdsadresse>;
};

export type Query = {
    __typename: 'Query';
    modia?: Maybe<ModiaContext>;
    oppgave: Digitaliseringsoppgave;
};

export type QueryOppgaveArgs = {
    oppgaveId: Scalars['String'];
};

export enum SykmeldingUnderArbeidStatus {
    Ferdigstilt = 'FERDIGSTILT',
    UnderArbeid = 'UNDER_ARBEID',
}

export type SykmeldingUnderArbeidValues = {
    behandletTidspunkt?: InputMaybe<Scalars['String']>;
    biDiagnoser?: InputMaybe<Array<DiagnoseInput>>;
    fnrPasient?: InputMaybe<Scalars['String']>;
    hovedDiagnose?: InputMaybe<DiagnoseInput>;
    perioder?: InputMaybe<Array<PeriodeInput>>;
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
    landkode: Scalars['String'];
    postboksNummerNavn?: Maybe<Scalars['String']>;
    postkode?: Maybe<Scalars['String']>;
};

export type Vegadresse = {
    __typename: 'Vegadresse';
    adressenavn?: Maybe<Scalars['String']>;
    husbokstav?: Maybe<Scalars['String']>;
    husnummer?: Maybe<Scalars['String']>;
    postnummer?: Maybe<Scalars['String']>;
    poststed?: Maybe<Scalars['String']>;
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

export type PeriodeFragment = {
    __typename: 'PeriodeValue';
    fom: string;
    tom: string;
    type: PeriodeType;
    grad?: number | null;
};

export type DiagnoseFragment = { __typename: 'DiagnoseValue'; kode: string; tekst?: string | null; system: string };

export type OppgaveValuesFragment = {
    __typename: 'OppgaveValues';
    fnrPasient?: string | null;
    behandletTidspunkt?: string | null;
    skrevetLand?: string | null;
    perioder?: Array<{
        __typename: 'PeriodeValue';
        fom: string;
        tom: string;
        type: PeriodeType;
        grad?: number | null;
    }> | null;
    hoveddiagnose?: { __typename: 'DiagnoseValue'; kode: string; tekst?: string | null; system: string } | null;
    biDiagnoser?: Array<{ __typename: 'DiagnoseValue'; kode: string; tekst?: string | null; system: string }> | null;
};

export type OppgaveFragment = {
    __typename: 'Digitaliseringsoppgave';
    oppgaveId: string;
    person: {
        __typename: 'Person';
        fnr: string;
        navn?: string | null;
        bostedsadresse?:
            | {
                  __typename: 'Matrikkeladresse';
                  bruksenhetsnummer?: string | null;
                  postnummer?: string | null;
                  poststed?: string | null;
                  tilleggsnavn?: string | null;
              }
            | { __typename: 'UkjentBosted'; bostedskommune?: string | null }
            | {
                  __typename: 'UtenlandskAdresse';
                  adressenavnNummer?: string | null;
                  bySted?: string | null;
                  landkode: string;
                  postboksNummerNavn?: string | null;
                  postkode?: string | null;
              }
            | {
                  __typename: 'Vegadresse';
                  adressenavn?: string | null;
                  husbokstav?: string | null;
                  husnummer?: string | null;
                  postnummer?: string | null;
                  poststed?: string | null;
              }
            | null;
        oppholdsadresse?:
            | {
                  __typename: 'Matrikkeladresse';
                  bruksenhetsnummer?: string | null;
                  postnummer?: string | null;
                  poststed?: string | null;
                  tilleggsnavn?: string | null;
              }
            | { __typename: 'OppholdAnnetSted'; type?: string | null }
            | {
                  __typename: 'UtenlandskAdresse';
                  adressenavnNummer?: string | null;
                  bySted?: string | null;
                  landkode: string;
                  postboksNummerNavn?: string | null;
                  postkode?: string | null;
              }
            | {
                  __typename: 'Vegadresse';
                  adressenavn?: string | null;
                  husbokstav?: string | null;
                  husnummer?: string | null;
                  postnummer?: string | null;
                  poststed?: string | null;
              }
            | null;
    };
    values: {
        __typename: 'OppgaveValues';
        fnrPasient?: string | null;
        behandletTidspunkt?: string | null;
        skrevetLand?: string | null;
        perioder?: Array<{
            __typename: 'PeriodeValue';
            fom: string;
            tom: string;
            type: PeriodeType;
            grad?: number | null;
        }> | null;
        hoveddiagnose?: { __typename: 'DiagnoseValue'; kode: string; tekst?: string | null; system: string } | null;
        biDiagnoser?: Array<{
            __typename: 'DiagnoseValue';
            kode: string;
            tekst?: string | null;
            system: string;
        }> | null;
    };
};

export type Bostedsadresse_Matrikkeladresse_Fragment = {
    __typename: 'Matrikkeladresse';
    bruksenhetsnummer?: string | null;
    postnummer?: string | null;
    poststed?: string | null;
    tilleggsnavn?: string | null;
};

export type Bostedsadresse_UkjentBosted_Fragment = { __typename: 'UkjentBosted'; bostedskommune?: string | null };

export type Bostedsadresse_UtenlandskAdresse_Fragment = {
    __typename: 'UtenlandskAdresse';
    adressenavnNummer?: string | null;
    bySted?: string | null;
    landkode: string;
    postboksNummerNavn?: string | null;
    postkode?: string | null;
};

export type Bostedsadresse_Vegadresse_Fragment = {
    __typename: 'Vegadresse';
    adressenavn?: string | null;
    husbokstav?: string | null;
    husnummer?: string | null;
    postnummer?: string | null;
    poststed?: string | null;
};

export type BostedsadresseFragment =
    | Bostedsadresse_Matrikkeladresse_Fragment
    | Bostedsadresse_UkjentBosted_Fragment
    | Bostedsadresse_UtenlandskAdresse_Fragment
    | Bostedsadresse_Vegadresse_Fragment;

export type Oppholdsadresse_Matrikkeladresse_Fragment = {
    __typename: 'Matrikkeladresse';
    bruksenhetsnummer?: string | null;
    postnummer?: string | null;
    poststed?: string | null;
    tilleggsnavn?: string | null;
};

export type Oppholdsadresse_OppholdAnnetSted_Fragment = { __typename: 'OppholdAnnetSted'; type?: string | null };

export type Oppholdsadresse_UtenlandskAdresse_Fragment = {
    __typename: 'UtenlandskAdresse';
    adressenavnNummer?: string | null;
    bySted?: string | null;
    landkode: string;
    postboksNummerNavn?: string | null;
    postkode?: string | null;
};

export type Oppholdsadresse_Vegadresse_Fragment = {
    __typename: 'Vegadresse';
    adressenavn?: string | null;
    husbokstav?: string | null;
    husnummer?: string | null;
    postnummer?: string | null;
    poststed?: string | null;
};

export type OppholdsadresseFragment =
    | Oppholdsadresse_Matrikkeladresse_Fragment
    | Oppholdsadresse_OppholdAnnetSted_Fragment
    | Oppholdsadresse_UtenlandskAdresse_Fragment
    | Oppholdsadresse_Vegadresse_Fragment;

export type MatrikkeladresseFragment = {
    __typename: 'Matrikkeladresse';
    bruksenhetsnummer?: string | null;
    postnummer?: string | null;
    poststed?: string | null;
    tilleggsnavn?: string | null;
};

export type UkjentBostedFragment = { __typename: 'UkjentBosted'; bostedskommune?: string | null };

export type UtenlandskAdresseFragment = {
    __typename: 'UtenlandskAdresse';
    adressenavnNummer?: string | null;
    bySted?: string | null;
    landkode: string;
    postboksNummerNavn?: string | null;
    postkode?: string | null;
};

export type VegadresseFragment = {
    __typename: 'Vegadresse';
    adressenavn?: string | null;
    husbokstav?: string | null;
    husnummer?: string | null;
    postnummer?: string | null;
    poststed?: string | null;
};

export type OppholdAnnetFragment = { __typename: 'OppholdAnnetSted'; type?: string | null };

export type OppgaveByIdQueryVariables = Exact<{
    oppgaveId: Scalars['String'];
}>;

export type OppgaveByIdQuery = {
    __typename: 'Query';
    oppgave: {
        __typename: 'Digitaliseringsoppgave';
        oppgaveId: string;
        person: {
            __typename: 'Person';
            fnr: string;
            navn?: string | null;
            bostedsadresse?:
                | {
                      __typename: 'Matrikkeladresse';
                      bruksenhetsnummer?: string | null;
                      postnummer?: string | null;
                      poststed?: string | null;
                      tilleggsnavn?: string | null;
                  }
                | { __typename: 'UkjentBosted'; bostedskommune?: string | null }
                | {
                      __typename: 'UtenlandskAdresse';
                      adressenavnNummer?: string | null;
                      bySted?: string | null;
                      landkode: string;
                      postboksNummerNavn?: string | null;
                      postkode?: string | null;
                  }
                | {
                      __typename: 'Vegadresse';
                      adressenavn?: string | null;
                      husbokstav?: string | null;
                      husnummer?: string | null;
                      postnummer?: string | null;
                      poststed?: string | null;
                  }
                | null;
            oppholdsadresse?:
                | {
                      __typename: 'Matrikkeladresse';
                      bruksenhetsnummer?: string | null;
                      postnummer?: string | null;
                      poststed?: string | null;
                      tilleggsnavn?: string | null;
                  }
                | { __typename: 'OppholdAnnetSted'; type?: string | null }
                | {
                      __typename: 'UtenlandskAdresse';
                      adressenavnNummer?: string | null;
                      bySted?: string | null;
                      landkode: string;
                      postboksNummerNavn?: string | null;
                      postkode?: string | null;
                  }
                | {
                      __typename: 'Vegadresse';
                      adressenavn?: string | null;
                      husbokstav?: string | null;
                      husnummer?: string | null;
                      postnummer?: string | null;
                      poststed?: string | null;
                  }
                | null;
        };
        values: {
            __typename: 'OppgaveValues';
            fnrPasient?: string | null;
            behandletTidspunkt?: string | null;
            skrevetLand?: string | null;
            perioder?: Array<{
                __typename: 'PeriodeValue';
                fom: string;
                tom: string;
                type: PeriodeType;
                grad?: number | null;
            }> | null;
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
        person: {
            __typename: 'Person';
            fnr: string;
            navn?: string | null;
            bostedsadresse?:
                | {
                      __typename: 'Matrikkeladresse';
                      bruksenhetsnummer?: string | null;
                      postnummer?: string | null;
                      poststed?: string | null;
                      tilleggsnavn?: string | null;
                  }
                | { __typename: 'UkjentBosted'; bostedskommune?: string | null }
                | {
                      __typename: 'UtenlandskAdresse';
                      adressenavnNummer?: string | null;
                      bySted?: string | null;
                      landkode: string;
                      postboksNummerNavn?: string | null;
                      postkode?: string | null;
                  }
                | {
                      __typename: 'Vegadresse';
                      adressenavn?: string | null;
                      husbokstav?: string | null;
                      husnummer?: string | null;
                      postnummer?: string | null;
                      poststed?: string | null;
                  }
                | null;
            oppholdsadresse?:
                | {
                      __typename: 'Matrikkeladresse';
                      bruksenhetsnummer?: string | null;
                      postnummer?: string | null;
                      poststed?: string | null;
                      tilleggsnavn?: string | null;
                  }
                | { __typename: 'OppholdAnnetSted'; type?: string | null }
                | {
                      __typename: 'UtenlandskAdresse';
                      adressenavnNummer?: string | null;
                      bySted?: string | null;
                      landkode: string;
                      postboksNummerNavn?: string | null;
                      postkode?: string | null;
                  }
                | {
                      __typename: 'Vegadresse';
                      adressenavn?: string | null;
                      husbokstav?: string | null;
                      husnummer?: string | null;
                      postnummer?: string | null;
                      poststed?: string | null;
                  }
                | null;
        };
        values: {
            __typename: 'OppgaveValues';
            fnrPasient?: string | null;
            behandletTidspunkt?: string | null;
            skrevetLand?: string | null;
            perioder?: Array<{
                __typename: 'PeriodeValue';
                fom: string;
                tom: string;
                type: PeriodeType;
                grad?: number | null;
            }> | null;
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
} as unknown as DocumentNode<VegadresseFragment, unknown>;
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
} as unknown as DocumentNode<MatrikkeladresseFragment, unknown>;
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
} as unknown as DocumentNode<UtenlandskAdresseFragment, unknown>;
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
} as unknown as DocumentNode<UkjentBostedFragment, unknown>;
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
} as unknown as DocumentNode<BostedsadresseFragment, unknown>;
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
} as unknown as DocumentNode<OppholdAnnetFragment, unknown>;
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
} as unknown as DocumentNode<OppholdsadresseFragment, unknown>;
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
} as unknown as DocumentNode<PeriodeFragment, unknown>;
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
    ],
} as unknown as DocumentNode<SaveOppgaveMutation, SaveOppgaveMutationVariables>;
