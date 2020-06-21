import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from 'apollo-boost';
import { setContext } from 'apollo-link-context';

import { API_URL } from './constants';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const authLink = setContext((_, { headers }) => {
  if (typeof window === 'undefined') {
    return {
      headers,
    };
  }

  const jwt = window.localStorage.getItem('jwt');

  return {
    headers: {
      ...headers,
      authorization: jwt ? `Bearer ${jwt}` : '',
    },
  };
});

const httpLink = new HttpLink({
  uri: `${API_URL}/graphql`,
});

const createApolloClient = (): ApolloClient<NormalizedCacheObject> =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      mutate: {
        errorPolicy: 'all',
      },
      query: {
        errorPolicy: 'all',
      },
      watchQuery: {
        errorPolicy: 'all',
      },
    },
  });

export const initializeApollo = (
  initialState: NormalizedCacheObject | null = null,
): ApolloClient<NormalizedCacheObject> => {
  // eslint-disable-next-line no-underscore-dangle
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === 'undefined') {
    return _apolloClient;
  }

  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
};

export function useApollo(
  initialState: NormalizedCacheObject,
): ApolloClient<NormalizedCacheObject> {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
