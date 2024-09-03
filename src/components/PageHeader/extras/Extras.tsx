'use client'

import React, { ReactElement } from 'react'

import { useFlag } from '../../../toggles/context'

import Changelog from './changelog/Changelog'
import Flexjar from './Flexjar'

function Extras(): ReactElement {
    const flexjarToggle = useFlag('SYK_DIG_FLEXJAR_HEADER')

    return (
        <div className="flex gap-3 items-center">
            {flexjarToggle.enabled && <Flexjar />}
            <Changelog />
        </div>
    )
}

export default Extras
