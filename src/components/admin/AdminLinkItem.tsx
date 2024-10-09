"use client";
import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

const AdminLinkItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const itemStyle = {
    marginBottom: "24px",
    padding: 0,
    width: "100%",
  };
  const buttonStyle = {
    display: "block",
    width: "100%",
    fontSize: "1.5rem",
    backgroundColor: "#eaeff2",
    color: "#000",
    textDecoration: "none",
    padding: "10px 20px",
    textAlign: "center",
    border: "2px solid #9cabc7",
    borderRadius: "5px",
    transition: "background-color 0.3s, color 0.3s",
    "&:hover": {
      backgroundColor: "#9cabc7",
      color: "#fff",
    },
  };
  return (
    <ListItem sx={itemStyle}>
      <ListItemButton component="a" href={href} sx={buttonStyle}>
        {children}
      </ListItemButton>
    </ListItem>
  );
};

export default AdminLinkItem;
