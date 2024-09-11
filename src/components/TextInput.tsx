import React from 'react';
import TextField from '@mui/material/TextField';
import FieldWrapper from './FieldWrapper';
import { FieldValues, useController, Control, Path, PathValue } from 'react-hook-form';

export type TextInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  defaultValue?: PathValue<T, Path<T>>;
}

const TextInput = <T extends FieldValues>({
  control,
  name,
  label,
  defaultValue,
}: TextInputProps<T>): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, defaultValue });

  return (
    <FieldWrapper label={label} errorMessage={error?.message}>
<TextField
  {...field}
  sx={{
    width: '100%',
    fontSize: '1rem',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#9CABC7',
        borderRadius: '8px',
      },
      '&:hover fieldset': {
        borderColor: '#85D5F3', 
      },
      '&.Mui-focused fieldset': {
        borderColor: '#85D5F3',
      },
    },
  }}
  InputProps={{
    sx: {
      padding: '4px 4px',
      '& input': {
        padding: '4px 4px',
      },
    },
  }}
  variant="outlined"
/>


    </FieldWrapper>
  );
};

export default TextInput;
