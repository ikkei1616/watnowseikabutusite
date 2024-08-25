import React from 'react'
import FieldWrapper from './FieldWrapper';

type ImageInputProps = {
    label: string;
    id: string;
    register: any;
    errors?: any;
};

const ImageInput = ({
    label = "",
    id = "",
    register,
    errors
}: ImageInputProps): JSX.Element => {
    return (
        <>
            <FieldWrapper label={label} id={id} error={errors[id]}>
                <input
                    type="file"
                    accept='.png, .jpg'
                    multiple
                    id={id}
                    {...register(id)}
                />
            </FieldWrapper>
        </>
    );
};

export default ImageInput;