import Link from "next/link";
import styles from "./page.module.css";
import AdminHeader from "@/components/AdminHeader";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function AdminPage() {
  return (
    <main className={styles.container}>
      <AdminHeader />
      {/* ハンバーガーメニューの追加 */}
      <Box display={"flex"} alignItems={"center"}>
        <Link href={"/admin"}>
          <Typography
            component="div"
            sx={{
              fontFamily: "HannariMincho",
              fontSize: "1.5rem",
              color: "#0063BF",
              borderBottom: "2px solid #0063BF",
            }}
          >
            ジャンル選択
          </Typography>
        </Link>
        <Typography
          component="div"
          sx={{
            fontFamily: "HannariMincho",
            fontSize: "1.5rem",
            color: "#0063BF",
          }}
        >
          ＞
        </Typography>
        <Link href={"/admin/users"}>
          <Typography
            component="div"
            sx={{
              fontFamily: "HannariMincho",
              fontSize: "1.5rem",
              color: "#0063BF",
              borderBottom: "2px solid #0063BF",
            }}
          >
            ユーザ
          </Typography>
        </Link>
      </Box>
      <Typography
        variant="h1"
        component="div"
        sx={{
          fontFamily: "HannariMincho",
          fontSize: "4rem",
        }}
      >
        ユーザ
      </Typography>
      <ul className={styles.linkList}>
        <li className={styles.listItem}>
          <Link href="./services/new" className={styles.link}>
            新規ユーザ作成
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link href="./services/existing-events" className={styles.link}>
            既存ユーザ編集
          </Link>
        </li>
      </ul>
    </main>
  );
}
