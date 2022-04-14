import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { generateSlug } from '../../utils/utils'
import { ACCESS_TOKEN, API_SEARCH_URL } from '../config'
import Cookies from 'js-cookie'

const filter_id = 'ZTM1Y2RK'
export const fetchAsyncSearch = createAsyncThunk(
  'properties/fetchAsyncSearch',
  async (arg, { getState }) => {
    const { properties } = getState()
  
    const query_params =
      '' != location.search ? location.search.substr(1) : location.search
    const post_params = encodeURIComponent(generateSlug(properties.params))
  
    const flex_credentials = Cookies.get('ib_lead_token')
    try {
      const body = `access_token=${ACCESS_TOKEN}&search_filter_id=${filter_id}&flex_credentials=${flex_credentials}&query_params=${query_params}&device_width=${window.innerWidth}&post_params=${post_params}`
    
      const response = await axios.post(API_SEARCH_URL, body)
      if (response.data.length != 0) {
        return {
          data: response.data,
          status: true,
        }
      } else {
        return {
          message: 'No Data',
          code: 200,
          status: false,
        }
      }
    } catch (error) {
      return {
        message: error.response.data,
        code: error.response.status,
        status: false,
      }
    }
  },
)
