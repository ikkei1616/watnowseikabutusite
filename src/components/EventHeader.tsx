"use client";

import Box from "@mui/material/Box";
import styles from "./EventHeader.module.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { EventName } from "@/types/Event";
import { useMediaQuery } from "react-responsive";

const EventHeader = ({
  title,
  eventId,
}: {
  title: string;
  eventId: string;
}) => {

  return (
    <Box>
      <Box className={styles.header}>
        <Box className={styles.headerInner}>
          <h1 className={styles.title}>{title}</h1>
          <Link href={`/events/${eventId}`} className={styles.button} passHref>
            <p className={`${styles.text} ${styles.pcText}`}>イベント詳細へ</p>
            <p className={`${styles.text} ${styles.spText}`}>詳細へ</p>    
            <Image
              src="/back_button.svg"
              width={42}
              height={42}
              alt="ボタン"
              className={styles.Image}
            ></Image>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default EventHeader;
