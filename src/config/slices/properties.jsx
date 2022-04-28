import { createSlice } from '@reduxjs/toolkit'
import { fetchAsyncSearch } from '../actions/properties'

const initialState = {
  properties: {
    hackbox: null,
    currentpage: 1,
    pagination: {},
    items: [],
  },
  properties_maps: [],
  properties_data: [],
  loading: false,
  error: {
    status: true,
    code: '',
    message: '',
  },
  event_triggered: 'no',
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
    updateTriggered: (state, { payload }) => {
      state.event_triggered = payload
    },
  },
  extraReducers: {
    [fetchAsyncSearch.pending]: (state) => {
      console.log('pending')
      state.loading = true
    },
    [fetchAsyncSearch.fulfilled]: (state, actions) => {
      console.log('Success', actions.payload.data)
      state.loading = false
      if (actions.payload.status) {
        state.properties_data = actions.payload.data

        var temp_properties = {
          hackbox: actions.payload.data?.hackbox,
          currentpage: actions.payload.data.params?.currentpage,
          pagination: actions.payload.data?.pagination,
          items: actions.payload.data?.items,
        }

        state.properties = { ...state.properties, ...temp_properties }
        state.event_triggered = 'yes'

        if(actions.payload.data.params?.currentpage === 1){
          
        }

        //Update Url
        history.replaceState(null, null, "?" + actions.payload.data.slug);

        //Load Data for map
        //state.params.rect= actions.payload.data.params.rect
        //state.params.zm= actions.payload.data.params.zm

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

export const getpropertiesData = (state) => state.properties.properties_data
export const getpropertiesItems = (state) => state.properties.properties
export const getloading = (state) => state.properties.loading
export const geterror = (state) => state.properties.error

export const { updateForm, updateTriggered } = propertySlice.actions

export default propertySlice.reducer
