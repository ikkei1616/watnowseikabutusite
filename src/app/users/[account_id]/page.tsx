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
import List from "@mui/material/List";
import LoadingPage from "@/components/loading/LoadingPage";
import TechItem from "@/components/TechItem";
import PageHeader from "@/components/PageHeader";

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
      <Box
        sx={{
          width: "100%",
          padding: "40px",
          "@media screen and (max-width: 600px)": {
            padding: "20px",
          },
        }}
      >
        <PageHeader title="ユーザ詳細" pageTitle={userData.nickname} />

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
                src={userData.image || "/unknown.svg"}
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
        </Box>

        <Box>
          <Box
            sx={{
              paddingTop: "40px",
              "@media screen and (max-width: 600px)": {
                paddingTop: "20px",
              },
            }}
          >
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
                paddingTop: "11px",
                paddingBottom: "none",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "10px",
                width: "100%",
                "@media screen and (max-width: 900px)": {
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                },
                "@media screen and (max-width: 600px)": {
                  gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                },
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
