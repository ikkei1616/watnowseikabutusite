"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../admin.module.css";
import { supabase } from "@/supabase/supabase";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import AdminHeader from "@/components/admin/AdminHeader";
import PankuzuList from "@/components/admin/PankuzuList";
import AdminTitle from "@/components/admin/AdminTitle";
import type { AdminServiceList } from "@/types/Service";
import { YEARS_OPTIONS } from "@/const";
import SelectYearOptions from "@/components/admin/SelectYearOptions";

const ServicePage: React.FC = () => {
  const [services, setServices] = useState<AdminServiceList[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(YEARS_OPTIONS[0]);

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

  const handleYearChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setSelectedYear(parseInt(value));
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
          <SelectYearOptions
            handleYearChange={handleYearChange}
            yearOptions={YEARS_OPTIONS}
            defaultValue={selectedYear}
          />

          <Box sx={{ flexGrow: 1 }}>
            <AdminTitle>{selectedYear}年のサービス一覧</AdminTitle>
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
