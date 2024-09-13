"use client";

import React, { useEffect, useState } from "react";
import styles from "./Page.module.css";
import EventCard from "@/components/EventCard";
import { supabase } from "@/supabase/supabase";
import type { Event } from "@/types/Event";
import Header from "@/components/Header";
import { HeaderMode } from "@/types/HeaderMode";
import { Divider, Pagination } from "@mui/material";
import EventYearList from "@/components/EventYearList";
import type { FileObject } from "@supabase/storage-js";

const ITEMS_PER_PAGE = 5; // 1ページあたりのイベント数

const EventPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1); //現在いるページを格納
  const [totalEventCount, setTotalEventCount] = useState(0); //イベント総数

  useEffect(() => {
    const fetchEvents = async () => {
      // ページング用の開始位置と終了位置を計算
      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE - 1;

      // イベントデータを取得
      const {
        data: eventData,
        error: eventError,
        count,
      } = await supabase
        .from("events")
        .select("id, name, date, comment", { count: "exact" })
        .order("date", { ascending: false })
        .range(start, end);

      if (eventError) {
        console.error("Error fetching events:", eventError);
        return;
      }

      // 合計イベント数を設定
      setTotalEventCount(count || 0);

      // 画像ファイルの一覧を取得
      const fetchAllFiles = async () => {
        let allFiles: FileObject[] = [];
        let offset = 0; //先頭からリストを取得
        const limit = 50; // 一度に取得するファイル数上限
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
            console.log("file is empty");
          }

          if (files && files.length > 0) {
            allFiles = allFiles.concat(files); //結合
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
  }, [page]); // ページが変更されるたびにデータを再取得

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value); // ページ番号を更新
  };

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
      {/* ページネーションを最下部に配置 */}
      <Pagination
        count={Math.ceil(totalEventCount / ITEMS_PER_PAGE)} // 総ページ数を計算
        page={page}
        onChange={handlePageChange}
        sx={{
          marginTop: "20px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      />
    </main>
  );
};

export default EventPage;
