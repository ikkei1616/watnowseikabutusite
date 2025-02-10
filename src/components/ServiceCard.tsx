import type { EventAllService } from "@/types/Service";
import { Card, Typography, Box, CardActions, Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface ServiceAwardComponents {
  service: EventAllService;
}

const ServiceCard: React.FC<ServiceAwardComponents> = ({ service }) => {
  const [hasImgError, setHasImgError] = useState(false);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          margin: "0 0 10px 10px",
          color: "#B09001",
          fontFamily: "HannariMincho",
          fontSize: "24px",
          height: "24px",
          "@media screen and (max-width:500px)": {
            fontSize: "18px",
          },
        }}
      >
        {service?.awards?.name || ""}
      </Box>
      <Card
        sx={{
          width: "100%",
          // height: "100%",
          maxWidth: "368px",
          // maxHeight: "306px",
          height: "306px",
          borderRadius: "20px",
          paddingBottom: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            backgroundColor: service.awards ? "#F3DF85" : "#85D5f3",
            justifyContent: "space-between",
            alignItems: "center",
            height: "46px",
            padding: "0 5%",
          }}
        >
          <Typography
            sx={{
              display: "-webkit-box", // 表示をボックス形式に
              WebkitLineClamp: 1, // 行数を4行に制限
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {service.name}
          </Typography>
          <CardActions
            sx={{
              paddingRight: "0",
            }}
          >
            <Link href={`/services/${service.id}`} passHref>
              <Button
                size="small"
                color="primary"
                sx={{
                  padding: "8px 6px 8px 10px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: service.awards ? "#f1cd29" : "#18c0fcdd",
                  },
                  fontFamily: "HannariMincho",
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

        <Box
          sx={{
            padding: "3% 5%",
            height: "212px",
          }}
        >
          <Box
            sx={{
              position: "relative",
              backgroundColor: "#EAEFF2",
              margin: "0 auto",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "15px",
            }}
          >
            {!hasImgError ? (
              <Image
                src={service.image || "/default-image.jpg"}
                alt="service image"
                fill={true}
                onError={() => {
                  setHasImgError(true);
                }}
                style={{
                  objectFit: "cover", // アスペクト比を保ちながら親要素を満たす
                  borderRadius: "15px", // Boxと同じように角を丸める（必要なら）
                }}
              />
            ) : (
              <Box>
                <p>画像がありません</p>
              </Box>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            padding: "0 5%",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              display: "-webkit-box", // 表示をボックス形式に
              WebkitLineClamp: 2, // 行数を4行に制限
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {service.comment}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default ServiceCard;
