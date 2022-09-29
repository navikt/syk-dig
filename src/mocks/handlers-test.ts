import { RequestHandler, rest } from 'msw';

import { api } from '../utils/apiUtils';
import { DiagnoseSearchResult, searchSystem } from '../pages/api/diagnose/[system].api';
import { countriesResponse, Country } from '../pages/api/country/index.api';

/**
 * These are only used in MSW during tests, normally we use the real API routes in next
 */
export const handlers: RequestHandler[] = [
    rest.get(api('/api/diagnose/:system'), async (req, res, ctx) => {
        const value: string = req.url.searchParams.get('value') ?? '';
        const system = req.params.system;
        if (system !== 'icd10' && system !== 'icpc2') {
            throw new Error(`Illegal path parameter: ${system}`);
        }

        return res(
            ctx.json<DiagnoseSearchResult>({
                suggestions: searchSystem(system, value),
            }),
        );
    }),
    rest.get(api('/api/country'), async (req, res, ctx) => {
        return res(ctx.json<Country[]>(countriesResponse));
    }),
];
