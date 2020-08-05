import React, { useEffect, useState, useRef } from 'react';
import Sortable from 'sortablejs';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Components from '../../data/components.json';
import styles from './index.css';

interface Component {
  name: string;
  title: string;
  type: string;
  only: boolean;
}

export default function ComponentMenu(): JSX.Element {
  const dragRef = useRef(null);
  const [components, setComponents] = useState<{
    [_: string]: Component;
  }>({});
  /* 初始化拖拽 */
  useEffect(() => {
    Sortable.create(dragRef.current, {
      group: {
        name: 'dragPanel',
        pull: 'clone',
        put: false,
      },
      animation: 150,
      sort: false,
    });
  }, []);
  /* 获取组件库 */
  useEffect(() => {
    const list = JSON.parse(JSON.stringify(Components));
    setComponents(list);
  }, []);

  const renderComponentsList = () => {
    return Object.entries(components).map(([key, value]) => {
      return (
        <li
          className={styles.dragable_list}
          key={key}
          data-component-name={key}
        >
          <button className={styles.dragable_button} type="button">
            {value.title}
          </button>
        </li>
      );
    });
  };
  return (
    <>
      <CssBaseline />
      <Container>
        <Typography>组件面板</Typography>
        <ul ref={dragRef}>{renderComponentsList()}</ul>
      </Container>
    </>
  );
}
