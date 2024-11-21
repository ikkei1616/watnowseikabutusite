"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";

const LoadingPage = () => {
  const mainStyle = {
    backgroundColor: "#F8F8F8",
    width: "100vw",
    height: "100vh",
    paddingTop: 0,
    overflow: "hidden", // スクロールを防ぐために追加
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  useEffect(() => {
    // body と html のスタイルをリセット
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // クリーンアップ関数で元に戻す
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <main style={mainStyle}>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Image
          src={"/cat.gif"}
          alt={"猫ちゃんの画像"}
          width={500}
          height={500}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <Image
            src={"/now_loading.svg"}
            alt={"猫ちゃんの画像"}
            style={{
              animation: "rotate 15s linear infinite",
            }}
            width={400}
            height={400}
          />
        </Box>
      </Box>
    </main>
  );
};

export default LoadingPage;
