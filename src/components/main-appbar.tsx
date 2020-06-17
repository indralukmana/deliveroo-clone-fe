import * as React from 'react';
import tw from 'twin.macro';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';

const MainAppBar = (): JSX.Element => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h1" css={[tw`text-base uppercase flex-1 ml-3`]}>
          deliveraa
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
