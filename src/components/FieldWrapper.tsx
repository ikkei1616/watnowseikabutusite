import React, { PropsWithChildren } from 'react'

type FieldWrapperProps = PropsWithChildren<{
    label: string;
    id: string;
    error ?: any;
}>;

const FieldWrapper: React.FC<FieldWrapperProps> = ({
    label = "",
    id="",
    children,
    error,
}) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <p style={{color:"red"}}>{error.message}</p>}
    </>
  )
}

export default FieldWrapper;