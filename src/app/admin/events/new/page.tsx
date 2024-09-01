"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import EventForm from "@/components/EventForm";

const NewEventPage: React.FC = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/admin/events/existing-events");
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>新規イベント作成</h1>
      <EventForm isEditing={false} onSuccess={handleSuccess} />
    </main>
  );
};

export default NewEventPage;
