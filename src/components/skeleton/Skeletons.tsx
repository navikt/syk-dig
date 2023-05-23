import React from 'react'
import { range } from 'remeda'

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

export function TabsSkeleton(): JSX.Element {
    return (
        <div className="flex animate-pulse flex-row gap-1">
            {range(0, 3).map((it) => (
                <div key={it} className="h-12 w-28 p-2">
                    <div className="h-full w-full bg-gray-500" />
                </div>
            ))}
        </div>
    )
}

export function PdfSkeleton(): JSX.Element {
    return (
        <div className="flex h-full animate-pulse flex-col gap-1 p-2 pt-0">
            <div className="h-8 w-full bg-gray-500" />
            <div className="flex h-full w-full bg-gray-500">
                <div className="m-2 flex grow flex-col gap-2 bg-white p-4">
                    <SmallHeadingSkeleton />
                    <SmallTextSkeleton />
                    <SmallHeadingSkeleton width="small" />
                    <SmallTextSkeleton />
                    <SmallHeadingSkeleton />
                    <SmallTextSkeleton width="small" />
                    <SmallHeadingSkeleton width="small" />
                    <SmallTextSkeleton />
                </div>
            </div>
        </div>
    )
}
