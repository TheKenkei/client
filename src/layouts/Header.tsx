import * as React from 'react';

import { AccountCircle } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';

import api from '@app/services/api/api';
import { useStore } from '@app/store';

interface HeaderProps {
  sidebarOpen: boolean;
  handleSidebarToggle: () => void;
}
export function Header(props: HeaderProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClick = () => {
    appStore.setLoading(true);
  };
  const onError = () => {
    // appStore.setError('404 : Not Found ');
    api.get('https://apple.com');
  };
  const onGet = () => {
    // api.get('/auth/me');
    api
      .get('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => response)
      .then((json) => console.log(json));
  };
  const onClickFalse = () => {
    appStore.setLoading(false);
  };
  const { appStore } = useStore();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { handleSidebarToggle, sidebarOpen } = props;
  return (
    <AppBar sx={{ zIndex: 1100 }} color="inherit" position="sticky">
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            alignItems: 'start',
            justifyItems: 'start',
            display: 'flex',
          }}>
          {!sidebarOpen ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleSidebarToggle}>
              <MenuIcon />
            </IconButton>
          ) : null}
        </Box>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit">
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Menu>
          <button onClick={onClick}> true </button>
          <button onClick={onGet}> get </button>
          <button onClick={onError}> error </button>
          <button onClick={onClickFalse}> false</button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
