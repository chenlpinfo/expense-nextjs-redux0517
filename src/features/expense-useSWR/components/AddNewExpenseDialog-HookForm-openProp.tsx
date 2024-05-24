import { axiosRequest } from '@/src/shared/axiosApi';
import { SnackbarErrorWithOpenProp } from '@/src/shared/components/SnackbarError-openProp';
import RHFTextField from '@/src/shared/hook-form/RHFTextField';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { MmFormProvider } from '../../../shared/hook-form/MmFormProvider';

type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function AddNewExpenseDialogHookFormWithOpenProp({ open, setOpen }: props) {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (open) {
      const data = watch();

      setValue('item', '');
      setValue('username', '');
      setValue('price', 0);

      // reset();
    }
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  const Schema = Yup.object().shape({
    item: Yup.string().required('Item is required').min(3, 'Item must be at least 3 characters long'),
    username: Yup.string().required('User name is required').min(3, 'User name must be at least 3 characters long'),
    price: Yup.number().typeError('Price is a number').positive('Price be a positive number.').required('Price is required'),
  });

  const defaultValues = {
    item: '',
    username: '',
    price: 0,
  };

  const methods = useForm({ mode: 'all', reValidateMode: 'onChange', resolver: yupResolver(Schema) as any, defaultValues });
  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    trigger,
    formState: { isSubmitting, errors },
  } = methods;

  const buttonClassName = 'm-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';

  const [errorMessage, setErrorMessage] = useState<string>('');

  async function saveExpense(data: any) {
    try {
      await axiosRequest.post('https://express3-0319.vercel.app/api/expense/addExpense', data);

      console.log({ data });
      setOpen(false);
    } catch (error) {
      console.log({ error });

      setOpenSnackbar(true);
      setErrorMessage('Cannot add new expense');
    }
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Expense</DialogTitle>

        <MmFormProvider methods={methods} onSubmit={handleSubmit(saveExpense)}>
          <DialogContent className='flex flex-col gap-y-2.5 '>
            <RHFTextField name='item' label='item' />
            <RHFTextField name='username' label='User name' />
            <RHFTextField name='price' label='Price' />
          </DialogContent>

          <DialogActions sx={{ pr: '3px', pb: '1px' }}>
            <button className={buttonClassName} type='button' onClick={handleClose}>
              Cancel
            </button>
            <button className={buttonClassName} type='submit'>
              Add New Expense
            </button>
          </DialogActions>
        </MmFormProvider>
      </Dialog>

      <SnackbarErrorWithOpenProp openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} errorMessage={errorMessage} />
    </>
  );
}
