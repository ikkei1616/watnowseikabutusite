"use client";

import React, { useEffect, useState } from "react";
import styles from "./Page.module.css";
import { EventCard, SkeletonEventCard } from "@/components/EventCard";
import { supabase } from "@/supabase/supabase";
import type { Event } from "@/types/Event";
import Header from "@/components/Header";
import { HeaderMode } from "@/types/HeaderMode";
import { Divider, Pagination, Skeleton, Box } from "@mui/material";
import {
  EventYearList,
  SkeletonEventYearList,
} from "@/components/EventYearList";
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
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(true);
      const { count, error: countError } = await supabase
        .from("events")
        .select("id", { count: "exact", head: true })
        .gte("date", `${selectedYear}-01-01`)
        .lte("date", `${selectedYear}-12-31`);

      if (countError) {
        console.error("Error fetching event count:", countError.message);
        return;
      }
      setTotalEventCount(count || 0);

      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE - 1;

      const { data: eventsData, error: eventsError } = await supabase
        .from("events")
        .select("id, name, date, comment, image")
        .gte("date", `${selectedYear}-01-01`)
        .lte("date", `${selectedYear}-12-31`)
        .order("date", { ascending: false })
        .range(start, end);

      if (eventsError) {
        console.error("Error fetching events:", eventsError);
        return;
      }

      setEvents(eventsData as Event[]);
      setIsLoading(false);
      console.log(eventsData);
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
      {isLoading ? (
        <div className={styles.container}>
          <SkeletonEventYearList />
          <div className={styles.eventList}>
            <SkeletonEventCard />
          </div>
        </div>
      ) : (
        <div className={styles.container}>
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
      )}

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
