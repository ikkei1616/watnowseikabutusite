"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";
import { CardActions, Button, Box, Divider } from "@mui/material";
import type { EventDetail } from "@/types/Event";
import PageHeader from "@/components/PageHeader";
import Header from "@/components/Header";
import { HeaderMode } from "@/types/HeaderMode";
import EventDetailCard from "@/components/EventDetailCard";
import type { Service } from "@/types/Service";
import Image from "next/image";
import Link from "next/link";
import LoadingPage from "@/components/loading/LoadingPage";
import BackButton from "@/components/BackButton";

export default function EventDetailPage({
  params,
}: {
  params: { event_id: string };
}) {
  const eventID = params.event_id;

  const [event, setEvent] = useState<EventDetail | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // event_idの変更をトリガーにしてsetEventを実行
  useEffect(() => {
    const fetchEventData = async () => {
      if (eventID) {
        const { data: eventData, error: eventError } = await supabase
          .from("events")
          .select("*")
          .eq("id", eventID)
          .single();

        if (eventError) {
          console.error("Error fetching event:", eventError);
          return;
        } else {
          setEvent(eventData as EventDetail);
          setLoading(false);
        }
        setLoading(false);
      }
    };
    const fetchRetatedServices = async () => {
      if (eventID) {
        try {
          const { data: serviceData, error: serviceError } = await supabase
            .from("services") // テーブル名
            .select("*") // すべての列を取得
            .eq("event_id", eventID) // event_id が一致するものを絞り込み
            .order("event_id", { ascending: true }) // event_id の昇順でソート
            .limit(3); // 最大 3 件まで取得

          if (serviceError) {
            console.error("Error fetching services:", serviceError);
            return;
          }

          // データが正常に取得できた場合
          setServices(serviceData as Service[]);
        } catch (error) {
          console.error("Unexpected error:", error);
        }
      }
    };

    fetchEventData();
    fetchRetatedServices();
  }, [eventID]);

  if (loading) {
    return <LoadingPage />;
  }

  if (!event) {
    return <p className={styles.notFound}>イベントが見つかりませんでした。</p>;
  }

  return (
    <main className={styles.main}>
      <Header mode={HeaderMode.EVENTS} />
      <Box
        sx={{
          width: "100%",
          padding: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end", // 下方揃え
            justifyContent: "space-between", // 左右に配置
            padding: "0.5rem 1rem 0 1rem",
            position: "relative",
          }}
        >
          <PageHeader title="イベント詳細" />

          <BackButton ButtonTitle="イベント一覧へ戻る" />
        </Box>
        <Divider
          variant="fullWidth"
          sx={{ borderColor: "#00AEEF", paddingTop: "8px" }}
        />
      </Box>
      <EventDetailCard event={event} services={services} />
    </main>
  );
}
