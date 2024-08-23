import React from 'react'

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
}:SelectProps): JSX.Element => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
        <select id={id} {...register(id)}>
            {options.map((option) => (
                <option value={option.value}>{option.label}</option>
            ))}
        </select>
        {errors && errors[id] && <p style={{color:"red"}}>{errors[id]?.message}</p>}
    </>
  );
};

export default Select;