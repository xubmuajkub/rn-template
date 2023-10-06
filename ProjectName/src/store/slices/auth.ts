import {createSlice} from '@reduxjs/toolkit';
import {HttpStatusCode} from 'axios';

import {StorageKeys} from '@/constants';
import {AuthState, GlobalState} from '@/types';
import {AsyncStorageUtils} from '@/utils';

import {reduceFetchAuthInfo} from '../thunks/authThunk';

const sliceName = 'auth';
const initialState: AuthState = {
  authInfo: null,
};

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setAuthInfo: (state, actions) => {
      state.authInfo = actions.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(reduceFetchAuthInfo.fulfilled, (state, {payload}) => {
      if (payload && payload.status === HttpStatusCode.Ok) {
        state.authInfo = payload.data;
        AsyncStorageUtils.storeData(
          StorageKeys.PHONE_NUMBER,
          payload?.data?.phoneNumber,
        );
      }
    });
  },
});

const {reducer, actions} = slice;
export const {setAuthInfo} = actions;
export default reducer;

export const selectAuthInfo = (state: GlobalState) => state.auth.authInfo;
