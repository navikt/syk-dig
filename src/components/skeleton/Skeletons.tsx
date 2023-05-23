import React from 'react'

import { cn } from '../../utils/tw-utils'

export function SmallHeadingSkeleton({ width = 'medium' }: { width?: 'small' | 'medium' }): JSX.Element {
    return (
        <div className="w-full animate-pulse">
            <div
                className={cn('h-[var(--a-font-size-heading-xsmall)] bg-gray-500', {
                    'w-36': width === 'small',
                    'w-48': width === 'medium',
                })}
            />
        </div>
    )
}

export function SmallTextSkeleton({ width = 'medium' }: { width?: 'small' | 'medium' }): JSX.Element {
    return (
        <div className="w-full animate-pulse">
            <div
                className={cn('h-[var(--a-font-size-medium)] bg-gray-500', {
                    'w-24': width === 'small',
                    'w-32': width === 'medium',
                })}
            />
        </div>
    )
}

export function InfoWithHeaderSkeleton(): JSX.Element {
    return (
        <div className="flex flex-col gap-1">
            <SmallHeadingSkeleton width="small" />
            <SmallTextSkeleton width="small" />
        </div>
    )
}

export function InputWithTitleSkeleton(): JSX.Element {
    return (
        <div className="flex animate-pulse flex-col gap-1">
            <SmallHeadingSkeleton width="small" />
            <div className="h-12 w-72 bg-gray-500" />
        </div>
    )
}
