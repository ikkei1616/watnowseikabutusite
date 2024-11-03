"use client";

import React from "react";
import Link from "next/link";
import styles from "../../admin.module.css";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import AdminHeader from "@/components/admin/AdminHeader";
import PankuzuList from "@/components/admin/PankuzuList";
import AdminTitle from "@/components/admin/AdminTitle";
import DisplayError from "@/components/admin/DisplayError";
import useAdminTechnologyList from "@/hooks/useAdminTechnologyList";
import Image from "next/image";
import LoadingPage from "@/components/loading/LoadingPage";
import AdminTechLink from "@/components/admin/AdminTechLink";

const TechnologyPage: React.FC = () => {
  const { technologies, loading, error } = useAdminTechnologyList();

  const pankuzu = [
    { text: "ジャンル選択", link: "/admin" },
    { text: "技術スタック", link: "/admin/technologies" },
    {
      text: "既存ページ編集",
      link: "/admin/technologies/existing-technologies",
    },
  ];

  if (error) {
    return (
      <>
        <AdminHeader />
        <main className={styles.container}>
          <PankuzuList pankuzu={pankuzu} />
          <DisplayError height={"calc(100vh - 200px)"} error={error} />
        </main>
      </>
    );
  }

  if (loading) return <LoadingPage />;

  return (
    <>
      <AdminHeader />
      <main className={styles.container}>
        <PankuzuList pankuzu={pankuzu} />

        <Box
          sx={{
            paddingBottom: "100px",
          }}
        >
          <AdminTitle>技術スタック一覧</AdminTitle>
          <List
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "10px",
              width: "100%",
            }}
          >
            {technologies && technologies.length !== 0 ? (
              technologies.map((technology) => (
                <AdminTechLink
                  key={technology.id}
                  technology={technology}
                  href={`./existing-technologies/${technology.id}/edit`}
                />
              ))
            ) : (
              <p
                style={{
                  textAlign: "center",
                  fontSize: "1.5rem",
                  marginTop: "40px",
                }}
              >
                データがありません
              </p>
            )}
          </List>
        </Box>
      </main>
    </>
  );
};

export default TechnologyPage;
