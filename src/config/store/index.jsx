import { configureStore } from '@reduxjs/toolkit';
//reducers
import properties from '../slices/properties';
import propertiesDetails from '../slices/propertiesDetails';
import autocomplete from '../slices/propertiesAutoComplete';
import logger from 'redux-logger'
export const store = configureStore({
  reducer: {
    properties,
    propertiesDetails,
    autocomplete
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(logger),
});

