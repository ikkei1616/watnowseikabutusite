import React from 'react';
import TextField from "@mui/material/TextField";
import FieldWrapper from './FieldWrapper';
import { FieldValues, useController, Control, Path, PathValue } from "react-hook-form";

// 型定義の修正
export type NumberInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  defaultValue?: PathValue<T, Path<T>>;
  placeholder?: string;
  required?: boolean;
};

const NumberInput = <T extends FieldValues>({
  label,
  control,
  name,
  defaultValue,
  placeholder,
  required
}: NumberInputProps<T>): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, defaultValue });

  return (
    <FieldWrapper label={label} errorMessage={error?.message} required={required}>
      <TextField
        {...field}
        type="number"
        onChange={(e) => field.onChange(isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value))}
        value={field.value || ''}
        placeholder={placeholder}
        sx={{
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
      />
    </FieldWrapper>
  );
};

export default NumberInput;
