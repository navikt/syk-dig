import { ErrorSummary } from '@navikt/ds-react'
import { ForwardedRef, forwardRef, ReactElement } from 'react'
import { useFormContext } from 'react-hook-form'

import { SykmeldingFormValues } from '../Sykmelding/SykmeldingForm'

import { extractAllErrors } from './errorUtils'
import styles from './Errors.module.css'

function Errors(_: unknown, ref: ForwardedRef<HTMLDivElement>): ReactElement | null {
    const {
        formState: { errors },
    } = useFormContext<SykmeldingFormValues>()

    const errorSummary = extractAllErrors(errors, null)
    if (!errorSummary.length) return null

    return (
        <ErrorSummary
            size="medium"
            heading="Du må fylle ut disse feltene før du kan registrere sykmeldingen."
            ref={ref}
            className={styles.errorSummary}
        >
            {errorSummary.map(({ name, message }) => (
                <ErrorSummary.Item key={name} href={`#${name}`}>
                    {message}
                </ErrorSummary.Item>
            ))}
        </ErrorSummary>
    )
}

export default forwardRef(Errors)
