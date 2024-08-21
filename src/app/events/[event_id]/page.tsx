"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { supabase } from '@/supabase/supabase';
import { EventDetail } from '@/types/Event';


export default function EventDetailPage() {
  const params = useParams();
  const event_id: string = params.event_id as string;
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // event_idの変更をトリガーにしてsetEventを実行
  useEffect(() => {
    const fetchEventData = async () => {
      if (event_id) {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('id', event_id)
          .single();
        
        //データ取得時のエラーハンドリング
        if (error) {
          console.error('Error fetching event data:', error);
          setEvent(null);
        } else {
          setEvent(data as EventDetail);
        }
        setLoading(false);
      }
    };

    fetchEventData();
  }, [event_id]);

  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  //(DBに登録されていないeventの詳細を見ようとした場合(event_id = 5を取得しようとした場合))
  if (!event) {
    return <p className={styles.notFound}>イベントが見つかりませんでした。</p>;
  }

  // イベントが正常に処理された場合の処理（イベント詳細を記述）
  return (
    <div className={styles.fullScreen}>
      <div className={styles.container}>
        <h1 className={styles.title}>{event.name}</h1>
        <p className={styles.description}>{event.comment}</p>
        <p className={styles.details}>開催日: {event.date}</p>
        <p className={styles.details}>URL: {event.url}</p>
        <Link href={`/events/${event_id}/edit`} className={styles.editButton}>
          編集
        </Link>
      </div>
    </div>
  );
}
