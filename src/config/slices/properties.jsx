import { createSlice } from '@reduxjs/toolkit'
import { fetchAsyncSearch } from '../actions/properties'

const initialState = {
  properties_data: [],
  loading: false,
  error: {
    status: true,
    code: '',
    message: '',
  },
  params: {
    sale_type: '',
    property_type: [],
    filter_search_keyword_label: '',
    filter_search_keyword_type: '',
    waterfront_options: '',
    polygon_search: '',
    rect: '',
    zm: '',
    parking_options: '',
    amenities: '',
    min_sale_price: '',
    max_sale_price: '',
    min_rent_price: '',
    max_rent_price: '',
    min_beds: '',
    max_beds: '',
    min_baths: '',
    max_baths: '',
    min_living_size: '',
    max_living_size: '',
    min_lot_size: '',
    max_lot_size: '',
    min_year: '',
    max_year: '',
    sort_type: '',
    page: '',
  },
}

export const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    updateForm: (state, { payload }) => {
      state.params = { ...state.params, ...payload }
    },
  },
  extraReducers: {
    [fetchAsyncSearch.pending]: (state) => {
      console.log('pending')
      state.loading = true
    },
    [fetchAsyncSearch.fulfilled]: (state, actions) => {
      console.log('Success')
      state.loading = false
      if (actions.payload.status) {
        state.properties_data = actions.payload.data
      } else {
        state.error = actions.payload
      }
    },
    [fetchAsyncSearch.rejected]: (state, actions) => {
      console.log('Error')
      state.loading = false
      state.error = {
        status: false,
        code: '',
        message: actions.error.message,
      }
    },
  },
})

export const getparams = (state) => state.properties.params

export const getproperties = (state) => state.properties.properties_data
export const getloading = (state) => state.properties.loading
export const geterror = (state) => state.properties.error

export const { updateForm } = propertySlice.actions

export default propertySlice.reducer
