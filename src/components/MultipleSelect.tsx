import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { FieldValues, useController, Control, Path } from 'react-hook-form';
import FieldWrapper from './FieldWrapper';

type Option = {
    label: string;
    value: string;
};

export type MultipleSelectProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label: string;
    options: Option[];
    required?: boolean;
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
    required
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

    // ラベルを取得するためのヘルパー関数
    const getLabelFromValue = (value: string) => {
        const option = options.find(option => option.value === value);
        return option ? option.label : value; // 見つからない場合はvalueを返す
    };

    return (
        <div>
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {result.map((value) => (
                    <Chip
                        key={value}
                        label={getLabelFromValue(value)}
                        onDelete={() => handleDelete(value)}
                        sx={{
                            bgcolor: "#EAEFF2",
                            border: `1px solid #9CABC7`,
                        }}
                        deleteIcon={<Box sx={{ color: "#9CABC7", padding:"0 5px 0 20px"}}>×</Box>}
                    />
                ))}
            </Box>
            <FormControl>
                <FieldWrapper label={label} errorMessage={error?.message} required={required}>
                    <Select
                        multiple
                        value={result}
                        onChange={handleChange}
                        onBlur={onBlur}
                        inputRef={ref}
                        renderValue={(selected) => (
                            selected.length === 0 ? (
                                <Box>
                                    選択されていません
                                </Box>
                            ) : (
                                <Box>
                                    追加してください
                                </Box>
                            )
                        )}
                        MenuProps={MenuProps}
                        sx={{
                            minWidth: "200px",
                            height: "60%",
                            '& .MuiSelect-select': {
                                padding: '8px',
                                boxSizing: 'border-box',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#9CABC7',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#85D5F3',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#85D5F3',
                                borderWidth: '2px',
                            },
                        }}
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
                </FieldWrapper>
            </FormControl>
        </div>
    );
}


export default MultipleSelect;
