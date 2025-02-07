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
    return <div>イベント情報がありません。</div>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        padding: { xs: "0 1.5rem 1.5rem 1.5rem", sm: "0 5rem 5rem 5rem" },
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
          }}
        >
          {/* イベント名を表示 */}
          <Typography
            variant="subtitle1"
            color="#00AEEF"
            sx={{
              fontSize: "clamp(1rem, 6vw, 3rem)", // カスタムフォントサイズを指定
              backgroundColor: "#fff",
              padding: "0.5rem 0", // 上下左右の余白
              whiteSpace: "nowrap", // 1行に固定
              overflow: "hidden", // はみ出しを防ぐ
              textOverflow: "ellipsis", // 「...」で省略
            }}
          >
            {event.name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column", // モバイル: 縦並び
              sm: "row", // タブレット以上: 横並び
            },
          }}
        >
          <Box
            sx={{
              width: { xs: "90%", sm: "50%" }, // 幅を相対的に設定
              aspectRatio: "16/9", // 画像のアスペクト比を固定
              position: "relative",
              backgroundColor: "##f0f0f0",
              borderRadius: "8px", // 画像のボーダーを曲げる
              overflow: "hidden",
              marginLeft: { xs: "1rem", sm: "2.5rem" },
              marginRight: { xs: "1rem", sm: "2.5rem" },
            }}
          >
            {event.image ? (
              <Image
                src={event.image}
                alt={`${event.name}の画像`}
                layout="fill"
                objectFit="cover"
                style={{ borderRadius: "8px" }} // 画像のボーダーを曲げる
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
              marginLeft: "1rem",
              marginRight: { xs: "1rem", sm: "2rem" },
              marginTop: "1rem",
              marginBottom: "1rem",

              width: { xs: "90%", sm: "50%" },
            }}
          >
            <Typography variant="body1" sx={{ color: "#878686" }}>
              開催月
            </Typography>
            {/* <DottedDivider color="#878686" /> */}
            <Box sx={{ flexGrow: 1 }}>
              <DottedDivider color="#878686" />
            </Box>
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
            <Box sx={{ flexGrow: 1 }}>
              <DottedDivider color="#878686" />
            </Box>
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
            <Box sx={{ flexGrow: 1 }}>
              <DottedDivider color="#878686" />
            </Box>
            <Typography
              variant="body1"
              sx={{ fontSize: "1rem", marginTop: "0.3rem" }}
            >
              {event.url ? (
                <Box sx={{ overflow: "hidden", wordBreak: "break-word" }}>
                  <Link href={event.url}>{event.url}</Link>
                </Box>
              ) : (
                <Typography component={"span"} sx={{ fontSize: "1.3rem" }}>
                  登録なし
                </Typography>
              )}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            marginLeft: { xs: "1rem", sm: "2rem" },
            marginRight: { xs: "1rem", sm: "2rem" },
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.4rem",
              color: "#00AEEF",
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
            marginLeft: { xs: "1rem", sm: "2rem" },
            marginRight: { xs: "1rem", sm: "2rem" },
            marginTop: "1rem",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.4rem",
              color: "#00AEEF",
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
            paddingLeft: "1rem", // コンテナの内側の余白
            paddingRight: "1rem",
            paddingBottom: "1rem",
            justifyContent: "flex-start", // 左詰めで表示
            marginLeft: { sm: "1rem" },
            marginRight: { sm: "1rem" },
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
            <Typography sx={{ marginTop: "1rem" }}>登録なし</Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            width: "100%", // 全体の幅
            paddingLeft: { xs: "1rem", sm: "2rem" },
            paddingRight: { xs: "1rem", sm: "2rem" }, // 右側の余白
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
                全てのプロダクトを見る
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
