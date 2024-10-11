"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../admin.module.css";
import { supabase } from "@/supabase/supabase";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import AdminHeader from "@/components/admin/AdminHeader";
import PankuzuList from "@/components/admin/PankuzuList";
import AdminTitle from "@/components/admin/AdminTitle";
import type { AdminServiceList } from "@/types/Service";

const mockYears = [2024, 2025, 2026, 2027, 2028, 2029, 2030];

const ServicePage: React.FC = () => {
  const [services, setServices] = useState<AdminServiceList[]>([]);

  const pankuzu = [
    { text: "ジャンル選択", link: "/admin" },
    { text: "サービス", link: "/admin/services" },
    { text: "既存ページ編集", link: "/admin/services/existing-services" },
  ];

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id, name, release_year")
        .order("release_year", { ascending: true }); // 'id'で昇順にソート

      //取得に関するエラーハンドリング
      if (error) {
        console.error("Error fetching services:", error);
      } else {
        if (data === null) {
          console.error("No data fetched");
          return;
        }
        console.log("Fetched data:", data); // デバッグ用に取得データを出力
        const fetchedServices: AdminServiceList[] = data.map((service) => {
          return {
            id: service.id,
            name: service.name,
            year: service.release_year,
          };
        });
        setServices(fetchedServices || []); // データがnullのときの対策として空配列を設定
      }
    };

    fetchServices();
  }, []);

  const yearButtonStyle = {
    color: "var(--text)",
    width: "100%",
    padding: "10px",
    margin: "0",
    fontSize: "1.5rem",
    backgroundImage: "linear-gradient(to right, #9CABC7 6px, transparent 6px)",
    backgroundSize: "10px 1px",
    backgroundRepeat: "repeat-x",
    backgroundPosition: "left bottom",
    "& .MuiTypography-root": {
      flexGrow: 1,
      fontFamily: "HannariMincho",
      fontSize: "1.5rem",
      color: "var(--text)",
    },
    "& .Mui-checked + .MuiTypography-root": {
      color: "#0063BF",
    },
    "& .Mui-checked + span::before": {
      content: '"▶︎"',
      paddingTop: "0.3rem",
      paddingRight: "0",
    },
    span: {
      display: "flex",
      alignItems: "center",
    },
    "span::before": {
      content: '""',
      color: "#0063BF",
      fontSize: "0.6rem",
      marginRight: "9px",
      paddingRight: "0.6rem",
    },
    "& .MuiSvgIcon-root": {
      display: "none",
    },
    "& .MuiButtonBase-root": {
      display: "none",
    },
    "@media screen and (max-width: 768px)": {
      fontSize: "1rem",
    },
  };

  const linkStyle = {
    color: "#0063BF",
    width: "fit-content",
    padding: "4px 12px 6px 12px",
    marginBottom: "12px",
    fontSize: "1.5rem",
    linkStyle: "",
    "&:hover": {
      backgroundColor: "#0063BF11",
      borderRadius: "5px",
    },
    "@media screen and (max-width: 768px)": {
      fontSize: "1rem",
    },
    // ドットを表示
    "&::before": {
      content: '"・"',
      color: "#0063BF",
      fontSize: "1.5rem",
      marginRight: "6px",
    },
  };

  return (
    <>
      <AdminHeader />
      <main className={styles.container}>
        <PankuzuList pankuzu={pankuzu} />

        <Box sx={{ display: "flex", padding: "30px", gap: "50px" }}>
          <Box
            sx={{
              backgroundColor: "#EAEFF2",
              borderRadius: "15px",
              maxWidth: "250px",
              minWidth: "250px",
              padding: "20px",
              height: "fit-content",
            }}
          >
            <FormControl sx={{ width: "100%" }}>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={`${mockYears[0]}`}
                name="radio-buttons-group"
                sx={{ width: "100%" }}
              >
                {mockYears.map((year) => (
                  <FormControlLabel
                    key={year}
                    value={year}
                    control={<Radio />}
                    label={`${year}`}
                    sx={yearButtonStyle}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <AdminTitle>2024年のサービス一覧</AdminTitle>
            <List>
              {services.map((service) => (
                <ListItem key={service.id} sx={linkStyle}>
                  <Link href={`./existing-services/${service.id}/edit`}>
                    {service.name}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </main>
    </>
  );
};

export default ServicePage;
