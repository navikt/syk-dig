'use client'

import React, { ReactElement } from 'react'

import { useFlag } from '../../../toggles/context'

import Flexjar from './Flexjar'

function FlexjarToggler(): ReactElement | null {
    const flexjarToggle = useFlag('SYK_DIG_FLEXJAR_HEADER')

    if (!flexjarToggle.enabled) return null

    return <Flexjar />
}

export default FlexjarToggler
