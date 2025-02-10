"use client";
import React, { useState } from "react";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { HeaderMode } from "@/types/HeaderMode";
import Link from "next/link";

const Header = ({ mode }: { mode: HeaderMode }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return isMobile ? <MobileHeader /> : <DesktopHeader mode={mode} />;
};

const MobileHeader = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const LinkButton = ({ href, text }: { href: string; text: string }) => (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        backgroundColor: "rgba(255, 255, 255)",
        padding: "0.5rem",
        borderRadius: "1rem",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
        }}
      >
        {text}
      </Typography>
    </Link>
  );

  return (
    <CoreHeader isMobile>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => setMenuIsOpen(!menuIsOpen)}
        sx={{ mb: "2px" }}
      >
        <Image
          src="/menu.svg"
          alt={"メニュー表示ボタン"}
          width={40}
          height={40}
          color="#FFFFFF"
        />
      </IconButton>

      <Drawer
        anchor="top"
        open={menuIsOpen}
        onClose={() => setMenuIsOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            // 背景色の不透明度60%
            backgroundColor: "#BBE9FF66",
            borderRadius: "0 0 20px 20px",
            padding: "1rem",
          },
        }}
      >
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setMenuIsOpen(!menuIsOpen)}
          sx={{ position: "absolute", right: "0", top: "0" }}
        >
          <Image
            src="/close.svg"
            alt={"メニュー閉じるボタン"}
            width={40}
            height={40}
            color="#FFFFFFE6"
          />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "3rem 0 1rem 0",
          }}
        >
          <LinkButton href={"/services"} text={"サービス一覧"} />
          <LinkButton href={"/events"} text={"イベント一覧"} />
          <LinkButton href={"/admin"} text={"管理者ページ"} />
        </Box>
      </Drawer>
    </CoreHeader>
  );
};
const DesktopHeader = ({ mode }: { mode: HeaderMode }) => {
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
          "@media screen and (max-width: 900px)": {
            padding: "16px 12px",
            width: "8rem",
          },
          "@media screen and (max-width: 700px)": {
            padding: "12px 8px",
            width: "8rem",
          },
        }}
      >
        <Typography
          sx={{
            color: mode === linkMode ? "#4D4D4D" : "white",
          }}
        >
          {text}
        </Typography>
      </Box>
    </Link>
  );

  return (
    <CoreHeader>
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
              "@media screen and (max-width: 700px)": {
                padding: "0.2rem 0.5rem",
              },
            }}
          >
            <Box
              sx={{
                padding: "0.4rem 1rem",
                borderRadius: "1rem",
                "&:hover": {
                  background: "#00AEEF33",
                },
                "@media screen and (max-width: 700px)": {
                  padding: "0.2rem 0.5rem",
                },
              }}
            >
              <Typography
                sx={{
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
    </CoreHeader>
  );
};

const CoreHeader = ({
  isMobile,
  children,
}: {
  isMobile?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <AppBar
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: isMobile ? "0 12px" : "0 2rem",
        alignContent: "flex-end",
        alignItems: "flex-end",
        boxShadow: "none",
        backgroundColor: "#85D5F3",
        borderRadius: isMobile ? "0 0 10px 10px" : "0 0 20px 20px",
        "@media screen and (max-width: 900px)": {
          padding: "0 16px",
        },
        "@media screen and (max-width: 700px)": {
          padding: "0 12px",
        },
      }}
    >
      <Link href={"/"}>
        <Box
          sx={{
            minWidth: "18rem",
            textAlign: "left",
            padding: "1rem",
            "@media screen and (max-width: 900px)": {
              minWidth: "15rem",
              padding: "16px 8px 12px 8px",
            },
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontSize: "1.25rem",
              lineHeight: "0.85",
              fontWeight: "regular",
              color: "#3F4154",
              "@media screen and (max-width: 700px)": {
                fontSize: "1rem",
              },
              "@media screen and (max-width: 600px)": {
                fontSize: "0.8rem",
              },
            }}
          >
            watnowプロダクト一覧サイト
          </Typography>
          <Box sx={{ display: "flex", alignItems: "end" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontSize: "4rem",
                lineHeight: "0.85",
                fontWeight: "regular",
                "@media screen and (max-width: 700px)": {
                  fontSize: "3rem",
                },
                "@media screen and (max-width: 600px)": {
                  fontSize: "2rem",
                },
              }}
            >
              watbox
            </Typography>
            <Image
              src={"/paper_airplane.svg"}
              alt={"紙飛行機のアイコン"}
              style={{ marginBottom: isMobile ? "-6px" : "-8px" }}
              height={isMobile ? 38 : 48}
              width={isMobile ? 38 : 48}
            />
          </Box>
        </Box>
      </Link>
      {children}
    </AppBar>
  );
};

export default Header;
