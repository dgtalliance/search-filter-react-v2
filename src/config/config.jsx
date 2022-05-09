import { convertParamsArray } from '../utils/utils'

export const API_SEARCH_URL =
  window.location.host === 'localhost:3000'
    ? 'https://api.idxboost.dev/search_lookup'
    : 'https://api.idxboost.dev/search_lookup'

export const API_SEARCH_FILTER_URL =
  window.location.host === 'localhost:3000'
    ? 'https://api.idxboost.dev/search_filter_lookup'
    : 'https://api.idxboost.dev/search_filter_lookup'
export const ACCESS_TOKEN =
  window.location.host === 'localhost:3000'
    ? 'YTMwN2M5ZDc3ZTcxNTNjOGUxZTU2YTQ5ZWM1NzBhN2UzOWRhYTg2MzM5MjA0N2YwMjMzMzU0N2QzNDYzMzMxMQ'
    : window.__flex_g_settings.accessToken
export const API_PROPERTIES_DETAIL =
  window.location.host === 'localhost:3000'
    ? 'https://api.idxboost.dev/listings/'
    : 'https://api.idxboost.dev/listings/'
export const API_PROPERTIES_DETAIL_CHART =
  window.location.host === 'localhost:3000'
    ? 'https://dgtsrv5.dgtalliance.com/data-monitor/monitorBoards/public/api/get-property-details'
    : 'https://dgtsrv5.dgtalliance.com/data-monitor/monitorBoards/public/api/get-property-details'
export const ACCESS_TOKEN_FORM =
  window.location.host === 'localhost:3000'
    ? 'YTMwN2M5ZDc3ZTcxNTNjOGUxZTU2YTQ5ZWM1NzBhN2UzOWRhYTg2MzM5MjA0N2YwMjMzMzU0N2QzNDYzMzMxMQ'
    : window.__flex_g_settings.accessToken
export const API_AUTOCOMPLETE_URL =
  window.location.host === 'localhost:3000'
    ? 'https://api.idxboost.dev/rentals_autocomplete_lookup'
    : 'https://api.idxboost.dev/rentals_autocomplete_lookup'

var temp_property_type = [
  {
    label: 'Single Family Homes',
    value: 2,
  },
  {
    label: 'Condominiums',
    value: 1,
  },
  {
    label: 'Townhouses',
    value: 'tw',
  },
  {
    label: 'Multi-Family',
    value: 'mf',
  },
  {
    label: 'Vacant Land',
    value: 'valand',
  },
]

export const property_type_d =
  window.location.host === 'localhost:3000'
    ? temp_property_type
    : window.__flex_g_settings.params.property_types

const amenities = [
  {
    name: 'Swimming Pool',
    code: 'pool',
  },
  {
    name: 'Golf Course',
    code: 'golf',
  },
  {
    name: 'Tennis Courts',
    code: 'tennis',
  },
  {
    name: 'Gated Community',
    code: 'gated_community',
  },
  {
    name: 'Penthouse',
    code: 'penthouse',
  },
  {
    name: 'Waterfront',
    code: 'water_front',
  },
  {
    name: 'Pets',
    code: 'pets',
  },
  {
    name: 'Furnished',
    code: 'furnished',
  },
  {
    name: 'Equestrian',
    code: 'equestrian',
  },
  {
    name: 'Boat Dock',
    code: 'boat_dock',
  },
  {
    name: 'Short Sales',
    code: 'short_sale',
  },
  {
    name: 'Foreclosures',
    code: 'foreclosure',
  },
]

export const amenities_d =
  window.location.host === 'localhost:3000'
    ? convertParamsArray(amenities)
    : convertParamsArray(window.__flex_g_settings.params.amenities)

const waterfront_options = [
  {
    name: 'Bay',
    code: 'bay',
  },
  {
    name: 'Canal',
    code: 'canal',
  },
  {
    name: 'Fixed Bridge',
    code: 'fixed-bridge',
  },
  {
    name: 'Intracoastal',
    code: 'intracoastal',
  },
  {
    name: 'Lake Front',
    code: 'lake',
  },
  {
    name: 'Ocean Access',
    code: 'ocean-access',
  },
  {
    name: 'Point Lot',
    code: 'point-lot',
  },
  {
    name: 'River Front',
    code: 'river',
  },
]

export const waterfront_options_d =
  window.location.host === 'localhost:3000'
    ? convertParamsArray(waterfront_options)
    : convertParamsArray(window.__flex_g_settings.params.waterfront_options)

const parking_options = [
  {
    label: '1',
    value: 1,
  },
  {
    label: '2',
    value: 2,
  },
  {
    label: '3',
    value: 3,
  },
  {
    label: '4',
    value: 4,
  },
  {
    label: '5',
    value: 5,
  },
  {
    label: '5+',
    value: 6,
  },
]
export const parking_options_d =
  window.location.host === 'localhost:3000'
    ? parking_options
    : window.__flex_g_settings.params.parking_options
