import Link from "next/link";
import styles from "./page.module.css";

export default function AdminPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>イベント</h1>
      <ul className={styles.linkList}>
        <li className={styles.listItem}>
          <Link href="(ここに遷移先指定)" className={styles.link}>
            新規ページ作成
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link href="(ここに遷移先指定)" className={styles.link}>
            既存ページ編集
          </Link>
        </li>
      </ul>
    </div>
  );
}
