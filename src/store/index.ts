import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';

export type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
  reducer: rootReducer,
  devTools: true
});
