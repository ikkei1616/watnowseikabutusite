import React from "react";
import { Box } from "@mui/material";

const ServicesContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        width: "100%",
        margin: "33px 0 0 0",
        display: "grid",
        gridTemplateColumns: "repeat(1, minmax(0, 368px))",
        gridTemplateRows: "repeat(auto-fit, minmax(0, 306px))",
        justifyContent: "center",
        columnGap: "60px",
        rowGap: "56px",
        "@media screen and (min-width: 840px)": {
          gridTemplateColumns: "repeat(2, minmax(0, 368px))",
          gridTemplateRows: "repeat(auto-fit, minmax(0, 306px))",
          justifyContent: "center",
          columnGap: "60px",
          rowGap: "40px",
        },
        "@media screen and (min-width: 1200px)": {
          gridTemplateColumns: "repeat(3, minmax(0, 368px))",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default ServicesContainer;
