import React from 'react'

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
            <label htmlFor={id}>{label}</label>
            <input
                type="file"
                accept='.png, .jpg'
                multiple
                id={id}
                {...register(id)}
            />
            {errors && errors[id] && <p style={{ color: "red" }}>{errors[id]?.message}</p>}
        </>
    );
};

export default ImageInput;