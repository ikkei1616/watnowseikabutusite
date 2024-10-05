import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FieldValues, useController, Control, Path, PathValue } from 'react-hook-form';

export type CheckboxLabelsProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label: string;
  };

const CheckboxLabels = <T extends FieldValues>({
    control,
    name,
    label,
  }: CheckboxLabelsProps<T>): JSX.Element => {
    const {
        field,
        fieldState: { error },
      } = useController({ name, control, defaultValue: false as PathValue<T, Path<T>> });
    
      return (
        <FormGroup sx={{
          margin: "12px 0",
        }}>
          <FormControlLabel control={<Checkbox {...field} />} label={label} />
        </FormGroup>
      );
}

export default CheckboxLabels;
