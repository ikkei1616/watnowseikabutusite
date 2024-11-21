"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { supabase } from "@/supabase/supabase";
import Box from "@mui/material/Box";
import type { EventDetail } from "@/types/Event";
import type { Award } from "@/types/Award";
import PageHeader from "@/components/PageHeader";
import Header from "@/components/Header";
import { HeaderMode } from "@/types/HeaderMode";

export default function EventDetailPage({
  params,
}: {
  params: { event_id: string };
}) {
  const eventID = params.event_id;

  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

    fetchEventData();
  }, [eventID]);

  if (loading) {
    return <LoadingSpinner />;
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
          padding: "40px",
          "@media screen and (max-width: 600px)": {
            padding: "20px",
          },
        }}
      >
        <PageHeader title="イベント詳細" pageTitle={event.name} />
      </Box>
    </main>
  );
}
