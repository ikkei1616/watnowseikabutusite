import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const Home: React.FC = () =>{
  const events = [
    {id: "1",name:"event1"},
    {id:"2",name:"event2"},
    {id:"3",name:"event3"},
    {id:"4",name:"event4"},
    {id:"5",name:"event5"},
  ];
  return(
    <div className ={styles.pageHeader}>
      <h1>これはサービスページです。</h1>
    </div>
  );

};

export default Home;
