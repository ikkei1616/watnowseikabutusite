"use client";
import React from "react";
import ListItem from "@mui/material/ListItem";
import Link from "next/link";

const AdminExistingLinkItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const linkStyle = {
    color: "#0063BF",
    width: "fit-content",
    padding: "4px 12px 6px 12px",
    marginBottom: "12px",
    fontSize: "1.5rem",
    linkStyle: "",
    "&:hover": {
      backgroundColor: "#0063BF11",
      borderRadius: "5px",
    },
    "@media screen and (max-width: 768px)": {
      fontSize: "1rem",
    },
    "&::before": {
      content: '"・"',
      color: "#0063BF",
      fontSize: "1.5rem",
      marginRight: "6px",
    },
  };

  return (
    <ListItem sx={linkStyle}>
      <Link href={href}>{children}</Link>
    </ListItem>
  );
};

export default AdminExistingLinkItem;
