import React from 'react';
// import WebView from 'react-electron-web-view';
import styles from './MainPage.css';
import ComponentsPanel from '../components/ComponentsPanel/index';
import SelectedComponentsPanel from '../components/SelectedComponentsPanel/index';

export default function MainPage() {
  return (
    <div className={styles.main}>
      <div className={styles.components}>
        <ComponentsPanel />
      </div>
      <div className={styles.list}>
        <SelectedComponentsPanel />
      </div>
      <div className={styles.middle}>
        <webview
          src="http://172.29.23.141:3000"
          style={{ display: 'flex', height: '100%' }}
        />
      </div>
      <div className={styles.right}>2</div>
    </div>
  );
}
