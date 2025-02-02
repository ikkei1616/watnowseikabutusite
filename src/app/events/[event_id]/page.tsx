"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { supabase } from "@/supabase/supabase";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Divider,
  Skeleton,
} from "@mui/material";
import type { EventDetail } from "@/types/Event";
import PageHeader from "@/components/PageHeader";
import Header from "@/components/Header";
import { HeaderMode } from "@/types/HeaderMode";
import EventDetailCard from "@/components/EventDetailCard";
import type { Service } from "@/types/Service";
import Image from "next/image";
import Link from "next/link";

export default function EventDetailPage({
  params,
}: {
  params: { event_id: string };
}) {
  const eventID = params.event_id;

  const [event, setEvent] = useState<EventDetail | null>(null);
  const [services, setServices] = useState<Service[]>([]);
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
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end", // 下方揃え
            justifyContent: "space-between", // 左右に配置
            paddingTop: "0.5rem",
            paddingBottom: "0",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            position: "relative",
            fontFamily: "HannariMincho",
          }}
        >
          <PageHeader title="イベント詳細" />

          {/* 詳細ページへのリンクボタン */}
          <CardActions>
            <Link href={`/events`} passHref>
              <Button
                size="small"
                color="primary"
                sx={{
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#D9D9D9", // ホバー時の背景色を濃くする
                  },
                  fontFamily: "HannariMincho",
                  alignItems: "flex-end",
                  textAlign: "center",
                }}
              >
                イベント一覧に戻る
                {/* 画像を挿入 */}
                <Image
                  src={"/back_button.svg"}
                  alt={"戻るボタン"}
                  height={20}
                  width={20}
                />
              </Button>
            </Link>
          </CardActions>
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
