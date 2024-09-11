import { Box, FormHelperText, FormLabel, useTheme } from '@mui/material'
import { ReactNode } from 'react'

type Props = {
  label?: string
  children: ReactNode
  errorMessage?: string
}
const FieldWrapper = ({ children, errorMessage, label }: Props) => {
  const theme = useTheme()

  return (
    <Box sx={{
      margin: label ? "12px 0" : "0",
    }}>
      {label && <FormLabel component="legend" sx={{ fontSize: "1rem", fontFamily: "HannariMincho, sans-serif" }}>{label}</FormLabel>}
      {children}
      {errorMessage ? (
        <FormHelperText
          style={{ color: errorMessage ? theme.palette.error.main : undefined }}
        >
          {errorMessage}
        </FormHelperText>
      ) : (
        ''
      )}
    </Box>
  )
}

export default FieldWrapper;