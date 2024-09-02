'use client'

import React, { ReactElement } from 'react'

import { useFlag } from '../../../toggles/context'

import Flexjar from './Flexjar'

function Extras(): ReactElement {
    const flexjarToggle = useFlag('SYK_DIG_FLEXJAR_HEADER')

    return <div className="flex gap-3 items-center">{flexjarToggle.enabled && <Flexjar />}</div>
}

export default Extras
