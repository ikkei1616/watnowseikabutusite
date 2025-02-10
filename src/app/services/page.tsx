"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import Header from "@/components/Header";
import { HeaderMode } from "@/types/HeaderMode";
import { supabase } from "@/supabase/supabase";
import type { Service } from "@/types/Service";
import LoadingPage from "@/components/loading/LoadingPage";
import ServiceCard from "@/components/ServiceCard";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';

const Home: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalServicesCount, setTotalServices] = useState(0);
  const servicesPerPage = 12;

  useEffect(() => {
    const start = (page - 1) * servicesPerPage;
    const end = start + servicesPerPage - 1;

    const fetchService = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id,name,image,comment")
        .order("release_year",{ ascending: false })
        .order("release_month",{ ascending: false })
        .range(start,end);
        console.log(data)

      if (error) {
        console.error("Error fetching events:", error);
      } else {
        console.log("Fetched data:", data);
        setServices((data as Service[]) || []);
      }
      setLoading(false);
    };

    const fetchEventCount = async () => {
      const { count, error: countError } = await supabase
        .from("services")
        .select("*", { count: "exact", head: true });
      console.log("カウントしている", count);

      if (countError) {
        console.error("Error fetching event count", countError);
        return;
      }
      setTotalServices(count || 0);
    };

    fetchService();
    fetchEventCount();
  }, [page]);

  useEffect(() => {
    const start = (page - 1) * servicesPerPage;
    const end = start + servicesPerPage - 1;

    const fetchService = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id,name,image,comment")
        .order("release_year",{ ascending: false })
        .order("release_month",{ ascending: false })
        .range(start,end)
      if (error) {
        console.error("Error fetching events:", error);
      } else {
        console.log("Fetched data:", data);
        setServices((data as Service[]) || []);
      }
      setLoading(false);
    };

    fetchService();
  }, [page]);

  if (loading) {
    return <LoadingPage />;
  }

  const handlePageChange = (
    _: React.ChangeEvent<unknown>,
    nextPage: number
  ) => {
    setPage(nextPage);
    scrollTop();
    console.log(nextPage);
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <main>
      <Header mode={HeaderMode.SERVICES} />
      <h1 className={styles.title}>サービス一覧</h1>
      <div className={styles.serviceGridList}>
        {services.map((service) => (
          <div key={service.id}>
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
      <Pagination
        className={styles.pageNation}
        count={Math.ceil(totalServicesCount / servicesPerPage)}
        onChange={handlePageChange}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            slots={{
              previous: () => <div>←</div>,
              next: () => <div>→</div>, // カスタム文字列
            }}
          />
        )}
        sx={{
          "&.MuiPagination-root": {
            marginTop: "30px",
            marginBottom: "54px",
          },
          "& .MuiPagination-ul": {
            justifyContent: "center",
            marginLeft: "auto",
            marginRight: "auto",
          },

          "& .MuiButtonBase-root": {
            color: "#85D5F3",
            fontFamily: "HannariMincho",
            fontSize: "22px",
            alignItems: "center",
            "&:hover": {
              backgroundColor: "#85D5F34D", // ホバー時に変更したい色を指定
            },
          },
          "& .Mui-selected": {
            color: "#fff",
          },
          "& .mui-nb7bwn-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":
            {
              backgroundColor: "#85D5F3",
            },
          "& .mui-1iajisb-MuiPaginationItem-root": {
            color: "#85D5F3",
          },
        }}
      />
    </main>
  );
};

export default Home;
