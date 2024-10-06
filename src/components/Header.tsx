"use client";
import React from "react";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { HeaderMode } from "@/types/HeaderMode";
import Link from "next/link";

const Header = ({ mode }: { mode: HeaderMode }) => {
  const TabLink = ({
    linkMode,
    href,
    text,
  }: {
    linkMode: HeaderMode;
    href: string;
    text: string;
  }) => (
    <Link href={href}>
      <Box
        sx={{
          backgroundColor: mode === linkMode ? "#FAFBFB" : "#00AEEF",
          padding: "1rem",
          paddingBottom: "0.8rem",
          borderRadius: "1rem 1rem 0 0",
          height: "100%",
          width: "10rem",
          transition: "padding-bottom 0.2s",
          textAlign: "center",
          "&:hover": {
            paddingBottom: "1.6rem",
          },
        }}
      >
        <Typography
          sx={{
            color: mode === linkMode ? "#4D4D4D" : "white",
            fontFamily: "HannariMincho",
          }}
        >
          {text}
        </Typography>
      </Box>
    </Link>
  );

  return (
    <AppBar
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "0 2rem",
        alignContent: "flex-end",
        alignItems: "flex-end",
        boxShadow: "none",
        backgroundColor: "#85D5F3",
        borderRadius: "0 0 20px 20px",
      }}
    >
      <Box sx={{ textAlign: "left", padding: "1rem" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontSize: "1.25rem",
            fontFamily: "HannariMincho",
            lineHeight: "0.85",
            fontWeight: "regular",
            color: "#3F4154",
          }}
        >
          watnowプロダクト一覧サイト
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontSize: "4rem",
              fontFamily: "HannariMincho",
              lineHeight: "0.85",
              fontWeight: "regular",
            }}
          >
            watbox
          </Typography>
          <Image
            src={"/paper_airplane.svg"}
            alt={"紙飛行機のアイコン"}
            height={56}
            width={56}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          height: "100%",
        }}
      >
        <TabLink
          linkMode={HeaderMode.SERVICES}
          href={"/services"}
          text={"サービス一覧"}
        />
        <TabLink
          linkMode={HeaderMode.EVENTS}
          href={"/events"}
          text={"イベント一覧"}
        />

        <Link href={"/admin"}>
          <Box
            sx={{
              padding: "0.4rem 1rem",
            }}
          >
            <Box
              sx={{
                padding: "0.4rem 1rem",
                borderRadius: "1rem",
                "&:hover": {
                  background: "#00AEEF33",
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "HannariMincho",
                  lineHeight: "1.25",
                  color: "white",
                }}
              >
                管理者
                <br />
                ページ
              </Typography>
            </Box>
          </Box>
        </Link>
      </Box>
    </AppBar>
  );
};

export default Header;
