"use client";

import React from "react";
import styles from "../../admin.module.css";

import List from "@mui/material/List";
import Box from "@mui/material/Box";
import AdminHeader from "@/components/admin/AdminHeader";
import PankuzuList from "@/components/admin/PankuzuList";
import AdminTitle from "@/components/admin/AdminTitle";
import AdminExistingLinkItem from "@/components/admin/AdminExistingLinkItem";
import SelectYearOptions from "@/components/admin/SelectYearOptions";
import DisplayError from "@/components/admin/DisplayError";
import useAdminSelectYear from "@/hooks/useAdminSelectYear";
import useAdminEventList from "@/hooks/useAdminEventList";
import { YEARS_OPTIONS } from "@/const";

const EventPage: React.FC = () => {
  const { selectedYear, handleYearChange } = useAdminSelectYear(YEARS_OPTIONS);
  const { events, error } = useAdminEventList(selectedYear);

  const pankuzu = [
    { text: "ジャンル選択", link: "/admin" },
    { text: "イベント", link: "/admin/events" },
    { text: "既存ページ編集", link: "/admin/events/existing-events" },
  ];

  if (error) {
    return (
      <>
        <AdminHeader />
        <main className={styles.container}>
          <PankuzuList pankuzu={pankuzu} />
          <AdminTitle>イベント一覧</AdminTitle>
          <DisplayError height={"calc(100vh - 200px)"} error={error} />
        </main>
      </>
    );
  }

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
              {events &&
                (events.length !== 0 ? (
                  events.map((event) => (
                    <AdminExistingLinkItem
                      key={event.id}
                      href={`./existing-events/${event.id}/edit`}
                    >
                      {event.name}
                    </AdminExistingLinkItem>
                  ))
                ) : (
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "1.5rem",
                      marginTop: "40px",
                    }}
                  >
                    データがありません
                  </p>
                ))}
            </List>
          </Box>
        </Box>
      </main>
    </>
  );
};

export default EventPage;
