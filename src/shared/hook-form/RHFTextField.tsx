// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { TextFieldProps } from '@mui/material';
import { MyTextField } from '../components/MyTextField';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  helperText?: React.ReactNode;
};

export default function RHFTextField({ name, helperText, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MyTextField
          {...field}
          fullWidth
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          error={!!error}
          helperText={helperText ?? error?.message}
          sx={{ '& .MuiInputLabel-root': { top: 'inherit', fontSize: '14px' } }}
          size='small'
          {...other}
        />
      )}
    />
  );
}
