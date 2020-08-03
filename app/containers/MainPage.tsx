import React from 'react';
// import WebView from 'react-electron-web-view';
import styles from './MainPage.css';
import ComponentMenu from '../components/ComponentMenu/index';

export default function MainPage() {

  return (
    <div className={styles.main}>
      <div className={styles.components}>
        <ComponentMenu />
      </div>
      <div className={styles.list}>list</div>
      <div className={styles.middle}>
        <webview
          src="http://172.29.23.141:8080"
          style={{ display: 'flex', height: '100%' }}
        />
      </div>
      <div className={styles.right}>2</div>
    </div>
  );
}
