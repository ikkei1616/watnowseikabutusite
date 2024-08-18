import React from 'react';
import Link from 'next/link';
import styles from './EventCard.module.css'; // Corrected the path

// Eventオブジェクトの型を定義
interface Event {
    id: string; 
    name: string;
    date: string;
    comment: string;
}

// Eventコンポーネントが受け取るpropsについて定義
interface EventCardProps {
    events: Event[];
}

const EventCard: React.FC<EventCardProps> = ({ events }) => {
    return (
        <ul className={styles.event}>
            {events.map(event => (
                <li key={event.id} className={styles.card}>
                    <Link href={`/events/${event.id}`} className={styles.cardLink}>
                        <h2 className={styles.name}>{event.name}</h2>
                        <h2 className={styles.date}>{event.date}</h2>
                        <p className={styles.comment}>{event.comment}</p>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default EventCard;
