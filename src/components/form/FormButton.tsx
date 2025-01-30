import * as React from 'react';
import Button from '@mui/material/Button';

type FormButtonProps = {
    name: string;
    type: 'submit' | 'cancel' | 'delete';
    onClick?: () => void;
};

const cancelStyle = {
    borderColor: '#9CABC7',
    color: 'red',
    backgroundColor: 'white',
    fontSize: '1rem',
    padding: '2px 27px',
    '&:hover': {
        backgroundColor: '#f0f0f0',
    },
}

const submitStyle = {
    backgroundColor: '#85D5F3',
    color: 'white',
    borderColor: '#9CABC7',
    fontSize: '1rem',
    padding: '2px 27px',
    '&:hover': {
        backgroundColor: '#125699',
    },
};

const deleteStyle = {
    borderColor: '#E25D5D',
    color: 'white',
    backgroundColor: '#E25D5D',
    fontSize: '1rem',
    maxWidth: '160px',
    maxHeight: '40px',
    padding: '2px 18px',
    '&:hover': {
        backgroundColor: '#f0f0f0',
    },
}

const FormButton = ({
    name, type, onClick
}: FormButtonProps) => {
    let buttonStyle;

    switch (type) {
        case 'submit':
            buttonStyle =  submitStyle;
            return (
                <Button
                    type="submit"
                    variant="outlined"
                    sx={buttonStyle}
                >
                    {name}
                </Button>
            );

        case 'cancel':
            buttonStyle = cancelStyle;
            return (
                <Button
                    type="button"
                    variant="outlined"
                    sx={buttonStyle}
                    onClick={onClick}
                >
                    {name}
                </Button>
            );

        case 'delete':
            buttonStyle = deleteStyle;
            return (
                <Button
                    type="button"
                    variant="outlined"
                    sx={buttonStyle}
                    onClick={onClick}
                >
                    {name}
                </Button>
            );

        default:
            return null; // fallback for unsupported types
    }
}

export default FormButton;
