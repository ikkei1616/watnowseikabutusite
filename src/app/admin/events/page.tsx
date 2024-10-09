import styles from "../admin.module.css";
import AdminHeader from "@/components/admin/AdminHeader";
import PankuzuList from "@/components/admin/PankuzuList";
import AdminTitle from "@/components/admin/AdminTitle";
import AdminLinkList from "@/components/admin/AdminLinkList";
import AdminLinkItem from "@/components/admin/AdminLinkItem";

export default function AdminPage() {
  const pankuzu = [
    { text: "ジャンル選択", link: "/admin" },
    { text: "イベント", link: "/admin/events" },
  ];
  return (
    <>
      <AdminHeader />
      <main className={styles.container}>
        <PankuzuList pankuzu={pankuzu} />
        <AdminTitle>イベント</AdminTitle>

        <AdminLinkList>
          <AdminLinkItem href="./services/new">新規イベント作成</AdminLinkItem>
          <AdminLinkItem href="./services/existing-events">
            既存イベント編集
          </AdminLinkItem>
        </AdminLinkList>
      </main>
    </>
  );
}
