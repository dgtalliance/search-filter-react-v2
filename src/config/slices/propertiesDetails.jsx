import { createSlice } from '@reduxjs/toolkit'
import { fetchAsyncDetails } from '../actions/propertiesDetails'

const initialState = {
  properties_data: {},
  loading: false,
  error: {
    status: true,
    code: '',
    message: '',
  },
  
}

export const propertyDetailsSlice = createSlice({
  name: 'propertiesDetails',
  initialState,
  reducers: {
    removeDetail: (state, { payload }) => {
      state.properties_data = {}
    },
  },
  extraReducers: {
    [fetchAsyncDetails.pending]: (state) => {
     
      state.loading = true
    },
    [fetchAsyncDetails.fulfilled]: (state, actions) => {
      
      state.loading = false
      if (actions.payload.status) {
        state.properties_data = actions.payload.data
      } else {
        state.error = actions.payload
      }
    },
    [fetchAsyncDetails.rejected]: (state, actions) => {
      
      state.loading = false
      state.error = {
        status: false,
        code: '',
        message: actions.error.message,
      }
    },
  },
})



export const getpropertiesDetails = (state) => state.propertiesDetails.properties_data
export const getloadingDetails = (state) => state.propertiesDetails.loading
export const geterrorDetails = (state) => state.propertiesDetails.error
export const { removeDetail } = propertyDetailsSlice.actions


export default propertyDetailsSlice.reducer
