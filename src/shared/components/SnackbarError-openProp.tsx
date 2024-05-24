import { Alert, Snackbar } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type props = {
  openSnackbar: boolean;
  setOpenSnackbar: Dispatch<SetStateAction<boolean>>;
  errorMessage: string;
};

export function SnackbarErrorWithOpenProp({ openSnackbar, setOpenSnackbar, errorMessage }: props) {
  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    setOpenSnackbar(false);
  };

  return (
    <Snackbar
      open={openSnackbar}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      autoHideDuration={3000}
      onClose={handleCloseSnackbar}
    >
      <Alert onClose={handleCloseSnackbar} severity='error' variant='filled'>
        {errorMessage}
      </Alert>
    </Snackbar>
  );
}
