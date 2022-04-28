import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_AUTOCOMPLETE_URL } from '../config'


export const fetchAsyncAutoComplete = createAsyncThunk(
  'properties/fetchAsyncAutoComplete',
  async (arg, { getState }) => {
    
    try {   
      console.log("fetchAsyncAutoComplete")
      const response = await axios.post(API_AUTOCOMPLETE_URL+`&term=${arg}`,'')
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
  }
)
