import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { FieldValues, useController } from 'react-hook-form';
import FieldWrapper from './FieldWrapper';
import { ButtonProps } from '@mui/material/Button';

export type ImageInputProps<T extends FieldValues> = {
  control: any;
  name: string;
  label: string;
  required?: boolean;
  type?: "image" | "video";
};

const InputWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',

});

const ButtonStyled = styled(Button)<ButtonProps>({
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

const VideoPreview = styled('video')({
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
  required,
  type
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
      field.onChange(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <FieldWrapper label={label} errorMessage={error?.message} required={required}>
      <InputWrapper>
        <ButtonStyled component="label" variant="outlined">
          ファイルを追加
          <VisuallyHiddenInput
            type="file"
            accept={type === 'video' ? 'video/*' : 'image/*'}
            onChange={handleFileChange}
          />
        </ButtonStyled>
        {preview && type === "image" && <ImagePreview src={preview as string} alt="Preview" />}
        {preview && type === "video" && (
          <VideoPreview controls>
            <source src={preview as string} type="video/mp4" />
            Your browser does not support the video tag.
          </VideoPreview>
        )}
      </InputWrapper>
    </FieldWrapper>
  );
};

export default ImageInput;
