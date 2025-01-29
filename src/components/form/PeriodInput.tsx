import React from 'react';
import SelectInput, { Option } from './Select';
import NumberInput from './NumberInput'; 
import { FieldValues, Control, Path } from 'react-hook-form'; 

export type PeriodProps<T extends FieldValues> = {
    control: Control<T>; 
    name: [Path<T>, Path<T>]; // Ensure name is a tuple of Path<T>
    label: string;
    options: Option[];
    placeholder?: string;
    required?: boolean;
};

const Period = <T extends FieldValues>({
    control,
    name,
    label,
    options,
    placeholder,
    required
}: PeriodProps<T>): JSX.Element => {
    return (
        <div style={{ display: 'flex', justifyContent: "flex-start", gap:"12px" }}>
            <NumberInput
                control={control}
                name={name[0]} // Ensure this matches Path<T>
                label={label}
                placeholder={placeholder}
                required={required}
            />
            <SelectInput
                control={control}
                name={name[1]} // Ensure this matches Path<T>
                label={"　"}
                options={options}
                ending="間"
            />
        </div>
    );
}

export default Period;
