import React from "react";
import Link from "next/link";
import Image from "next/image";
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
import type { Event } from "@/types/Event";

interface EventCardProp {
  event: Event;
}

export const SkeletonEventCard: React.FC = () => {
  return (
    <Box>
      <Skeleton
        variant="rectangular"
        sx={{
          width: "100%",
          height: "280px", //fix
          borderRadius: "12px",
        }}
      />
    </Box>
  );
};

export const EventCard: React.FC<EventCardProp> = ({ event }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",

        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid",
        borderColor: "#fff",
        boxShadow: "none",
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
        {/* 日付を表示 */}
        <Typography
          color="#00AEEF"
          sx={{
            fontSize: "clamp(1rem, 3vw, 2rem)", // カスタムフォントサイズを指定
            backgroundColor: "#fff",
            padding: "0.5rem 1rem", // 上下左右の余白
          }}
        >
          {event.year}年{event.month}月
        </Typography>

        {/* 詳細ページへのリンクボタン */}
        <CardActions>
          <Link href={`/events/${event.id}`} passHref>
            <Button
              size="small"
              color="primary"
              sx={{
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#e4e4e4", // ホバー時の背景色を濃くする
                },
              }}
            >
              詳細をみる
              {/* 画像を挿入 */}
              <Image
                src={"/paper_airplane_blue.svg"}
                alt={"紙飛行機のアイコン"}
                height={20}
                width={20}
              />
            </Button>
          </Link>
        </CardActions>
      </Box>

      {/* 上部に線を表示 */}
      <Divider
        sx={{
          width: "95%",
          margin: "0 auto",
          borderColor: "#00AEEF",
        }}
      />

      {/* カードの内容部分 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          gap: "1rem",
        }}
      >
        {/* 画像部分 */}
        <Box
          sx={{
            width: "40%", // 幅を相対的に設定
            aspectRatio: "16/9", // 画像のアスペクト比を固定
            position: "relative",
            backgroundColor: "#f0f0f0",
            borderRadius: "8px", // 画像のボーダーを曲げる
            overflow: "hidden",
          }}
        >
          {/* 画像がある場合は画像を表示し、ない場合はメッセージを表示 */}
          {event.image ? (
            <Image
              src={event.image}
              alt={`${event.name}の画像`}
              layout="fill"
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
              <Typography variant="body2" color="text.secondary">
                画像がありません
              </Typography>
            </Box>
          )}
        </Box>

        {/* テキスト部分 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            height: "100%",
            width: "60%", // 幅を相対的に設定
          }}
        >
          <CardContent
            sx={{
              padding: "0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              height: "100%",
            }}
          >
            {/* イベントの題名部分 */}
            <Box>
              <Typography
                variant="h5"
                component="div"
                gutterBottom
                sx={{
                  paddingTop: "20px",
                  whiteSpace: "nowrap", // テキストを1行に制限
                  overflow: "hidden", // あふれた部分を非表示に
                  textOverflow: "ellipsis", // あふれた部分を "..." に
                  fontFamily: "HannariMincho",
                }}
              >
                {event.name}
              </Typography>
            </Box>

            {/* イベントの内容部分 */}
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  lineHeight: "2.0", // 行間を調整
                  fontSize: "18px", // フォントサイズを指定
                  display: "-webkit-box", // 表示をボックス形式に
                  WebkitLineClamp: 4, // 行数を4行に制限
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis", // あふれた部分を "..." で表示
                }}
              >
                {event.comment}
              </Typography>
            </Box>
          </CardContent>
        </Box>
      </Box>
    </Card>
  );
};
