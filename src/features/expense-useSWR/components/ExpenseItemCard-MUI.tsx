import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { axiosRequest } from '../../../shared/axiosApi';
import { IExpenseItem } from '../../../shared/expenseType';
import { mutate } from 'swr';
import { ConfirmationDialog } from '../../../shared/components/ConfirmationDialog';
import { UpdateDialog } from '@/src/shared/components/UpdateDialog';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

export function ExpenseItemCardMUI({ data }: { data: IExpenseItem }) {
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseOver() {
    setIsHovered(true);
  }

  function handleMouseOut() {
    setIsHovered(false);
  }
  const [openConfirmationDlg, setOpenConfirmationDlg] = useState(false);
  const [openUpdateDlg, setOpenUpdateDlg] = useState(false);

  const handleConfirmationClose = () => {
    setOpenConfirmationDlg(false);
  };

  const handleConfirm = async () => {
    try {
      const results: IExpenseItem = await axiosRequest.delete('https://express3-0319.vercel.app/api/expense/deleteExpense', { data: { id: data.id } });
      console.log({ results });

      //trigger swr refresh 触发swr刷新
      const key = `https://express3-0319.vercel.app/api/expense/getexpense`;
      mutate(key);
    } catch (error) {
      console.error(error);
    }
  };

  function handleDelete() {
    setOpenConfirmationDlg(true);
  }

  function handleUpdate() {
    setOpenUpdateDlg(true);
  }

  function handleUpdateClose() {
    setOpenUpdateDlg(false);
  }

  const confirmationMessage = `Are you sure you want to delete which item is ${data.item},the price is ${data.price} and the user name is ${data.username}?`;

  return (
    <Card sx={{ bgcolor: 'rgb(13 148 136)', m: 4 }} elevation={16} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <CardContent>
        <Stack direction='row' justifyContent='space-between'>
          <Stack direction='row' spacing={4}>
            <Typography
              variant='h5'
              color='white'
              sx={{ border: '2px solid rgb(153 246 228);', borderRadius: '50%', width: '6rem', height: '6rem', alignItems: 'center', justifyContent: 'center', display: 'flex' }}
            >
              {data.item}
            </Typography>
            <Stack sx={{ display: 'flex', mx: 8, justifyContent: 'space-around' }}>
              <Typography variant='h5' color='white' sx={{ fontWeight: 'bold' }}>
                ${data.price}
              </Typography>
              <Stack direction='row' spacing={2} color='rgb(228 228 231)' sx={{ display: 'flex' }}>
                <Typography sx={{ textTransform: 'capitalize' }}>{data.username}</Typography>
                <Typography>{data.timeStamp.substring(0, 19).replaceAll('T', ' ')}</Typography>
              </Stack>
            </Stack>
          </Stack>

          {isHovered && (
            <Stack direction='column' justifyContent='space-between' alignItems='center'>
              <AppRegistrationIcon fontSize='large' sx={{ color: 'blue' }} onClick={handleUpdate} />
              <DeleteForeverIcon fontSize='large' sx={{ color: 'red' }} onClick={handleDelete} />
            </Stack>
          )}
        </Stack>
      </CardContent>
      <ConfirmationDialog open={openConfirmationDlg} onClose={handleConfirmationClose} onConfirm={handleConfirm} title='Confirm Action' message={confirmationMessage} />{' '}
      <UpdateDialog open={openUpdateDlg} onClose={handleUpdateClose} data={data} />
    </Card>
  );
}
