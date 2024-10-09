import styles from "../admin.module.css";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminLinkList from "@/components/admin/AdminLinkList";
import AdminLinkItem from "@/components/admin/AdminLinkItem";
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

      <AdminLinkList>
        <AdminLinkItem href="./services/new">新規ユーザ作成</AdminLinkItem>
        <AdminLinkItem href="./services/existing-events">
          既存ユーザ編集
        </AdminLinkItem>
      </AdminLinkList>
    </main>
  );
}
