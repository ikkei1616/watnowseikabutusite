import React from 'react';
import Link from 'next/link';
import styles from './EventCard.module.css'; 
import { Event } from '../types/Event'; // interface Event のimport

// Eventコンポーネントが受け取るpropsについて定義
interface EventCardProp {
    event: Event;
}

const EventCard: React.FC<EventCardProp> = ({ event }) => {
    return (
        <Link href={`/events/${event.id}`} className={styles.cardLink}>
            <h2 className={styles.eventName}>{event.name}</h2>
            <h3 className={styles.eventDate}>{event.date}</h3>
            <p className={styles.eventComment}>{event.comment}</p>
        </Link>
    );
};

export default EventCard;
