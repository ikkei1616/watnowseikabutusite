import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FieldValues, useController } from 'react-hook-form';
import FieldWrapper from './FieldWrapper';

export type ImageInputProps<T extends FieldValues> = {
  control: any;
  name: string;
  label: string;
};

const InputWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',

});

const ButtonStyled = styled(Button)({
  border: '1px solid #9CABC7',
  backgroundColor: 'white',
  color: 'black',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
});

const VisuallyHiddenInput = styled('input')({
  display: 'none',
});

const ImagePreview = styled('img')({
  maxWidth: '300px',
  maxHeight: '150px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  objectFit: 'cover',
});

const ImageInput = <T extends FieldValues>({
  label,
  control,
  name,
}: ImageInputProps<T>): JSX.Element => {
  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>(null);
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      field.onChange(file); // Form にファイルを通知

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null); // ファイルが選択されていない場合はプレビューをクリア
    }
  };

  return (
    <FieldWrapper label={label} errorMessage={error?.message}>
      <InputWrapper>
        <ButtonStyled component="label" variant="outlined">
          ファイルを選択
          <VisuallyHiddenInput
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </ButtonStyled>
        {preview && <ImagePreview src={preview as string} alt="Preview" />}
      </InputWrapper>
    </FieldWrapper>
  );
};

export default ImageInput;
