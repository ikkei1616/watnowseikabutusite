"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Link from "next/link";
import AnimatedBox from "./AnimatedBox";
import { Typography, useMediaQuery } from "@mui/material";
import DottedDivider from "./DottedDivider";

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
  const [linkVisible, setLinkStyle] = useState(false);
  const isMobile = useMediaQuery("(max-width: 800px)");

  const titleOpacity = linkVisible ? 1 : catGifStyle.opacity ? 0.5 : 0;

  const animationDuration = 0.8;

  const mainStyle = {
    backgroundColor: linkVisible ? "#85D5F366" : bgColor,
    width: "100vw",
    height: "100vh",
    paddingTop: 0,
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: `background-color ${animationDuration}s ease`,
  };

  const linkStyle = {
    fontSize: "1.5rem",
    color: "var(--text)",
    padding: "20px 60px",
    borderRadius: "40px",
    transition: `background-color ${animationDuration}s ease`,
    backgroundColor: "var(--light-primary)",
    "&:hover": {
      backgroundColor: "var(--primary)",
    },
    "@media screen and (max-width: 800px)": {
      fontSize: "1rem",
      padding: "15px 40px",
    },
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
      setBgColor("var(--light-primary)"); // 最終色 (薄い青)
    }, 2500); // 1秒間のフェードイン + 0.5秒待機

    // フェードアウト後に非表示にする
    const hideLoadingTimeout = setTimeout(() => {
      setNowLoadingVisible(false);
    }, 3000); // 1.5秒で完全に消える

    // NOW LOADING の表示時間と縮小フェードアウト
    const linkVisibleTimeout = setTimeout(() => {
      setLinkStyle(true); // フェードイン
    }, 4000);

    return () => {
      clearTimeout(fadeInTimeout);
      clearTimeout(fadeOutTimeout);
      clearTimeout(hideLoadingTimeout);
      clearTimeout(linkVisibleTimeout);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (isMobile) {
    return (
      <main style={mainStyle}>
        <Box
          sx={{
            width: "100dvw",
            height: "100dvh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100dvw",
              height: "100dvh",
              textAlign: "center",
              transition: `all ${animationDuration}s ease`,
              flexDirection: "column",
              gap: linkVisible ? "6dvh" : "0dvh",
            }}
          >
            <Box
              sx={{
                transition: `top ${animationDuration}s ease, left ${animationDuration}s ease, height ${animationDuration}s ease`,
                height: linkVisible ? "auto" : "0px",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  width: "100%",
                  textAlign: "center",
                  transition: `all ${animationDuration}s ease`,
                  fontSize: "0.8rem",
                  opacity: linkVisible ? 1 : 0,
                  marginBottom: "-1rem",
                }}
              >
                watnowプロダクト一覧サイト
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  letterSpacing: "0.1em",
                  color: "var(--text)",
                  textAlign: "center",
                  transition: `all ${animationDuration}s ease`,
                  display: "flex",
                  flexDirection: "row",
                  gap: linkVisible ? "0px" : "400px",
                  fontSize: "3.5rem",
                  opacity: linkVisible ? 1 : 0,
                  height: linkVisible ? "auto" : "0px",
                }}
              >
                <span>wat</span>
                <span>box</span>
              </Typography>
            </Box>
            <Box
              sx={{
                textAlign: "center",
                transition: `opacity ${animationDuration}s ease, width ${animationDuration}s ease, height ${animationDuration}s ease`,
                opacity: linkVisible ? 1 : 0,
                flexDirection: "column",
                display: "flex",
                justifyContent: "space-between",
                height: linkVisible ? "auto" : "0px",
                gap: "20px",
                top: "50%",
                left: "50%",
                width: "100%",
                padding: "0 40px",
              }}
            >
              <Box
                sx={{
                  padding: "0 8px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.5rem",
                  }}
                >
                  Menu
                </Typography>
                <DottedDivider color={"var(--primary)"} />
              </Box>
              <Link
                href="/services"
                style={{
                  textDecoration: "none",
                }}
              >
                <Box sx={linkStyle}>サービス一覧</Box>
              </Link>
              <Link
                href="/events"
                style={{
                  textDecoration: "none",
                }}
              >
                <Box sx={linkStyle}>イベント一覧</Box>
              </Link>
            </Box>
            <Box
              sx={{
                transition: `all ${animationDuration}s ease`,
                transform: catGifStyle.transform,
                opacity: catGifStyle.opacity,
              }}
            >
              <Image
                src={"/cat_clean.png"}
                alt={"猫ちゃんの画像"}
                width={200}
                height={200}
                priority
              />
            </Box>
          </Box>
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
                  transition: `opacity ${animationDuration}s ease, transform ${animationDuration}s ease`,
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
        </Box>
      </main>
    );
  }

  return (
    <main style={mainStyle}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            position: "fixed",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            top: "50%",
            left: "50%",
            width: "100%",
            minHeight: "300px",
            transform: linkVisible
              ? "translate(-50%, 0)"
              : "translate(-50%, -50%)",
            marginTop: linkVisible ? "-80px" : "0px",
            textAlign: "center",
            transition: `all ${animationDuration}s ease`,
          }}
        >
          <Box
            sx={{
              transition: `opacity ${animationDuration}s ease, transform ${animationDuration}s ease, all ${animationDuration}s ease`,
              transform: catGifStyle.transform,
              opacity: catGifStyle.opacity,
            }}
          >
            <Image
              src={"/cat_clean.png"}
              alt={"猫ちゃんの画像"}
              width={300}
              height={300}
              priority
            />
          </Box>
          <Box
            sx={{
              padding: "6px 20px",
              textAlign: "center",
              transition: `opacity ${animationDuration}s ease, width ${animationDuration}s ease`,
              opacity: linkVisible ? 1 : 0,
              flexDirection: "column",
              display: "flex",
              justifyContent: "space-between",
              width: linkVisible ? "auto" : "0px",
              minHeight: "300px",
              gap: "40px",
            }}
          >
            <Box
              sx={{
                padding: "0 8px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "2rem",
                }}
              >
                Menu
              </Typography>
              <DottedDivider color={"var(--primary)"} />
            </Box>
            <Link
              href="/services"
              style={{
                textDecoration: "none",
              }}
            >
              <Box sx={linkStyle}>サービス一覧</Box>
            </Link>
            <Link
              href="/events"
              style={{
                textDecoration: "none",
              }}
            >
              <Box sx={linkStyle}>イベント一覧</Box>
            </Link>
          </Box>
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: "50%",
            left: "50%",
            transform: linkVisible
              ? "translate(-50%, 0%)"
              : "translate(-50%, 50%)",
            transition: `all ${animationDuration}s ease`,
            paddingBottom: linkVisible ? "120px" : "0px",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: "1.5rem",
              color: "var(--text)",
              width: "100%",
              textAlign: "center",
              transition: `all ${animationDuration}s ease`,
              opacity: linkVisible ? 1 : 0,
              marginBottom: "-1.5rem",
            }}
          >
            watnowプロダクト一覧サイト
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: "7rem",
              letterSpacing: "0.1em",
              color: "var(--text)",
              textAlign: "center",
              transition: `all ${animationDuration}s ease`,
              opacity: titleOpacity,
              display: "flex",
              flexDirection: "row",
              gap: linkVisible ? "0px" : "400px",
            }}
          >
            <span>wat</span>
            <span>box</span>
          </Typography>
        </Box>
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
                transition: `opacity ${animationDuration}s ease, transform ${animationDuration}s ease`,
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
      </Box>
    </main>
  );
};

export default SplashScreen;
