import React from 'react'
import FieldWrapper from './FieldWrapper';

type NumberInputProps = {
  label: string;
  id: string;
  register: any;
  errors?: any;
};

const NumberInput = ({
  label = "",
  id = "",
  register,
  errors
}: NumberInputProps): JSX.Element => {
  return (
    <>
      <FieldWrapper label={label} id={id} error={errors[id]}>
        <input type="number" id={id} {...register(id, { valueAsNumber: true })} />
      </FieldWrapper>
    </>
  );
};

export default NumberInput;