"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Page.module.css";
import { supabase } from "@/supabase/supabase";
import type { Event } from "@/types/Event";

const EventPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

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

  return (
    <main className={styles.pageHeader}>
      <h1>これはイベント一覧ページ</h1>
      <ul className={styles.eventList}>
        {events.map((event) => (
          <li key={event.id} className={styles.eventItem}>
            <Link
              href={`./existing-events/${event.id}/edit`}
              className={styles.eventLink}
            >
              <p>{event.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default EventPage;
