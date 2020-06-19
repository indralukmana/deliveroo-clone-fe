import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from 'apollo-boost';
import { API_URL } from './constants';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const createApolloClient = (): ApolloClient<NormalizedCacheObject> =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: `${API_URL}/graphql`,
    }),
    cache: new InMemoryCache(),
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
