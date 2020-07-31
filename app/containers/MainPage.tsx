import React from 'react';
import styles from './MainPage.css';
import ComponentMenu from '../components/ComponentMenu/index';

export default function MainPage() {
  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <ComponentMenu />
      </div>
      <div className={styles.middle}>1</div>
      <div className={styles.right}>2</div>
    </div>
  );
}
