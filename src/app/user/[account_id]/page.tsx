"use client";

import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import useShowUser from "./useShowUser";
import Header from "@/components/Header";
import { HeaderMode } from "@/types/HeaderMode";

const UserPage = ({ params }: { params: { account_id: string } }) => {
  const accountID = params.account_id;
  const { userData, userIconURL, loading } = useShowUser(accountID);

  if (loading) {
    return (
      <main className={styles.main_center}>
        <p>Loading...</p>
      </main>
    );
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
      <h1>これはユーザの詳細ページです</h1>
      <h2>ユーザID: {accountID}</h2>
      <br />

      {userIconURL ? (
        <Image
          src={userIconURL}
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
