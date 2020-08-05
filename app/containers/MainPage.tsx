import React, { createContext, useReducer, useContext } from 'react';
// import WebView from 'react-electron-web-view';
import styles from './MainPage.css';
import ComponentsPanel from '../components/ComponentsPanel/index';
import SelectedComponentsPanel from '../components/SelectedComponentsPanel/index';
import DataPanel from '../components/DataPanel/index';
import { defaultState, reducer } from '../reducers/selectedComponent';

export const Context = createContext(null);

export default function MainPage() {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <div className={styles.main}>
        <div className={styles.components}>
          <ComponentsPanel />
        </div>
        <div className={styles.selected}>
          <SelectedComponentsPanel />
        </div>
        <div className={styles.webview}>
          <webview
            src="http://172.29.23.141:3000"
            style={{ display: 'flex', height: '100%' }}
          />
        </div>
        <div className={styles.data}>
          <DataPanel />
        </div>
      </div>
    </Context.Provider>
  );
}
