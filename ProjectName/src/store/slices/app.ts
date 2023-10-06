import {createSlice} from '@reduxjs/toolkit';

import {AppState, GlobalState} from '../../types';

const sliceName = 'app';
const initialState: AppState = {
  toast: null,
  notificationRedirect: null,
  drawerStatus: false,
};

const appSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setToast: (state, actions) => {
      state.toast = actions.payload;
    },
    setNotificationRedirect: (state, {payload}) => {
      state.notificationRedirect = payload;
    },
    setDrawerStatus: (state, {payload}) => {
      state.drawerStatus = payload;
    },
  },
});

const {reducer, actions} = appSlice;
export const {setToast, setNotificationRedirect, setDrawerStatus} = actions;
export default reducer;

export const selectToast = (state: GlobalState) => state.app.toast;
export const selectNotificationRedirect = (state: GlobalState) =>
  state.app.notificationRedirect;
export const selectDrawerStatus = (state: GlobalState) =>
  state.app.drawerStatus;
