import React from "react";
import Image from "next/image";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const LoadingModal = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <Modal
      open={isOpen}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
        }}
      >
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
    </Modal>
  );
};

export default LoadingModal;
