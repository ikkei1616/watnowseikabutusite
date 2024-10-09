"use client";
import React from "react";
import Typography from "@mui/material/Typography";

const AdminTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography
      variant="h1"
      component="div"
      sx={{
        fontFamily: "HannariMincho",
        fontSize: "4rem",
        padding: "1rem 0 28px 0",
        "@media screen and (max-width: 768px)": {
          fontSize: "3rem",
        },
      }}
    >
      {children}
    </Typography>
  );
};

export default AdminTitle;