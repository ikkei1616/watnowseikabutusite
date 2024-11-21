"use client";

import React from "react";
import styles from "./page.module.css";
import useShowUser from "./useShowUser";
import Header from "@/components/Header";
import { HeaderMode } from "@/types/HeaderMode";
import Box from "@mui/material/Box";
import LoadingPage from "@/components/loading/LoadingPage";
import ItemList from "@/components/ItemList";
import TechItem from "@/components/TechItem";
import PageHeader from "@/components/PageHeader";
import DisplayIconAndName from "@/components/userDetails/DisplayIconAndName";
import DetailContainer from "@/components/DetailContainer";
import DetailHeader from "@/components/DetailHeader";
import DisplaySNS from "@/components/userDetails/DisplaySNS";
import ServiceCard from "@/components/ServiceCard";

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

        <DisplayIconAndName user={userData} />

        <DetailContainer>
          <DetailHeader title="技術スタック" />
          <ItemList>
            {userData.technologies.map((tech) => (
              <TechItem key={tech.id} technology={tech} />
            ))}
          </ItemList>
        </DetailContainer>

        <DetailContainer>
          <DetailHeader title="各種SNSアカウント" />
          <DisplaySNS user={userData} />
        </DetailContainer>

        <DetailContainer>
          <DetailHeader title={"作成したサービス"} />
          <ItemList>
            {userData.services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </ItemList>
        </DetailContainer>
      </Box>
    </main>
  );
};

export default UserPage;
