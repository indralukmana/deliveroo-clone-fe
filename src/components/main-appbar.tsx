import React from 'react';
import tw from 'twin.macro';
import { AppBar, Toolbar, Typography, Button, Fade } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useAuthentication } from 'src/Context/Authentication';

const MainAppBar = (): JSX.Element => {
  const { user, signout } = useAuthentication();
  const router = useRouter();

  const showSignin = user.username === '' && !user.loading && router.pathname !== '/signin';
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
