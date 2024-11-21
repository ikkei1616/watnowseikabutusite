import React from "react";
import { Box, Card, Button, Typography, CardActions } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import DottedDivider from "@/components/DottedDivider";

import type { Event, EventDetail } from "@/types/Event";

interface EventDetailCardProps {
  event?: EventDetail;
}

const EventDetailCard: React.FC<EventDetailCardProps> = ({ event }) => {
  if (!event) {
    return <div>イベント情報がありません。</div>; // event が undefined の場合のフォールバック
  }

  //   <DottedDivider color="#878686" />

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "85%",
        maxWidth: "1000px", // 最大幅を設定

        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid",
        borderColor: "#fff",
        boxShadow: "none",
        fontFamily: "HannariMincho", // カスタムフォントを指定
        margin: "auto",
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
            sx={{ color: "#878686", marginTop: "0.3rem", fontSize: "1.3rem" }}
          >
            {event.date}
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
            sx={{ color: "#878686", marginTop: "0.3rem", fontSize: "1.3rem" }}
          >
            {event.location}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#878686", marginTop: "0.7rem" }}
          >
            関連情報
          </Typography>
          <DottedDivider color="#878686" />
          {event.url && <Link href={event.url}>イベントURLはこちら</Link>}
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
        <Box sx={{ marginTop: "1rem" }}>
          <Typography sx={{ lineHeight: 1.5 }}></Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default EventDetailCard;
