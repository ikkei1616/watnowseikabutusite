import styles from "./ServiceCard.module.css";
import style from "../../public/next.svg";
import type { Service } from "@/types/Service";
import Image from "next/image";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Divider,
  CardMedia,
} from "@mui/material";
import { object } from "zod";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "368px",
        maxHeight: "306px",
        borderRadius: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#85D5F3",
          justifyContent: "space-between",
          alignItems: "center",
          height: "46px",
          padding: "0 5%",
        }}
      >
        <Typography sx={{}}>{service.name}</Typography>
        <div
          style={{
            padding: "0",
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          <a
            href=".#"
            style={{
              fontSize: "12px",
              whiteSpace: "nowrap",
              padding: "0",
            }}
          >
            詳細を見る
          </a>
          <a
            href=".#"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardMedia
              component="img"
              image="/paper_airplane.svg"
              alt="airplane"
              style={{
                height: "auto",
                width: "28px",
                padding: "0",
                objectFit: "contain",
              }}
            />
          </a>
        </div>
      </Box>

      <Box
        sx={{
          padding: "3% 5%",
          height: "212px",
        }}
      >
        <Box
          sx={{
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
          <img
            src={service.image ?? "/default-image.jpg"}
            alt="service image"
            style={{
              width: "100%", // 親要素の幅いっぱいに広げる
              height: "100%", // 親要素の高さいっぱいに広げる
              objectFit: "cover", // アスペクト比を保ちながら親要素を満たす
              borderRadius: "15px", // Boxと同じように角を丸める（必要なら）
            }}
          />
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
          }}
        >
          Watnowのメンバーが作ったプロダクトを一覧できるWebサイト
        </Typography>
      </Box>
    </Card>
  );
};

export default ServiceCard;
