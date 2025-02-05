import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Header from "@/components/Header";
import { HeaderMode } from "@/types/HeaderMode";

const ShowError = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <main>
      <Header mode={HeaderMode.NONE} />
      <Box
        sx={{
          backgroundColor: "#F8F8F8",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "48px",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "fit-content",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "4rem",
          }}
        >
          {errorMessage && (
            <Typography
              variant="h1"
              sx={{
                width: "100%",
                textAlign: "center",
                fontSize: "2rem",
                position: "absolute",
                top: "20%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {errorMessage}
            </Typography>
          )}
          <Image
            src={"/cat.gif"}
            alt={"猫ちゃんの画像"}
            width={500}
            height={500}
            priority
          />
        </Box>
      </Box>
    </main>
  );
};

export default ShowError;
