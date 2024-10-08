import Link from "next/link";
import styles from "./page.module.css";

export default function AdminPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>ジャンル選択</h1>
      <ul className={styles.linkList}>
      </ul>
    </div>
  );
}
