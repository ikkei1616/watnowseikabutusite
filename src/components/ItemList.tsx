"use client";

import React from "react";
import List from "@mui/material/List";

const ItemList = ({ children }: { children: React.ReactNode }) => {
  const listStyle = {
    paddingTop: "11px",
    paddingBottom: "none",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "10px",
    width: "100%",
    "@media screen and (max-width: 900px)": {
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    },
    "@media screen and (max-width: 600px)": {
      gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    },
  };
  return <List sx={listStyle}>{children}</List>;
};

export default ItemList;
