import styles from "./ServiceCard.module.css";
import style from "../../public/next.svg"
import type {Service} from "@/types/Service";
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

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps>=({ service }) =>{
  return (
    <Card
      sx={{
        width:"368px",
        height: "306px",
        borderRadius: "20px",

      }}
    >
      <Box 
        sx={{
          display: "flex",
          backgroundColor:"#85D5F3",
          justifyContent: "space-between",
          alignItems: "center",
          height: "46px",
          
        }}
      >
        <Typography
          sx={{
            flexGrow: "4",
          }}
        >{service.name}</Typography>
        <CardActions
          sx={{
            height: "100%",
            flexGrow: "2",
          }}
        >
          <Button>詳細を見る</Button>
          <CardMedia component="img" image="/paper_airplane.svg" 
            sx={{
              borderRadius: "10%",
              objectFit: "fit",
            }}
          />
        </CardActions>
      </Box>

      <Box
        sx={{
          backgroundColor:"#F3DF85",
          padding: "3% 3%",
          height: "70%"
        }}
      >
        <Box
          sx={{
            backgroundColor: "#85D5F3",
            margin: "0 auto",
            borderRadius: "60px",
            
          }}
        >
          <CardMedia 
            component="img" 
            image="/moodhub.png" 
            sx={{
              objectFit: 'cover',
            }}
            
          />
        </Box>
      </Box>
      

      <Box
        sx={{
          backgroundColor: "#000",
        }}
      >
        <Typography>Watnowのメンバーが作ったプロダクトを一覧できるWebサイト</Typography>
      </Box>
      
    </Card>
  )


}

export default ServiceCard;