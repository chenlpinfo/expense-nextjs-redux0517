import { Button } from '@mui/material';
import { useState } from 'react';
import { AddNewExpenseDialogHookFormWithErrorMessageProp } from './AddNewExpenseDialog-HookForm-erroMessageProp';
import { AddNewExpenseDialogHookFormWithOpenProp } from './AddNewExpenseDialog-HookForm-openProp';

export default function ActionBar() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Button variant='outlined' onClick={handleClickOpen}>
        Add New Expense
      </Button>
      {/* <AddNewExpenseDialogMui open={open} setOpen={setOpen} /> */}
      {/* <AddNewExpenseDialogHtml open={open} setOpen={setOpen} /> */}
      {/* <AddNewExpenseDialogHookFormWithErrorMessageProp open={open} setOpen={setOpen} /> */}
      {/* <AddNewExpenseDialogHookFormWithOpenProp key={open.toString()} open={open} setOpen={setOpen} /> */}
      <AddNewExpenseDialogHookFormWithOpenProp open={open} setOpen={setOpen} />
    </>
  );
}
