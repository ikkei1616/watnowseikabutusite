import Link from "next/link";
import styles from "./page.module.css";
import AdminHeader from "@/components/AdminHeader";

export default function AdminPage() {
  return (
    <main className={styles.container}>
      <AdminHeader />
      <h1 className={styles.heading}>ジャンル選択</h1>
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
  );
}
