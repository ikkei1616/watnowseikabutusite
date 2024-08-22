"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { supabase } from '@/supabase/supabase';
import { EventDetail } from '@/types/Event';

const NewEventPage: React.FC = () => {
  const router = useRouter();
  
  // EventDetail型に基づく初期状態を設定
  const [event, setEvent] = useState<EventDetail>({
    id: null, 
    name: '',
    date: '',
    url: '',
    comment: ''
  });
  
  // 登録完了状態管理
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from('events')
      .insert([{ 
        name: event.name, 
        date: event.date, 
        url: event.url, 
        comment: event.comment 
      }]);

    if (error) {
      console.error('Error inserting event:', error);
      setError('イベントの追加に失敗しました。');
      setLoading(false);
    } else {
      console.log('Event added successfully:', data);
      // 追加成功後にイベント一覧ページに遷移
      router.push('/events');
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>新規イベント作成</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>イベント名</label>
          <input
            type="text"
            id="name"
            value={event.name}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="date" className={styles.label}>開催日</label>
          <input
            type="date"
            id="date"
            value={event.date}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="関連url" className={styles.label}>URL</label>
          <input
            type="url"
            id="url"
            value={event.url}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="comment" className={styles.label}>コメント</label>
          <textarea
            id="comment"
            value={event.comment}
            onChange={handleChange}
            className={styles.textarea}
          />
        </div>
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? '保存中...' : '完了'}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </main>
  );
};

export default NewEventPage;
