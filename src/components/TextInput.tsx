import React from 'react'
import {useForm } from "react-hook-form";

type TextInputProps = {
    label: string;
    id: string;
    register: any;
    errors?:any; 
};

const TextInput = ({
    label = "",
    id = "",
    register,
    errors
}:TextInputProps): JSX.Element => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
        <input type="text" id={id} {...register(id)}/>
        {errors && errors[id] && <p style={{color:"red"}}>{errors[id]?.message}</p>}
    </>
  );
};

export default TextInput;