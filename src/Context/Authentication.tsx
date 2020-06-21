import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { LOGIN_QUERY_MUTATION, QUERY_ME } from 'src/graphql/queries';
import { ApolloError } from 'apollo-boost';

type User = {
  id: string;
  email: string;
  username: string;
  loading: boolean;
  networkError?: Error;
  queryError?: ApolloError;
};

type AuthenticationContextType = {
  user: User;
  signin: (email: string, password: string) => void;
};

const AuthenticationContext = createContext({} as AuthenticationContextType);

export const AuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const userInitialState = { id: '', email: '', username: '', loading: false };
  const [user, setUser] = useState<User>(userInitialState);
  const [doSignin, { error: queryErrorSignin }] = useMutation(LOGIN_QUERY_MUTATION);
  const { data: syncMeData, error: queryErrorSyncMe, refetch } = useQuery(QUERY_ME);

  const signin = async (email: string, password: string): Promise<void> => {
    try {
      setUser({ ...userInitialState, loading: true });
      const { data } = await doSignin({
        variables: {
          input: {
            identifier: email,
            password,
            provider: 'local',
          },
        },
      });

      window.localStorage.setItem('jwt', data.login.jwt as string);

      const userData = {
        id: data.login.user.id as string,
        email: data.login.user.email as string,
        username: data.login.user.username as string,
      };

      setUser((prevState) => ({ ...prevState, ...userData }));
    } catch (error) {
      setUser((prevState) => ({ ...prevState, networkError: error }));
    } finally {
      setUser((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const syncMe = useCallback(async (): Promise<void> => {
    try {
      setUser((prevState) => ({ ...prevState, loading: true }));
      await refetch();

      const userData = {
        id: syncMeData?.me.id as string,
        email: syncMeData?.me.email as string,
        username: syncMeData?.me.username as string,
      };

      setUser((prevState) => ({ ...prevState, ...userData }));
    } catch (error) {
      setUser((prevState) => ({ ...prevState, networkError: error }));
    } finally {
      setUser((prevState) => ({ ...prevState, loading: false }));
    }
  }, [refetch, syncMeData]);

  useEffect(() => {
    syncMe();
  }, [syncMe]);

  return (
    <AuthenticationContext.Provider
      value={{ user: { ...user, queryError: queryErrorSignin ?? queryErrorSyncMe }, signin }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = (): AuthenticationContextType => useContext(AuthenticationContext);
