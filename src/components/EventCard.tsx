import React from "react";
import Link from "next/link";
import styles from "./EventCard.module.css";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import type { Event } from "@/types/Event"; // interface Event のimport

// Eventコンポーネントが受け取るpropsについて定義
interface EventCardProp {
  event: Event;
}

const EventCard: React.FC<EventCardProp> = ({ event }) => {
  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: "16px auto",
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
  );
};

export default EventCard;
