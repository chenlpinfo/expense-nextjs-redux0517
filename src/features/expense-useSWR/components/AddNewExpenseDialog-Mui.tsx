import { axiosRequest } from '@/src/shared/axiosApi';
import { IExpenseItem } from '@/src/shared/expenseType';
import { Button, Dialog, DialogContent, DialogTitle, Stack, TextField, DialogActions } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';

type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function AddNewExpenseDialogMui({ open, setOpen }: props) {
  const [item, setItem] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const handleClose = () => {
    setOpen(false);
  };

  function handleItemChange(e: React.ChangeEvent<HTMLInputElement>) {
    setItem(e.target.value);
  }
  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }
  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPrice(e.target.value);
  }

  async function handleAddData(e: React.MouseEvent<HTMLButtonElement>) {
    try {
      e.preventDefault();
      const body = { username, item, price };
      const results: IExpenseItem = await axiosRequest.post('https://express3-0319.vercel.app/api/expense/addExpense', body);
      console.log({ results });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Expense</DialogTitle>

        <DialogContent style={{ marginTop: 3 }}>
          <Stack direction='column' spacing={3}>
            <TextField id='item' label='item' variant='filled' value={item} onChange={handleItemChange} />
            <TextField id='username' label='username' variant='filled' value={username} onChange={handleUsernameChange} />
            <TextField id='price' label='price' variant='filled' value={price} onChange={handlePriceChange} />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Stack direction='row' spacing={3} marginBottom={3}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit' onClick={handleAddData}>
              Add
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
}
