import { Box, FormHelperText, FormLabel, useTheme } from '@mui/material'
import { ReactNode } from 'react'

type Props = {
  label?: string
  children: ReactNode
  errorMessage?: string
  required?: boolean
}
const FieldWrapper = ({ children, errorMessage, label, required }: Props) => {
  const theme = useTheme()

  return (
    <Box sx={{
      margin: label ? "12px 0" : "0",
    }}>
      <div style={{ display: 'flex', justifyContent: "flex-start", gap:"12px" }}>
      {label && <FormLabel component="legend" sx={{ fontSize: "1rem", fontFamily: "HannariMincho, sans-serif" }}>{label}</FormLabel>}
      {required && <span style={{ fontSize: "0.8rem", fontFamily: "HannariMincho, sans-serif", color: "white", backgroundColor:"#E25D5D", padding:"0 6px", margin:"2px 0", borderRadius:"4px" }}>必須</span>}
      </div>
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