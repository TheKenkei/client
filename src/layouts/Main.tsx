import { AxiosError } from 'axios';
import { Observer } from 'mobx-react-lite';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';

import { CircularProgress } from '@mui/material';
import MuiBox, { BoxProps as MuiBoxProps } from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import api from '@app/services/api/api';
import { useStore } from '@app/store';

import { Error } from './Error';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export interface IBackdropProps {
  open: boolean;
}

const drawerWidth = 260;
interface BoxProps extends MuiBoxProps {
  open?: boolean;
  mobile?: string;
}

const Box = styled(MuiBox, {
  shouldForwardProp: (prop) => prop !== 'open',
})<BoxProps>(({ theme, open, mobile }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open &&
    !mobile && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
}));

const style = {
  main: {
    padding: '1.375rem',
    background: '#F1F3F4',
    '--header-height': '64px',
    '--header-height-mobile': '56px',
    height: `calc(100vh - var(--header-height))`,
    '@media (maxWidth: 768px)': {
      height: `calc(100vh - var(--header-height-mobile))`,
    },
  },
};
export function Main() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { appStore } = useStore();

  api.interceptors.request.use(
    (config) => {
      appStore.setLoading(true);
      return config;
    },
    function (error) {
      appStore.setError('err');
      appStore.setLoading(false);
      return Promise.reject(error);
    },
  );
  api.interceptors.response.use(
    (config) => {
      appStore.setLoading(false);
      return config;
    },
    function (error: AxiosError) {
      console.log(error);

      appStore.setError(`${error.status ?? ''}  ${error.message}`);
      appStore.setLoading(false);
      return Promise.reject(error);
    },
  );
  const handleMobile = () => appStore.toggleOpenMobile();
  const handleSidebar = () => appStore.toggleOpenSidebar();

  return (
    <Observer>
      {() => {
        return (
          <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F1F3F4' }}>
            {isMobile ? (
              <Sidebar
                sidebarOpen={appStore.openMobile}
                PaperProps={{
                  style: { width: drawerWidth },
                }}
                handleSidebarToggle={handleMobile}
                variant="temporary"
                open={appStore.openMobile}
                onClose={handleMobile}
              />
            ) : null}

            <Sidebar
              sidebarOpen={appStore.openSidebar}
              PaperProps={{
                style: { width: drawerWidth },
              }}
              sx={{
                display: {
                  md: 'block',
                  xs: 'none',
                },
              }}
              handleSidebarToggle={handleSidebar}
            />
            <Box
              open={appStore.openSidebar}
              mobile={isMobile ? 'true' : undefined}
              component="main"
              sx={{ flexGrow: 1 }}>
              <Header
                sidebarOpen={isMobile ? appStore.openMobile : appStore.openSidebar}
                handleSidebarToggle={isMobile ? handleMobile : handleSidebar}
              />
              <Box style={{ ...style.main }} sx={{ position: 'relative', flex: 1 }}>
                {appStore.getLoading() ? (
                  <Box
                    sx={{
                      display: 'flex',
                      width: '100%',
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <CircularProgress color="inherit" />

                    <Helmet>
                      <meta charSet="utf-8" />
                      <title>Loading...</title>
                      <link rel="canonical" href="http://mysite.com/example" />
                    </Helmet>
                  </Box>
                ) : null}
                <Error />

                <Box display={appStore.getLoading() ? 'none' : 'block'}>
                  <Outlet />
                </Box>
              </Box>
            </Box>
          </Box>
        );
      }}
    </Observer>
  );
}
