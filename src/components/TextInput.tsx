import React from 'react'

type TextInputProps = {
    label: string
    id: string
    }

const TextInput = ({
    label = "",
    id = ""
}:TextInputProps): JSX.Element => {
  return (
    <>
        <input type="text" id={id}/>
    </>
  );
};

export default TextInput;