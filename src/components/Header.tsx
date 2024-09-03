import React from "react";
import styles from "./Header.module.css";


const Header = () =>{
  return (
    <header className={styles.header}>
        <p>watnowプロダクト一覧サイト</p>
        <h1>watbox</h1>
        <p>サービス一覧</p>
        <p>イベント一覧</p>
        <p>管理者ページ</p>
    </header>
  );
};

export default Header;

