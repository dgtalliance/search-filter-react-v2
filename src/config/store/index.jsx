import { configureStore } from '@reduxjs/toolkit';
//reducers
import properties from '../slices/properties';
import propertiesDetails from '../slices/propertiesDetails';

export const store = configureStore({
  reducer: {
    properties,
    propertiesDetails
  },
});

