"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { supabase } from "@/supabase/supabase";
import type { ServiceDetail } from "@/types/Service";
import { FaReact } from "react-icons/fa"; // Reactのアイコン

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
  const [relatedEventName, setRelatedEventName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [technologies, setTechnologies] = useState<string[]>([]);

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
          setService(serviceData as ServiceDetail);

          // 関連イベントの名前を取得
          const { data: eventData, error: eventError } = await supabase
            .from("events")
            .select("name")
            .eq("id", serviceData.event_id)
            .single();

          if (eventError || !eventData) {
            console.error("Error fetching related event data:", eventError);
          } else {
            setRelatedEventName(eventData.name);
          }
        }

        setLoading(false); // ここでローディング終了
        console.log(serviceData);
      }
    };
    fetchServiceData();
  }, [serviceID]);

  useEffect(() => {
    const fetchTechnologies = async () => {
      if (serviceID) {
        // Step 1: `service-technologies` テーブルから `technology_id` を取得
        const { data: serviceTechData, error: serviceTechError } =
          await supabase
            .from("services_technologies")
            .select("technology_id")
            .eq("service_id", serviceID);
        console.log(serviceTechData);

        if (serviceTechError || !serviceTechData) {
          console.error("Error fetching technology IDs:", serviceTechError);
          setTechnologies([]);
          return;
        }

        // Step 2: technology_ids を配列として抽出
        const technologyIds = serviceTechData.map((item) => item.technology_id);

        if (technologyIds.length === 0) {
          setTechnologies([]);
          return;
        }

        // Step 3: `technology` テーブルから技術名 (name) を取得
        const { data: technologyData, error: technologyError } = await supabase
          .from("technologies")
          .select("name, image")
          .in("id", technologyIds);

        if (technologyError || !technologyData) {
          console.error("Error fetching technology names:", technologyError);
          setTechnologies([]);
          return;
        }

        // Step 4: 技術名のリストを state に設定
        setTechnologies(
          technologyData.map((tech) => ({
            name: tech.name,
            image: tech.image,
          }))
        );
      }
    };

    fetchTechnologies();
  }, [serviceID]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!serviceID || !service) {
    return <p className={styles.notFound}>イベントが見つかりませんでした。</p>;
  }

  return (
    <main className={styles.fullScreen}>
      {/* <div className={styles.Header}></div> */}

      <div className={styles.head}>
        <h1 className={styles.servicename}>
          サービス詳細{" "}
          <h2 className={styles.span}>
            {" "}
            <span>　≫</span> {service.name}
          </h2>
        </h1>
      </div>
      <div className={styles.card}>
        <div className={styles.container}>
          <div className={styles.atama}>
            <h3 className={styles.title}>{service.name}</h3>
            <p className={styles.description}>{service.comment}</p>
          </div>

          <div className={styles.karada}>
            {service.image ? (
              <img
                className={styles.image}
                src={service.image}
                alt={service.name}
              />
            ) : (
              <p>画像がありません</p> // 画像が存在しない場合のフォールバック
            )}
            <div className={styles.detailsContainer}>
              <p className={styles.details}>作成月</p>
              <p className={styles.detailsdata}>
                {service.release_year}/{service.release_month}
              </p>
              {/* <p className={styles.details}>説明: {service.description}</p> */}
              <p className={styles.details}>チーム名</p>
              <p className={styles.detailsdata}> {service.team_name}</p>
              {/* 関連イベントを表示 */}
              {relatedEventName ? (
                <>
                  <p className={styles.details}>関連イベント</p>
                  <p className={styles.detailsdata}> {relatedEventName}</p>
                </>
              ) : (
                <p>関連イベントがありません</p>
              )}{" "}
            </div>
          </div>

          <div className={styles.mune}>
            <p className={styles.muneobi}>使用技術</p>
            {technologies.length > 0 ? (
              <div className={styles.techStackContainer}>
                {technologies.map((tech, index) => (
                  <div key={index} className={styles.techItem}>
                    {tech.image && (
                      <img
                        src={tech.image}
                        alt={`${tech.name} icon`}
                        className={styles.techIcon}
                      />
                    )}
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>関連技術がありません</p>
            )}
          </div>

          <div className={styles.url}>
            <p className={styles.muneobi}>サービスURL</p>
          </div>

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
      </div>
    </main>
  );
}
