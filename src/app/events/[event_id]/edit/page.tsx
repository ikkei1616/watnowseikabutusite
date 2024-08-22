"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { supabase } from '@/supabase/supabase';
import { EventDetail } from '@/types/Event';

export default function EventEditPage() {
  const params = useParams();
  const event_id: string = params.event_id as string;
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      if (event_id) {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('id', event_id)
          .single();

        if (error) {
          console.error('Error fetching event data:', error);
          setEvent(null);
        } else {
          setEvent(data as EventDetail);
          setName(data.name);
          setComment(data.comment);
          setUrl(data.url);
        }
        setLoading(false);
      }
    };

    fetchEventData();
  }, [event_id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!event) {
    return <p className={styles.notFound}>イベントが見つかりませんでした。</p>;
  }

  const handleSaveClick = async () => {
    const { error } = await supabase
      .from('events')
      .update({ name: name, comment: comment, url: url })
      .eq('id', event_id);

    if (error) {
      console.error('Error updating event:', error);
    } else {
      console.log('Event updated successfully:', { name, comment, url });
      // 編集完了後にリンクにより画面遷移が発生
    }
  };

  return (
    <div className={styles.fullScreen}>
      <div className={styles.container}>
        <h1 className={styles.title}>イベント編集</h1>
        <label className={styles.label}>タイトル</label>
        <input
          className={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className={styles.label}>説明</label>
        <textarea
          className={styles.textarea}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <label className={styles.label}>URL</label>
        <input
          className={styles.input}
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <Link href={`/events/${event_id}`} className={styles.saveButton} onClick={handleSaveClick}>
          編集完了
        </Link>
      </div>
    </div>
  );
}
