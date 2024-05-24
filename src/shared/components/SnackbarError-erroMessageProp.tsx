import { Alert, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';

export type ErrorMessage = {
  text: string;
};

type props = {
  messageObj: ErrorMessage;
};

export function SnackbarErrorWithErrorMessageProp({ messageObj }: props) {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  console.log({ openSnackbar });

  useEffect(() => {
    setOpenSnackbar(!!messageObj.text);
  }, [messageObj]);

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
        {messageObj.text}
      </Alert>
    </Snackbar>
  );
}
