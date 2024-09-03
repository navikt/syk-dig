import React, { PropsWithChildren, ReactElement } from 'react'
import { BodyShort, Heading } from '@navikt/ds-react'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import { nb } from 'date-fns/locale'

import { useFlag } from '../../../../toggles/context'

import changelogAnimation from './split-view.webp'

export function ChangelogContent(): ReactElement {
    const flexjarToggle = useFlag('SYK_DIG_FLEXJAR_HEADER')

    return (
        <div className="max-w-md">
            {flexjarToggle.enabled && (
                <ChangelogItem date="2024-09-03">
                    <BodyShort>
                        Send oss en anonym tilbakemelding! Trykk på tilbakemelding-knappen og fortell oss hva du synes,
                        eller hva vi kan gjøre bedre.
                    </BodyShort>
                </ChangelogItem>
            )}
            <ChangelogItem date="2024-08-29">
                <BodyShort>
                    Du kan nå endre størrelsen på skjemaet og dokumentene. Dette kan du gjøre ved å bruke musen til å
                    dra på linjen i mellom de to seksjonene,
                </BodyShort>
                <Image
                    src={changelogAnimation}
                    alt="Animasjon som viser endring av størrelse"
                    fetchPriority="low"
                    className="mt-2 w-full"
                    unoptimized
                />
            </ChangelogItem>
        </div>
    )
}

function ChangelogItem({ date, children }: PropsWithChildren<{ date: string }>): ReactElement {
    return (
        <section aria-labelledby={date} className="mb-4">
            <Heading level="3" size="small" id={date} spacing>
                {format(parseISO(date), 'd. MMMM y', { locale: nb })}
            </Heading>
            {children}
        </section>
    )
}
