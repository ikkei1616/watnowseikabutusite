import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import Image from "next/image";

interface EventYearListProps {
  eventCountByYear: Record<number, number>;
  onYearSelect: (year: number) => void;
  selectedYear: number;
}

export const EventYearListDrawer: React.FC<EventYearListProps> = ({
  eventCountByYear,
  onYearSelect,
  selectedYear,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpenDrawer = () => setOpen(true);
  const handleCloseDrawer = () => setOpen(false);

  const events = Object.entries(eventCountByYear)
    .map(([year, count]) => ({
      year: Number(year),
      count,
    }))
    .sort((a, b) => b.year - a.year); // 最新が上にくるようにソート

  return (
    <>
      {/* サイドメニューを開くボタン */}
      <IconButton
        onClick={handleOpenDrawer}
        disableRipple // 波紋エフェクトを無効化
        disableFocusRipple // フォーカス時の波紋エフェクトを無効化
        style={{
          position: "fixed",
          left: -10,
          top: "50%",
          transform: "translateY(-50%)",
          padding: 0, // 余白を削除
          width: 45, // ボタンの幅（円の直径）
          height: 45, // ボタンの高さ（円の直径）
          borderRadius: "0 50% 50% 0", // 円の右半分
        }}
      >
        <Image
          src="/drawerIcon.svg"
          alt="drawer"
          width={45}
          height={45}
          style={{
            transition: "transform 0.2s ease-in-out", // 画像拡大のアニメーション
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.1)"; // ホバー時に画像を少し拡大
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)"; // ホバーを外したときに元に戻す
          }}
        />
      </IconButton>

      <Drawer anchor="left" open={open} onClose={handleCloseDrawer}>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: "10px",
            padding: "16px",
            width: "300px",
          }}
        >
          {events.map((event) => (
            <ListItem
              key={event.year}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "5%",
              }}
            >
              {/* 左側の縦線 */}
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  borderWidth: "1px",
                  borderColor: "#00AEEF",
                }}
              />
              {/* ボタン部分 */}
              <Button
                onClick={() => onYearSelect(event.year)}
                sx={{
                  textTransform: "none",
                  display: "flex",
                  flexDirection: "column", // 2行の情報を縦に並べる
                  alignItems: "center", // 左寄せ
                  width: "60%", // ボタン全体の幅を確保
                  height: "85px", // ボタンの高さを指定
                  borderRadius: "8px",
                  color: "#00AEEF",
                  backgroundColor:
                    selectedYear === event.year ? "#f0f0f0" : "inherit", // グレーの背景色を選択された年にのみ追加
                  "&:hover": {
                    backgroundColor:
                      selectedYear === event.year ? "#D3D3D3" : "#f0f0f0", // ホバー時の背景色
                  },
                }}
              >
                {/* イベント数 */}
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "gray",
                    fontSize: "1rem",
                  }}
                >
                  {event.count} event{event.count > 1 ? "s" : ""}
                </Typography>
                {/* 年 */}
                <Typography variant="h4" color="inherit">
                  {event.year}
                </Typography>
              </Button>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default EventYearListDrawer;
