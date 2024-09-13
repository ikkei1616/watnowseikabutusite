"use client";

import React, { useEffect, useState } from "react";
import styles from "./Page.module.css";
import EventCard from "@/components/EventCard";
import { supabase } from "@/supabase/supabase";
import type { Event } from "@/types/Event";
import Header from "@/components/Header";
import { HeaderMode } from "@/types/HeaderMode";
import { Divider } from "@mui/material";
import EventYearList from "@/components/EventYearList";

const EventPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data: eventData, error: eventError } = await supabase
        .from("events")
        .select("id, name, date, comment")
        .order("date", { ascending: false }); // 'date'降順ソート(新しい順でeventに格納)

      if (eventError) {
        console.error("Error fetching events:", eventError);
        return;
      }

      //画像Urlの取得
      const fetchImageUrl = async (id: string): Promise<string | null> => {
        const extensions = ["JPG", "jpg", "jpeg", "png", "gif"];

        for (const ext of extensions) {
          const fileName = `${id}.${ext}`;

          // ファイルが存在するか確認するためにダウンロードを試みる
          const { error: downloadError } = await supabase.storage
            .from("event_images")
            .download(fileName);

          if (!downloadError) {
            // ファイルが存在する場合にのみ公開URLを取得
            const { data } = supabase.storage
              .from("event_images")
              .getPublicUrl(fileName);

            if (data?.publicUrl) {
              return data.publicUrl; // 最初に見つかった画像URLを返す
            }
          }
        }

        return null; // 画像が見つからなければnullを返す
      };

      //イベントデータに画像URLを追加
      const eventsWithImages = await Promise.all(
        (eventData as Event[]).map(async (event) => {
          const imageUrl = await fetchImageUrl(event.id as string); // 画像URLを取得
          return { ...event, imageUrl }; // 画像URLをイベントデータに追加
        })
      );

      setEvents(eventsWithImages);
    };

    fetchEvents();
  }, []);

  console.log(events);
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
      <div className={styles.container}>
        <EventYearList />
        <div className={styles.eventList}>
          {events.map((event) => (
            <div className={styles.eventItemWrapper} key={event.id}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default EventPage;
