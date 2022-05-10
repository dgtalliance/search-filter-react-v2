import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { generateSlug } from '../../utils/utils'
import { ACCESS_TOKEN, API_SEARCH_FILTER_URL } from '../config'
import Cookies from 'js-cookie'
import { defaultPropsShortCode } from '../../App'

const filter_id = defaultPropsShortCode.filter
export const fetchAsyncSearch = createAsyncThunk(
  'properties/fetchAsyncSearch',
  async (arg, { getState }) => {
    const { properties } = getState()
    const query_params = '' != location.search ? location.search.substr(1) : location.search
    const post_params = encodeURIComponent(generateSlug(properties.params))
    const event_triggered = properties.event_triggered

    var query_params_val  =  'no' !== event_triggered.toString() ? query_params : ''
  
    const flex_credentials = Cookies.get('ib_lead_token')
    try {
      const body = `access_token=${ACCESS_TOKEN}&search_filter_id=${filter_id}&flex_credentials=${flex_credentials}&event_triggered=${event_triggered}&query_params=${query_params_val}&device_width=${window.innerWidth}&post_params=${post_params}`
    
      const response = await axios.post(API_SEARCH_FILTER_URL, body)

      if (response.data.length != 0) {
        if(response.data?.success !== false){
          return {
            data: response.data,
            status: true,
          }
        }else{
          return {
            data: response.data,
            status: false,
          }
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
