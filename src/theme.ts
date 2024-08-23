"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#85D5F3",
    },
    secondary: {
      main: "#EAEFF2",
    },
  },
  typography: {
    allVariants: {
      color: "#4D4D4D",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#4D4D4D",
        },
      },
    },
  },
});

export default theme;
