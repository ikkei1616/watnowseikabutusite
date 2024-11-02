import React from 'react';
import { TextareaAutosize } from '@mui/material';
import FieldWrapper from './FieldWrapper';
import {
  FieldValues,
  useController,
} from 'react-hook-form';
import { Box } from '@mui/material';

export type TextareaInputProps<T extends FieldValues> = {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

const TextareaInput = <T extends FieldValues>({
  label,
  required,
  placeholder,
  ...props
}: TextareaInputProps<T>): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          '& .custom-textarea': {
            fontSize: '1rem',
            padding: '8px',
            border: '1px solid #9CABC7',
            borderRadius: '4px',
            backgroundColor: 'rgba(240, 244, 248, 0)',
            boxSizing: 'border-box',
            outline: 'none',
            '&:focus': {
              borderColor: '#85D5F3',
              borderWidth: '2px'
            },
            '&:hover': {
              borderColor: '#85D5F3',
            },
          },
        }}
      >
        <FieldWrapper label={label} errorMessage={error?.message} required={required}>
          <TextareaAutosize
            {...field}
            minRows={4}
            placeholder={placeholder}
            className="custom-textarea"
            style={{ width: '100%' }}
          />
        </FieldWrapper>
      </Box>
    </>
  );
};

export default TextareaInput;