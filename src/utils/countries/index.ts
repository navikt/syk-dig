import * as R from 'remeda'

import countriesJson from './countries-norwegian.json'

export type Country = {
    code: string
    name: string
}

export const countries: Country[] = R.pipe(
    countriesJson,
    R.map((country) => ({
        code: country.alpha3.toUpperCase(),
        name: country.name,
    })),
    R.sortBy((country) => country.name),
)
