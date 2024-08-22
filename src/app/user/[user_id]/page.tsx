"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { supabase } from "@/supabase/supabase";
import type User from "@/types/User";

const UserPage = ({ params }: { params: { user_id: string } }) => {
  const userID = params.user_id;
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("user_id, name, nickname, introduction")
        .eq("user_id", userID)
        .single();

      console.log("data:", data);
      if (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);
      } else {
        console.log("Fetched data:", data);
        setUserData({
          userID: data?.user_id,
          name: data?.name,
          nickname: data?.nickname,
          introduction: data?.introduction || "",
        } as User);
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <main className={styles.main}>
        <p>Loading...</p>
      </main>
    );
  }

  if (!userData) {
    return (
      <main className={styles.main}>
        <h1>これはユーザの詳細ページです</h1>
        <h2>ユーザID: {userID}</h2>
        <br />
        <p>存在しないユーザです</p>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <h1>これはユーザの詳細ページです</h1>
      <h2>ユーザID: {userID}</h2>
      <br />
      <h3>名前: {userData.name}</h3>
      <h3>ニックネーム: {userData.nickname}</h3>
      <h3>自己紹介: {userData.introduction}</h3>
    </main>
  );
};

export default UserPage;
