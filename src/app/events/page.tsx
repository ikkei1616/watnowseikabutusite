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
import type { FileObject } from "@supabase/storage-js";

const EventPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      // イベントデータを取得
      const { data: eventData, error: eventError } = await supabase
        .from("events")
        .select("id, name, date, comment")
        .order("date", { ascending: false });

      if (eventError) {
        console.error("Error fetching events:", eventError);
        return;
      }

      // 画像ファイルの一覧を取得
      const fetchAllFiles = async () => {
        let allFiles: FileObject[] = [];
        let offset = 0;
        const limit = 50; //一度に取得するファイル数上限
        let hasMore = true;

        while (hasMore) {
          const { data: files, error } = await supabase.storage
            .from("event_images")
            .list("", { limit, offset });

          if (error) {
            console.error("Error listing files:", error);
            return allFiles;
          }

          if (files && files.length === 0) {
            console.log("files is empty");
          }
          if (files && files.length > 0) {
            console.log("you could get files");
            allFiles = allFiles.concat(files);
            offset += files.length;
          } else {
            hasMore = false;
          }
        }

        return allFiles;
      };

      const files = await fetchAllFiles();

      // ファイル名のセットを作成
      const fileNamesSet = new Set(files?.map((file) => file.name));

      // イベントデータに画像URLを追加
      const eventsWithImages = (eventData as Event[]).map((event) => {
        const extensions = ["JPG", "jpg", "jpeg", "png", "gif"];
        let imageUrl: string | null = null;

        for (const ext of extensions) {
          const fileName = `${event.id}.${ext}`;
          if (fileNamesSet.has(fileName)) {
            const { data } = supabase.storage
              .from("event_images")
              .getPublicUrl(fileName);
            imageUrl = data?.publicUrl || null;
            break;
          }
        }

        return { ...event, imageUrl };
      });

      setEvents(eventsWithImages);
    };

    fetchEvents();
  }, []);

  console.log(events);
  return (
    <main>
      <Header mode={HeaderMode.EVENTS} />
      <h1 className={styles.pageHeader}>イベント一覧</h1>
      <Divider
        sx={{
          width: "95%",
          margin: "0 auto",
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
