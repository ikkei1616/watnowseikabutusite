import React from 'react';
import Link from 'next/link';
import styles from './Page.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.pageHeader}>
      <h1>これはサービス一覧ページです</h1>
    </div>
  );
};


export default Home;
