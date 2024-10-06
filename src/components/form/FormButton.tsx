import * as React from 'react';
import Button from '@mui/material/Button';

type FormButtonProps = {
    name: string;
    type: 'submit' | 'cancel';
    onClick?: () => void;
};

const cancelStyle = {
    borderColor: '#d32f2f',
    color: '#d32f2f',
    '&:hover': {
        borderColor: '#9a0007',
        color: '#9a0007',
    },
};

const FormButton = ({
    name, type, onClick
}: FormButtonProps) => {
    return (
        type === 'submit' ? (
            <Button
                type="submit"
                variant="outlined"
                sx={{
                    backgroundColor: '#85D5F3',
                    color: 'white',
                    borderColor: '#9CABC7',
                    fontSize: '1rem',
                    padding: '2px 36px',
                    '&:hover': {
                        backgroundColor: '#125699',
                    },
                }}
            >
                {name}
            </Button>
        ) : (
            <Button
                type="button"
                variant="outlined"
                sx={{
                    borderColor: '#9CABC7',
                    color: 'red',
                    backgroundColor: 'white',
                    fontSize: '1rem',
                    padding: '2px 36px',
                    '&:hover': {
                        backgroundColor: '#f0f0f0',
                    },
                }}
                onClick={onClick}
            >
                {name}
            </Button>
        )
    );
}

export default FormButton;