"use client";
import React from "react";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";

const Item = ({
  id,
  src,
  alt,
  text,
  href,
}: {
  id: string;
  src: string;
  alt: string;
  text: string;
  href?: string;
}) => {
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

  const StyledItem = () => {
    return (
      <ListItem
        key={id}
        sx={{
          padding: "0 0 0 0",
        }}
      >
        <Box sx={containerStyle}>
          <Image
            src={src}
            alt={alt}
            width={48}
            height={48}
            style={{
              borderRadius: "50%",
            }}
          />
          <Typography sx={typographyStyle}>{text}</Typography>
        </Box>
      </ListItem>
    );
  };

  if (href) {
    return (
      <Link href={href}>
        <StyledItem />
      </Link>
    );
  }

  return <StyledItem />;
};

export default Item;
