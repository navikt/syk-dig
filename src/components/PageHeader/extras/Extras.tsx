import React, { ReactElement } from 'react'
import { cookies } from 'next/headers'

import FlexjarToggler from './FlexjarToggler'
import Changelog from './changelog/Changelog'

function Extras(): ReactElement {
    return (
        <div className="flex gap-3 items-center">
            <FlexjarToggler />
            <Changelog defaultChangelogKey={cookies().get('syk-dig-changelog-key')?.value ?? '0'} />
        </div>
    )
}

export default Extras
