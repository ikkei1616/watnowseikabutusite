import Link from "next/link";
import styles from "./page.module.css";
import AdminHeader from "@/components/AdminHeader";

export default function AdminPage() {
  return (
    <main className={styles.container}>
      <AdminHeader />
      <h1 className={styles.heading}>サービス</h1>
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
