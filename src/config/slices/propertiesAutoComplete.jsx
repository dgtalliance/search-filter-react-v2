import { createSlice } from '@reduxjs/toolkit'
import { ib_fetch_default_cities } from '../../utils/utils'
import { fetchAsyncAutoComplete } from '../actions/propertiesAutoComplete'



var temp = [
  {
    name: 'Aventura',
    code: '2',
  },
  {
    name: 'Bal Harbour',
    code: '3',
  },
  {
    name: 'Bay Harbor Islands',
    code: '4',
  },
  {
    name: 'Biscayne Gardens',
    code: '6',
  },
  {
    name: 'Biscayne Park',
    code: '7',
  },
  {
    name: 'Brickell',
    code: '144',
  },
  {
    name: 'Brickell Key',
    code: '145',
  },
  {
    name: 'Coconut Grove',
    code: '12',
  },
  {
    name: 'Coral Gables',
    code: '14',
  },
  {
    name: 'Doral',
    code: '21',
  },
  {
    name: 'El Portal',
    code: '23',
  },
  {
    name: 'Fisher Island',
    code: '25',
  },
  {
    name: 'Golden Beach',
    code: '29',
  },
  {
    name: 'Hallandale',
    code: '32',
  },
  {
    name: 'Hialeah',
    code: '33',
  },
  {
    name: 'Hialeah Gardens',
    code: '34',
  },
  {
    name: 'Hollywood',
    code: '38',
  },
  {
    name: 'Homestead',
    code: '39',
  },
]

export const city =
  window.location.host === 'localhost:3000'
    ? temp
    : window.__flex_g_settings.params.cities


const initialState = {
  city_data: ib_fetch_default_cities(city),
  loading: false,
  error: {
    status: true,
    code: '',
    message: '',
  },
}

export const autoCompleteSlice = createSlice({
  name: 'autocomplete',
  initialState,
  reducers: {
    updateClean: (state, { payload }) => {
     
      state.city_data = payload
    },
  },
  extraReducers: {
    [fetchAsyncAutoComplete.pending]: (state) => {
    
      state.loading = true
    },
    [fetchAsyncAutoComplete.fulfilled]: (state, actions) => {
      
      state.loading = false
      if (actions.payload.status) {
        state.city_data = actions.payload.data
      } else {
        state.city_data = []
        state.error = actions.payload
      }
    },
    [fetchAsyncAutoComplete.rejected]: (state, actions) => {
      
      state.loading = false
      state.city_data = ib_fetch_default_cities(city)
      state.error = {
        status: false,
        code: '',
        message: actions.error.message,
      }
    },
  },
})
export const getautocompleteData = (state) => state.autocomplete.city_data
export const { updateClean } = autoCompleteSlice.actions
export default autoCompleteSlice.reducer
