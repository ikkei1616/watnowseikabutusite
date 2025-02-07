"use client";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";

const AdminHeader = ({ isEditing }: { isEditing?: boolean }) => {
  return (
    <AppBar
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 100px",
        boxShadow: "none",
        backgroundColor: "#85D5F3",
        "@media screen and (max-width: 768px)": {
          padding: "1rem 20px",
        },
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{
          fontSize: "2.25rem",
          lineHeight: "0.85",
          fontWeight: "regular",
          color: "white",
          "@media screen and (max-width: 600px)": {
            fontSize: "2rem",
          },
        }}
      >
        watbox editor
      </Typography>
      <Link
        href={"/services"}
        onClick={(e) => {
          if (isEditing) {
            let checkFlg = window.confirm(
              "入力内容が破棄されますがよろしいですか？"
            );
            if (!checkFlg) {
              e.preventDefault();
            }
          }
        }}
      >
        <Box
          sx={{
            padding: "1rem 2rem",
            borderRadius: "1rem",
            "&:hover": {
              background: "#00AEEF33",
            },
            "@media screen and (max-width: 600px)": {
              padding: "0.5rem 1rem",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: "1.5rem",
              lineHeight: "0.85",
              fontWeight: "regular",
              color: "white",
              "@media screen and (max-width: 600px)": {
                fontSize: "1rem",
              },
            }}
          >
            閉じる
          </Typography>
        </Box>
      </Link>
    </AppBar>
  );
};

export default AdminHeader;
