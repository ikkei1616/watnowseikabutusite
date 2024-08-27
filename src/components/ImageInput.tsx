import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import FieldWrapper from './FieldWrapper';
import {
  FieldValues,
  useController,
} from "react-hook-form";

export type ImageInputProps<T extends FieldValues> = {
  control: any;
  name: string;
  label: string;
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ImageInput = <T extends FieldValues>({
  label,
  ...props
}: ImageInputProps<T>): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      field.onChange(files); // ファイルをフィールドのonChangeに渡す
    }
  };

  return (
    <>
      <FieldWrapper label={label} errorMessage={error?.message}>
        <Button component="label" role={undefined} variant="contained" tabIndex={-1}>
          Upload file
          <VisuallyHiddenInput
            type="file"
            accept="image/*" 
            onChange={handleFileChange} // ファイルが選択されたときに呼ばれるハンドラ
          />
        </Button>
      </FieldWrapper>
    </>
  );
};

export default ImageInput;
