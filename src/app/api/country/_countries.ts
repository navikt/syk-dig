import * as R from 'remeda'

import countries from './countries-norwegian.json'
import { Country } from './_types'

export const countriesResponse: Country[] = R.pipe(
    countries,
    R.map((country) => ({
        code: country.alpha3.toUpperCase(),
        name: country.name,
    })),
    R.sortBy((country) => country.name),
)
