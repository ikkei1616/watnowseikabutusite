"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const PageHeader = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          textAlign: "center",
          marginBottom: "8px",
        }}
      >
        <Typography
          sx={{
            color: "#00AEEF",
            fontSize: "4rem",
            fontFamily: "HannariMincho",
            "@media screen and (max-width: 900px)": {
              fontSize: "3rem",
            },
            "@media screen and (max-width: 750px)": {
              fontSize: "2rem",
            },
          }}
          variant="h1"
        >
          {title}
        </Typography>

        <Typography
          sx={{
            paddingLeft: "16px",
            color: "#00AEEF",
            fontSize: "3rem",
            fontFamily: "HannariMincho",
            "@media screen and (max-width: 900px)": {
              fontSize: "2.75rem",
            },
            "@media screen and (max-width: 750px)": {
              fontSize: "1.5rem",
            },
          }}
          variant="h1"
        ></Typography>
        {children}
      </Box>
      {/* <Divider
        variant="fullWidth"
        sx={{ borderColor: "#00AEEF", paddingTop: "16px" }}
      /> */}
    </Box>
  );
};

export default PageHeader;
