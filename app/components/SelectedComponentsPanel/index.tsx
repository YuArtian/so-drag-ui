import React, { useState, useEffect, useRef, useContext } from 'react';
import Sortable from 'sortablejs';
import { ipcRenderer } from 'electron';
import styles from './index.css';
import ComponentsDefaultData from '../../data/components-default-data.json';
import { Context } from '../../containers/MainPage';

export default function SelectedComponentsPanel(): JSX.Element {
  const dropRef = useRef(null);
  const [components, setComponents] = useState([]);
  const defaultData = JSON.parse(JSON.stringify(ComponentsDefaultData));
  const MainContext = useContext(Context);
  /* 初始化拖拽，设置拖拽回调 */
  useEffect(() => {
    Sortable.create(dropRef.current, {
      group: {
        name: 'dragPanel',
      },
      sort: false,
      ghostClass: 'sortable-ghost', // Class name for the drop placeholder
      animation: 150,
      onAdd: (event: any) => {
        const insertComponentName = event.item.getAttribute(
          'data-component-name'
        );
        const insertComponentIndex = event.newIndex;
        const clonedElement = event.from.children[event.oldIndex];
        console.log('insertComponentIndex', insertComponentIndex);
        // event.from.insertBefore(event.item, clonedElement);
        // event.from.removeChild(clonedElement);
        const list = Array.from(components);
        // 当前添加的组件
        const currentComponent = {
          id: new Date().valueOf(),
          name: insertComponentName,
          data: defaultData[insertComponentName],
        };
        // 默认选中当前组件
        MainContext.dispatch({
          type: 'REPLACE',
          payload: currentComponent,
        });
        // 生成当前选中的组件列表
        list.splice(insertComponentIndex, 0, currentComponent);
        // this.currentComponent = this.templateComponents[insertComponentIndex];
        // this.putComponents();
        console.log('list', list);
        setComponents(list);
        // 同步到server端
        ipcRenderer.send('message', list);
        // ipcRenderer.on('reply', (event, arg) => {
        //   console.log(arg); // prints "pong"
        // });
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
