import { Box, Typography, Avatar } from "@mui/material";
import type { UserDetail } from "@/types/User";
import DottedDivider from "@/components/DottedDivider";

interface DisplayIconAndNameProps
  extends Pick<
    UserDetail,
    "nickname" | "accountID" | "introduction" | "image"
  > {}

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
              width: "180px",
              height: "180px",
            },
            "@media screen and (max-width: 500px)": {
              width: "130px",
              height: "130px",
            },
          }}
        >
          <Avatar
            src={user.image || "/unknown.svg"}
            alt="ユーザのアイコン画像"
            sx={{
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              border: "1px solid #85D5F3CC",
              "@media screen and (max-width: 900px)": {
                width: "250px",
                height: "250px",
              },
              "@media screen and (max-width: 750px)": {
                width: "180px",
                height: "180px",
              },
              "@media screen and (max-width: 500px)": {
                width: "130px",
                height: "130px",
              },
            }}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              alignItems: "flex-end",
              "@media screen and (max-width: 500px)": {
                gap: "0",
              },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                paddingLeft: "8px",
                fontSize: "2rem",
                fontFamily: "HannariMincho",
                "@media screen and (max-width: 900px)": {
                  fontSize: "1.5rem",
                },
                "@media screen and (max-width: 500px)": {
                  fontSize: "1rem",
                },
              }}
            >
              {user.nickname}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                paddingLeft: "8px",
                fontSize: "1.5rem",
                fontFamily: "HannariMincho",
                opacity: 0.8,
                "@media screen and (max-width: 900px)": {
                  fontSize: "1.25rem",
                },
                "@media screen and (max-width: 500px)": {
                  fontSize: "0.75rem",
                },
              }}
            >
              @{user.accountID}
            </Typography>
          </Box>
          <DottedDivider color="#878686" />
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.4rem",
              fontFamily: "HannariMincho",
              padding: "8px",
              //   はみ出たら折り返す
              overflowWrap: "break-word",
              "@media screen and (max-width: 900px)": {
                fontSize: "1.25rem",
              },
              "@media screen and (max-width: 500px)": {
                fontSize: "0.75rem",
              },
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
