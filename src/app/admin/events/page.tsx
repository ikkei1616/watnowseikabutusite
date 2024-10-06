import Link from "next/link";
import styles from "./page.module.css";
import AdminHeader from "@/components/AdminHeader";

export default function AdminPage() {
  return (
    <main className={styles.container}>
      <AdminHeader />
      <h1 className={styles.heading}>イベント</h1>
      <ul className={styles.linkList}>
        <li className={styles.listItem}>
          <Link href="./events/new" className={styles.link}>
            新規イベント作成
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link href="./events/existing-events" className={styles.link}>
            既存イベント編集
          </Link>
        </li>
      </ul>
    </main>
  );
}
