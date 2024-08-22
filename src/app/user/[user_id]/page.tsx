"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { supabase } from "@/supabase/supabase";

const UserPage = ({ params }: { params: { user_id: string } }) => {
  const userID = params.user_id;
  const [userData, setUserData] = useState<any | null>(null);

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
      } else {
        console.log("Fetched data:", data);
        setUserData(data);
      }
    };

    fetchUserData();
  }, []);

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
