import React, {useEffect} from 'react';
import styles from './MainPage.css';
import ComponentMenu from '../components/ComponentMenu/index';

export default function MainPage() {
  useEffect(() => {

  }, [])

  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <ComponentMenu />
      </div>
      <div className={styles.middle}>
        {/* <webview src="http://localhost:8080/" style={{display: "flex", height: '100%'}}></webview> */}
        <webview id="foo" src="https://www.github.com/" style={{display: "flex", height: '100%'}}></webview>
      </div>
      <div className={styles.right}>2</div>
    </div>
  );
}
