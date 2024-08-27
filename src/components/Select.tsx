import React from 'react'
import  FieldWrapper from './FieldWrapper';
import {
  FieldValues,
  useController,
} from "react-hook-form";
import { Select, MenuItem } from "@mui/material";

type Option = {
  label: string;
  value: string;
}

export type SelectProps<T extends FieldValues> = {
  control: any;
  name: string;
  label: string;
  options: Option[];
};

const SelectInput = <T extends FieldValues>({
  label,
  options,
  ...props
}: SelectProps<T>): JSX.Element => {
  const {
    field:{value, onChange},
    fieldState: { error },
  } = useController(props);
  return (
    <> 
      <FieldWrapper label={label} errorMessage={error?.message}>
        <Select value={value} onChange={onChange}>
          {options.map(({label, value}) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FieldWrapper>
    </>
  );
};

export default SelectInput;