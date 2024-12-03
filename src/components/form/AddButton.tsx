import * as React from 'react';
import Button from '@mui/material/Button';
import { FieldValues } from 'react-hook-form';

export type AddButtonProps<T extends FieldValues> = {
    name: string;
    onClick?: () => void;
};

const AddButton = <T extends FieldValues>({
    name, onClick
}: AddButtonProps<T>) => {
    return (
            <Button
                type="button"
                sx={{
                    color: 'black',
                    fontSize: '1rem',
                    padding: '2px 0',
                    fontFamily: "HannariMincho, sans-serif",
                }}
                onClick={onClick}
            >
                ＋{name}
            </Button>
    );
}

export default AddButton;