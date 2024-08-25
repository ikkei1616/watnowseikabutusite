import React from 'react'
import { useForm } from "react-hook-form";
import  FieldWrapper  from './FieldWrapper';

type TextInputProps = {
  label: string;
  id: string;
  register: any;
  errors?: any;
};

const TextInput = ({
  label = "",
  id = "",
  register,
  errors
}: TextInputProps): JSX.Element => {
  return (
    <>
      <FieldWrapper label={label} id={id} error={errors[id]}>
        <input type="text" id={id} {...register(id)} />
      </FieldWrapper>
    </>
  );
};

export default TextInput;