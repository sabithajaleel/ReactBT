import { configureStore } from '@reduxjs/toolkit';
import alarmsSlice from './slice/alarmsSlice';

export const store = configureStore({
  reducer: {
    alarms: alarmsSlice,
  },
});
