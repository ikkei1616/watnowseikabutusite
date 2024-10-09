"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../admin.module.css";
import { supabase } from "@/supabase/supabase";
import type { Event } from "@/types/Event";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import AdminHeader from "@/components/admin/AdminHeader";
import PankuzuList from "@/components/admin/PankuzuList";
import AdminTitle from "@/components/admin/AdminTitle";

const EventPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const pankuzu = [
    { text: "ジャンル選択", link: "/admin" },
    { text: "イベント", link: "/admin/events" },
    { text: "既存ページ編集", link: "/admin/events/existing-events" },
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("id, name, date, comment")
        .order("id", { ascending: true }); // 'id'で昇順にソート

      //取得に関するエラーハンドリング
      if (error) {
        console.error("Error fetching events:", error);
      } else {
        console.log("Fetched data:", data); // デバッグ用に取得データを出力
        setEvents((data as Event[]) || []); // データがnullのときの対策として空配列を設定
      }
    };

    fetchEvents();
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

  return (
    <>
      <AdminHeader />
      <main className={styles.container}>
        <PankuzuList pankuzu={pankuzu} />
        <AdminTitle>2024年のイベント一覧</AdminTitle>
        <List>
          {events.map((event) => (
            <ListItem sx={linkStyle}>
              <Link href={`./existing-events/${event.id}/edit`}>
                {event.name}
              </Link>
            </ListItem>
          ))}
        </List>
      </main>
    </>
  );
};

export default EventPage;
