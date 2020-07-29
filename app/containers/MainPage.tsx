import React from 'react';
import styles from './MainPage.css';
import ComponentMenu from '../components/ComponentMenu/index';
import Canvas from '../components/Canvas/index';

export default function MainPage() {
  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <ComponentMenu />
      </div>
      <div className={styles.middle}>
        <Canvas />
      </div>
      <div className={styles.right}>2</div>
    </div>
  );
}
