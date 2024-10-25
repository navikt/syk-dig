import React, { ReactElement } from 'react'
import { cookies } from 'next/headers'

import FlexjarToggler from './FlexjarToggler'
import Changelog from './changelog/Changelog'

async function Extras(): Promise<ReactElement> {
    const defaultChangelogKey = (await cookies()).get('syk-dig-changelog-key')?.value ?? '0'

    return (
        <div className="flex gap-3 items-center">
            <FlexjarToggler />
            <Changelog defaultChangelogKey={defaultChangelogKey} />
        </div>
    )
}

export default Extras
