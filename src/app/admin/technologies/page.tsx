import styles from "../admin.module.css";
import AdminHeader from "@/components/admin/AdminHeader";
import PankuzuList from "@/components/admin/PankuzuList";
import AdminTitle from "@/components/admin/AdminTitle";
import AdminLinkList from "@/components/admin/AdminLinkList";
import AdminLinkItem from "@/components/admin/AdminLinkItem";

export default function AdminPage() {
  const pankuzu = [
    { text: "ジャンル選択", link: "/admin" },
    { text: "技術スタック", link: "/admin/technologies" },
  ];
  return (
    <>
      <AdminHeader />
      <main className={styles.container}>
        <PankuzuList pankuzu={pankuzu} />
        <AdminTitle>技術スタック</AdminTitle>

        <AdminLinkList>
          <AdminLinkItem href="/admin/technologies/new">
            新規技術スタック作成
          </AdminLinkItem>
          <AdminLinkItem href="/admin/technologies/existing-technologies">
            既存技術スタック編集
          </AdminLinkItem>
        </AdminLinkList>
      </main>
    </>
  );
}
