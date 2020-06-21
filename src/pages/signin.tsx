import React, { useState, useEffect } from 'react';
import MainLayout from 'src/layout/main';
import { gql } from 'apollo-boost';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Paper,
  Snackbar,
  Fade,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import tw from 'twin.macro';
import { useRouter } from 'next/dist/client/router';

const LOGIN_QUERY_MUTATION = gql`
  mutation Login($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        id
        email
        confirmed
        blocked
        role {
          id
          name
          description
          type
        }
      }
    }
  }
`;

const Signin = (): JSX.Element => {
  const client = useApolloClient();
  const [signin, { data, error, loading }] = useMutation(LOGIN_QUERY_MUTATION);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [snackbarType, setSnackbarType] = useState<'error' | 'success' | ''>('');

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (loading) {
      return;
    }

    try {
      await client.clearStore();
      await signin({
        variables: {
          input: {
            identifier: email,
            password,
            provider: 'local',
          },
        },
      });
    } catch (networkError) {
      setSnackbarType('error');
    }
  };

  useEffect(() => {
    if (error) {
      setSnackbarType('error');
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setSnackbarType('success');
      window.localStorage.setItem('jwt', data.login.jwt);
      router.push('/');
    }
  }, [data, router]);

  return (
    <MainLayout>
      <div css={[tw`flex-1 flex flex-col justify-center items-center`]}>
        <Typography component="h1" css={[tw`text-lg font-bold uppercase sr-only`]}>
          Deliveraa
        </Typography>
        <Paper css={[tw`max-w-lg p-5 mt-5`]}>
          <form
            css={[tw`grid grid-cols-1 gap-5`]}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              id="email"
              label="Email"
              variant="filled"
              value={email}
              onChange={(event): void => setEmail(event.target.value)}
            />
            <TextField
              id="password"
              label="Password"
              variant="filled"
              value={password}
              onChange={(event): void => setPassword(event.target.value)}
            />
            <div css={[tw`relative`]}>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                css={[tw`w-full overflow-hidden`]}
              >
                Login
                {loading && (
                  <div
                    css={[
                      tw`absolute top-0 left-0 w-full h-full flex justify-center items-center bg-blue-500 opacity-75`,
                    ]}
                  >
                    <Fade
                      in={loading}
                      style={{
                        transitionDelay: loading ? '800ms' : '0ms',
                      }}
                      unmountOnExit
                    >
                      <CircularProgress size="1rem" color="secondary" />
                    </Fade>
                  </div>
                )}
              </Button>
            </div>
          </form>
          <Snackbar
            open={snackbarType === 'error'}
            autoHideDuration={6000}
            onClose={(): void => setSnackbarType('')}
          >
            <Alert onClose={(): void => setSnackbarType('')} severity="error">
              <AlertTitle>Error</AlertTitle>
              {error?.networkError && 'Network error please check your connection'}
              {error?.graphQLErrors.map(({ extensions }) => (
                <span key={0}>
                  {extensions?.exception.data.message[0].messages.map(
                    ({ message }: { message: string }, i: string | number | undefined) => (
                      <span key={i}>{message.toLowerCase().replace('identifier', 'email')}</span>
                    ),
                  )}
                </span>
              ))}
            </Alert>
          </Snackbar>
          <Snackbar
            open={snackbarType === 'error'}
            autoHideDuration={6000}
            onClose={(): void => setSnackbarType('')}
          >
            <Alert onClose={(): void => setSnackbarType('')} severity="error">
              <AlertTitle>Error</AlertTitle>
              {error?.networkError && 'Network error please check your connection'}
              {error?.graphQLErrors.map(({ extensions }) => (
                <span key={0}>
                  {extensions?.exception.data.message[0].messages.map(
                    ({ message }: { message: string }, i: string | number | undefined) => (
                      <span key={i}>{message.toLowerCase().replace('identifier', 'email')}</span>
                    ),
                  )}
                </span>
              ))}
            </Alert>
          </Snackbar>
          <Snackbar
            open={snackbarType === 'success'}
            autoHideDuration={6000}
            onClose={(): void => setSnackbarType('')}
          >
            <Alert onClose={(): void => setSnackbarType('')} severity="success">
              <AlertTitle>Success</AlertTitle>
              <span>Login success</span>
            </Alert>
          </Snackbar>
        </Paper>
      </div>
    </MainLayout>
  );
};

export default Signin;
