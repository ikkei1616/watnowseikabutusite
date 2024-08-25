import React from 'react'
import FieldWrapper from './FieldWrapper';

type Option = {
  label: string;
  value: string;
}

type SelectProps = {
  label: string;
  options: Option[];
  id: string;
  register: any;
  errors?: any;
};

const Select = ({
  id = "",
  label = "",
  options = [],
  register,
  errors
}: SelectProps): JSX.Element => {
  return (
    <>
      <FieldWrapper label={label} id={id} error={errors[id]}>
        <select id={id} {...register(id)}>
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </FieldWrapper>
    </>
  );
};

export default Select;