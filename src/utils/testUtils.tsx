import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { PropsWithChildren, ReactElement } from 'react';
import { RenderOptions, render } from '@testing-library/react';
import { Cache, InMemoryCache, TypedDocumentNode } from '@apollo/client';

import { cacheConfig } from '../graphql/apollo';
import { modiaLocalResolvers, setInitialModiaQueryState } from '../graphql/localState/modia';
import { createModiaContext } from '../mocks/data/dataCreators';

type ProviderProps = {
    readonly initialState?: Cache.WriteQueryOptions<unknown, unknown>[];
    readonly mocks?: MockedResponse[];
};

function AllTheProviders({ children, initialState, mocks }: PropsWithChildren<ProviderProps>): JSX.Element {
    const cache = new InMemoryCache(cacheConfig);
    setInitialModiaQueryState(cache, createModiaContext());
    initialState?.forEach((it) => cache.writeQuery(it));

    return (
        // TODO maybe use MSW?
        <MockedProvider
            mocks={mocks}
            cache={cache}
            resolvers={{
                Mutation: {
                    ...modiaLocalResolvers,
                },
            }}
        >
            {children}
        </MockedProvider>
    );
}

export function createInitialQuery<Query, Variables>(
    typedDocumentNode: TypedDocumentNode<Query, Variables>,
    data: Query,
    variables?: Variables,
): Cache.WriteQueryOptions<Query, Variables> {
    return {
        query: typedDocumentNode,
        data,
        variables,
    };
}

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'> & ProviderProps,
): ReturnType<typeof render> =>
    render(ui, {
        wrapper: (props) => <AllTheProviders {...props} initialState={options?.initialState} mocks={options?.mocks} />,
        ...options,
    });

export * from '@testing-library/react';

export { customRender as render };
