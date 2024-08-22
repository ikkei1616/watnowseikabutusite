import React from 'react'

type NumberInputProps = {
    label: string;
    id: string;
};

const NumberInput = ({
    label = "",
    id = ""
}:NumberInputProps): JSX.Element => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
        <input type="number" id={id}/>
    </>
  );
};

export default NumberInput;