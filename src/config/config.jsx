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
export const API_AUTOCOMPLETE_URL =
  window.location.host === 'localhost:3000'
    ? 'https://autocomplete.idxboost.dev/?board=1'
    : 'https://autocomplete.idxboost.dev/?board=1'

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

const living_size_range = [
  {
    label: '0',
    value: 0,
  },
  {
    label: '500',
    value: 500,
  },
  {
    label: '600',
    value: 600,
  },
  {
    label: '700',
    value: 700,
  },
  {
    label: '800',
    value: 800,
  },
  {
    label: '900',
    value: 900,
  },
  {
    label: '1000',
    value: 1000,
  },
  {
    label: '1250',
    value: 1250,
  },
  {
    label: '1500',
    value: 1500,
  },
  {
    label: '1750',
    value: 1750,
  },
  {
    label: '2000',
    value: 2000,
  },
  {
    label: '2500',
    value: 2500,
  },
  {
    label: '3000',
    value: 3000,
  },
  {
    label: '3500',
    value: 3500,
  },
  {
    label: '4000',
    value: 4000,
  },
  {
    label: '4500',
    value: 4500,
  },
  {
    label: '5000',
    value: 5000,
  },
  {
    label: '6000',
    value: 6000,
  },
  {
    label: '7000',
    value: 7000,
  },
  {
    label: '8000',
    value: 8000,
  },
  {
    label: '9000',
    value: 9000,
  },
  {
    label: '10000',
    value: 10000,
  },
  {
    label: '11000',
    value: 11000,
  },
  {
    label: '12000',
    value: 12000,
  },
  {
    label: '13000',
    value: 13000,
  },
  {
    label: '14000',
    value: 14000,
  },
  {
    label: '15000',
    value: 15000,
  },
  {
    label: '16000',
    value: 16000,
  },
  {
    label: '17000',
    value: 17000,
  },
  {
    label: '18000',
    value: 18000,
  },
  {
    label: '19000',
    value: 19000,
  },
  {
    label: '20000',
    value: 20000,
  },
  {
    label: '30000',
    value: 30000,
  },
  {
    label: '40000',
    value: 40000,
  },
  {
    label: '50000',
    value: 50000,
  },
  {
    label: '60000',
    value: 60000,
  },
  {
    label: '70000',
    value: 70000,
  },
  {
    label: '80000',
    value: 80000,
  },
]
export const living_size_range_d =
  window.location.host === 'localhost:3000'
    ? living_size_range
    : window.__flex_g_settings.params.living_size_range
