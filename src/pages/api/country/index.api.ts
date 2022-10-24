import * as R from 'remeda';

import { withAuthenticatedApi } from '../../../auth/withAuth';

/**
 * Source for country list:
 * https://github.com/stefangabos/world_countries/blob/master/data/countries/no/countries.json
 */
import countries from './countries-norwegian.json';

export type Country = {
    code: string;
    name: string;
};

export const countriesResponse: Country[] = R.pipe(
    countries,
    R.map((country) => ({
        code: country.alpha3.toUpperCase(),
        name: country.name,
    })),
    R.sortBy((country) => country.name),
);

const country = withAuthenticatedApi<Country[]>(async (req, res) => {
    res.status(200).json(countriesResponse);
});

export default country;
