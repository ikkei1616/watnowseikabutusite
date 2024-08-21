"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { supabase } from '@/supabase/supabase';

const NewEventPage: React.FC = () => {
  const router = useRouter();
  // 各イベントの状態管理
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventUrl, setEventUrl] = useState('');
  const [eventComment, setEventComment] = useState('');
  
  // 登録完了状態管理
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from('events')
      .insert([{ name: eventName, date: eventDate, url: eventUrl, comment: eventComment }]);

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
    <div className={styles.container}>
      <h1 className={styles.title}>新規イベント作成</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="eventName" className={styles.label}>イベント名</label>
          <input
            type="text"
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="eventDate" className={styles.label}>開催日</label>
          <input
            type="date"
            id="eventDate"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="eventUrl" className={styles.label}>URL</label>
          <input
            type="text"
            id="eventUrl"
            value={eventUrl}
            onChange={(e) => setEventUrl(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="eventComment" className={styles.label}>コメント</label>
          <textarea
            id="eventComment"
            value={eventComment}
            onChange={(e) => setEventComment(e.target.value)}
            className={styles.textarea}
            required
          />
        </div>
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? '保存中...' : '完了'}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default NewEventPage;
