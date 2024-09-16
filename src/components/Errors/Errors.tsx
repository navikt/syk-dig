import { ErrorSummary } from '@navikt/ds-react'
import { ForwardedRef, forwardRef, ReactElement, RefObject, useRef } from 'react'
import { useFormContext } from 'react-hook-form'

import { UtenlanskFormValues } from '../Sykmelding/SykmeldingForm'

import { extractAllErrors } from './errorUtils'

function Errors(_: unknown, ref: ForwardedRef<HTMLDivElement>): ReactElement | null {
    const {
        formState: { errors },
    } = useFormContext<UtenlanskFormValues>()

    const errorSummary = extractAllErrors(errors, null)
    if (!errorSummary.length) return null

    return (
        <ErrorSummary
            size="medium"
            heading="Du må fylle ut disse feltene før du kan registrere sykmeldingen"
            ref={ref}
            className="my-8 mx-4"
        >
            {errorSummary.map(({ name, message }) => (
                <ErrorSummary.Item key={name} href={`#${name}`}>
                    {message}
                </ErrorSummary.Item>
            ))}
        </ErrorSummary>
    )
}

export function useErrorSection(): [RefObject<HTMLDivElement>, () => void] {
    const errorSectionRef = useRef<HTMLDivElement>(null)
    const focusErrorSection = (): void => {
        requestAnimationFrame(() => {
            errorSectionRef.current?.focus()
        })
    }

    return [errorSectionRef, focusErrorSection] as const
}

export default forwardRef(Errors)
