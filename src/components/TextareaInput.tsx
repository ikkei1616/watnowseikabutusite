import React from 'react'

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
      <label htmlFor={id}>{label}</label>
      <textarea id={id} {...register(id)} />
      {errors && errors[id] && <p style={{ color: "red" }}>{errors[id]?.message}</p>}
    </>
  );
};

export default TextareaInput;