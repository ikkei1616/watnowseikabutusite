"use client";

import { useParams, useRouter } from 'next/navigation';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { supabase } from '@/supabase/supabase';
import { EventDetail } from '@/types/Event';

export default function EventEditPage() {
  const params = useParams();
  const router = useRouter();
  const event_id: string = params.event_id as string;
  const [event, setEvent] = useState<EventDetail>({
    id: null,
    name: '',
    date: '',
    url: '',
    comment: ''
  });
  const [loading, setLoading] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [id]: value
    }));
  };

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
        } else {
          setEvent({
            id: data.id,
            name: data.name,
            date: data.date,
            url: data.url,
            comment: data.comment
          } as EventDetail);
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
      .update({ name: event.name, comment: event.comment, url: event.url })
      .eq('id', event_id);

    if (error) {
      console.error('Error updating event:', error);
    } else {
      console.log('Event updated successfully:', event);
      router.push(`/events/${event_id}`);
    }
  };

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

        <button 
          className={styles.saveButton} 
          onClick={handleSaveClick}
        >
          編集完了
        </button>
      </div>
    </main>
  );
}
