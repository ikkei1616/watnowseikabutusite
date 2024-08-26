"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { supabase } from "@/supabase/supabase";
import { EventDetail, Award } from "@/types/Event";

const NewEventPage: React.FC = () => {
  const router = useRouter();

  // EventDetail型に基づく初期状態を設定
  const [event, setEvent] = useState<EventDetail>({
    id: null,
    name: "",
    date: "",
    url: "",
    comment: "",
    awards: [{ order_num: "1", name: "" }],
  });
  // 登録完了状態管理
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // イベント情報のハンドラ
  const handleEventChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [id]: value,
    }));
  };

  // 賞の変更ハンドラ, index(awards配列のindex指定), field(そのindexの中で要素を指定), value(その要素の変更内容を指定)
  const handleAwardChange = (
    index: number,
    field: keyof Award,
    value: string | null
  ) => {
    const updatedAwards = event.awards ? [...event.awards] : [];
    updatedAwards[index] = { ...updatedAwards[index], [field]: value };
    setEvent((prevEvent) => ({
      ...prevEvent,
      awards: updatedAwards,
    }));
  };

  // 賞の追加
  const addAward = () => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      awards: [
        ...(prevEvent.awards || []),
        { order_num: (prevEvent.awards?.length + 1).toString(), name: "" }, // 新しい賞に次の順番を割り当て
      ],
    }));
  };

  // 賞の削除
  const removeAward = (index: number) => {
    const updatedAwards = event.awards
      ? event.awards.filter((_, i) => i !== index)
      : [];
    setEvent((prevEvent) => ({
      ...prevEvent,
      awards: updatedAwards.map((award, i) => ({
        ...award,
        order_num: (i + 1).toString(),
      })), // 削除後、順番を繰り上げる(iを基準にすることで要素数からorder_numをもとめる)
    }));
  };

  //イベントの新規登録時の処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // eventsテーブルへの登録
    const { data: eventData, error: eventError } = await supabase
      .from("events")
      .insert([
        {
          name: event.name,
          date: event.date,
          url: event.url,
          comment: event.comment,
        },
      ])
      .select()
      .single();

    if (eventError || !eventData) {
      console.error("Error inserting event:", eventError);
      setError("イベントの追加に失敗しました。");
      setLoading(false);
      return;
    }

    // awardsテーブルへの登録
    if (event.awards && event.awards.length > 0) {
      const awardsToInsert = event.awards.map((award) => ({
        event_id: eventData.id,
        order_num: award.order_num,
        name: award.name,
      }));

      const { error: awardError } = await supabase
        .from("awards")
        .insert(awardsToInsert);

      if (awardError) {
        console.error("Error inserting awards:", awardError);
        setError("賞の追加に失敗しました。");
        setLoading(false);
        return;
      }
    }

    // 追加成功後にイベント一覧ページに遷移
    router.push("/events");
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>新規イベント作成</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            イベント名
          </label>
          <input
            type="text"
            id="name"
            value={event.name}
            onChange={handleEventChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="date" className={styles.label}>
            開催日
          </label>
          <input
            type="date"
            id="date"
            value={event.date}
            onChange={handleEventChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="url" className={styles.label}>
            関連URL
          </label>
          <input
            type="url"
            id="url"
            value={event.url}
            onChange={handleEventChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="comment" className={styles.label}>
            コメント
          </label>
          <textarea
            id="comment"
            value={event.comment}
            onChange={handleEventChange}
            className={styles.textarea}
          />
        </div>

        {/* 賞の登録フォーム */}
        <div className={styles.awardsSection}>
          <h2>賞の登録</h2>
          {event.awards?.map((award, index) => (
            <div key={index} className={styles.formGroup}>
              <label className={styles.label}>賞の表示順</label>
              <input
                type="number"
                readOnly
                value={award.order_num || ""}
                onChange={(e) =>
                  handleAwardChange(
                    index,
                    "order_num",
                    e.target.value ? e.target.value : null
                  )
                }
                className={styles.input}
                required
              />
              <label className={styles.label}>賞の名前</label>
              <input
                type="text"
                value={award.name}
                onChange={(e) =>
                  handleAwardChange(index, "name", e.target.value)
                }
                className={styles.input}
                required
              />
              <button
                type="button"
                onClick={() => removeAward(index)}
                className={styles.button}
              >
                削除
              </button>
            </div>
          ))}
          <button type="button" onClick={addAward} className={styles.button}>
            賞を追加
          </button>
        </div>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "保存中..." : "完了"}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </main>
  );
};

export default NewEventPage;
