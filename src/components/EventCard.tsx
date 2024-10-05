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
} from "@mui/material";
import type { Event } from "@/types/Event";

interface EventCardProp {
  event: Event;
}

const EventCard: React.FC<EventCardProp> = ({ event }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column", // カード全体を縦に配置
        width: "85%",
        maxWidth: "1000px", // 最大幅を設定
        marginLeft: "auto",
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
          variant="subtitle1"
          color="#00AEEF"
          sx={{
            fontSize: "1.4rem", // カスタムフォントサイズを指定
            backgroundColor: "#fff",
            padding: "0.5rem 1rem", // 上下左右の余白
          }}
        >
          {event.date}
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
                  backgroundColor: "#D9D9D9", // ホバー時の背景色を濃くする
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
      <Box sx={{ display: "flex", alignItems: "center", padding: "1rem" }}>
        {/* 画像部分 */}
        <Box
          sx={{
            width: "40%", // 幅を相対的に設定
            aspectRatio: "16/9", // 画像のアスペクト比を固定
            position: "relative",
            backgroundColor: "##f0f0f0",
            borderRadius: "8px", // 画像のボーダーを曲げる
            overflow: "hidden",
            marginRight: "1rem",
          }}
        >
          {/* 画像がある場合は画像を表示し、ない場合はメッセージを表示 */}
          {event.imageUrl ? (
            <Image
              src={event.imageUrl}
              alt={`${event.name}の画像`}
              layout="fill" // 親のBox全体をカバー
              objectFit="cover"
              style={{ borderRadius: "8px" }} // ボーダーの半径を設定
            />
          ) : (
            <Box
              sx={{
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
            flexGrow: 1,
            display: "flex",
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
                sx={{ paddingTop: "20px" }}
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

export default EventCard;
