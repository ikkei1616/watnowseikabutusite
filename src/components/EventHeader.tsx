"use client";

import Box from "@mui/material/Box";
import styles from "./EventHeader.module.css";
import Link from "next/link";
import Image from "next/image";

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
              className={styles.Image}
              width={38}
              height={38}
              alt="ボタン"
              
            ></Image>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default EventHeader;
