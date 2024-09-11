"use client";

import React, { useEffect, useState } from "react";
import styles from "./Page.module.css";
import EventCard from "@/components/EventCard";
import { supabase } from "@/supabase/supabase";
import type { Event } from "@/types/Event";
import Header from "@/components/Header";
import { HeaderMode } from "@/types/HeaderMode";
import { Divider } from "@mui/material";

const EventPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("id, name, date, comment")
        .order("date", { ascending: false }); // 'date'降順ソート(新しい順でeventに格納)

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
    <main>
      <Header mode={HeaderMode.EVENTS} />
      <h1 className={styles.pageHeader}>イベント一覧 </h1>
      <Divider
        sx={{
          width: "95%",
          margin: "0 auto", // 自動マージンで中央に寄せる
          borderColor: "#00AEEF",
        }}
      />
      <div className={styles.eventList}>
        {events.map((event) => (
          <div className={styles.eventItemWrapper} key={event.id}>
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default EventPage;
