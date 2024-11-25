// "use client";

// import React from "react";
// import Image from "next/image";
// import styles from "./EventHeader.module.css";
// import Link from "next/link";
// import Box from "@mui/material/Box";



// const EventHeader = ({title,eventId}:{title:string,eventId:string})=>{
//   return (
//     <>
//       <Box className={styles.header}>
//         <Box className={styles.headerInner}>
//           <h1 className={styles.title}>{title}</h1>
//           <Link className={styles.button} href={`/events/${eventId}`} passHref>
//             <p className={styles.text}>イベント詳細に戻る</p>
//             <Image width={42} height={42 }src="/back_button.svg" alt="戻るボタン" />
//           </Link>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default EventHeader

"use client";

import Box from "@mui/material/Box";
import styles from "./EventHeader.module.css";
import Link from "next/link";
import Image from "next/image";
import {EventName} from "@/types/Event";

const EventHeader = ({ title, eventId } :{title:string, eventId:string}) =>{
  return(
    <Box>
      <Box className={styles.header}>
        <Box className={styles.headerInner}>
          <h1 className={styles.title}>{title}</h1>
          <Link href={`/events/${eventId}`} className={styles.button} passHref>
            <p className={styles.text}>イベント詳細に戻る</p>
            <Image src="/back_button.svg" width={42} height={42} alt="ボタン"></Image>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default EventHeader;
