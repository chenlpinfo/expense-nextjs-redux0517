import Iconify from '@/src/shared/components/iconify';
import { useDebounce } from '@/src/shared/hooks/useDebounce';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { forwardRef, useEffect, useState } from 'react';

const StyledTextField = styled(TextField)(({ theme }) => ({
  autoComplete: 'off',
  minWidth: '150px',
}));

type Props = TextFieldProps & { value?: string | number; setValue?: (newValue: string | number) => void };

export const MyTextField = forwardRef((props: Props, ref) => {
  const { value, setValue, onChange, disabled, style, ...other } = props;

  const [filterText, setFilterText] = useState(value);
  const debouncedFilterText = useDebounce<string | number | undefined>(filterText, 300) as string;

  function handleFilter(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const newFilterText: string = e.target.value.toLowerCase();
    setFilterText(newFilterText);
    if (onChange) onChange(e);
  }

  useEffect(() => {
    if (setValue) setValue(debouncedFilterText);
  }, [debouncedFilterText]);

  const [showClear, setShowClear] = useState(false);

  return (
    <>
      <StyledTextField
        {...other}
        disabled={disabled}
        value={filterText}
        onChange={handleFilter}
        size='small'
        style={{ ...style }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              {!!filterText && showClear && !disabled && (
                <IconButton
                  onClick={() => {
                    setFilterText('');
                    // if (onChange) onChange(null);
                  }}
                >
                  <Iconify icon='eva:close-fill' />
                </IconButton>
              )}
              {(!filterText || !showClear || disabled) && <div style={{ width: 37 }} />}
            </InputAdornment>
          ),
        }}
        onMouseOver={() => setShowClear(true)}
        onMouseOut={() => setShowClear(false)}
      />
    </>
  );
});

MyTextField.displayName = 'MyTextField';
