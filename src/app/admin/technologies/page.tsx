import Link from "next/link";
import styles from "../admin.module.css";
import AdminHeader from "@/components/admin/AdminHeader";
import PankuzuList from "@/components/admin/PankuzuList";
import Typography from "@mui/material/Typography";

export default function AdminPage() {
  const pankuzu = [
    { text: "ジャンル選択", link: "/admin" },
    { text: "技術スタック", link: "/admin/technologies" },
  ];
  return (
    <main className={styles.container}>
      <AdminHeader />
      <PankuzuList pankuzu={pankuzu} />
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
        技術スタック
      </Typography>
      <ul className={styles.linkList}>
        <li className={styles.listItem}>
          <Link href="./services/new" className={styles.link}>
            新規技術スタック作成
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link href="./services/existing-events" className={styles.link}>
            既存技術スタック編集
          </Link>
        </li>
      </ul>
    </main>
  );
}
