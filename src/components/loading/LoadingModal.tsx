"use client";
import React, { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const LoadingModal = ({ isOpen }: { isOpen: boolean }) => {
  const boxStyle = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
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
    <Modal
      open={isOpen}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={boxStyle}>
        <Typography variant="h6" style={{ color: "white" }}>
          Loading...
        </Typography>
      </Box>
    </Modal>
  );
};

export default LoadingModal;
