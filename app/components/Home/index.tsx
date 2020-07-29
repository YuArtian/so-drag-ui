import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import styles from './index.css';

export default function Home(): JSX.Element {
  return (
    <div className={styles.container} data-tid="container">
      <h2>Welcome</h2>
      <Link to={routes.MAIN}>Get Start</Link>
    </div>
  );
}
