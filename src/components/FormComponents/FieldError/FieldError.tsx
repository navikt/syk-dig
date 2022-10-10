import React from 'react';
import { ErrorMessage } from '@navikt/ds-react';
import { FieldError } from 'react-hook-form';

import styles from './FieldError.module.css';

interface Props {
    error: FieldError | undefined;
}

function FieldError({ error }: Props): JSX.Element | null {
    if (error == null) return null;

    return <ErrorMessage className={styles.errorMessage}>{error.message}</ErrorMessage>;
}

export default FieldError;
