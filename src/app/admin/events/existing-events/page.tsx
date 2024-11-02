"use client";

import React, { useEffect, useState } from "react";
import styles from "../../admin.module.css";
import { supabase } from "@/supabase/supabase";
import type { Event } from "@/types/Event";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import AdminHeader from "@/components/admin/AdminHeader";
import PankuzuList from "@/components/admin/PankuzuList";
import AdminTitle from "@/components/admin/AdminTitle";
import AdminExistingLinkItem from "@/components/admin/AdminExistingLinkItem";
import SelectYearOptions from "@/components/admin/SelectYearOptions";
import useAdminSelectYear from "@/hooks/useAdminSelectYear";
import { YEARS_OPTIONS } from "@/const";

const EventPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const { selectedYear, handleYearChange } = useAdminSelectYear(YEARS_OPTIONS);

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

  return (
    <>
      <AdminHeader />
      <main className={styles.container}>
        <PankuzuList pankuzu={pankuzu} />

        <Box sx={{ display: "flex", padding: "30px", gap: "50px" }}>
          <SelectYearOptions
            handleYearChange={handleYearChange}
            yearOptions={YEARS_OPTIONS}
            defaultValue={selectedYear}
          />

          <Box sx={{ flexGrow: 1 }}>
            <AdminTitle>{selectedYear}年のイベント一覧</AdminTitle>
            <List>
              {events.map((event) => (
                <AdminExistingLinkItem
                  key={event.id}
                  href={`./existing-events/${event.id}/edit`}
                >
                  {event.name}
                </AdminExistingLinkItem>
              ))}
            </List>
          </Box>
        </Box>
      </main>
    </>
  );
};

export default EventPage;
