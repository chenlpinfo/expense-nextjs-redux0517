import { axiosRequest } from '@/src/shared/axiosApi';
import { IExpenseItem } from '@/src/shared/expenseType';
import { Button, Dialog, DialogContent, DialogTitle, Stack, TextField, DialogActions } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';

type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function AddNewExpenseDialogHtml({ open, setOpen }: props) {
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

  const inputClassName = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';
  const labelClassName = 'block text-gray-700 text-sm mb-2';
  const buttonClassName = 'm-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Expense</DialogTitle>

        <DialogContent style={{ marginTop: 3 }}>
          <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <div className='mb-4'>
              <label className={labelClassName}>Item</label>
              <input className={inputClassName} placeholder='item' onChange={handleItemChange} />
            </div>

            <div className='mb-4'>
              <label className={labelClassName}>User Name</label>
              <input className={inputClassName} placeholder='username' onChange={handleUsernameChange} />
            </div>

            <div className='mb-4'>
              <label className={labelClassName}>Price</label>
              <input className={inputClassName} type='number' placeholder='price' onChange={handlePriceChange} />
            </div>
          </form>
        </DialogContent>

        <DialogActions sx={{ pr: '3px', pb: '1px' }}>
          <button className={buttonClassName} type='button' onClick={handleClose}>
            Cancel
          </button>
          <button className={buttonClassName} type='button' onClick={handleAddData}>
            Add New Expense
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}
