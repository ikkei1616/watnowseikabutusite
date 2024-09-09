import React from "react";
import Link from "next/link";
import styles from "./Page.module.css";
import Header from "@/components/Header";
import { HeaderMode } from "@/types/HeaderMode";

const Home: React.FC = () => {
  const services = [
    { id: "1", name: "service1" },
    { id: "2", name: "service2" },
    { id: "3", name: "service3" },
    { id: "4", name: "service4" },
    { id: "5", name: "service5" },
    { id: "6", name: "service6" },
    { id: "7", name: "service7" },
    { id: "8", name: "service8" },
    { id: "9", name: "service9" },
    { id: "10", name: "service10" },
    { id: "11", name: "service11" },
    { id: "12", name: "service12" },
    { id: "13", name: "service13" },
    { id: "14", name: "service14" },
    { id: "15", name: "service15" },
    { id: "16", name: "service16" },
    { id: "17", name: "service17" },
    { id: "18", name: "service18" },
    { id: "19", name: "service19" },
    { id: "20", name: "service20" },
  ];
  return (
    <main>
      <Header mode={HeaderMode.SERVICES} />

      <ul className={styles.serviceList}>
        {services.map((service, num) => (
          <li key={service.id} className={styles.serviceItem}>
            <Link href="/services/serviceid">サービス{num + 1}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
