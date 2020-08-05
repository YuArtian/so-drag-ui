import React, { useEffect, useState, DragEvent, useRef } from 'react';
import Sortable from 'sortablejs';
import styles from './index.css';
import Components from '../../data/components.json';

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
  // draggable
  // onDragStart={(event) => handleDragStart(event, value)}
  // const handleDragStart = (event: DragEvent, componentData: Component) => {
  //   console.log('event', event);
  //   event.dataTransfer?.setData('component', JSON.stringify(componentData));
  // };

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
    <div>
      <h2>组件面板</h2>
      <ul ref={dragRef}>{renderComponentsList()}</ul>
    </div>
  );
}
