import React from "react";
import { List, ListItem, Typography, Divider, Box } from "@mui/material";

const EventYearList: React.FC = () => {
  // モックデータをeventCountByYearの形式に変更
  const eventCountByYear = {
    2024: 3,
    2023: 1,
    2022: 1,
    2021: 1,
  };

  // 各年とその年のイベント数を取得
  const events = Object.entries(eventCountByYear)
    .map(([year, count]) => ({
      year: Number(year),
      count,
    }))
    .sort((a, b) => b.year - a.year); // 年を降順でソート

  return (
    <List
      sx={{
        position: "relative",
        maxWidth: "200px",
      }}
    >
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
              borderColor: "#00AEEF",
            }}
          />
          {/* イベント数と年を縦に並べるコンテナ */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column", // 縦に並べる設定
              alignItems: "center", // 中央揃え
            }}
          >
            {/* イベント数 */}
            <Typography
              variant="subtitle1"
              sx={{ color: "gray", marginRight: "8px", fontSize: "14px" }}
            >
              {event.count} event{event.count > 1 ? "s" : ""}
            </Typography>
            {/* 年 */}
            <Typography variant="h4" color="#00AEEF">
              {event.year}
            </Typography>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default EventYearList;
