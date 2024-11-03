"use client";
import React from "react";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";
import type Technology from "@/types/Technology";

const AdminTechLink = ({
  technology,
  href,
}: {
  technology: Technology;
  href: string;
}) => {
  const listItemStyle = {
    marginTop: "10px",
    justifyContent: "center",
  };
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    padding: "5px",
    width: "100%",
    minWidth: "260px",
    background: "var(--light)",
    borderRadius: "30px",
    border: "1px solid var(--border)",
    transition: "background-color 0.3s",
    "& .MuiTypography-root": {
      transition: "color 0.3s",
    },
    "&:hover": {
      backgroundColor: "var(--border)",
      "& .MuiTypography-root": {
        color: "var(--light)",
      },
    },
  };
  const iconContainerStyle = {
    background: "white",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  };
  const typographyStyle = {
    fontSize: "1.5rem",
    color: "var(--text)",
    fontWeight: 100,
  };
  return (
    <ListItem key={technology.id} sx={listItemStyle}>
      <Link href={href}>
        <Box sx={containerStyle}>
          <Box sx={iconContainerStyle}>
            <Image
              src={technology.imagePath || "/nodata.png"}
              alt={technology.name}
              style={{ borderRadius: "50%" }}
              width={50}
              height={50}
            />
          </Box>
          <Typography sx={typographyStyle}>{technology.name}</Typography>
        </Box>
      </Link>
    </ListItem>
  );
};

export default AdminTechLink;
