import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { flex_g_settings, generateSlug } from '../../utils/utils'
import {
  ACCESS_TOKEN,
  API_SEARCH_URL,
  LEAD_FAVORITES,
  SAVE_FAVORITE,
} from '../config'
import Cookies from 'js-cookie'
import { defaultPropsShortCode } from '../../App'

const filter_id = defaultPropsShortCode.filter
export const fetchAsyncSearch = createAsyncThunk(
  'properties/fetchAsyncSearch',
  async (arg, thunkAPI) => {
    const { properties } = thunkAPI.getState()

    var mls_num = null
    var urlParams = ''
    var url = null

    if (window.location.search !== '') {
      url = window.location.search

      urlParams = new URLSearchParams(url)
      mls_num = urlParams.get('show')

      if (mls_num !== null) {
        if (url.includes('&')) {
          var pos = slurlug.lastIndexOf('&')
          url = url.slice(0, pos)
          urlParams = new URLSearchParams(url)
        }

      }
    }

    const post_params = encodeURIComponent(generateSlug(properties.params))

    const event_triggered = properties.event_triggered

    var query_params_val = encodeURIComponent(urlParams.toString())

    const flex_credentials = Cookies.get('ib_lead_token')
    try {
      const body = `access_token=${ACCESS_TOKEN}&search_filter_id=${filter_id}&flex_credentials=${flex_credentials}&event_triggered=${event_triggered}&query_params=${query_params_val}&device_width=${window.innerWidth}&post_params=${post_params}`

      const response = await axios.post(API_SEARCH_URL, body)

      if (response.data.length != 0) {
        /* if (mls_num !== null) {
         console.log(mls_num)
         thunkAPI.dispatch(updateMLSupdateMLS(mls_num))
         window.lastOpenedProperty = mls_num
        } */

        if (response.data?.success !== false) {
          return {
            data: response.data,
            status: true,
          }
        } else {
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

export const fetchAsyncGetSaveFavorite = createAsyncThunk(
  'properties/fetchAsyncGetSaveFavorite',
  async (arg, { getState }) => {
    var bodyFormDataLead = new FormData()
    bodyFormDataLead.append('access_token', ACCESS_TOKEN)
    bodyFormDataLead.append('flex_credentials', Cookies.get('ib_lead_token'))
    bodyFormDataLead.append('paging', 'saved_listings')
    try {
      const response = await axios({
        method: 'post',
        url: LEAD_FAVORITES,
        data: bodyFormDataLead,
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      return response.data.lead_info.saved_listings || []
    } catch (error) {
      return {
        message: error.response.data,
        code: error.response.status,
        status: false,
      }
    }
  },
)

export const fetchAsyncSaveFavorite = createAsyncThunk(
  'properties/fetchAsyncSaveFavorite',
  (arg, thunkAPI) => {
    try {
      var bodyFormData = new FormData()
      bodyFormData.append('access_token', ACCESS_TOKEN)
      bodyFormData.append('flex_credentials', Cookies.get('ib_lead_token'))
      axios({
        method: 'post',
        url: SAVE_FAVORITE + `${arg.mls_num}/track`,
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((response) => {
        if (response.data.success === true) {
          thunkAPI.dispatch(fetchAsyncGetSaveFavorite())
        }
      })
    } catch (error) {
      return {
        message: error.response.data,
        code: error.response.status,
        status: false,
      }
    }
  },
)

export const fetchAsyncSaveSearch = createAsyncThunk(
  'properties/fetchAsyncSaveSearch',
  async (arg, { getState }) => {
    try {
      var __flex_g_settings =
        window.location.host === 'localhost:3000'
          ? flex_g_settings
          : window.__flex_g_settings

      const { properties } = getState()
      var search_url = encodeURIComponent(location.href)
      var search_count = properties.properties_data.pagination.count
      var search_condition = encodeURIComponent(
        properties.properties_data.condition,
      )
      var search_filter_params = properties.properties_data.params
      var search_filter_ID = filter_id
      var formData = arg.bodyFormData

      formData =
        formData +
        '&search_url=' +
        search_url +
        '&search_count=' +
        search_count +
        '&search_condition=' +
        search_condition +
        '&search_filter_params=' +
        JSON.stringify(search_filter_params) +
        '&search_filter_ID=' +
        search_filter_ID +
        '&action=idxboost_new_filter_save_search_xhr_fn'

      var response = await axios.post(__flex_g_settings.ajaxUrl, formData)
      if (response.data.success === true) {
        jQuery('.js-close-modals').click()

        if (jQuery('#_ib_lead_activity_tab').length) {
          jQuery('#_ib_lead_activity_tab button:eq(2)').click()
        }

        swal({
          title: 'Search Saved!',
          text: 'Your search has been saved successfuly',
          type: 'success',
          timer: 2000,
          showConfirmButton: false,
        })
      } else {
        sweetAlert('Oops...', response.data.message, 'error')
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
