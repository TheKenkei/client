import { Observer } from 'mobx-react-lite';

import { Alert, Snackbar } from '@mui/material';

import { useStore } from '@app/store';

export function Error() {
  const { appStore } = useStore();

  return (
    <Observer>
      {() => {
        return (
          <Snackbar
            open={!!appStore.getError()}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            onClose={() => appStore.setError(null)}>
            <Alert
              onClose={() => appStore.setError(null)}
              severity="error"
              variant="filled"
              sx={{ width: '100%' }}>
              {appStore.getError()}
            </Alert>
          </Snackbar>
        );
      }}
    </Observer>
  );
}
