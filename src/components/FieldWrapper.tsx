import { Box, FormHelperText, FormLabel, useTheme } from '@mui/material'
import { ReactNode } from 'react'

type Props = {
  label: string
  children: ReactNode
  errorMessage ?: string
}
 const FieldWrapper = ({ children, errorMessage, label }: Props) => {
  const theme = useTheme()

  return (
    <Box>
      <FormLabel component="legend">{label}</FormLabel>
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