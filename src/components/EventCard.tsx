import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import type { Event } from "@/types/Event"; // interface Event のimport

// Eventコンポーネントが受け取るpropsについて定義
interface EventCardProp {
  event: Event;
}

const EventCard: React.FC<EventCardProp> = ({ event }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", margin: "16px 0" }}>
      <Card
        sx={{
          width: 900,
          maxWidth: 1000,
          marginLeft: "auto", // カードを右詰めに配置する
          boxShadow: 3,
          borderRadius: "12px",
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {event.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {event.date}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {event.comment}
          </Typography>
        </CardContent>

        {/* 詳細ページへのリンクボタン */}
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Link href={`/events/${event.id}`} passHref>
            <Button size="small" color="primary" sx={{ textTransform: "none" }}>
              詳細をみる
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
};

export default EventCard;
