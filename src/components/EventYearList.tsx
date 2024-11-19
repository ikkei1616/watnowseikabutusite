import React from "react";
import { List, ListItem, Typography, Divider, Button } from "@mui/material";

// propsの型を定義
interface EventYearListProps {
  eventCountByYear: Record<number, number>;
  onYearSelect: (year: number) => void;
  selectedYear: number;
}

const EventYearList: React.FC<EventYearListProps> = ({
  eventCountByYear,
  onYearSelect,
  selectedYear,
}) => {
  const events = Object.entries(eventCountByYear)
    .map(([year, count]) => ({
      year: Number(year),
      count,
    }))
    .sort((a, b) => b.year - a.year); // 最新が上にくるようにソート

  return (
    <List
      sx={{
        position: "relative",
        maxWidth: "300px",
        width: "150px",
      }}
    >
      {events.map((event) => (
        <ListItem
          key={event.year}
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "10px 0",
            marginLeft: "20px",
            fontFamily: "HannariMincho",
          }}
          disablePadding
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
          {/* ボタン部分 */}
          <Button
            onClick={() => onYearSelect(event.year)}
            sx={{
              textTransform: "none",
              flexGrow: 1,
              display: "flex",
              flexDirection: "column", // 2行の情報を縦に並べる
              alignItems: "flex-start", // 左寄せ
              color: "#00AEEF",
              backgroundColor:
                selectedYear === event.year ? "#f0f0f0" : "inherit", // グレーの背景色を選択された年にのみ追加
              "&:hover": {
                backgroundColor:
                  selectedYear === event.year ? "#D3D3D3" : "#f0f0f0", // ホバー時の背景色
              },
              width: "100%", // ボタン全体の幅を確保
            }}
          >
            {/* イベント数 */}
            <Typography
              variant="subtitle1"
              sx={{
                color: "gray",
                fontSize: "18px",
                fontFamily: "HannariMincho",
              }}
            >
              {event.count} event{event.count > 1 ? "s" : ""}
            </Typography>
            {/* 年 */}
            <Typography
              variant="h4"
              color="inherit"
              sx={{ fontFamily: "HannariMincho" }}
            >
              {event.year}
            </Typography>
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default EventYearList;
