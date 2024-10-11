"use client";
import React, { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

const LoadingPage = () => {
  const mainStyle = {
    width: "100vw",
    height: "100vh",
    paddingTop: 0,
    overflow: "hidden", // スクロールを防ぐために追加
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
      <LoadingSpinner />
    </main>
  );
};

export default LoadingPage;