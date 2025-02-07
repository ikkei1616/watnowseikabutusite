"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { supabase } from "@/supabase/supabase";
import type { ServiceDetail } from "@/types/Service";

import Header from "@/components/Header";
import Technology from "@/types/Technology";
import { HeaderMode } from "@/types/HeaderMode";
import DetailContainer from "@/components/DetailContainer";
import DetailHeader from "@/components/DetailHeader";
import ItemList from "@/components/ItemList";
import TechItem from "@/components/TechItem";
import Item from "@/components/Item";
import CreatorItem from "@/components/CreatorItem";

import { Box } from "@mui/material";
import ShowError from "@/components/error/ShowError";

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

      }
    };

    fetchWebsites();
  }, [serviceID]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!serviceID || !service) {
    return <ShowError errorMessage="サービスが見つかりませんでした"></ShowError>
  }

  return (
    <main className={styles.fullScreen}>
      <Header mode={HeaderMode.NONE} />

      <div className={styles.head}>
        <h1 className={styles.servicename}>
          サービス詳細{" "}
          <span className={styles.span}>
            <span>　≫</span> {service.name}
          </span>
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
                <Box sx={{ display: "flex", objectFit: "cover" }}>
                  <p style={{ fontSize: "24px" }}>画像が見つかりませんでした</p>
                  <p
                    style={{
                      position: "absolute",
                      top: "78%",
                      left: "50%",
                      fontStyle: "bold",
                      transform: "translate(-50%, -50%)",
                      fontSize: "100px",
                      display: "flex",
                      opacity: "60%",
                      color: "#fff",
                      objectFit: "contain",
                    }}
                  >
                    NotFound
                  </p>
                </Box>
              </Box>
            )}

            <div className={styles.detailsContainer}>
              <p className={styles.details}>作成月</p>
              <p className={styles.detailsdata}>
                {service.releaseYear == null ? (
                  <span className={styles.period}>
                    <span
                      style={{
                        opacity: "50%",
                        fontSize: "20px",
                        marginLeft: "-10px",
                      }}
                    >
                      未掲載の情報です
                    </span>
                  </span>
                ) : (
                  <span>
                    {service.releaseYear}/{service.releaseMonth}
                  </span>
                )}
                {service.developmentPeriod !== "nullnull" ? (
                  <span className={styles.period}>
                    {service.developmentPeriod &&
                      `(${service.developmentPeriod})`}
                  </span>
                ) : service.releaseMonth !== null ? (
                    <span className={styles.period}>
                    <span
                      style={{
                        opacity: "50%",
                        fontSize: "16px",
                      }}
                    >
                      （期間不明）
                    </span>
                  </span>
                ) : (
                    <span>
                      {/* 年月共に未定の場合期間情報は伝えない */}
                    </span>
                )}
              </p>
              <p className={styles.details}>チーム名</p>

              {service.teamName ? (
                <>
                  <p className={styles.detailsdata}> {service.teamName}</p>
                </>
              ) : (
                <p
                  className={styles.detailsdata}
                  style={{ opacity: "50%", fontSize: "20px" }}
                >
                  チーム名の情報がありません
                </p>
              )}
              {/* 関連イベントを表示 */}
              <p className={styles.details}>関連イベント</p>
              {relatedEventName ? (
                <>
                  <p className={styles.detailsdata}> {relatedEventName}</p>
                </>
              ) : (
                <p
                  className={styles.detailsdata}
                  style={{ opacity: "50%", fontSize: "20px" }}
                >
                  関連イベントはありません
                </p>
              )}
            </div>
          </div>
          <DetailContainer>
            <DetailHeader title="サービスURL" />
            <ItemList>
              {webs.map((url, index) => (
                <Item
                  key={index}
                  src={"/paper_airplane_blue.svg"}
                  alt={"url"}
                  text={"webサイト"}
                  href={url}
                />
              ))}
            </ItemList>
          </DetailContainer>

          <DetailContainer>
            <DetailHeader title="使用技術" />
            <ItemList>
              {technologies.map((tech, index) => (
                <TechItem key={index} technology={tech} />
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

            <div className={styles.desda}>{service.description}</div>
          </DetailContainer>
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
