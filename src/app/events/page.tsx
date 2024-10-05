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
import theme from "@/theme";

const ITEMS_PER_PAGE = 5; // 1ページあたりのイベント数

const EventPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1); // 現在のページ
  const [totalEventCount, setTotalEventCount] = useState(0); // イベント総数
  const [eventCountByYear, setEventCountByYear] = useState<
    Record<number, number>
  >({}); // 各年のイベント数
  const [selectedYear, setSelectedYear] = useState<number>(0); // 選択された年

  // 初期ロード時各年のイベント数を取得、最新の年の選択
  useEffect(() => {
    const fetchEventCountsByYear = async () => {
      const { data: allEventData, error: allEventError } = await supabase
        .from("events")
        .select("date");

      if (allEventError) {
        console.error("Error fetching all events:", allEventError);
        return;
      }

      // 各年のイベント数を計算
      const countByYear: Record<number, number> = {};
      (allEventData as Event[]).forEach((event) => {
        const year = new Date(event.date).getFullYear(); // 年を取得
        countByYear[year] = (countByYear[year] || 0) + 1;
      });
      setEventCountByYear(countByYear);

      // 最新の年を選択
      const years = Object.keys(countByYear).map(Number);
      const latestYear = Math.max(...years);
      setSelectedYear(latestYear);
    };

    fetchEventCountsByYear();
  }, []);

  // 選択された年とページが変更されたときにイベントを取得
  useEffect(() => {
    const fetchEventsForYear = async () => {
      // 選択された年のイベント総数を取得
      const { count, error: countError } = await supabase
        .from("events")
        .select("id", { count: "exact", head: true })
        .gte("date", `${selectedYear}-01-01`)
        .lte("date", `${selectedYear}-12-31`);

      if (countError) {
        console.error("Error fetching event count:", countError);
        return;
      }
      setTotalEventCount(count || 0);

      // ページネーションに基づいてイベントを取得
      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE - 1;

      const { data: eventsData, error: eventsError } = await supabase
        .from("events")
        .select("id, name, date, comment")
        .gte("date", `${selectedYear}-01-01`)
        .lte("date", `${selectedYear}-12-31`)
        .order("date", { ascending: false })
        .range(start, end);

      if (eventsError) {
        console.error("Error fetching events:", eventsError);
        return;
      }

      // 画像URLを取得
      const eventsWithImages = await Promise.all(
        (eventsData as Event[]).map(async (event) => {
          const extensions = ["jpg", "JPG", "jpeg", "png", "gif"];
          let imageUrl: string | null = null;

          for (const ext of extensions) {
            const fileName = `${event.id}.${ext}`;
            // ファイルの存在を確認するために createSignedUrl を使用
            const { data: signedUrlData, error } = await supabase.storage
              .from("event_images")
              .createSignedUrl(fileName, 1); // 有効期限は短く設定

            if (!error && signedUrlData?.signedUrl) {
              // ファイルが存在する場合、publicUrl を取得
              const { data: publicUrlData } = supabase.storage
                .from("event_images")
                .getPublicUrl(fileName);

              if (publicUrlData?.publicUrl) {
                imageUrl = publicUrlData.publicUrl;
                break;
              }
            }
          }
          return { ...event, imageUrl };
        })
      );

      setEvents(eventsWithImages);
    };

    fetchEventsForYear();
  }, [selectedYear, page]);

  const handlePageChange = (
    _: React.ChangeEvent<unknown>, // 使われない引数
    nextPage: number
  ) => {
    setPage(nextPage);
  };

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setPage(1); // ページをリセット
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
        {/* イベント年リストにハンドラーと選択された年を渡す */}
        <EventYearList
          eventCountByYear={eventCountByYear}
          onYearSelect={handleYearSelect}
          selectedYear={selectedYear}
        />
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
