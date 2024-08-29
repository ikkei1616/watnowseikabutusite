"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { supabase } from "@/supabase/supabase";
import type { EventDetail } from "@/types/Event";
import type { Award } from "@/types/Award";

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

        const { data: awardsData, error: awardsError } = await supabase
          .from("awards")
          .select("*")
          .eq("event_id", eventID)
          .order("order_num", { ascending: true });

        if (eventError || awardsError) {
          console.error(
            "Error fetching event or awards data:",
            eventError || awardsError
          );
          setEvent(null);
        } else {
          setEvent({
            ...eventData,
            awards: awardsData || [],
          } as EventDetail);
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
    <main className={styles.fullScreen}>
      <div className={styles.container}>
        <h1 className={styles.title}>{event.name}</h1>
        <p className={styles.description}>{event.comment}</p>
        <p className={styles.details}>開催日: {event.date}</p>
        <p className={styles.details}>URL: {event.url}</p>

        {/* 賞のリストを表示 */}
        {event.awards && event.awards.length > 0 && (
          <div className={styles.awardsContainer}>
            <h2 className={styles.title}>賞一覧</h2>
            {event.awards.map((award: Award, index: number) => (
              <div key={index} className={styles.awardItem}>
                {award.order_num}. {award.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
