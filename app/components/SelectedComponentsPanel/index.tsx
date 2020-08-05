import React, { DragEvent, useState, useEffect, useRef } from 'react';
import Sortable from 'sortablejs';
import { ipcRenderer } from 'electron';
import styles from './index.css';
import ComponentsDefaultData from '../../data/components-default-data.json';

export default function SelectedComponentsPanel(): JSX.Element {
  const dropRef = useRef(null);
  const [components, setComponents] = useState([]);
  // const handleDrop = (event: DragEvent) => {
  //   console.log('handleDrop');
  //   event.preventDefault();
  //   const { title } = JSON.parse(event.dataTransfer?.getData('component'));
  //   setComponents()
  // };
  const defaultData = JSON.parse(JSON.stringify(ComponentsDefaultData));
  useEffect(() => {
    Sortable.create(dropRef.current, {
      group: {
        name: 'dragPanel',
        // put: 'componentsPanel',
        // pull: true,
      },
      sort: false,
      ghostClass: 'sortable-ghost', // Class name for the drop placeholder
      animation: 150,
      onAdd: (event) => {
        console.log('event', event);
        const insertComponentName = event.item.getAttribute(
          'data-component-name'
        );
        const insertComponentIndex = event.newIndex;
        const clonedElement = event.from.children[event.oldIndex];
        console.log('insertComponentIndex', insertComponentIndex);
        // event.from.insertBefore(event.item, clonedElement);
        // event.from.removeChild(clonedElement);
        console.log('components', components);
        const list = Array.from(components);
        list.splice(insertComponentIndex, 0, {
          id: new Date().valueOf(),
          name: insertComponentName,
          data: defaultData[insertComponentName],
        });
        // this.currentComponent = this.templateComponents[insertComponentIndex];
        // this.putComponents();
        console.log('list', list);
        setComponents(list);
        // 同步到server端
        ipcRenderer.send('message', list);
        ipcRenderer.on('reply', (event, arg) => {
          console.log(arg); // prints "pong"
        });
      },
    });
  }, [defaultData, components]);
  return (
    <ul ref={dropRef} className={styles.selected_list}>
      {/* {components.map((component) => {
        return <div key={component.id}>{component.name}</div>;
      })} */}
    </ul>
  );
}
