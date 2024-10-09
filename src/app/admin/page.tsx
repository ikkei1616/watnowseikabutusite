import styles from "./admin.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import AdminHeader from "@/components/admin/AdminHeader";
import PankuzuList from "@/components/admin/PankuzuList";
import AdminTitle from "@/components/admin/AdminTitle";

export default function AdminPage() {
  const pankuzu = [{ text: "ジャンル選択", link: "/admin" }];
  return (
    <>
      <AdminHeader />
      <main className={styles.container}>
        <PankuzuList pankuzu={pankuzu} />
        <AdminTitle>ジャンル選択</AdminTitle>
        <List
          sx={{
            padding: 0,
            margin: 0,
            width: "100%",
          }}
        >
          <ListItem
            sx={{
              marginBottom: "24px",
              padding: 0,
              width: "100%",
            }}
          >
            <ListItemButton
              component="a"
              href="/admin/events"
              sx={{
                display: "block",
                width: "100%",
                fontSize: "1.5rem",
                backgroundColor: "#eaeff2",
                color: "#000",
                textDecoration: "none",
                padding: "10px 20px",
                textAlign: "center",
                border: "2px solid #9cabc7",
                borderRadius: "5px",
                transition: "background-color 0.3s, color 0.3s",
                "&:hover": {
                  backgroundColor: "#9cabc7",
                  color: "#fff",
                },
              }}
            >
              イベント
            </ListItemButton>
          </ListItem>
          <ListItem
            sx={{
              marginBottom: "24px",
              padding: 0,
              width: "100%",
            }}
          >
            <ListItemButton
              component="a"
              href="/admin/services"
              sx={{
                display: "block",
                width: "100%",
                fontSize: "1.5rem",
                backgroundColor: "#eaeff2",
                color: "#000",
                textDecoration: "none",
                padding: "10px 20px",
                textAlign: "center",
                border: "2px solid #9cabc7",
                borderRadius: "5px",
                transition: "background-color 0.3s, color 0.3s",
                "&:hover": {
                  backgroundColor: "#9cabc7",
                  color: "#fff",
                },
              }}
            >
              サービス
            </ListItemButton>
          </ListItem>
          <ListItem
            sx={{
              marginBottom: "24px",
              padding: 0,
              width: "100%",
            }}
          >
            <ListItemButton
              component="a"
              href="/admin/users"
              sx={{
                display: "block",
                width: "100%",
                fontSize: "1.5rem",
                backgroundColor: "#eaeff2",
                color: "#000",
                textDecoration: "none",
                padding: "10px 20px",
                textAlign: "center",
                border: "2px solid #9cabc7",
                borderRadius: "5px",
                transition: "background-color 0.3s, color 0.3s",
                "&:hover": {
                  backgroundColor: "#9cabc7",
                  color: "#fff",
                },
              }}
            >
              技術スタック
            </ListItemButton>
          </ListItem>

          <ListItem
            sx={{
              marginBottom: "24px",
              padding: 0,
              width: "100%",
            }}
          >
            <ListItemButton
              component="a"
              href="/admin/users"
              sx={{
                display: "block",
                width: "100%",
                fontSize: "1.5rem",
                backgroundColor: "#eaeff2",
                color: "#000",
                textDecoration: "none",
                padding: "10px 20px",
                textAlign: "center",
                border: "2px solid #9cabc7",
                borderRadius: "5px",
                transition: "background-color 0.3s, color 0.3s",
                "&:hover": {
                  backgroundColor: "#9cabc7",
                  color: "#fff",
                },
              }}
            >
              ユーザー
            </ListItemButton>
          </ListItem>
        </List>
      </main>
    </>
  );
}
