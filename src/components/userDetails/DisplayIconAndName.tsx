import { Box, Typography } from "@mui/material";
import Image from "next/image";
import styles from "./displayIconAndName.module.css";
import type { UserDetail } from "@/types/User";
import DottedDivider from "@/components/DottedDivider";

interface DisplayIconAndNameProps
  extends Pick<UserDetail, "nickname" | "introduction" | "image"> {}

const DisplayIconAndName = ({ user }: { user: DisplayIconAndNameProps }) => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: "40px 40px 0px 40px",

        "@media screen and (max-width: 600px)": {
          padding: "20px 10px 0px 10px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "4rem",
          alignContent: "flex-start",
          "@media screen and (max-width: 900px)": {
            gap: "2rem",
          },
          "@media screen and (max-width: 750px)": {
            gap: "1rem",
          },
        }}
      >
        <Box
          sx={{
            borderRadius: "50%",
            backgroundColor: "#85D5F3CC",
            width: "300px",
            height: "300px",
            "@media screen and (max-width: 900px)": {
              width: "250px",
              height: "250px",
            },
            "@media screen and (max-width: 750px)": {
              width: "200px",
              height: "200px",
            },
            "@media screen and (max-width: 600px)": {
              width: "150px",
              height: "150px",
            },
          }}
        >
          <Image
            src={user.image || "/unknown.svg"}
            className={styles.userIcon}
            alt={"ユーザのアイコン画像"}
            width={300}
            height={300}
            style={{
              borderRadius: "50%",
              border: "1px solid #85D5F3CC",
            }}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="body1"
            sx={{
              paddingLeft: "8px",
              fontSize: "2rem",
              fontFamily: "HannariMincho",
            }}
          >
            {user.nickname}
          </Typography>
          <DottedDivider color="#878686" />
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.4rem",
              fontFamily: "HannariMincho",
              padding: "8px",
            }}
          >
            {user.introduction}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DisplayIconAndName;
