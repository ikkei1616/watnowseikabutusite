"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";
import styles from "./Page.module.css";
import Header from "@/components/Header";
import { HeaderMode } from "@/types/HeaderMode";
import { supabase } from "@/supabase/supabase";
import type {Service} from "@/types/Service";

const Home: React.FC = () => {
  const [services,setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchService = async () => {
      const {data,error} = await supabase
        .from("services")
        .select("id,name")
        .order("id", {ascending: true});
      
      if(error) {
        console.error("Error fetching events:", error);
      } else {
        console.log("Fetched data:", data);
        setServices((data as Service[]) || []);
      }
    };

    fetchService(); 
  },[]);

  return (
    <main>
      <Header mode={HeaderMode.SERVICES} />
      <ul className={styles.serviceList}>
        {services.map((service, num) => (
          <li key={service.id} className={styles.serviceItem}>
            <Link href="/services/serviceid">{service.name}{num + 1}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
