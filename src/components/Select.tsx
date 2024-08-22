import React from 'react'

type Option = {
    label: string;
    value: string;
}

type SelectProps = {
    label: string;
    options: Option[];
    id: string;
};

const Select = ({
    id = "",
    label = "",
    options = []

}:SelectProps): JSX.Element => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
        <select id={id}>
            {options.map((option) => (
                <option value={option.value}>{option.label}</option>
            ))}
        </select>
    </>
  );
};

export default Select;