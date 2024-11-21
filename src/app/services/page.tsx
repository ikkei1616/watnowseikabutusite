"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import Header from "@/components/Header";
import { HeaderMode } from "@/types/HeaderMode";
import { supabase } from "@/supabase/supabase";
import type { Service } from "@/types/Service";
import LoadingSpinner from "@/components/LoadingSpinner";
import ServiceCard from "@/components/ServiceCard";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';

// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Home: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [page,setPage] = useState(1);
  const [totalServicesCount,setTotalServices] = useState(0);
  const servicesPerPage = 12;

  useEffect(() => {
    const start = (page-1) * servicesPerPage;
    const end = start + servicesPerPage - 1;

    const fetchService = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id,name,image")
        .order("id", { ascending: true })
        .range(start,end);

      if (error) {
        console.error("Error fetching events:", error);
      } else {
        console.log("Fetched data:", data);
        setServices((data as Service[]) || []);
      }
      setLoading(false);
    };


    const fetchEventCount = async () => {
      const { count, error:countError} = await supabase
        .from("services")
        .select('*',{count:'exact',head: true});
      console.log("カウントしている",count);
      
      if (countError) {
        console.error("Error fetching event count",countError)
        return;
      }
      setTotalServices(count || 0);
    }

    fetchService();
    fetchEventCount();
  }, []);

  useEffect(()=>{
    const start = (page-1) * servicesPerPage;
    const end = start + servicesPerPage - 1;

    const fetchService = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id,name,image")
        .order("id", { ascending: true })
        .range(start,end)
      if (error) {
        console.error("Error fetching events:", error);
      } else {
        console.log("Fetched data:", data);
        setServices((data as Service[]) || []);
      }
      setLoading(false);
    };

    fetchService()
  },[page])

  if (loading) {
    return <LoadingSpinner />;
  }
  
  const handlePageChange =(_: React.ChangeEvent<unknown>, nextPage:number)=>{
    setPage(nextPage);
    scrollTop();
    console.log(nextPage);
  }

  const scrollTop =()=>{
    window.scrollTo({ top:0 });
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
            // slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
        sx={{
          '&.MuiPagination-root': {
            marginTop:"0px",
            marginBottom:"54px",
          },
          '& .MuiPagination-ul': {
            justifyContent:"center",
            marginLeft:"auto",
            marginRight:"auto",
          },
          '& .MuiButtonBase-root': {
          color: "#85D5F3",
          },

        }}
      />
    </main>
  );
};

export default Home;
