import React from 'react'

type ImageInputProps = {
    label: string;
    id: string;
};

const ImageInput = ({
    label = "",
    id = ""
}: ImageInputProps): JSX.Element => {
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input
                type="file"
                accept='.png, .jpg'
                multiple
                id={id}
            />
        </>
    );
};

export default ImageInput;