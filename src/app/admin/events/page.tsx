import Link from "next/link";
import styles from "../admin.module.css";
import AdminHeader from "@/components/admin/AdminHeader";
import PankuzuList from "@/components/admin/PankuzuList";
import Typography from "@mui/material/Typography";
import AdminTitle from "@/components/admin/AdminTitle";

export default function AdminPage() {
  const pankuzu = [
    { text: "ジャンル選択", link: "/admin" },
    { text: "イベント", link: "/admin/events" },
  ];
  return (
    <main className={styles.container}>
      <AdminHeader />
      <PankuzuList pankuzu={pankuzu} />
      <AdminTitle>イベント</AdminTitle>
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
