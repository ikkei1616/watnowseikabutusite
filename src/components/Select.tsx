import React from 'react'
import  FieldWrapper from './FieldWrapper';
import {
  FieldValues,
  useController,
} from "react-hook-form";
import { Select as MuiSelect, MenuItem } from "@mui/material";

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

const Select = <T extends FieldValues>({
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
        <MuiSelect value={value} onChange={onChange}>
          {options.map(({label, value}) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </MuiSelect>
      </FieldWrapper>
    </>
  );
};

export default Select;