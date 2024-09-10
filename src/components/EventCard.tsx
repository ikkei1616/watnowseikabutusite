import React from "react";
import Link from "next/link";
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
    <Box sx={{ display: "flex", justifyContent: "flex-end", margin: "16px 0" }}>
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
            alignItems: "center", // 中央揃え
            justifyContent: "space-between", // 日付とボタンを左右に配置
            padding: "8px 16px",
            position: "relative",
          }}
        >
          {/* 日付を表示 */}
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{
              backgroundColor: "#fff",
              padding: "0 8px",
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
                sx={{ textTransform: "none" }}
              >
                詳細をみる
              </Button>
            </Link>
          </CardActions>
        </Box>

        {/* 上部に線を表示 */}
        <Divider sx={{ width: "100%" }} />

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
    </Box>
  );
};

export default EventCard;
