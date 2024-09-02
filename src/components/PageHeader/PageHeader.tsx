'use client'

import React, { PropsWithChildren, ReactElement } from 'react'
import Link from 'next/link'
import { Select, InternalHeader } from '@navikt/ds-react'

import { bundledEnv } from '../../utils/env'
import { useModiaContext } from '../../modia/modia-context'

function PageHeader({ children }: PropsWithChildren): ReactElement {
    const modiaContext = useModiaContext()

    return (
        <InternalHeader className="justify-between">
            <HeaderText />
            <div className="flex gap-3">
                {children}
                {'errorType' in modiaContext.modia ? (
                    <InternalHeader.User name="Feil under lasting" description="Klarte ikke å laste enhet" />
                ) : (
                    <>
                        <div data-theme="dark">
                            <Select
                                label=""
                                size="small"
                                value={modiaContext.selectedEnhetId ?? ''}
                                onChange={(event) => {
                                    modiaContext.setSelectedEnhetId(event.target.value)
                                }}
                            >
                                {modiaContext.modia.enheter.map((enhet) => (
                                    <option key={enhet.enhetId} value={enhet.enhetId}>
                                        {enhet.enhetId} {enhet.navn}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <InternalHeader.User
                            name={`${modiaContext.modia.fornavn} ${modiaContext.modia.etternavn}`}
                            description={`Enhet: ${modiaContext.selectedEnhetId ?? 'Ingen enhet valgt'}`}
                        />
                    </>
                )}
            </div>
        </InternalHeader>
    )
}

function HeaderText(): ReactElement {
    if (bundledEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === 'production') {
        return <InternalHeader.Title as="div">Digitalisering av sykmeldinger</InternalHeader.Title>
    }

    return (
        <InternalHeader.Title as={Link} href="/">
            Digitalisering av sykmeldinger
        </InternalHeader.Title>
    )
}

export default PageHeader
