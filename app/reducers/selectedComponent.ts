import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState, AppThunk } from '../store';
import { emitReplaceSelectedList } from '../service/ipc';

const selectedComponentSlice = createSlice({
  name: 'selectedComponent',
  initialState: {
    current: {},
    list: [],
  },
  reducers: {
    // 替换当前选中组件
    replaceCurrent: (state, action) => {
      state.current = { ...action.payload };
    },
    // 替换列表
    replaceList: (state, action) => {
      state.list = Array.from(action.payload);
    },
    // 按索引切换选中组件
    replaceCurrentByIndex: (state, action) => {
      console.log('replaceCurrentByIndex', state.list[action.payload]);
      state.current = { ...state.list[action.payload] };
    },
    // 改变当前选中组件的数据
    changeCurrentData: (state, action) => {
      const { index, data } = action.payload;
      const newComponent = {
        ...state.current,
        data: { ...state.current.data, ...data },
      };
      const newList = Array.from(state.list);
      newList[index] = newComponent;
      state.current = newComponent;
      state.list = newList;
    },
  },
});

export const {
  replaceCurrent,
  replaceList,
  replaceCurrentByIndex,
  changeCurrentData,
} = selectedComponentSlice.actions;

/* 异步 - 组件配置到 server */
export const changeCurrentDataAsync = (index, data): AppThunk => async (
  dispatch,
  getState
) => {
  await dispatch(changeCurrentData({ index, data }));
  const {
    selectedComponent: { list },
  } = getState();
  emitReplaceSelectedList(list);
};

export default selectedComponentSlice.reducer;
export const selectedCurrent = (state: RootState) =>
  state.selectedComponent.current;
export const selectedList = (state: RootState) => state.selectedComponent.list;
