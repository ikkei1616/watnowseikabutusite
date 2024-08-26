import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { PropsWithChildren } from "react";

export type FieldWrapperProps = PropsWithChildren<{
    label: string;
    errorMessage?: string;
}>;

const FieldWrapper: React.FC<FieldWrapperProps> = ({
    label = "",
    errorMessage = "",
    children,
}) => {
  return (
    <FormControl fullWidth error={!!errorMessage}>
      <Typography >{label}</Typography>
      {children}
      {errorMessage && (
        <Typography color="error">
          {errorMessage}
        </Typography>
      )}
    </FormControl>
  )
}

export default FieldWrapper;