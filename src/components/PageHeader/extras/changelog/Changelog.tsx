'use client'

import React, { ReactElement, useRef, useState } from 'react'
import { NewspaperIcon } from '@navikt/aksel-icons'
import { Button, Heading, Popover } from '@navikt/ds-react'

import analytics from '../../../../utils/analytics'

import { ChangelogContent } from './ChangelogContent'

export const CURRENT_CHANGELOG_ID = '1'

interface Props {
    defaultChangelogKey: string | '0'
}

function Changelog({ defaultChangelogKey }: Props): ReactElement {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [openState, setOpenState] = useState(false)
    const [hasBeenOpened, setHasBeenOpened] = useState(false)

    return (
        <div data-theme="light">
            <Button
                ref={buttonRef}
                variant="tertiary-neutral"
                icon={<NewspaperIcon />}
                data-theme="dark"
                className="text-white hover:text-gray-300 grow-0 relative"
                size="small"
                onClick={() => {
                    if (!openState) {
                        document.cookie = `syk-dig-changelog-key=${CURRENT_CHANGELOG_ID};path=/;SameSite=Strict;expires=Fri, 31 Dec 9999 23:59:59 GMT`
                        analytics.changelogOpened()
                    }
                    setOpenState((b) => !b)
                    setHasBeenOpened(true)
                }}
            >
                {defaultChangelogKey !== CURRENT_CHANGELOG_ID && !hasBeenOpened && (
                    <>
                        <div className="w-2 h-2 bg-red-400 rounded-full absolute top-1 left-1"></div>
                        <div className="w-2 h-2 bg-red-400 rounded-full absolute top-1 left-1 animate-ping"></div>
                    </>
                )}
                Nytt i appen
            </Button>
            <Popover
                open={openState}
                onClose={() => setOpenState(false)}
                anchorEl={buttonRef.current}
                placement="bottom-end"
                offset={22}
            >
                <Popover.Content>
                    <Heading level="2" size="medium" spacing>
                        Nytt i appen
                    </Heading>
                    <ChangelogContent />
                </Popover.Content>
            </Popover>
        </div>
    )
}

export default Changelog
