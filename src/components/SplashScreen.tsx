"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Link from "next/link";
import AnimatedBox from "./AnimatedBox";
import { Typography } from "@mui/material";

const SplashScreen = () => {
  const [bgColor, setBgColor] = useState("#fff"); // 初期色 (濃い青)
  const [nowLoadingStyle, setNowLoadingStyle] = useState({
    opacity: 0,
    transform: "scale(1)", // 初期サイズ
  }); // NOW LOADING のスタイル
  const [nowLoadingVisible, setNowLoadingVisible] = useState(true);
  const [catGifStyle, setCatGifStyle] = useState({
    opacity: 0,
    transform: "scale(0)", // 初期サイズ
  }); // NOW LOADING のスタイル
  const [linkStyle, setLinkStyle] = useState({
    opacity: 0,
  });

  const mainStyle = {
    backgroundColor: linkStyle.opacity ? "#85D5F3AA" : bgColor,
    width: "100vw",
    height: "100vh",
    paddingTop: 0,
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "background-color 1.5s ease",
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // NOW LOADING のフェードイン
    const fadeInTimeout = setTimeout(() => {
      setNowLoadingStyle({ opacity: 1, transform: "scale(1)" }); // フェードイン
    }, 100);

    // NOW LOADING の表示時間と縮小フェードアウト
    const fadeOutTimeout = setTimeout(() => {
      setNowLoadingStyle({ opacity: 0, transform: "scale(0)" }); // 縮小とフェードアウト
      setCatGifStyle({ opacity: 1, transform: "scale(1)" }); // フェードイン
    }, 2500); // 1秒間のフェードイン + 0.5秒待機

    // フェードアウト後に非表示にする
    const hideLoadingTimeout = setTimeout(() => {
      setNowLoadingVisible(false);
    }, 3000); // 1.5秒で完全に消える

    // NOW LOADING の表示時間と縮小フェードアウト
    const linkVisibleTimeout = setTimeout(() => {
      setLinkStyle({ opacity: 1 }); // フェードイン
    }, 4000);

    const bgChangeTimeout = setTimeout(() => {
      setBgColor("var(--light-primary)"); // 最終色 (薄い青)
    }, 2500); // 1秒待機

    return () => {
      clearTimeout(fadeInTimeout);
      clearTimeout(fadeOutTimeout);
      clearTimeout(hideLoadingTimeout);
      clearTimeout(linkVisibleTimeout);
      clearTimeout(bgChangeTimeout);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);
  return (
    <main style={mainStyle}>
      <Box
        sx={{
          position: "absolute",
        }}
      >
        <Box
          sx={{
            transition: "opacity 1s ease, transform 1s ease",
            transform: catGifStyle.transform,
            opacity: catGifStyle.opacity,
          }}
        >
          <Image
            src={"/cat_clean.gif"}
            alt={"猫ちゃんの画像"}
            width={800}
            height={800}
            priority
          />
        </Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: "10rem",
            fontFamily: "HannariMincho",
            letterSpacing: "0.1em",
            color: "var(--text)",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            transition: "opacity 2s ease",
            opacity: catGifStyle.opacity ? 0.5 : 0,
            fontWeight: "bold",
            display: "flex",
            flexDirection: "row",
            gap: "400px",
          }}
        >
          <span>wat</span>
          <span>box</span>
        </Typography>
      </Box>
      <Box
        sx={{
          position: "absolute",
        }}
      >
        <AnimatedBox />
        {nowLoadingVisible && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                transition: "opacity 1s ease, transform 1s ease",
                transform: nowLoadingStyle.transform,
                opacity: nowLoadingStyle.opacity,
              }}
            >
              <Image
                src={"/now_loading.svg"}
                alt={"NOW LOADING"}
                style={{
                  animation: "rotate 15s linear infinite",
                }}
                priority
                width={400}
                height={400}
              />
            </Box>
          </Box>
        )}
        <Box
          sx={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            transition: "opacity 1s ease",
            opacity: linkStyle.opacity,
          }}
        >
          <Link
            href="/services"
            style={{
              color: "#000",
              textDecoration: "none",
              fontSize: "24px",
            }}
          >
            サービス一覧
          </Link>
          <br />
          <br />
          <Link
            href="/events"
            style={{
              color: "#000",
              textDecoration: "none",
              fontSize: "24px",
            }}
          >
            イベント一覧
          </Link>
        </Box>
      </Box>
    </main>
  );
};

export default SplashScreen;
