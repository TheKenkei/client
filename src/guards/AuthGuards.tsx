import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';

import { Box, CircularProgress } from '@mui/material';

import { useStore } from '@app/store';

export type ProtectedRouteProps = {
  id?: string;
  outlet: JSX.Element;
};

const protectedRoute = ({ id, outlet }: ProtectedRouteProps) => {
  const { authStore } = useStore();

  if (!authStore.token && !!authStore.loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}>
        <CircularProgress />
      </Box>
    );
  }
  if (!!authStore.token && !authStore.loading) {
    return 'auth' === id ? <Navigate to={{ pathname: '/' }} /> : outlet;
  } else {
    return 'auth' === id ? outlet : <Navigate to={{ pathname: '/login' }} />;
  }
};

export default observer(protectedRoute);
