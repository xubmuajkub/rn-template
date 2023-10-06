import {AnyAction, combineReducers} from '@reduxjs/toolkit';

import {GlobalState} from '@/types';

import appReducer from './slices/app';
import authReducer from './slices/auth';

const rootReducer = combineReducers<GlobalState, AnyAction>({
  app: appReducer,
  auth: authReducer,
});

export default rootReducer;
