import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { ApolloError } from 'apollo-boost';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { LOGIN_QUERY_MUTATION, MUTATION_REGISTER, QUERY_ME } from 'src/graphql/queries';

type User = {
  id: string;
  email: string;
  username: string;
  loading: boolean;
  error: Error | null;
  queryError: ApolloError | null;
};

type AuthenticationContextType = {
  user: User;
  signin: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;
  signout: () => void;
};

const AuthenticationContext = createContext({} as AuthenticationContextType);

export const AuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const userInitialState: User = {
    id: '',
    email: '',
    username: '',
    loading: false,
    error: null,
    queryError: null,
  };
  const [user, setUser] = useState<User>(userInitialState);
  const [doSignin, { error: queryErrorSignin }] = useMutation(LOGIN_QUERY_MUTATION);
  const [doSignup, { error: queryErrorRegister }] = useMutation(MUTATION_REGISTER);
  const [doQueryme, { data: syncMeData, error: queryErrorSyncMe }] = useLazyQuery(QUERY_ME);

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
      setUser((prevState) => ({ ...prevState, error }));
    } finally {
      setUser((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const signout = (): void => {
    window.localStorage.removeItem('jwt');
    setUser(userInitialState);
  };

  const signup = async (email: string, password: string): Promise<void> => {
    try {
      setUser({ ...userInitialState, loading: true });

      const { data } = await doSignup({
        variables: {
          input: {
            username: email,
            email,
            password,
          },
        },
      });

      window.localStorage.setItem('jwt', data.register.jwt as string);

      const userData = {
        id: data.register.user.id as string,
        email: data.register.user.email as string,
        username: data.register.user.username as string,
      };

      setUser((prevState) => ({ ...prevState, ...userData }));
    } catch (error) {
      setUser((prevState) => ({ ...prevState, error }));
    } finally {
      setUser((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const syncMe = useCallback(async (): Promise<void> => {
    try {
      setUser((prevState) => ({
        ...prevState,
        loading: true,
      }));

      const token = window.localStorage.getItem('jwt');

      if (!token) {
        return;
      }

      doQueryme();

      const userData = {
        id: syncMeData?.me.id as string,
        email: syncMeData?.me.email as string,
        username: syncMeData?.me.username as string,
      };

      setUser((prevState) => ({ ...prevState, ...userData }));
    } catch (error) {
      setUser((prevState) => ({ ...prevState, error }));
    } finally {
      setUser((prevState) => ({ ...prevState, loading: false }));
    }
  }, [doQueryme, syncMeData]);

  useEffect(() => {
    syncMe();
  }, [syncMe]);

  return (
    <AuthenticationContext.Provider
      value={{
        user: {
          ...user,
          queryError: queryErrorSignin ?? queryErrorSyncMe ?? queryErrorRegister ?? null,
        },
        signin,
        signout,
        signup,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = (): AuthenticationContextType => useContext(AuthenticationContext);
