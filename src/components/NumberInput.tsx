import React from 'react';
import TextField from "@mui/material/TextField";
import FieldWrapper from './FieldWrapper';
import {
  FieldValues,
  useController,
} from "react-hook-form";

export type NumberInputProps<T extends FieldValues> = {
  control: any;
  name: string;
  label: string;
};

const NumberInput = <T extends FieldValues>({
  label,
  ...props
}: NumberInputProps<T>): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <>
      <FieldWrapper label={label} errorMessage={error?.message}>
        <TextField
          {...field}
          type="number"
          onChange={(e) => field.onChange(parseFloat(e.target.value))}
        />
      </FieldWrapper>
    </>
  );
};

export default NumberInput;
