import { configureStore } from '@reduxjs/toolkit';
//reducers
import properties from '../slices/properties';
import propertiesDetails from '../slices/propertiesDetails';
import autocomplete from '../slices/propertiesAutoComplete';

export const store = configureStore({
  reducer: {
    properties,
    propertiesDetails,
    autocomplete
  },
});

