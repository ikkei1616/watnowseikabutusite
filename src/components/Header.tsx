import React from "react";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Header = () => {
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
        <Button
          sx={{
            backgroundColor: "white",
            padding: "1rem 2rem 0.8rem 2rem",
            borderRadius: "1rem 1rem 0 0",
            height: "100%",
          }}
        >
          <Typography
            sx={{
              fontFamily: "HannariMincho",
            }}
          >
            サービス一覧
          </Typography>
        </Button>
        <Button
          sx={{
            backgroundColor: "white",
            padding: "1rem 2rem 0.8rem 2rem",
            borderRadius: "1rem 1rem 0 0",
            height: "100%",
          }}
        >
          <Typography
            sx={{
              fontFamily: "HannariMincho",
            }}
          >
            イベント一覧
          </Typography>
        </Button>
        <Button
          sx={{
            padding: "0.8rem 2rem",
            borderRadius: "1rem 1rem 0 0",
          }}
        >
          <Typography
            sx={{
              fontFamily: "HannariMincho",
              lineHeight: "1.25",
            }}
          >
            管理者
            <br />
            ページ
          </Typography>
        </Button>
      </Box>
    </AppBar>
  );
};

export default Header;
