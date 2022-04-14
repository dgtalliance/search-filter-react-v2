import { configureStore } from '@reduxjs/toolkit';
//reducers
import properties from '../slices/properties';

export const store = configureStore({
  reducer: {
    properties,
  },
});

