"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Page.module.css";
import { supabase } from "@/supabase/supabase";
import type { AdminServiceList } from "@/types/Service";

const ServicePage: React.FC = () => {
  const [services, setServices] = useState<AdminServiceList[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id, name, release_year")
        .order("release_year", { ascending: true }); // 'id'で昇順にソート

      //取得に関するエラーハンドリング
      if (error) {
        console.error("Error fetching services:", error);
      } else {
        if (data === null) {
          console.error("No data fetched");
          return;
        }
        console.log("Fetched data:", data); // デバッグ用に取得データを出力
        const fetchedEvents: AdminServiceList[] = data.map((event) => {
          return {
            id: event.id,
            name: event.name,
            year: event.release_year,
          };
        });
        setServices(fetchedEvents || []); // データがnullのときの対策として空配列を設定
      }
    };

    fetchEvents();
  }, []);

  return (
    <main className={styles.pageHeader}>
      <h1>これはイベント一覧ページ</h1>
      <ul className={styles.eventList}>
        {services.map((service) => (
          <li key={service.id} className={styles.eventItem}>
            <Link
              href={`./existing-services/${service.id}/edit`}
              className={styles.eventLink}
            >
              <p>{service.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default ServicePage;
