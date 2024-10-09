import Link from "next/link";
import styles from "../admin.module.css";
import AdminHeader from "@/components/AdminHeader";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AdminPankuzuList from "@/components/AdminPankuzuList";

export default function AdminPage() {
  const pankuzu = [
    { text: "ジャンル選択", link: "/admin" },
    { text: "ユーザ", link: "/admin/users" },
  ];
  return (
    <main className={styles.container}>
      <AdminHeader />
      <AdminPankuzuList pankuzu={pankuzu} />
      <Typography
        variant="h1"
        component="div"
        sx={{
          fontFamily: "HannariMincho",
          fontSize: "4rem",
          padding: "1rem 0 28px 0",
          "@media screen and (max-width: 768px)": {
            fontSize: "3rem",
          },
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
