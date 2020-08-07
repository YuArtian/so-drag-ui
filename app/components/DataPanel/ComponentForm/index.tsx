import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ipcRenderer } from 'electron';
import {
  selectedCurrent,
  changeCurrentData,
  selectedList,
  changeCurrentDataAsync,
} from '../../../reducers/selectedComponent';
import SoHeaderForm from './SoHeaderForm';
import SoGapForm from './SoGapForm';

export default function ComponentForm() {
  const current = useSelector(selectedCurrent);
  const list = useSelector(selectedList);
  const dispatch = useDispatch();
  const handleDataChange = (newDatas) => {
    // const res = await dispatch(
    //   changeCurrentData({
    //     index: current.index,
    //     data: newDatas,
    //   })
    // );
    dispatch(changeCurrentDataAsync(current.index, newDatas));
    // 同步到 server
    // console.log('selectedList', list);
    // ipcRenderer.send('message', selectedList);
  };
  if (current && current.name) {
    console.log('ComponentForm render!');
    return (
      <div>
        {current.name === 'SoHeader' && (
          <SoHeaderForm
            defaultData={current.data}
            handleDataChange={handleDataChange}
          />
        )}
        {current.name === 'SoGap' && (
          <SoGapForm
            defaultData={current.data}
            handleDataChange={handleDataChange}
          />
        )}
      </div>
    );
  }
  return null;
}
