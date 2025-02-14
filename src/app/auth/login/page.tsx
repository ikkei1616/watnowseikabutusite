"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 追加
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      router.push("/admin"); // 管理者画面へリダイレクト
    } else {
      alert("パスワードが間違っています");
    }
  };

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワードを入力してください"
            className={styles.input}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.toggleButton}
          >
            {showPassword ? "非表示" : "表示"}
          </button>
        </div>
        <button type="submit" className={styles.button}>
          ログイン
        </button>
      </form>
    </main>
  );
}
