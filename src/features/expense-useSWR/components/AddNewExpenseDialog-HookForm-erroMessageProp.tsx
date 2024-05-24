import { axiosRequest } from '@/src/shared/axiosApi';
import { ErrorMessage, SnackbarErrorWithErrorMessageProp } from '@/src/shared/components/SnackbarError-erroMessageProp';
import RHFTextField from '@/src/shared/hook-form/RHFTextField';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { MmFormProvider } from '../../../shared/hook-form/MmFormProvider';

type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function AddNewExpenseDialogHookFormWithErrorMessageProp({ open, setOpen }: props) {
  const handleClose = () => {
    setOpen(false);
  };

  const Schema = Yup.object().shape({
    item: Yup.string().required('Item is required').min(3, 'Item must be at least 3 characters long'),
    username: Yup.string().required('User name is required').min(3, 'User name must be at least 3 characters long'),
    price: Yup.number().typeError('Price is a number').positive('Price be a positive number.').required('Price is required'),
  });

  const defaultValues = {
    item: 'apple',
    username: 'chen',
    price: 6,
  };

  const methods = useForm({ mode: 'all', reValidateMode: 'onChange', resolver: yupResolver(Schema) as any, defaultValues });
  const {
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { isSubmitting, errors },
  } = methods;

  const buttonClassName = 'm-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';

  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({ text: '' });

  async function saveExpense(data: any) {
    try {
      await axiosRequest.post('https://express3-0319.vercel.app/api/expense/addExpense', data);

      console.log({ data });
      setOpen(false);
    } catch (error) {
      console.log({ error });

      const errorMessageObj: ErrorMessage = { text: 'Cannot add new expense' };
      setErrorMessage(errorMessageObj);
    }
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Expense</DialogTitle>

        <MmFormProvider methods={methods} onSubmit={handleSubmit(saveExpense)}>
          <DialogContent style={{ marginTop: 3 }}>
            <RHFTextField style={{ margin: 8 }} name='item' label='Item' />
            <RHFTextField style={{ margin: 8 }} name='username' label='User name' />
            <RHFTextField style={{ margin: 8 }} name='price' label='Price' />
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

      <SnackbarErrorWithErrorMessageProp messageObj={errorMessage} />
    </>
  );
}
