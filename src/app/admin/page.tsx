import Link from "next/link";
import styles from "./page.module.css";
import AdminHeader from "@/components/AdminHeader";

export default function AdminPage() {
  return (
    <div className={styles.container}>
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
      </ul>
    </div>
  );
}
