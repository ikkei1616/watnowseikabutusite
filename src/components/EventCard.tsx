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
import type { Event } from "@/types/Event"; // Event型のインポート

// Eventコンポーネントが受け取るpropsについて定義
interface EventCardProp {
  event: Event;
}

const EventCard: React.FC<EventCardProp> = ({ event }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column", // カード全体を縦に配置
        width: 908,
        maxWidth: 1000,
        marginLeft: "auto",
        boxShadow: 3,
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end", // 下方揃え
          justifyContent: "space-between", // 日付とボタンを左右に配置
          paddingTop: "8px", // 上の余白
          paddingBottom: "0px", // 下の余白
          paddingLeft: "16px", // 左の余白
          paddingRight: "16px", // 右の余白
          position: "relative",
        }}
      >
        {/* 日付を表示 */}
        <Typography
          variant="subtitle1"
          color="#00AEEF"
          sx={{
            fontSize: "1.40rem", // カスタムフォントサイズを指定
            backgroundColor: "#fff",
            paddingTop: "6px", // 上の余白
            paddingBottom: "0px", // 下の余白
            paddingLeft: "8px", // 左の余白
            paddingRight: "8px", // 右の余白
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
                src={"/paper_airplane.svg"}
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
          margin: "0 auto", // 自動マージンで中央に寄せる
          borderColor: "#00AEEF",
        }}
      />

      {/* カードの内容部分 */}
      <Box sx={{ display: "flex", alignItems: "center", padding: "16px" }}>
        {/* 画像部分 */}
        <Box
          sx={{
            width: 380,
            height: 236,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f0f0f0",
            borderRadius: "8px",
            overflow: "hidden",
            marginRight: "16px",
          }}
        >
          {/* 画像がない場合、メッセージを表示 */}
          <Typography variant="body2" color="text.secondary">
            画像がありません
          </Typography>
        </Box>

        {/* テキスト部分 */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "flex-start",
            height: "100%",
            width: 492,
          }}
        >
          <CardContent
            sx={{
              padding: "0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start", // 上詰めにするための設定
              height: "100%", // CardContentの高さを指定して、flexboxが効くようにする
            }}
          >
            {/* イベントの題名部分 */}
            <Box sx={{ marginBottom: "8px" }}>
              <Typography variant="h5" component="div" gutterBottom>
                {event.name}
              </Typography>
            </Box>

            {/* イベントの内容部分 */}
            <Box>
              <Typography variant="body2" color="text.secondary">
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
