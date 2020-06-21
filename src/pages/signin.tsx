import React, { useState, useEffect } from 'react';
import MainLayout from 'src/layout/main';
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
import { useAuthentication } from 'src/Context/Authentication';

const Signin = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, signin } = useAuthentication();

  const [snackbarType, setSnackbarType] = useState<'error' | 'success' | ''>('');

  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (user.loading) {
      return;
    }

    signin(email, password);
  };

  useEffect(() => {
    if (user.error || user.queryError) {
      setSnackbarType('error');
    }
  }, [user.error, user.queryError]);

  useEffect(() => {
    if (user.username) {
      setSnackbarType('success');
      router.push('/');
    }
  }, [router, user.username]);

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
                {user.loading && (
                  <div
                    css={[
                      tw`absolute top-0 left-0 w-full h-full flex justify-center items-center bg-blue-500 opacity-75`,
                    ]}
                  >
                    <Fade
                      in={user.loading}
                      style={{
                        transitionDelay: user.loading ? '800ms' : '0ms',
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
              {user.queryError?.networkError && 'Network error please check your connection'}
              {user.queryError?.graphQLErrors?.map(({ extensions }) =>
                extensions?.exception?.data?.message[0]?.messages.map(
                  ({ message }: { message: string }, i: string | number | undefined) => (
                    <span key={i}>{message.toLowerCase().replace('identifier', 'email')}</span>
                  ),
                ),
              )}
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
