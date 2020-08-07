import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

const dataTabSlice = createSlice({
  name: 'dataTab',
  initialState: {
    currentTab: 0,
  },
  reducers: {
    // 切换标签页
    changeTabTo(state, action) {
      state.currentTab = action.payload;
    },
  },
});

export const { changeTabTo } = dataTabSlice.actions;
export default dataTabSlice.reducer;
export const currentTab = (state: RootState) => state.dataTab.currentTab;
