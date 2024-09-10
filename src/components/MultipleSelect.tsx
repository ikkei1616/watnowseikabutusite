import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

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

const names = [
  { value: '小林虎太郎', label: '小林虎太郎' },
  { value: '小林寅之助', label: '小林寅之助' },
  { value: '小林こたつ', label: '小林こたつ' },
];

function getStyles(name: string, result: readonly string[], theme: Theme) {
  return {
    fontWeight:
      result.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect() {
  const theme = useTheme();
  const [result, setResult] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setResult(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleDelete = (value: string) => {
    setResult(result.filter((v) => v !== value));
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
        <InputLabel id="demo-multiple-chip-label">選択box</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={result}
          onChange={handleChange}
          renderValue={() => null}
          MenuProps={MenuProps}
        >
          {names.map(({ value, label }) => (
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
