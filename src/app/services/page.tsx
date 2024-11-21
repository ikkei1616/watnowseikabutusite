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
  ];
  return (
    <div className={styles.pageHeader}>
      <Header mode={HeaderMode.SERVICES} />

      <ul className={styles.serviceList}>
        {services.map((service, num) => (
          <li key={service.id} className={styles.serviceItem}>
            <Link href="/services/serviceid">サービス{num + 1}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
