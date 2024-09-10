import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { FieldValues, useController, Control, Path } from 'react-hook-form';

type Option = {
    label: string;
    value: string;
};

export type MultipleSelectProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label: string;
    options: Option[];
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, result: readonly string[], theme: Theme) {
    return {
        fontWeight:
            result.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const MultipleSelect = <T extends FieldValues>({
    label,
    options,
    control,
    name,
}: MultipleSelectProps<T>): JSX.Element => {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
    } = useController({ name, control });

    const theme = useTheme();
    const [result, setResult] = React.useState<string[]>(value || []);

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        const newValues = typeof value === 'string' ? value.split(',') : value;
        setResult(newValues);
        onChange(newValues);
    };

    const handleDelete = (value: string) => {
        const newValues = result.filter((v) => v !== value);
        setResult(newValues);
        onChange(newValues);
    };

    return (
        <div>
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {result.map((value) => (
                    <Chip
                        key={value}
                        label={value}
                        onDelete={() => handleDelete(value)}
                        sx={{
                            bgcolor: theme.palette.background.paper,
                            border: `1px solid ${theme.palette.divider}`,
                            '& .MuiChip-deleteIcon': {
                                color: theme.palette.error.main,
                            },
                            '&:focus': {
                                bgcolor: theme.palette.background.paper,
                            }
                        }}
                    />
                ))}
            </Box>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="multiple-select-label">{label}</InputLabel>
                <Select
                    labelId="multiple-select-label"
                    id="multiple-select"
                    multiple
                    value={result}
                    onChange={handleChange}
                    onBlur={onBlur}
                    inputRef={ref}
                    renderValue={() => (
                        <Box>追加してください</Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {options.map(({ value, label }) => (
                        <MenuItem
                            key={value}
                            value={value}
                            style={getStyles(value, result, theme)}
                        >
                            {label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default MultipleSelect;
