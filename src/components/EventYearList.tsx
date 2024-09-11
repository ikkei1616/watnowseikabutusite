import React from "react";
import { List, ListItem, Typography, Divider } from "@mui/material";

const EventYearList: React.FC = () => {
  const events = [
    { year: 2024, count: 1 },
    { year: 2023, count: 1 },
    { year: 2022, count: 1 },
    { year: 2021, count: 1 },
  ];

  return (
    <List sx={{ padding: 0, maxWidth: "200px", marginBottom: "16px" }}>
      {events.map((event, index) => (
        <ListItem
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "8px 0",
          }}
        >
          {/* 左側の縦線 */}
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              marginRight: "8px",
              borderWidth: "1px",
              borderColor: "primary.main",
            }}
          />
          {/* イベント数 */}
          <Typography
            variant="subtitle1"
            sx={{ color: "gray", marginRight: "8px", fontSize: "14px" }}
          >
            {event.count}event{event.count > 1 ? "s" : ""}
          </Typography>
          {/* 年 */}
          <Typography variant="h4" color="primary">
            {event.year}
          </Typography>
        </ListItem>
      ))}
    </List>
  );
};

export default EventYearList;
