import Link from "next/link";
import styles from "./page.module.css";
import AdminHeader from "@/components/AdminHeader";
import AdminPankuzuList from "@/components/AdminPankuzuList";
import Typography from "@mui/material/Typography";

export default function AdminPage() {
  const pankuzu = [{ text: "ジャンル選択", link: "/admin" }];
  return (
    <>
      <AdminHeader />
      <main className={styles.container}>
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
          ジャンル選択
        </Typography>
        <ul className={styles.linkList}>
          <li className={styles.listItem}>
            <Link href="/admin/events" className={styles.link}>
              イベント
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/admin/services" className={styles.link}>
              サービス
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/admin/technologies" className={styles.link}>
              技術スタック
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/admin/users" className={styles.link}>
              ユーザ
            </Link>
          </li>
        </ul>
      </main>
    </>
  );
}
