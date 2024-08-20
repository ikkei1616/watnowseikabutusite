import React from 'react';
import Link from 'next/link';
import styles from './Page.module.css';
import EventCard from '../../components/EventCard'; // Adjust the import path if necessary

const mock_events = [
  { id: '1', name: 'Watnowハッカソン2024', date: '2024-9', comment: 'みんな開発をいっぱい頑張りました！' },
  { id: '2', name: 'Watnowハッカソン2024 春プロ', date: '2024-4', comment: 'みんな開発をいっぱい頑張りました！' },
  { id: '3', name: 'Watnowハッカソン2024 秋プロ', date: '2024-9', comment: 'みんな開発をいっぱい頑張りました！' }
];

const EventPage: React.FC = () => {
  return (
    <div className={styles.pageHeader}>
      <h1>これはイベント一覧ページです</h1>
      {mock_events.map((event) => (
        <EventCard key={event.id} event={event} />
       ))}
      <Link href="/events/new" className={styles.newEventButton}>
        新規作成
      </Link>
    </div>
  );
};

export default EventPage;

