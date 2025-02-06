"use client";
import React from "react";
import Typography from "@mui/material/Typography";

const AdminTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography
      variant="h1"
      component="div"
      sx={{
        fontSize: "4rem",
        padding: "1rem 0 28px 0",
        "@media screen and (max-width: 768px)": {
          fontSize: "2rem",
          padding: "1rem 0 20px 0",
        },
      }}
    >
      {children}
    </Typography>
  );
};

export default AdminTitle;
