import React from 'react'

type TextareaInputProps = {
    label: string;
    id: string;
};

const TextareaInput = ({
    label = "",
    id = ""
}:TextareaInputProps): JSX.Element => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
        <textarea id={id} />
    </>
  );
};

export default TextareaInput;