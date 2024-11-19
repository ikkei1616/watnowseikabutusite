"use client";

import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import useShowUser from "./useShowUser";
import Header from "@/components/Header";
import DottedDivider from "@/components/DottedDivider";
import { HeaderMode } from "@/types/HeaderMode";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import LoadingPage from "@/components/loading/LoadingPage";
import TechItem from "@/components/TechItem";

const UserPage = ({ params }: { params: { account_id: string } }) => {
  const accountID = params.account_id;
  const { userData, loading } = useShowUser(accountID);

  if (loading) {
    return <LoadingPage />;
  }

  if (!userData) {
    return (
      <main className={styles.main_center}>
        <Header mode={HeaderMode.NONE} />
        <h2>存在しないユーザです</h2>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <Header mode={HeaderMode.NONE} />

      {/* TODO: 森岡のHeader当てる */}
      <Box sx={{ width: "100%", padding: "40px" }}>
        <Box
          sx={{ display: "flex", alignItems: "flex-end", textAlign: "center" }}
        >
          <Typography
            sx={{
              color: "#00AEEF",
              fontSize: "4rem",
              fontFamily: "HannariMincho",
            }}
            variant="h1"
          >
            ユーザ詳細
          </Typography>
          <Typography
            sx={{
              paddingLeft: "16px",
              color: "#00AEEF",
              fontSize: "2rem",
              fontFamily: "HannariMincho",
            }}
            aria-label="display arrow"
          >
            ＞
          </Typography>
          <Typography
            sx={{
              paddingLeft: "16px",
              color: "#00AEEF",
              fontSize: "3rem",
              fontFamily: "HannariMincho",
            }}
            variant="h1"
          >
            {userData.nickname}
          </Typography>
        </Box>
        <Divider
          variant="fullWidth"
          sx={{ borderColor: "#00AEEF", paddingTop: "16px" }}
        />

        <Box
          sx={{
            width: "100%",
            padding: "40px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "4rem",
              alignContent: "flex-start",
            }}
          >
            <Box
              width={300}
              height={300}
              sx={{
                borderRadius: "50%",
                backgroundColor: "#85D5F3CC",
              }}
            >
              <Image
                src={userData.image || "/unknown.svg"}
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
                {userData.nickname}
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
                {userData.introduction}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ paddingTop: "40px" }}>
            <Typography
              variant="h3"
              sx={{
                paddingLeft: "8px",
                fontSize: "1.5rem",
                fontFamily: "HannariMincho",
                color: "#00AEEF",
              }}
            >
              使用技術
            </Typography>
            <DottedDivider color="#00AEEF" />
            <List
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "10px",
                width: "100%",
              }}
            >
              {userData.technologies.map((tech) => (
                <TechItem key={tech.id} technology={tech} />
              ))}
            </List>
          </Box>
        </Box>
      </Box>
    </main>
  );
};

export default UserPage;
