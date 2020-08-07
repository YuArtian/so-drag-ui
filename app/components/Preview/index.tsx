import React from 'react';
import styles from './index.css';
import { getIP } from '../../service/ipc';

export default function Preview() {
  // 动态IP地址获取
  const currentIP = getIP();
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.title}>So App</div>
        <div className={styles.main}>
          <webview
            src={`http://${currentIP}:3000`}
            style={{ display: 'flex', height: '100%', overflow: 'overlay' }}
          />
        </div>
      </div>
    </div>
  );
}
