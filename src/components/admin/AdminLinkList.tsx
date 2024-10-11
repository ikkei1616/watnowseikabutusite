"use client";
import React from "react";
import List from "@mui/material/List";

const AdminLinkList = ({ children }: { children: React.ReactNode }) => {
  const listStyle = {
    padding: 0,
    margin: 0,
    width: "100%",
  };
  return <List sx={listStyle}>{children}</List>;
};

export default AdminLinkList;
