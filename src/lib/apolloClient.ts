import { useMemo } from 'react';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    type NormalizedCacheObject,
    from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { concatPagination } from '@apollo/client/utilities';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors != null)
        graphQLErrors.forEach(({ message, locations, path }) => {
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${
                    locations?.toString() ?? ''
                }, Path: ${path?.toString() ?? ''}`
            );
        });
    if (networkError != null)
        console.log(`[Network error]: ${networkError.stack?.toString() ?? ''}`);
});

const httpLink = new HttpLink({
    uri: `http://localhost:${process.env.PORT ?? '8080'}/graphql`, // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
});

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: from([errorLink, httpLink]),
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        allPosts: concatPagination(),
                    },
                },
            },
        }),
    });
}

export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient();

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();

        // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
        const data = merge(existingCache, initialState, {
            // combine arrays using object equality (like in sets)
            arrayMerge: (destinationArray, sourceArray) => [
                ...sourceArray,
                ...destinationArray.filter((d) =>
                    sourceArray.every((s) => !isEqual(d, s))
                ),
            ],
        });

        // Restore the cache with the merged data
        _apolloClient.cache.restore(data);
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined') return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

interface PageProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props: { [APOLLO_STATE_PROP_NAME]?: any };
}

export function addApolloState(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    client: ApolloClient<any>,
    pageProps: PageProps
) {
    if (pageProps?.props) {
        pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
    }

    return pageProps;
}

export function useApollo(pageProps: PageProps['props']) {
    const state = pageProps[APOLLO_STATE_PROP_NAME];
    const store = useMemo(() => initializeApollo(state), [state]);
    return store;
}
