"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../admin.module.css";
import { supabase } from "@/supabase/supabase";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import AdminHeader from "@/components/admin/AdminHeader";
import PankuzuList from "@/components/admin/PankuzuList";
import AdminTitle from "@/components/admin/AdminTitle";
import type { AdminUserList } from "@/types/User";
import LoadingPage from "@/components/loading/LoadingPage";

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<AdminUserList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const pankuzu = [
    { text: "ジャンル選択", link: "/admin" },
    { text: "ユーザ", link: "/admin/users" },
    { text: "既存ページ編集", link: "/admin/users/existing-users" },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("id, name, nickname")
        .order("name", { ascending: true });

      //取得に関するエラーハンドリング
      if (error) {
        console.error("Error fetching services:", error);
      } else {
        if (data === null) {
          console.error("No data fetched");
          return;
        }
        console.log("Fetched data:", data); // デバッグ用に取得データを出力
        const fetchedUsers: AdminUserList[] = data.map((user) => {
          return {
            id: user.id,
            name: user.name,
            nickname: user.nickname,
          };
        });
        setUsers(fetchedUsers || []); // データがnullのときの対策として空配列を設定
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const linkStyle = {
    color: "#0063BF",
    width: "fit-content",
    padding: "4px 12px 6px 12px",
    marginBottom: "12px",
    fontSize: "1.5rem",
    linkStyle: "",
    "&:hover": {
      backgroundColor: "#0063BF11",
      borderRadius: "5px",
    },
    "@media screen and (max-width: 768px)": {
      fontSize: "1rem",
    },
    // ドットを表示
    "&::before": {
      content: '"・"',
      color: "#0063BF",
      fontSize: "1.5rem",
      marginRight: "6px",
    },
  };

  if (loading) return <LoadingPage />;

  return (
    <>
      <AdminHeader />
      <main className={styles.container}>
        <PankuzuList pankuzu={pankuzu} />

        <Box>
          <AdminTitle>ユーザ一覧</AdminTitle>
          <List>
            {users.map((user) => (
              <ListItem key={user.id} sx={linkStyle}>
                <Link href={`./existing-users/${user.id}/edit`}>
                  {user.name}({user.nickname})
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </main>
    </>
  );
};

export default UserPage;
