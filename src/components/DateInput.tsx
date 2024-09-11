import React from 'react';
import SelectInput, { Option } from './Select'; 
import { FieldValues, Control, Path } from 'react-hook-form'; 

export type DateProps<T extends FieldValues> = {
    control: Control<T>; 
    name: [Path<T>, Path<T>]; // Ensure name is a tuple of Path<T>
    label: string;
    options: Option[][];
    required?: boolean;
};

const DateInput = <T extends FieldValues>({
    control,
    name,
    label,
    options,
    required
}: DateProps<T>): JSX.Element => {
    return (
        <div style={{ display: 'flex', justifyContent: "flex-start", gap:"12px" }}>
            <SelectInput
                control={control}
                name={name[0]} // Ensure this matches Path<T>
                label={label}
                options={options[0]}
                ending='年'
                required={required}
            />
            <SelectInput
                control={control}
                name={name[1]} // Ensure this matches Path<T>
                label={"　"}
                options={options[1]}
                ending='月'
            />
        </div>
    );
}

export default DateInput;
