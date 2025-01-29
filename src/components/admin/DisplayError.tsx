"use client";
import React from "react";
import Box from "@mui/material/Box";

const DisplayError = ({ height, error }: { height: string; error: string }) => {
  const containerStyle = {
    height: height,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "20px",
  };
  return (
    <Box sx={containerStyle}>
      <h3>Error</h3>
      <p>{error}</p>
    </Box>
  );
};

export default DisplayError;
