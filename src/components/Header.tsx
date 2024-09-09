import React from "react";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { HeaderMode } from "@/types/HeaderMode";

const Header = ({ mode }: { mode: HeaderMode }) => {
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
        backgroundColor: "#85D5F3",
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
            backgroundColor:
              mode === HeaderMode.SERVICES ? "#FAFBFB" : "#00AEEF",
            padding: "1rem 2rem 0.8rem 2rem",
            borderRadius: "1rem 1rem 0 0",
            height: "100%",
            transition: "padding-bottom 0.2s",
            "&:hover": {
              paddingBottom: "1.6rem",
              backgroundColor:
                mode === HeaderMode.SERVICES ? "#FAFBFB" : "#00AEEF",
            },
          }}
        >
          <Typography
            sx={{
              color: mode === HeaderMode.SERVICES ? "#4D4D4D" : "white",
              fontFamily: "HannariMincho",
            }}
          >
            サービス一覧
          </Typography>
        </Button>
        <Button
          sx={{
            backgroundColor: mode === HeaderMode.EVENTS ? "#FAFBFB" : "#00AEEF",
            padding: "1rem 2rem 0.8rem 2rem",
            borderRadius: "1rem 1rem 0 0",
            height: "100%",
            transition: "padding-bottom 0.2s",
            "&:hover": {
              paddingBottom: "1.6rem",
              backgroundColor:
                mode === HeaderMode.EVENTS ? "#FAFBFB" : "#00AEEF",
            },
          }}
        >
          <Typography
            sx={{
              color: mode === HeaderMode.EVENTS ? "#4D4D4D" : "white",
              fontFamily: "HannariMincho",
            }}
          >
            イベント一覧
          </Typography>
        </Button>
        <Button
          sx={{
            padding: "0.4rem 1rem",
          }}
        >
          <Box
            sx={{
              padding: "0.4rem 1rem",
              borderRadius: "1rem",
              "&:hover": {
                background: "#00AEEF33",
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: "HannariMincho",
                lineHeight: "1.25",
                color: "white",
              }}
            >
              管理者
              <br />
              ページ
            </Typography>
          </Box>
        </Button>
      </Box>
    </AppBar>
  );
};

export default Header;
