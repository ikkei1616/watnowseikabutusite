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
};

const NumberInput = <T extends FieldValues>({
  label,
  control,
  name,
  defaultValue,
}: NumberInputProps<T>): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, defaultValue });

  return (
    <FieldWrapper label={label} errorMessage={error?.message}>
      <TextField
        {...field}
        type="number"
        onChange={(e) => field.onChange(parseFloat(e.target.value))}
        value={field.value || ''}
      />
    </FieldWrapper>
  );
};

export default NumberInput;
