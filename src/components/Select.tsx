import React from 'react';
import { FieldValues, useController, Control, Path } from 'react-hook-form';
import { Select, MenuItem } from '@mui/material';
import FieldWrapper from './FieldWrapper';

type Option = {
  label: string;
  value: string;
};

export type SelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: Option[];
};

const SelectInput = <T extends FieldValues>({
  label,
  options,
  control,
  name,
}: SelectProps<T>): JSX.Element => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <FieldWrapper label={label} errorMessage={error?.message}>
      <Select
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
        inputRef={ref}
      >
        {options.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FieldWrapper>
  );
};

export default SelectInput;
