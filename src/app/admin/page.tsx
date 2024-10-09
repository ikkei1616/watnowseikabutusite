import Link from "next/link";
import styles from "./admin.module.css";
import AdminHeader from "@/components/admin/AdminHeader";
import PankuzuList from "@/components/admin/PankuzuList";
import Typography from "@mui/material/Typography";
import AdminTitle from "@/components/admin/AdminTitle";

export default function AdminPage() {
  const pankuzu = [{ text: "ジャンル選択", link: "/admin" }];
  return (
    <>
      <AdminHeader />
      <main className={styles.container}>
        <PankuzuList pankuzu={pankuzu} />
        <AdminTitle>ジャンル選択</AdminTitle>
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
