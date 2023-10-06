import {createAsyncThunk} from '@reduxjs/toolkit';

import {httpRequest} from '@/http';

const _prefix = '/auth';
export const reduceFetchAuthInfo = createAsyncThunk(
  `${_prefix}/reduceFetchAuthInfo`,
  async (__, thunkApi) => {
    const result = await httpRequest({
      url: `${_prefix}/detail`,
      method: 'GET',
      // @ts-ignore
      thunkApi,
    });
    if (!result) {
      return;
    }
    return result;
  },
);
