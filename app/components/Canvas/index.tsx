import React, { useRef, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { drop } from '../../utils/drag';
import WebGL2DCanvas from '../../webgl/components/WebGL2DCanvas';
import { getComponentClassByType } from '../../webgl/api';
import { HTMLCompoiler } from '../../compile/index';

export default function Canvas(): JSX.Element {
  // 画布 ref
  const ref = useRef(null);
  // stageRef
  const stageRef = useRef({});
  /* 初始化画布 */
  useEffect(() => {
    const container = (ref.current as unknown) as HTMLElement;
    const stage = new WebGL2DCanvas(container);
    stageRef.current = stage;
    ipcRenderer.on('build', (event, message) => {
      if (message === 'react') {
        // webgl 转换为 json 对象
        const currentTree = stage.getComponentsTree();
        const json = currentTree.toJSON();
        console.log('json tree', json);
        const htmlCompoiler = new HTMLCompoiler();
        htmlCompoiler.compoile();
      }
    });
  }, []);
  /*  */
  /* 拖拽回调 */
  const handleDropCallback = (
    type: string,
    name: string,
    clientX: number,
    clientY: number
  ) => {
    const view = (ref.current as unknown) as HTMLElement;
    const stage = stageRef.current as WebGL2DCanvas;
    const x = clientX - view.offsetLeft;
    const y = clientY - view.offsetTop;
    // dropComponentToCanvas(type, name, x, y, stage);
    // 判断新增组件类型
    const ComponentClass = getComponentClassByType(type);
    if (!ComponentClass) {
      console.error('没有对应的组件类型');
      return;
    }
    const component = new ComponentClass(x, y);
    // 添加组件到画布
    stage.addComponent(component);
  };

  return (
    <div
      id="container"
      ref={ref}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => drop(e, handleDropCallback)}
    />
  );
}
