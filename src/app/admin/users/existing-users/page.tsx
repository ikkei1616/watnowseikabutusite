"use client";

import React from "react";
import styles from "../../admin.module.css";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import AdminHeader from "@/components/admin/AdminHeader";
import PankuzuList from "@/components/admin/PankuzuList";
import AdminTitle from "@/components/admin/AdminTitle";
import LoadingPage from "@/components/loading/LoadingPage";
import useAdminUserList from "@/hooks/useAdminUserList";
import AdminExistingLinkItem from "@/components/admin/AdminExistingLinkItem";
import DisplayError from "@/components/admin/DisplayError";

const UserPage: React.FC = () => {
  const { users, loading, error } = useAdminUserList();

  const pankuzu = [
    { text: "ジャンル選択", link: "/admin" },
    { text: "ユーザ", link: "/admin/users" },
    { text: "既存ページ編集", link: "/admin/users/existing-users" },
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
          <AdminTitle>ユーザ一覧</AdminTitle>
          <List>
            {users && users.length !== 0 ? (
              users.map((user) => (
                <AdminExistingLinkItem
                  key={user.id}
                  href={`./existing-users/${user.id}/edit`}
                >
                  {user.name}({user.nickname})
                </AdminExistingLinkItem>
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

export default UserPage;
