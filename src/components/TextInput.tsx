import React from 'react'
import TextField from "@mui/material/TextField";
import  FieldWrapper from './FieldWrapper';
import {
  FieldValues,
  useController,
} from "react-hook-form";

export type TextInputProps<T extends FieldValues> = {
    control: any;
    name: string;
    label: string;
  }


const TextInput = <T extends FieldValues>({
  label,
  ...props
}: TextInputProps<T>): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController(props);
  return (
    <>
      <FieldWrapper label={label} errorMessage={error?.message}>
        <TextField {...field} />
      </FieldWrapper>
    </>
  );
};

export default TextInput;