import React from 'react';
import Link from 'next/link';
import styles from './Page.module.css';

const events = [
  { id: '1', name: 'event1' },
  { id: '2', name: 'event2' },
  { id: '3', name: 'event3' },
  { id: '4', name: 'event4' },
  { id: '5', name: 'event5' }
];

const Home: React.FC = () => {
  return (
    <div className={styles.pageHeader}>
      <h1>これはイベント一覧ページです</h1>
      <ul className={styles.eventList}>
        {events.map((event) => (
          <li key={event.id} className={styles.eventItem}>
            <Link href={`/events/${event.id}`} className={styles.eventLink}>
              {event.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
