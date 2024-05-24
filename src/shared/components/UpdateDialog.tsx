import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField } from '@mui/material';
import { IExpenseItem } from '../expenseType';
import { axiosRequest } from '../axiosApi';
import { useState } from 'react';
import { mutate } from 'swr';

type props = {
  open: boolean;
  onClose: () => void;
  data: IExpenseItem;
};
export function UpdateDialog({ open, onClose, data }: props) {
  const [item, setItem] = useState(data.item);
  const [username, setUsername] = useState(data.username);
  const [price, setPrice] = useState(data.price);

  function handleItemChange(e: any) {
    e.preventDefault();
    setItem(e.target.value);
  }
  function handleUsernameChange(e: any) {
    e.preventDefault();
    setUsername(e.target.value);
  }
  function handlePriceChange(e: any) {
    e.preventDefault();
    setPrice(e.target.value);
  }

  async function handleUpdateData(e: React.MouseEvent<HTMLButtonElement>) {
    try {
      e.preventDefault();
      const body = { id: data.id, username, item, price };
      const results: IExpenseItem = await axiosRequest.put('https://express3-0319.vercel.app/api/expense/updateexpense', body);
      console.log({ results });
      onClose();

      //trigger swr refresh 触发swr刷新
      const key = `https://express3-0319.vercel.app/api/expense/getexpense`;
      mutate(key);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'> Are you want to update?</DialogContentText>
          <Stack style={{ marginTop: 3 }}>
            <Stack direction='column' spacing={3}>
              <TextField id='item' label='item' variant='filled' value={item} onChange={handleItemChange} />
              <TextField id='username' label='username' variant='filled' value={username} onChange={handleUsernameChange} />
              <TextField id='price' label='price' variant='filled' value={price} onChange={handlePriceChange} />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleUpdateData} autoFocus>
            Update Data
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
