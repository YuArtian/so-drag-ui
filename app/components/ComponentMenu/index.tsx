import React, {useEffect, useState} from 'react';
import Base from './Base';
import Components from '../../data/components.json'


export default function ComponentMenu(): JSX.Element {
  const [components, setComponents] = useState({})
  /* 获取组件库 */
  useEffect(() => {
    console.log('Components',typeof Components)
    const list = JSON.parse(JSON.stringify(Components))
    setComponents(list)
  }, []);

  return (
    <div>
      <h1>主菜单</h1>
      <h2>组件面板</h2>
      <Base />
    </div>
  );
}
