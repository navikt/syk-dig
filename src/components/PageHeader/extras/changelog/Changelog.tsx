'use client'

import React, { ReactElement, useRef, useState } from 'react'
import { NewspaperIcon } from '@navikt/aksel-icons'
import { Button, Heading, Popover } from '@navikt/ds-react'

import analytics from '../../../../utils/analytics'

import { ChangelogContent } from './ChangelogContent'

function Changelog(): ReactElement {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [openState, setOpenState] = useState(false)

    return (
        <div data-theme="light">
            <Button
                ref={buttonRef}
                variant="tertiary-neutral"
                icon={<NewspaperIcon />}
                data-theme="dark"
                className="text-white hover:text-gray-300 grow-0"
                size="small"
                onClick={() => {
                    if (!openState) analytics.changelogOpened()
                    setOpenState((b) => !b)
                }}
            >
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
