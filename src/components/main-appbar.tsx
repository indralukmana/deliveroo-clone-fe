import React from 'react';
import tw from 'twin.macro';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';

const MainAppBar = (): JSX.Element => {
  const router = useRouter();

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
        <Button
          color="inherit"
          onClick={(): void => {
            router.push('/signin');
          }}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
