import React from 'react'

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
}:NumberInputProps): JSX.Element => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
        <input type="number" id={id} {...register(id, { valueAsNumber: true })}/>
        {errors && errors[id] && <p style={{color:"red"}}>{errors[id]?.message}</p>}
    </>
  );
};

export default NumberInput;