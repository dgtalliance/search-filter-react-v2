import { createSlice } from '@reduxjs/toolkit'
import { ib_fetch_default_cities } from '../../utils/utils'
import { fetchAsyncAutoComplete } from '../actions/propertiesAutoComplete'

var temp = [
    {
        "name": "Aventura",
        "code": "2"
    },
    {
        "name": "Bal Harbour",
        "code": "3"
    },
    {
        "name": "Bay Harbor Islands",
        "code": "4"
    },
    {
        "name": "Biscayne Gardens",
        "code": "6"
    },
    {
        "name": "Biscayne Park",
        "code": "7"
    },
    {
        "name": "Brickell",
        "code": "144"
    },
    {
        "name": "Brickell Key",
        "code": "145"
    },
    {
        "name": "Coconut Grove",
        "code": "12"
    },
    {
        "name": "Coral Gables",
        "code": "14"
    },
    {
        "name": "Doral",
        "code": "21"
    },
    {
        "name": "El Portal",
        "code": "23"
    },
    {
        "name": "Fisher Island",
        "code": "25"
    },
    {
        "name": "Golden Beach",
        "code": "29"
    },
    {
        "name": "Hallandale",
        "code": "32"
    },
    {
        "name": "Hialeah",
        "code": "33"
    },
    {
        "name": "Hialeah Gardens",
        "code": "34"
    },
    {
        "name": "Hollywood",
        "code": "38"
    },
    {
        "name": "Homestead",
        "code": "39"
    },
    {
        "name": "Indian Creek",
        "code": "42"
    },
    {
        "name": "Kendall",
        "code": "48"
    },
    {
        "name": "Key Biscayne",
        "code": "49"
    },
    {
        "name": "Miami",
        "code": "61"
    },
    {
        "name": "Miami Beach",
        "code": "62"
    },
    {
        "name": "Miami Gardens",
        "code": "63"
    },
    {
        "name": "Miami Lakes",
        "code": "64"
    },
    {
        "name": "Miami Shores",
        "code": "65"
    },
    {
        "name": "Miami Springs",
        "code": "66"
    },
    {
        "name": "Miramar",
        "code": "68"
    },
    {
        "name": "North Bay Village",
        "code": "70"
    },
    {
        "name": "North Miami",
        "code": "72"
    },
    {
        "name": "North Miami Beach",
        "code": "73"
    },
    {
        "name": "Opa-locka",
        "code": "76"
    },
    {
        "name": "Pembroke Pines",
        "code": "89"
    },
    {
        "name": "Pinecrest",
        "code": "91"
    },
    {
        "name": "South Miami",
        "code": "102"
    },
    {
        "name": "Sunny Isles Beach",
        "code": "106"
    },
    {
        "name": "Surfside",
        "code": "108"
    }
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
        console.log(payload);
      state.city_data = payload
    },
    updateAuto: (state, { payload }) => {},
  },
  extraReducers: {
    [fetchAsyncAutoComplete.pending]: (state) => {
      console.log('Auto pending')
      state.loading = true
    },
    [fetchAsyncAutoComplete.fulfilled]: (state, actions) => {
      console.log('Auto Success', actions.payload.data)
      state.loading = false
      if (actions.payload.status) {
        state.city_data = actions.payload.data
      } else {
        state.city_data = []
        state.error = actions.payload
      }
    },
    [fetchAsyncAutoComplete.rejected]: (state, actions) => {
      console.log('Auto Error')
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
