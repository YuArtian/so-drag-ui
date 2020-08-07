import React from 'react';
// import WebView from 'react-electron-web-view';
import styles from './MainPage.css';
import ComponentsPanel from '../components/ComponentsPanel/index';
import SelectedComponentsPanel from '../components/SelectedComponentsPanel/index';
import DataPanel from '../components/DataPanel/index';
import Preview from '../components/Preview/index';

export default function MainPage() {
  return (
    <div className={styles.main}>
      <div className={styles.components}>
        <ComponentsPanel />
      </div>
      <div className={styles.selected}>
        <SelectedComponentsPanel />
      </div>
      <div className={styles.preview}>
        <Preview />
      </div>
      <div className={styles.data}>
        <DataPanel />
      </div>
    </div>
  );
}
