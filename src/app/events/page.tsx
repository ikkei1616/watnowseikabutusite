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
import theme from "@/theme";

const ITEMS_PER_PAGE = 5; // 1ページあたりのイベント数

const EventPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1); //現在いるページ
  const [totalEventCount, setTotalEventCount] = useState(0); //イベント総数
  const [eventCountByYear, setEventCountByYear] = useState<
    Record<number, number>
  >({}); //各年のイベント数

  useEffect(() => {
    const fetchAllEvents = async () => {
      // 全てのイベントデータを取得
      const {
        data: allEventData,
        error: allEventError,
        count,
      } = await supabase
        .from("events")
        .select("id, name, date, comment", { count: "exact" }) //イベント数を正確にcount
        .order("date", { ascending: false });

      if (allEventError) {
        console.error("Error fetching all events:", allEventError);
        return;
      }
      setTotalEventCount(count || 0);

      // 各年のイベント数を計算
      const countByYear: Record<number, number> = {};
      (allEventData as Event[]).forEach((event) => {
        const year = new Date(event.date).getFullYear(); //年部分だけを取得
        countByYear[year] = (countByYear[year] || 0) + 1; //countByYearのインクリメント
      });
      setEventCountByYear(countByYear);

      // 現在のページに表示するイベントを設定
      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      const eventsForPage = (allEventData as Event[]).slice(start, end); //startからendまでのイベントを切り出し

      // 画像ファイルの一覧を取得
      const fetchAllFiles = async () => {
        let allFiles: FileObject[] = [];
        let offset = 0; //ファイル取得開始位置
        let hasMore = true;

        while (hasMore) {
          const { data: files, error: error } = await supabase.storage
            .from("event_images")
            .list("", { offset });

          if (error) {
            console.error("Error listing files:", error);
            return allFiles;
          }

          if (files && files.length === 0) {
            console.log("file is empty");
          }

          if (files && files.length > 0) {
            allFiles = allFiles.concat(files);
            offset += files.length;
          } else {
            hasMore = false;
          }
        }
        return allFiles;
      };

      const files = await fetchAllFiles();
      const fileNamesSet = new Set(files?.map((file) => file.name)); //一意なファイル名だけが格納されるsetオブジェクト

      console.log(fileNamesSet);

      const eventsWithImages = eventsForPage.map((event) => {
        const extensions = ["JPG", "jpg", "jpeg", "png", "gif"];
        let imageUrl: string | null = null;

        for (const ext of extensions) {
          const fileName = `${event.id}.${ext}`;
          //fileNameの名前の画像があるか否か
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

    fetchAllEvents();
  }, [page]);

  const handlePageChange = (
    _: React.ChangeEvent<unknown>, //使われない引数
    nextpage: number
  ) => {
    setPage(nextpage);
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
        {/* 各年のイベント数をEventYearListコンポーネントに渡す */}
        <EventYearList eventCountByYear={eventCountByYear} />
        <div className={styles.eventList}>
          {events.map((event) => (
            <div className={styles.eventItemWrapper} key={event.id}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>
      <Pagination
        count={Math.ceil(totalEventCount / ITEMS_PER_PAGE)}
        page={page}
        onChange={handlePageChange}
        boundaryCount={1}
        sx={{
          marginTop: theme.spacing(6),
          marginBottom: theme.spacing(3),
          display: "flex",
          justifyContent: "center",
          "& .MuiPaginationItem-root": {
            color: "#85D5F3",
          },
          "& .Mui-selected": {
            backgroundColor: "#85D5F3 !important",
            color: "#fff !important",
          },
          "& .MuiPaginationItem-root:hover": {
            backgroundColor: "#85D5F3 !important",
            color: "#fff !important",
          },
        }}
      />
    </main>
  );
};

export default EventPage;
