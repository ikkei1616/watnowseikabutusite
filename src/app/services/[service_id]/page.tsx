"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { supabase } from "@/supabase/supabase";
import type { ServiceDetail } from "@/types/Service";
import type { Award } from "@/types/Award";
import { serialize } from "v8";
import { serverHooks } from "next/dist/server/app-render/entry-base";

export default function ServiceDetailPage({
  params,
}: {
  params: { service_id: string };
}) {
  const serviceID = params.service_id;

  const [service, setService] = useState<ServiceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // service_idの変更をトリガーにしてsetServiceを実行
  useEffect(() => {
    const fetchServiceData = async () => {
      if (serviceID) {
        const { data: serviceData, error: serviceError } = await supabase
          .from("services")
          .select("*")
          .eq("id", serviceID)
          .single();
        console.log(`serviceID: ${serviceID}`);
        console.log(serviceData);

        if (serviceError || !serviceData) {
          console.error(
            "Error fetching event data:"
            // serviceError || awardsError
          );
          setService(null); // サービスデータがない場合はnullに設定
        } else {
          setService({
            ...serviceData,
            // awards: awardsData || [],
          } as ServiceDetail);
        }
        setLoading(false); // ここでローディング終了
        console.log(serviceData);
      }
    };

    fetchServiceData();
  }, [serviceID]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!serviceID || !service) {
    return <p className={styles.notFound}>イベントが見つかりませんでした。</p>;
  }

  return (
    <main className={styles.fullScreen}>
      <div className={styles.container}>
        <p className={styles.description}>{service.comment}</p>
        <p className={styles.details}>開催日: {service.create_date}</p>
        <p className={styles.details}>説明: {service.description}</p>
        <p className={styles.details}>チーム: {service.team_name}</p>

        {/* 賞のリストを表示 */}
        {/* {service.awards && service.awards.length > 0 && (
          <div className={styles.awardsContainer}>
            <h2 className={styles.title}>賞一覧</h2>
            {service.awards.map((award: Award, index: number) => (
              <div key={index} className={styles.awardItem}>
                {award.order_num}. {award.name}
              </div>
            ))}
          </div>
        )} */}
      </div>
    </main>
  );
}
