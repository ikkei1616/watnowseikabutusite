import Link from "next/link";
import styles from "./page.module.css";
import AdminHeader from "@/components/AdminHeader";
import AdminPankuzuList from "@/components/AdminPankuzuList";
import Typography from "@mui/material/Typography";

export default function AdminPage() {
  const pankuzu = [
    { text: "ジャンル選択", link: "/admin" },
    { text: "サービス", link: "/admin/services" },
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
        }}
      >
        サービス
      </Typography>
      <ul className={styles.linkList}>
        <li className={styles.listItem}>
          <Link href="./services/new" className={styles.link}>
            新規サービス作成
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link href="./services/existing-events" className={styles.link}>
            既存サービス編集
          </Link>
        </li>
      </ul>
    </main>
  );
}
