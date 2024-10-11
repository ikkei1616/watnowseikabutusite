import styles from "./admin.module.css";
import AdminHeader from "@/components/admin/AdminHeader";
import PankuzuList from "@/components/admin/PankuzuList";
import AdminTitle from "@/components/admin/AdminTitle";
import AdminLinkList from "@/components/admin/AdminLinkList";
import AdminLinkItem from "@/components/admin/AdminLinkItem";

export default function AdminPage() {
  const pankuzu = [{ text: "ジャンル選択", link: "/admin" }];
  return (
    <>
      <AdminHeader />
      <main className={styles.container}>
        <PankuzuList pankuzu={pankuzu} />
        <AdminTitle>ジャンル選択</AdminTitle>
        <AdminLinkList>
          <AdminLinkItem href="/admin/events">イベント</AdminLinkItem>
          <AdminLinkItem href="/admin/services">サービス</AdminLinkItem>
          <AdminLinkItem href="/admin/technologies">技術スタック</AdminLinkItem>
          <AdminLinkItem href="/admin/users">ユーザー</AdminLinkItem>
        </AdminLinkList>
      </main>
    </>
  );
}
