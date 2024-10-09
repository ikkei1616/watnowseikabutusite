import Link from "next/link";
import styles from "../admin.module.css";
import AdminHeader from "@/components/admin/AdminHeader";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PankuzuList from "@/components/admin/PankuzuList";
import AdminTitle from "@/components/admin/AdminTitle";

export default function AdminPage() {
  const pankuzu = [
    { text: "ジャンル選択", link: "/admin" },
    { text: "ユーザ", link: "/admin/users" },
  ];
  return (
    <main className={styles.container}>
      <AdminHeader />
      <PankuzuList pankuzu={pankuzu} />
      <AdminTitle>ユーザ</AdminTitle>
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
