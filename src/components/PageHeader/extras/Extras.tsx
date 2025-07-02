import React, { ReactElement } from 'react'
import { cookies } from 'next/headers'

import FlexjarToggler from './FlexjarToggler'
import Changelog from './changelog/Changelog'

async function Extras(): Promise<ReactElement> {
    const defaultChangelogKey = (await cookies()).get('syk-dig-changelog-key')?.value ?? '0'

    return (
        <>
            <FlexjarToggler />
            <Changelog defaultChangelogKey={defaultChangelogKey} />
        </>
    )
}

export default Extras
