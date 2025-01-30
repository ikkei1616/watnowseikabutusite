"use client";
import React from "react";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import { CreatorUser } from "@/types/User";
import DottedDivider from "./DottedDivider";

const CreatorItem = ({ user }: { user: CreatorUser }) => {
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
    // はみ出たら省略
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    "@media screen and (max-width: 750px)": {
      fontSize: "1.2rem",
    },
  };

  return (
    <Link href={`/users/${user.accountID}`}>
      <ListItem
        sx={{
          padding: "0 0 0 0",
        }}
      >
        <Box sx={containerStyle}>
          <Box
            sx={{
              borderRadius: "50%",
              backgroundColor: "#85D5F3CC",
              width: "100px",
              height: "100px",
            }}
          >
            <Avatar
              src={user.image || "/unknown.svg"}
              alt="ユーザのアイコン画像"
              sx={{
                width: "100px",
                height: "100px",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              padding: "0 4px",
            }}
          >
            <Typography sx={typographyStyle}>{user.nickname}</Typography>
            <DottedDivider color={"#00AEEF"} />
            <Typography sx={{ ...typographyStyle, fontSize: "0.8rem" }}>
              得意領域:
            </Typography>
            {user.technologies[0] ? (
              <Typography sx={{ ...typographyStyle, fontSize: "1rem" }}>
                {user.technologies[0].name}
              </Typography>
            ) : null}
            <Typography sx={{ ...typographyStyle, fontSize: "1rem" }}>
              @{user.accountID}
            </Typography>
          </Box>
        </Box>
      </ListItem>
    </Link>
  );
};

export default CreatorItem;
