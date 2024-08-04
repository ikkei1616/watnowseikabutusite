"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import { useEffect, useState } from 'react';

// mockイベントデータの型を定義
type EventData = {
  title: string;
  description: string;
};

// mockEventsを定義
// supabaseでデータ構造が決まり次第変更、APIでデータ取得
const mockEvents: Record<string, EventData> = {
  '1': { title: 'イベント 1', description: 'これはイベント 1 の説明です。' },
  '2': { title: 'イベント 2', description: 'これはイベント 2 の説明です。' },
  '3': { title: 'イベント 3', description: 'これはイベント 3 の説明です。' },
  '4': { title: 'イベント 4', description: 'これはイベント 4 の説明です。' },
};

export default function EventDetailPage() {
  const params = useParams();
  const event_id: string = params.event_id as string;
  const [event, setEvent] = useState<EventData | null>(null);

  // event_idの変更をトリガーにしてsetEventを実行
  useEffect(() => {
    if (event_id) {
      console.log('event_idを表示します:',event_id);//debug
      const eventData = mockEvents[event_id];
      setEvent(eventData);
      console.log('対応するイベントデータを表示します:',eventData);
      
    }
  }, [event_id]);

  // イベントが正常に取得されなかった場合の処理
  if (!event) {
    return <p className={styles.notFound}>イベントが見つかりませんでした。</p>;
  }

  // イベントが正常に処理された場合の処理（イベント詳細を記述）
  return (
    <div className={styles.fullScreen}>
      <div className={styles.container}>
        <h1 className={styles.title}>{event.title}</h1>
        <p className={styles.description}>{event.description}</p>
        <Link href={`/events/${event_id}/edit`} className={styles.editButton}>
          編集
        </Link>
      </div>
    </div>
  );
}
