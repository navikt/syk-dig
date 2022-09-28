import { ErrorSummary } from '@navikt/ds-react';
import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { SykmeldingFormValues } from '../Sykmelding/SykmeldingForm';

type CustomErrors = Record<keyof SykmeldingFormValues, string | undefined>;

function Errors(): JSX.Element | null {
    const {
        formState: { errors },
    } = useFormContext<SykmeldingFormValues>();

    const errorsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        errorsRef.current?.focus();
    }, []);

    const errorMessages: CustomErrors = {
        fnr: errors.fnr?.message,
        land: errors.land?.message,
        periode:
            // @ts-expect-error Some weird typing isse with FieldErrors
            errors.periode?.find((it) => it?.periode)?.periode?.message ||
            // @ts-expect-error Some weird typing isse with FieldErrors
            errors.periode?.find((it) => it?.grad)?.grad?.message,
        // TODO: Support hierarchical errors?
        diagnoser: errors.diagnoser?.hoveddiagnose?.message,
    };

    const errorSummary = Object.entries(errorMessages).filter((tuple): tuple is [string, string] => tuple[1] != null);

    if (!errorSummary.length) return null;

    return (
        <ErrorSummary
            size="medium"
            heading="Du må fylle ut disse feltene før du kan registrere sykmeldingen."
            ref={errorsRef}
        >
            {errorSummary.map(([field, error]) => (
                <ErrorSummary.Item key={field} href={`#${field}`}>
                    {error}
                </ErrorSummary.Item>
            ))}
        </ErrorSummary>
    );
}

export default Errors;
