"use client";

import React, { useEffect, useState } from "react";
import styles from "../../admin.module.css";
import { supabase } from "@/supabase/supabase";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import AdminHeader from "@/components/admin/AdminHeader";
import PankuzuList from "@/components/admin/PankuzuList";
import AdminTitle from "@/components/admin/AdminTitle";
import AdminExistingLinkItem from "@/components/admin/AdminExistingLinkItem";
import SelectYearOptions from "@/components/admin/SelectYearOptions";
import type { AdminServiceList } from "@/types/Service";
import useAdminSelectYear from "@/hooks/useAdminSelectYear";
import { YEARS_OPTIONS } from "@/const";

const ServicePage: React.FC = () => {
  const [services, setServices] = useState<AdminServiceList[]>([]);
  const { selectedYear, handleYearChange } = useAdminSelectYear(YEARS_OPTIONS);

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
                <AdminExistingLinkItem
                  key={service.id}
                  href={`./existing-services/${service.id}/edit`}
                >
                  {service.name}
                </AdminExistingLinkItem>
              ))}
            </List>
          </Box>
        </Box>
      </main>
    </>
  );
};

export default ServicePage;
