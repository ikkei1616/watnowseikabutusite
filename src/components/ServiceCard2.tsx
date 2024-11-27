import { supabase } from "@/supabase/supabase";
import type { Service } from "@/types/Service";
import {
  Card,
  Typography,
  Box,
  CardMedia,
} from "@mui/material";
import { useEffect,useState } from "react";


interface ServiceCard2Components {
  service: Service;
  color: string;
  awardId: string;
}


//   breakpoints: {
//     values: {
//       xs: ,
//       sm: 600,
//       md: 900,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

const ServiceCard2: React.FC<ServiceCard2Components> = ({ service, color,awardId}) => {
  const [awardName,setAwardName] = useState<string>("");

  useEffect(()=>{
    const fetchAwardData = async ()=>{
      if (awardId) {
        const { data,error } = await supabase
          .from("awards")
          .select("name")
          .eq("id",awardId);
        
        if (error) {
          console.log("awardName fetch error",error,data)
          return;
        }
        console.log(data);
        setAwardName(data[0].name as string || "")
      }
    };
    fetchAwardData();
  },[]);

  return (
    <Box style={{display:"relative"}}>
        <Box 
          sx={{
            margin:"0px 0 10px 10px",
            color: "#B09001",
            fontFamily: "HannariMincho",
            fontSize: "24px",
            lineHeight: "40px",
          }}
        >  
          {awardName}
        </Box>
        <Card
          sx={{
            width: "100%",
            // height: "100%",
            maxWidth: "368px",
            // maxHeight: "306px",
            height: "306px",
            borderRadius: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              backgroundColor: `${color}`,
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
                  color: "primary.main,"
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
              {service.description}
            </Typography>
          </Box>
        </Card>
    </Box>
  );
};

export default ServiceCard2;
