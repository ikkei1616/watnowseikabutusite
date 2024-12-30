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
import Header from "@/components/Header";
import Technology from "@/types/Technology";
import { HeaderMode } from "@/types/HeaderMode";
import DetailContainer from "@/components/DetailContainer";
import DetailHeader from "@/components/DetailHeader";
import ItemList from "@/components/ItemList";
import TechItem from "@/components/TechItem";
import Item from "@/components/Item";
import { url } from "inspector";
import CreatorItem from "@/components/CreatorItem";

import { Box } from "@mui/material";

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
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [webs, setWebs] = useState<string[]>([]);
  const [apples, setapples] = useState<string[]>([]);
  const [creators, setCreators] = useState<string[]>([]);

  // service_idの変更をトリガーにしてsetServiceを実行
  useEffect(() => {
    const fetchServiceData = async () => {
      if (serviceID) {
        const { data: serviceData, error: serviceError } = await supabase
          .from("services")
          .select(
            `
            *,
            events(
              id,
              name
            ),
            awards(
              name
            ),
            services_technologies(
              technologies(
                name,
                image
              )
            ),
            url_website(
              url
            ),
            url_app_store(
              url
            ),
            url_google_play(
              url
            ),
            url_others(
              url
            ),
            users_servicies(
              users(
                nickname,
                account_id,
                image,
                users_technologies(
                  technologies(
                    name
                  )
                )
              )
            )
            `
          )
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
          const fetchedServiceData: ServiceDetail = {
            id: service?.id || null,
            releaseYear: serviceData.release_year,
            releaseMonth: serviceData.release_month,
            name: serviceData.name,
            teamName: serviceData.team_name,
            comment: serviceData.comment,
            developmentPeriod: `${serviceData.development_period_num}${serviceData.development_period_unit}`,
            description: serviceData.description,
            image: serviceData.image,
            event: serviceData.events,

            awardName:
              serviceData.awards !== null ? serviceData.awards.name : undefined,

            techStack: serviceData.services_technologies.map(
              (technology: any) => technology.technologies
            ),
            urlWebsite: serviceData.url_website?.url,
            urlAppStore: serviceData.url_app_store?.url,
            urlGooglePlay: serviceData.url_google_play?.url,
            urlOthers: serviceData.url_others?.url,
            creators: serviceData.users_servicies.map((user: any) => ({
              nickname: user.users.nickname,
              accountID: user.users.account_id,
              image: user.users.image,
              technologies: user.users.users_technologies.map(
                (technology: any) => technology.technologies
              ),
            })),
          };
          console.log(fetchedServiceData);

          setService(fetchedServiceData);

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

  useEffect(() => {
    const fetchWebsites = async () => {
      if (serviceID) {
        // Step 1: `service-websites` ��ー��ルから `website_id` を取得
        const { data: serviceWebData, error: serviceWebError } = await supabase
          .from("url_website")
          .select("url")
          .eq("service_id", serviceID);
        console.log(serviceWebData);

        if (serviceWebError || !serviceWebData) {
          console.error("Error fetching URLs:", serviceWebError);
          setWebs([]);
          return;
        }
        setWebs(serviceWebData.map((item) => item.url));

        //   const { data: creators, error: creatorsError } = await supabase
        //     .from("users")
        //     .select("*")
        //     .eq("service_id", serviceID);
        //   console.log(serviceWebData);

        //   if (serviceWebError || !serviceWebData) {
        //     console.error("Error fetching URLs:", serviceWebError);
        //     setWebs([]);
        //     return;
        //   }
        //   setWebs(serviceWebData.map((item) => item.url));
      }
    };

    fetchWebsites();
  }, [serviceID]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!serviceID || !service) {
    return <p className={styles.notFound}>イベントが見つかりませんでした。</p>;
  }

  return (
    <main className={styles.fullScreen}>
      <Header mode={HeaderMode.NONE} />
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
            <p className={styles.comments}>{service.comment}</p>
          </div>

          <div className={styles.karada}>
            <div className={styles.award}>
              {service.awardName != null ? (
                <img
                  src={"/goldbox.svg"}
                  alt={"award"}
                  className={styles.awardImage}
                />
              ) : (
                <p></p> // 賞が存在しない場合のフォールバック
              )}
              {service.awardName !== null ? (
                <p className={styles.awardName}>{service.awardName}</p>
              ) : (
                <p>省内</p> // 賞が存在しない場合のフォールバック
              )}
            </div>
            {service.image ? (
              <img
                className={styles.image}
                src={service.image}
                alt={service.name}
              />
            ) : (
              <Box
                sx={{
                  position: "relative",
                  backgroundColor: "#EAEFF2",
                  margin: "0 auto",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "15px",
                }}
              >
                <Box>
                  <p>画像が見つかりませんでした</p>
                </Box>
              </Box>
            )}

            <div className={styles.detailsContainer}>
              <p className={styles.details}>作成月</p>
              <p className={styles.detailsdata}>
                {service.releaseYear}/{service.releaseMonth}
                <div className={styles.period}>
                  {service.developmentPeriod &&
                    `(${service.developmentPeriod})`}
                </div>
              </p>
              {/* <p className={styles.details}>説明: {service.description}</p> */}
              <p className={styles.details}>チーム名</p>
              <p className={styles.detailsdata}>
                {" "}
                {service.teamName !== "" ? service.teamName : "不明"}
              </p>
              {/* 関連イベントを表示 */}
              <p className={styles.details}>関連イベント</p>
              {relatedEventName ? (
                <>
                  <p className={styles.detailsdata}> {relatedEventName}</p>
                </>
              ) : (
                <p className={styles.detailsdata}>関連イベントはありません</p>
              )}{" "}
            </div>
          </div>
          <DetailContainer>
            <DetailHeader title="サービスURL" />
            <ItemList>
              {webs.map((url, index) => (
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <Item
                    src={"/paper_airplane_blue.svg"}
                    alt={"url"}
                    text={"webサイト"}
                    href={url}
                  />
                </a>
              ))}
            </ItemList>
          </DetailContainer>

          <DetailContainer>
            <DetailHeader title="使用技術" />
            <ItemList>
              {technologies.map((tech) => (
                <TechItem key={tech.id} technology={tech} />
              ))}
            </ItemList>
          </DetailContainer>

          <DetailContainer>
            <DetailHeader title="制作者" />
            <ItemList>
              {service.creators.map((creator, index) => (
                <CreatorItem key={index} user={creator} />
              ))}
            </ItemList>
          </DetailContainer>

          <DetailContainer>
            <DetailHeader title="説明" />
            {/* <ItemList>
              {technologies.map((tech) => (
                <TechItem key={tech.id} technology={tech} />
              ))}
            </ItemList> */}
            <div className={styles.desda}>{service.description}</div>
          </DetailContainer>

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
function setUrl(arg0: null) {
  throw new Error("Function not implemented.");
}

function item(
  value: { url: any },
  index: number,
  array: { url: any }[]
): string {
  throw new Error("Function not implemented.");
}
