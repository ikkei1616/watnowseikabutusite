import React from 'react';
import { TextareaAutosize } from '@mui/material';
import FieldWrapper from './FieldWrapper';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

export type TextareaInputProps<T extends FieldValues> = {
  control: any;
  name: string;
  label: string;
}

const TextareaInput = <T extends FieldValues>({
  label,
  ...props
}: TextareaInputProps<T>): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <>
      <FieldWrapper label={label} errorMessage={error?.message}>
        <TextareaAutosize
          {...field}
          minRows={3}
          style={{ width: '100%' }}
        />
      </FieldWrapper>
    </>
  );
};

export default TextareaInput;