import { AppBar, Button, Fade, Toolbar, Typography } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React from 'react';
import { useAuthentication } from 'src/Context/Authentication';
import tw from 'twin.macro';
import CartModalButton from './cart-modal-button';

const MainAppBar = (): JSX.Element => {
  const { user, signout } = useAuthentication();
  const router = useRouter();

  const showSignin = user.username === '' && !user.loading && router.pathname !== '/signin';
  const showSignup = user.username === '' && !user.loading && router.pathname !== '/signup';
  const showSignout = user.username && !user.loading;

  return (
    <AppBar position="static">
      <Toolbar>
        <div css={[tw`flex-1 ml-3 `]}>
          <Link href="/">
            <Typography variant="h1" component="a" css={[tw`text-base uppercase cursor-pointer`]}>
              deliveraa
            </Typography>
          </Link>
        </div>

        <CartModalButton />

        {showSignin && (
          <Fade in={!user.loading && !user.username} style={{ transitionDelay: '400ms' }}>
            <Button
              color="inherit"
              onClick={(): void => {
                router.push('/signin');
              }}
            >
              Sign in
            </Button>
          </Fade>
        )}

        {showSignup && (
          <Fade in={!user.loading && !user.username} style={{ transitionDelay: '400ms' }}>
            <Button
              color="inherit"
              onClick={(): void => {
                router.push('/signup');
              }}
            >
              Sign up
            </Button>
          </Fade>
        )}

        {showSignout && (
          <Fade in={!user.loading && user.username !== ''} style={{ transitionDelay: '400ms' }}>
            <Button color="inherit" onClick={(): void => signout()}>
              Sign out
            </Button>
          </Fade>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
