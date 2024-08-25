import React from 'react'
import FieldWrapper from './FieldWrapper';

type TextareaInputProps = {
  label: string;
  id: string;
  register: any;
  errors?: any;
};

const TextareaInput = ({
  label = "",
  id = "",
  register,
  errors
}: TextareaInputProps): JSX.Element => {
  return (
    <>
      <FieldWrapper label={label} id={id} error={errors[id]}>
        <textarea id={id} {...register(id)} />
      </FieldWrapper>

    </>
  );
};

export default TextareaInput;