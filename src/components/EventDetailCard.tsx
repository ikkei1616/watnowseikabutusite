import React from "react";
import { Box, Card, Typography, Divider, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import DottedDivider from "@/components/DottedDivider";
import ServiceCard from "@/components/ServiceCard";
import type { Service } from "@/types/Service";

import type { EventDetail } from "@/types/Event";
import ServicesContainer from "./ServicesContainer";

interface EventDetailCardProps {
  event?: EventDetail;
  services?: Service[];
}

const EventDetailCard: React.FC<EventDetailCardProps> = ({
  event,
  services,
}) => {
  if (!event) {
    return <div>イベント情報がありません。</div>; // event が undefined の場合のフォールバック
  }

  //   <DottedDivider color="#878686" />

  return (
    <Box
      sx={{
        width: "100%",
        padding: "0 80px 80px 80px",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",

          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid",
          borderColor: "#fff",
          fontFamily: "HannariMincho", // カスタムフォントを指定
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end", // 下方揃え
            justifyContent: "space-between", // 日付とボタンを左右に配置
            paddingTop: "0.5rem",
            paddingBottom: "0",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            position: "relative",
            fontFamily: "HannariMincho",
          }}
        >
          {/* イベント名を表示 */}
          <Typography
            variant="subtitle1"
            color="#00AEEF"
            sx={{
              fontSize: "3rem", // カスタムフォントサイズを指定
              backgroundColor: "#fff",
              padding: "0.5rem 1rem", // 上下左右の余白
              fontFamily: "HannariMincho",
            }}
          >
            {event.name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex", //横並びのレイアウト
          }}
        >
          <Box
            sx={{
              width: "50%", // 幅を相対的に設定
              aspectRatio: "16/9", // 画像のアスペクト比を固定
              position: "relative",
              backgroundColor: "##f0f0f0",
              borderRadius: "8px", // 画像のボーダーを曲げる
              overflow: "hidden",
              marginTop: "1rem",
              marginBottom: "1rem",
              marginLeft: "2.5rem",
              marginRight: "2.5rem",
            }}
          >
            {event.image ? (
              <Image
                src={event.image}
                alt={`${event.name}の画像`}
                layout="fill" // 親のBox全体をカバー
                objectFit="cover"
                style={{ borderRadius: "8px" }} // ボーダーの半径を設定
              />
            ) : (
              <Box
                sx={{
                  backgroundColor: "#D9D9D9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  width: "100%",
                }}
              >
                画像がありません
              </Box>
            )}
          </Box>
          <Box
            sx={{
              marginleft: "1rem",
              marginRight: "1.5rem",
              marginTop: "1rem",
              marginBottom: "1rem",
              flexGrow: 1,
            }}
          >
            <Typography variant="body1" sx={{ color: "#878686" }}>
              開催月
            </Typography>
            <DottedDivider color="#878686" />
            <Typography
              variant="body1"
              sx={{ marginTop: "0.3rem", fontSize: "1.3rem" }}
            >
              {event.year}年{event.month}月
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#878686", marginTop: "0.7rem" }}
            >
              開催場所
            </Typography>
            <DottedDivider color="#878686" />
            <Typography
              variant="body1"
              sx={{ marginTop: "0.3rem", fontSize: "1.3rem" }}
            >
              {event.location || "登録なし"}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#878686", marginTop: "0.7rem" }}
            >
              関連情報
            </Typography>
            <DottedDivider color="#878686" />
            <Typography
              variant="body1"
              sx={{ fontSize: "1rem", marginTop: "0.3rem" }}
            >
              {event.url ? (
                <Link href={event.url}>{event.url}</Link>
              ) : (
                <Typography component={"span"}>登録なし</Typography>
              )}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            marginLeft: "2rem",
            marginRight: "1rem",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.4rem",
              color: "#00AEEF",
              fontFamily: "HannariMincho",
            }}
          >
            イベント詳細
          </Typography>
          <DottedDivider color="#00AEEF" />
          <Box sx={{ marginTop: "1rem" }}>
            <Typography sx={{ lineHeight: 1.5 }}>
              {event.comment ? event.comment : "コメントはありません"}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            marginLeft: "2rem",
            marginRight: "1rem",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.4rem",
              color: "#00AEEF",
              fontFamily: "HannariMincho",
            }}
          >
            代表サービス
          </Typography>
          <DottedDivider color="#00AEEF" />
        </Box>
        <Box
          sx={{
            display: "flex", // Flexbox レイアウトを有効化
            flexWrap: "wrap", // 必要に応じて折り返し
            gap: "16px", // カード間の間隔
            padding: "16px", // コンテナの内側の余白
            justifyContent: "flex-start", // 左詰めで表示
            marginLeft: "1rem",
          }}
        >
          {services?.length ? (
            <ServicesContainer>
              {services.map((service) => (
                <Box
                  key={service.id}
                  // sx={{
                  //   flex: "1 1 calc(33.333% - 16px)", // 幅を3等分（ギャップを考慮）
                  //   maxWidth: "calc(33.333% - 16px)", // 最大幅を設定
                  //   boxSizing: "border-box", // パディングとボーダーを含む幅を計算
                  // }}
                >
                  <ServiceCard service={service} />
                </Box>
              ))}
            </ServicesContainer>
          ) : (
            <Typography>登録なし</Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            width: "100%", // 全体の幅
            paddingLeft: "1rem", // 左側の余白
            paddingRight: "1rem", // 右側の余白
            paddingBottom: "2rem", // 下側の余白
          }}
        >
          {/* 左側の線 */}
          <Divider
            sx={{
              flexGrow: 1, // 残りのスペースを埋める
              borderColor: "#00AEEF", // 線の色
              borderWidth: "1px", // 線の太さ
            }}
          />

          <Link href={`/events/${event.id}/services`} passHref>
            <Button
              size="small"
              color="primary"
              sx={{
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#D9D9D9", // ホバー時の背景色を濃くする
                },
                fontFamily: "HannariMincho",
              }}
            >
              <Typography
                sx={{
                  whiteSpace: "nowrap", // テキストを折り返さない
                  fontSize: "16px", // フォントサイズ
                  color: "#4D4D4D", // テキストの色
                  display: "flex", // テキストと画像を横並び
                  alignItems: "center",
                  gap: "8px", // テキストと画像の間隔
                }}
              >
                すべてのプロダクトを見る
                {/* 画像を挿入 */}
                <Image
                  src={"/paper_airplane_blue.svg"}
                  alt={"紙飛行機のアイコン"}
                  height={20}
                  width={20}
                />
              </Typography>
            </Button>
          </Link>

          {/* 右側の線 */}
          <Divider
            sx={{
              flexGrow: 1, // 残りのスペースを埋める
              borderColor: "#00AEEF", // 線の色
              borderWidth: "1px", // 線の太さ
            }}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default EventDetailCard;

{
  /* <ServiceCard service={service} /> */
}
