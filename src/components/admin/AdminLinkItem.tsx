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
    "@media screen and (max-width: 768px)": {
      marginBottom: "12px",
    },
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
    border: "2px solid var(--border)",
    borderRadius: "5px",
    transition: "background-color 0.3s, color 0.3s",
    "&:hover": {
      backgroundColor: "var(--border)",
      color: "#fff",
    },
    "@media screen and (max-width: 768px)": {
      fontSize: "1rem",
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
