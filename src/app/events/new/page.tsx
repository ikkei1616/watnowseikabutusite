"use client";

import React, { useState } from 'react';
import styles from './page.module.css';


const NewEventPage: React.FC = () => {
  //入力されたイベント名、イベント情報の状態管理
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  //完了ボタンを押したかの状態管理
  const [submitted, setSubmitted] = useState(false);//初期値false(完了してない)

  const handleSubmit = (e: React.FormEvent) => { //eはReact.FormEvent(フォーム送信イベント)
    e.preventDefault(); 
    setSubmitted(true);
  };

  //API未実装なのでコンソールログのみ
  const handleSaveClick = () => {
    console.log('保存されたイベント:', { eventName, eventDescription });
  }


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
          <label htmlFor="eventDescription" className={styles.label}>イベント情報</label>
          <textarea
            id="eventDescription"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className={styles.textarea}
            required
          />
        </div>
        <button type="submit" className={styles.button} onClick = {handleSaveClick}>完了</button>
      </form>
    </div>
  );
};

export default NewEventPage;