"use client";
import React from "react";
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
