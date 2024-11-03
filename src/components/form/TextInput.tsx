import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FieldWrapper from "./FieldWrapper";
import {
  FieldValues,
  useController,
  Control,
  Path,
  PathValue,
} from "react-hook-form";

export type TextInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  defaultValue?: PathValue<T, Path<T>>;
  required?: boolean;
  isID?: boolean;
};

const TextInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  defaultValue,
  required,
  isID,
}: TextInputProps<T>): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, defaultValue });

  return (
    <FieldWrapper label={label} errorMessage={error?.message} required={required}>
      <TextField
        {...field}
        placeholder={placeholder}
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
          '& .MuiInputAdornment-root p': {
            color: '#A4A4A4',
            margin: '0',
            padding: '0',
          },
        }}
        InputProps={{
          sx: {
            padding: '4px 8px',
            '& input': {
              padding: '4px 4px',
            },
          },
          startAdornment: isID ? (<InputAdornment position="start" sx={{
            margin: 0, // 余白をなくす
            padding: 0, // パディングをなくす
            '& .MuiTypography-root': {
              margin: 0, // 内部のテキストの余白をなくす
            },
          }}>@</InputAdornment>) : null,
        }}
        variant="outlined"
      />
    </FieldWrapper>
  );
};

export default TextInput;
