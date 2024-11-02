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
import { YEARS_OPTIONS } from "@/const";
import SelectYearOptions from "@/components/admin/SelectYearOptions";

const EventPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(YEARS_OPTIONS[0]);

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

  const handleYearChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setSelectedYear(parseInt(value));
  };

  const yearButtonStyle = {
    color: "var(--text)",
    width: "100%",
    padding: "10px",
    margin: "0",
    fontSize: "1.5rem",
    backgroundImage: "linear-gradient(to right, #9CABC7 6px, transparent 6px)",
    backgroundSize: "10px 1px",
    backgroundRepeat: "repeat-x",
    backgroundPosition: "left bottom",
    "& .MuiTypography-root": {
      flexGrow: 1,
      fontFamily: "HannariMincho",
      fontSize: "1.5rem",
      color: "var(--text)",
    },
    "& .Mui-checked + .MuiTypography-root": {
      color: "#0063BF",
    },
    "& .Mui-checked + span::before": {
      content: '"▶︎"',
      paddingTop: "0.3rem",
      paddingRight: "0",
    },
    span: {
      display: "flex",
      alignItems: "center",
    },
    "span::before": {
      content: '""',
      color: "#0063BF",
      fontSize: "0.6rem",
      marginRight: "9px",
      paddingRight: "0.6rem",
    },
    "& .MuiSvgIcon-root": {
      display: "none",
    },
    "& .MuiButtonBase-root": {
      display: "none",
    },
    "@media screen and (max-width: 768px)": {
      fontSize: "1rem",
    },
  };

  const linkStyle = {
    color: "#0063BF",
    width: "fit-content",
    padding: "4px 12px 6px 12px",
    marginBottom: "12px",
    fontSize: "1.5rem",
    linkStyle: "",
    "&:hover": {
      backgroundColor: "#0063BF11",
      borderRadius: "5px",
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
