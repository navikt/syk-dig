import { ErrorSummary } from '@navikt/ds-react';
import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { SykmeldingFormValues } from '../Sykmelding/SykmeldingForm';

import { extractAllErrors } from './errorUtils';

function Errors(): JSX.Element | null {
    const {
        formState: { errors },
    } = useFormContext<SykmeldingFormValues>();

    const errorsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        errorsRef.current?.focus();
    }, []);

    const errorSummary = extractAllErrors(errors, null);
    if (!errorSummary.length) return null;

    return (
        <ErrorSummary
            size="medium"
            heading="Du må fylle ut disse feltene før du kan registrere sykmeldingen."
            ref={errorsRef}
        >
            {errorSummary.map(({ name, message }) => (
                <ErrorSummary.Item key={name} href={`#${name}`}>
                    {message}
                </ErrorSummary.Item>
            ))}
        </ErrorSummary>
    );
}

export default Errors;
