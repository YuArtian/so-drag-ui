import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sortable from 'sortablejs';
import { emitReplaceSelectedList } from '../../service/ipc';
import styles from './index.css';
import ComponentsDefaultData from '../../data/components-default-data.json';
import {
  replaceCurrent,
  replaceList,
  selectedList,
  selectedCurrent,
  replaceCurrentByIndex,
} from '../../reducers/selectedComponent';
import { changeTabTo } from '../../reducers/dataTab';

export default function SelectedComponentsPanel(): JSX.Element {
  const dropRef = useRef(null);
  const defaultData = JSON.parse(JSON.stringify(ComponentsDefaultData));
  const dispatch = useDispatch();
  const currentList = useSelector(selectedList);
  const currentSelected = useSelector(selectedCurrent);
  /* 初始化拖拽，设置拖拽事件 */
  useEffect(() => {
    Sortable.create(dropRef.current, {
      group: {
        name: 'dragPanel',
      },
      sort: false,
      ghostClass: 'sortable-ghost', // Class name for the drop placeholder
      animation: 150,
      // 新增 -默认选中新增组件-整体更新选中组件列表-同步到 server
      onAdd: async (event: any) => {
        try {
          const insertComponentName = event.item.getAttribute(
            'data-component-name'
          );
          const insertComponentIndex = event.newIndex;
          // const clonedElement = event.from.children[event.oldIndex];
          // event.from.insertBefore(event.item, clonedElement);
          // event.from.removeChild(clonedElement);
          const list = Array.from(currentList);
          // 构建当前添加的组件
          const currentComponent = {
            id: new Date().valueOf(),
            name: insertComponentName,
            data: defaultData[insertComponentName],
            index: insertComponentIndex,
          };
          // 生成当前选中的组件列表
          list.splice(insertComponentIndex, 0, currentComponent);
          await dispatch(replaceList(list));
          // 同步到server端
          emitReplaceSelectedList(list);
          // 默认选中当前组件
          await dispatch(replaceCurrent(currentComponent));
          // 切换至组件数据配置Tab
          await dispatch(changeTabTo(1));
        } catch (error) {
          console.log('ERROR::onAdd 添加组件失败', error);
        }
      },
      // 选中 -切换选中组件
      onChoose: async (event: any) => {
        const { oldIndex } = event;
        console.log('onChoose oldIndex', oldIndex);
        // 切换当前选中组件
        await dispatch(replaceCurrentByIndex(oldIndex));
        // 切换至组件数据配置Tab
        await dispatch(changeTabTo(1));
      },
    });
  }, [defaultData, dispatch, currentList, currentSelected]);
  return (
    <>
      <div>
        当前组件个数
        {currentList.length}
      </div>
      <ul ref={dropRef} className={styles.selected_list}>
        {}
      </ul>
    </>
  );
}
