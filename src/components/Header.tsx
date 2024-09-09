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
        padding: "1rem",
      }}
    >
      <Box sx={{ textAlign: "left" }}>
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

      <Box>
        <Button>
          <Typography>サービス一覧</Typography>
        </Button>
        <Button>
          <Typography>イベント一覧</Typography>
        </Button>
        <Button>
          <Typography>
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
