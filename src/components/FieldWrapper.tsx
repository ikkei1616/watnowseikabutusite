import React, { PropsWithChildren } from 'react'

export type FieldWrapperProps = PropsWithChildren<{
    label: string;
    id: string;
}>;

const FieldWrapper: React.FC<FieldWrapperProps>= ({
    label = "",
    id="",
    children,
}) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      {children}
    </>
  )
}

export default FieldWrapper