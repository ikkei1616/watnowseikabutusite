"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../../../components/LoadingSpinner';

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

export default function EventEditPage() {
  const params = useParams();
  const event_id: string = params.event_id as string;
  const [event, setEvent] = useState<EventData | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  // event_idの変更をトリガーにしてsetEventを実行
  useEffect(() => {
    if (event_id) {
      const eventData = mockEvents[event_id];
      setEvent(eventData);
      console.log(eventData); // debug
      setTitle(eventData.title);
      setDescription(eventData.description);
      setLoading(false);
    }
  }, [event_id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  // イベントが正常に取得されなかった場合の処理
  if (!event) {
    return <p className={styles.notFound}>イベントが見つかりませんでした。</p>;
  }

  // 編集完了リンククリック時の動作を記述
  // API未実装なので変更データをコンソールに表示するだけ
  const handleSaveClick = () => {
    console.log('保存されたイベント:', { title, description });
  };

  return (
    <div className={styles.fullScreen}>
      <div className={styles.container}>
        <h1 className={styles.title}>イベント編集</h1>
        <label className={styles.label}>タイトル</label>
        <input
          className={styles.input}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className={styles.label}>説明</label>
        <textarea
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Link href={`/events/${event_id}`} className={styles.saveButton} onClick={handleSaveClick}>
          編集完了
        </Link>
      </div>
    </div>
  );
}
