import React from 'react';
import { FieldValues, useController, Control, Path } from 'react-hook-form';
import { Select, MenuItem } from '@mui/material';
import FieldWrapper from './FieldWrapper';

export type Option = {
  label: string;
  value: string | number;
};

export type SelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  options: Option[];
  ending?: string;
};

const SelectInput = <T extends FieldValues>({
  label,
  options,
  control,
  name,
  ending
}: SelectProps<T>): JSX.Element => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div style={{
      display:"flex",
    }}>
      <FieldWrapper label={label} errorMessage={error?.message}>
        <Select
          value={value || ''}
          onChange={onChange}
          onBlur={onBlur}
          inputRef={ref}
          sx={{
            minWidth: "100px",
            '& .MuiSelect-select': {
              padding: '8px',
              boxSizing: 'border-box',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#9CABC7',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#85D5F3',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#85D5F3',
              borderWidth: '2px',
            },
          }}
        >
          {options.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FieldWrapper>
      {ending && (
        <span style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1rem',
          marginTop: '12px',
          marginLeft: '4px',
        }}>{ending}</span>
      )
      }
    </div>
  );
};

export default SelectInput;
