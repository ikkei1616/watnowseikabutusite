"use client";

import React from "react";
import styles from "./page.module.css";
// import { supabase } from "../../../supabase/supabase";

const UserPage = ({ params }: { params: { user_id: string } }) => {
  const userID = params.user_id;
  // const [events, setEvents] = useState<any[]>([]);

  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     const { data, error } = await supabase
  //       .from("events")
  //       .select("id, name, date, comment")
  //       .order("id", { ascending: true }); // 'id'で昇順にソート

  //     //取得に関するエラーハンドリング
  //     if (error) {
  //       console.error("Error fetching events:", error);
  //     } else {
  //       console.log("Fetched data:", data); // デバッグ用に取得データを出力
  //       setEvents(data || []); // データがnullのときの対策として空配列を設定
  //     }
  //   };

  //   fetchEvents();
  // }, []);

  return (
    <main className={styles.main}>
      <h1>これはユーザの詳細ページです</h1>
      <h2>ユーザID: {userID}</h2>
    </main>
  );
};

export default UserPage;
