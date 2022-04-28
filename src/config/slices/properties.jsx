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

        var params = {
          sale_type:
            actions.payload.data.params.sale_type !== null
              ? actions.payload.data.params.sale_type
              : '',
          property_type:
            Object.keys(actions.payload.data.params.property_type).length > 0
              ? actions.payload.data.params.property_type
              : [],
          filter_search_keyword_label:
            actions.payload.data.params.filter_search_keyword_label !== null
              ? actions.payload.data.params.filter_search_keyword_label
              : '',
          filter_search_keyword_type:
            actions.payload.data.params.filter_search_keyword_type !== null
              ? actions.payload.data.params.filter_search_keyword_type
              : '',
          waterfront_options:
            actions.payload.data.params.waterfront_options !== null
              ? actions.payload.data.params.waterfront_options
              : '',
          polygon_search:
            actions.payload.data.params.polygon_search !== null
              ? actions.payload.data.params.polygon_search
              : '',
          rect:
            actions.payload.data.params.rect !== null
              ? actions.payload.data.params.rect
              : '',
          zm:
            actions.payload.data.params.zm !== null
              ? actions.payload.data.params.zm
              : '',
          parking_options:
            actions.payload.data.params.parking_options !== null
              ? actions.payload.data.params.parking_options
              : '',
          amenities:
            actions.payload.data.params.amenities !== null
              ? actions.payload.data.params.amenities
              : '',
          min_sale_price:
            actions.payload.data.params.min_sale_price !== null
              ? actions.payload.data.params.min_sale_price
              : '',
          max_sale_price:
            actions.payload.data.params.max_sale_price !== null
              ? actions.payload.data.params.max_sale_price
              : '',
          min_rent_price:
            actions.payload.data.params.min_rent_price !== null
              ? actions.payload.data.params.min_rent_price
              : '',
          max_rent_price:
            actions.payload.data.params.max_rent_price !== null
              ? actions.payload.data.params.max_rent_price
              : '',
          min_beds:
            actions.payload.data.params.min_beds !== null
              ? actions.payload.data.params.min_beds
              : '',
          max_beds:
            actions.payload.data.params.max_beds !== null
              ? actions.payload.data.params.max_beds
              : '',
          min_baths:
            actions.payload.data.params.min_baths !== null
              ? actions.payload.data.params.min_baths
              : '',
          max_baths:
            actions.payload.data.params.max_baths !== null
              ? actions.payload.data.params.max_baths
              : '',
          min_living_size:
            actions.payload.data.params.min_living_size !== null
              ? actions.payload.data.params.min_living_size
              : '',
          max_living_size:
            actions.payload.data.params.max_living_size !== null
              ? actions.payload.data.params.max_living_size
              : '',
          min_lot_size:
            actions.payload.data.params.min_lot_size !== null
              ? actions.payload.data.params.min_lot_size
              : '',
          max_lot_size:
            actions.payload.data.params.max_lot_size !== null
              ? actions.payload.data.params.max_lot_size
              : '',
          min_year:
            actions.payload.data.params.min_year !== null
              ? actions.payload.data.params.min_year
              : '',
          max_year:
            actions.payload.data.params.max_year !== null
              ? actions.payload.data.params.max_year
              : '',
          sort_type:
            actions.payload.data.params.sort_type !== null
              ? actions.payload.data.params.sort_type
              : '',
          page:
            actions.payload.data.params.currentpage !== null
              ? actions.payload.data.params.currentpage
              : '',
        }

        var temp_properties = {
          hackbox: actions.payload.data?.hackbox,
          currentpage: actions.payload.data.params?.currentpage,
          pagination: actions.payload.data?.pagination,
          items: actions.payload.data?.items,
        }

        state.properties = { ...state.properties, ...temp_properties }
        state.event_triggered = 'yes'

        if (parseInt(actions.payload.data.params?.currentpage) === 1) {
        }

        //Update Url
        history.replaceState(null, null, '?' + actions.payload.data.slug)

        state.params = {...state.params,...params}

        //Load Data for map
        /* state.params.rect = actions.payload.data.params.rect
        state.params.zm = actions.payload.data.params.zm
        state.params.polygon_search = actions.payload.data.params.polygon_search
        state.params.page = actions.payload.data.params.currentpage
        state.params.property_type = actions.payload.data.params.property_type
        state.params.sale_type = actions.payload.data.params.sale_type
        state.params.sort_type = actions.payload.data.params.sort_type */
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
