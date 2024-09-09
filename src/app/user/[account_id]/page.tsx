"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { supabase } from "@/supabase/supabase";
import type User from "@/types/User";
import Technology from "@/types/Technology";

const UserPage = ({ params }: { params: { account_id: string } }) => {
  const accountID = params.account_id;
  const [userData, setUserData] = useState<User | null>(null);
  const [userIconUrl, setUserIconUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(userData);

  useEffect(() => {
    const fetchUserIcons = async (id: string) => {
      const extensions = ["JPG", "jpg", "jpeg", "png", "gif"];
      let imageUrl = null;

      for (const ext of extensions) {
        const { data } = supabase.storage
          .from("user_icons")
          .getPublicUrl(`${id}.${ext}`);
        if (data?.publicUrl) {
          imageUrl = data.publicUrl;
          break;
        }
      }
      return imageUrl;
    };

    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from("users")
        .select(
          `
          *,
          users_technologies(technology_id(id, name))
          `
        )
        .eq("account_id", accountID)
        .single();

      if (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);
      } else {
        setUserData({
          id: data?.id,
          accountID: data?.account_id,
          name: data?.name,
          nickname: data?.nickname,
          introduction: data?.introduction || "",
          technologies:
            data?.users_technologies.map(
              (users_technology: { technology_id: Technology }) =>
                users_technology.technology_id
            ) || [],
        } as User);

        const fetchedURL = await fetchUserIcons(data?.id);
        setUserIconUrl(fetchedURL);
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
        <h2>ユーザID: {accountID}</h2>
        <br />
        <p>存在しないユーザです</p>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <h1>これはユーザの詳細ページです</h1>
      <h2>ユーザID: {accountID}</h2>
      <br />

      {userIconUrl ? (
        <Image
          src={userIconUrl}
          alt={"ユーザのアイコン画像"}
          width={300}
          height={300}
        />
      ) : (
        <p>画像ないよ</p>
      )}

      <h3>名前: {userData.name}</h3>
      <h3>ニックネーム: {userData.nickname}</h3>
      <h3>自己紹介: {userData.introduction}</h3>
      <h3>
        使用技術:
        <ul>
          {userData.technologies.map((tech) => (
            <li key={tech.id}>{tech.name}</li>
          ))}
        </ul>
      </h3>
    </main>
  );
};

export default UserPage;
