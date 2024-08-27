"use client";

import { useParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { supabase } from "@/supabase/supabase";
import type { EventDetail } from "@/types/Event";
import type { Award } from "@/types/Award";

export default function EventEditPage() {
  const params = useParams();
  const router = useRouter();
  const event_id: string = params.event_id as string;

  // EventDetail型に基づく初期状態を設定
  const [event, setEvent] = useState<EventDetail>({
    id: null,
    name: "",
    date: "",
    url: "",
    comment: "",
    awards: [],
  });
  const [loading, setLoading] = useState(true);

  // イベント情報のハンドラ
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [id]: value,
    }));
  };

  // 賞の変更ハンドラ
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
        { order_num: (prevEvent.awards?.length + 1).toString(), name: "" },
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
      })),
    }));
  };

  useEffect(() => {
    const fetchEventData = async () => {
      if (event_id) {
        const { data: eventData, error: eventError } = await supabase
          .from("events")
          .select("*")
          .eq("id", event_id)
          .single();
        if (eventError) {
          console.error("Error fetching event data:", eventError);
        } else {
          setEvent((prevEvent) => ({
            ...prevEvent,
            id: eventData.id,
            name: eventData.name,
            date: eventData.date,
            url: eventData.url,
            comment: eventData.comment,
          }));
        }
        //賞のリストを取得
        const { data: awardsData, error: awardsError } = await supabase
          .from("awards")
          .select("*")
          .eq("event_id", event_id)
          .order("order_num", { ascending: true }); //order_numを昇順にソート
        if (awardsError) {
          console.error("Error fetching awards data:", awardsError);
        } else {
          setEvent((prevEvent) => ({
            ...prevEvent,
            awards: awardsData.map((award: Award) => ({
              order_num: award.order_num,
              name: award.name,
            })),
          }));
        }
        setLoading(false);
      }
    };

    fetchEventData();
  }, [event_id]);

  //編集完了ボタンを押したときの処理
  const handleSaveClick = async () => {
    const { error: eventError } = await supabase
      .from("events")
      .update({ name: event.name, comment: event.comment, url: event.url })
      .eq("id", event_id);

    if (eventError) {
      console.error("イベントの更新中にエラーが発生しました:", eventError);
      return;
    }

    if (event.awards) {
      const { error: deleteError } = await supabase
        .from("awards")
        .delete()
        .eq("event_id", event_id);

      if (deleteError) {
        console.error("賞の削除中にエラーが発生しました:", deleteError);
        return;
      }

      const awardsToInsert = event.awards.map((award) => ({
        event_id: event_id,
        order_num: award.order_num,
        name: award.name,
      }));

      const { error: awardError } = await supabase
        .from("awards")
        .insert(awardsToInsert);

      if (awardError) {
        console.error("賞の追加中にエラーが発生しました:", awardError);
        return;
      }
    }

    router.push(`/events/${event_id}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!event) {
    return <p className={styles.notFound}>イベントが見つかりませんでした。</p>;
  }

  return (
    <main className={styles.fullScreen}>
      <div className={styles.container}>
        <h1 className={styles.title}>イベント編集</h1>
        <label className={styles.label}>タイトル</label>
        <input
          className={styles.input}
          type="text"
          id="name"
          value={event.name}
          onChange={handleChange}
          required
        />

        <label className={styles.label}>説明</label>
        <textarea
          className={styles.textarea}
          id="comment"
          value={event.comment}
          onChange={handleChange}
        />

        <label className={styles.label}>URL</label>
        <input
          className={styles.input}
          type="text"
          id="url"
          value={event.url}
          onChange={handleChange}
        />

        <div className={styles.awardsSection}>
          <h2>賞の編集</h2>
          {event.awards?.map((award, index) => (
            <div key={index} className={styles.formGroup}>
              <label className={styles.label}>賞の表示順</label>
              <input
                type="number"
                readOnly //編集不可に設定
                value={award.order_num || ""}
                className={styles.input}
              />

              {/*TODO: 賞の名前が登録されてない場合でも登録できてしまうエラーを修正*/}

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

        <button
          type="button"
          className={styles.saveButton}
          onClick={handleSaveClick}
        >
          編集完了
        </button>
      </div>
    </main>
  );
}
