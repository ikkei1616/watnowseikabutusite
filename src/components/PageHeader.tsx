"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const PageHeader = ({
  title,
  pageTitle,
  children,
}: {
  title: string;
  pageTitle: string;
  children?: React.ReactNode;
}) => {
  return (
    <Box>
      <Box
        sx={{ display: "flex", alignItems: "flex-end", textAlign: "center" }}
      >
        <Typography
          sx={{
            color: "#00AEEF",
            fontSize: "4rem",
            fontFamily: "HannariMincho",
            "@media screen and (max-width: 600px)": {
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
            fontSize: "2rem",
            fontFamily: "HannariMincho",
            "@media screen and (max-width: 600px)": {
              fontSize: "1rem",
            },
          }}
          aria-label="display arrow"
        >
          ＞
        </Typography>
        <Typography
          sx={{
            paddingLeft: "16px",
            color: "#00AEEF",
            fontSize: "3rem",
            fontFamily: "HannariMincho",
            "@media screen and (max-width: 600px)": {
              fontSize: "1.5rem",
            },
          }}
          variant="h1"
        >
          {pageTitle}
        </Typography>
        {children}
      </Box>
      <Divider
        variant="fullWidth"
        sx={{ borderColor: "#00AEEF", paddingTop: "16px" }}
      />
    </Box>
  );
};

export default PageHeader;
