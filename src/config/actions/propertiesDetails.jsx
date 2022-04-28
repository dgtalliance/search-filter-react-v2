import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ACCESS_TOKEN, API_PROPERTIES_DETAIL } from '../config'
import Cookies from 'js-cookie'

export const fetchAsyncDetails = createAsyncThunk(
  'properties/fetchAsyncDetails',
  async (arg, { getState }) => {
 
    try {
      const body = `access_token=${ACCESS_TOKEN}`
    
      const response = await axios.post(API_PROPERTIES_DETAIL + arg, body)

      console.log(response.status)
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
