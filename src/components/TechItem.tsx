"use client";
import React from "react";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import type Technology from "@/types/Technology";

const TechItem = ({ technology }: { technology: Technology }) => {
  const containerStyle = {
    width: "100%",
    border: "1px solid #85D5F3",
    padding: "5px 11px",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    transition: "background-color 0.3s",
  };
  const typographyStyle = {
    fontSize: "1.4rem",
    fontFamily: "HannariMincho",
    paddingLeft: "12px",
    "@media screen and (max-width: 750px)": {
      fontSize: "1.2rem",
    },
  };
  return (
    <ListItem
      key={technology.id}
      sx={{
        padding: "0 0 0 0",
      }}
    >
      <Box sx={containerStyle}>
        <Image
          src={technology.image || "/nodata.png"}
          alt={"ユーザのアイコン画像"}
          width={48}
          height={48}
          style={{
            borderRadius: "50%",
          }}
        />
        <Typography sx={typographyStyle}>{technology.name}</Typography>
      </Box>
    </ListItem>
  );
};

export default TechItem;
