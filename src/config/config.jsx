import { defaultPropsShortCode } from '../App'
import { convertParamsArray } from '../utils/utils'

export const ACCESS_TOKEN =
  window.location.host === 'localhost:3000'
    ? 'YTMwN2M5ZDc3ZTcxNTNjOGUxZTU2YTQ5ZWM1NzBhN2UzOWRhYTg2MzM5MjA0N2YwMjMzMzU0N2QzNDYzMzMxMQ'
    : window.__flex_g_settings.accessToken

export const GOOGLEMAPREACTKEY =
  window.location.host === 'localhost:3000'
    ? 'AIzaSyBdlczEuxYRH-xlD_EZH4jv0naeVT1JaA4'
    : window.__flex_g_settings.google_recaptcha_public_key

export const API_SEARCH_URL =
  defaultPropsShortCode.filter === ''
    ? 'https://api.idxboost.dev/search_lookup'
    : 'https://api.idxboost.dev/search_filter_lookup'

export const API_PROPERTIES_DETAIL =
  window.location.host === 'localhost:3000'
    ? 'https://api.idxboost.dev/listings/'
    : `${window.__flex_g_settings.domain_service}/listings/`

export const API_AUTOCOMPLETE_URL =
  window.location.host === 'localhost:3000'
    ? 'https://autocomplete.idxboost.dev/?board=1'
    : `${window.__flex_g_settings.domain_service}/?board=1`

export const SAVE_FAVORITE =
  window.location.host === 'localhost:3000'
    ? 'https://api.idxboost.dev/listings/'
    : `${window.__flex_g_settings.domain_service}/listings/`

export const LEAD_FAVORITES =
  window.location.host === 'localhost:3000'
    ? 'https://api.idxboost.dev/leads/fetch_activities'
    : `${window.__flex_g_settings.domain_service}/leads/fetch_activities`

export const API_CONTACT_FORM_URL =
  window.location.host === 'localhost:3000'
    ? 'https://api.idxboost.dev/tracking/property_inquiries'
    : `${window.__flex_g_settings.domain_service}/tracking/property_inquiries`

export const API_PROPERTIES_DETAIL_CHART =
  'https://statistics.idxboost.dev/api/get-property-details-mt'

export const API_PROPERTIES_DETAIL_CHART_P =
  'https://statistics.idxboost.dev/api/get-property-details-pt'

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

const year_built_range = [
  {
    label: '1900',
    value: 1900,
  },
  {
    label: '1901',
    value: 1901,
  },
  {
    label: '1902',
    value: 1902,
  },
  {
    label: '1903',
    value: 1903,
  },
  {
    label: '1904',
    value: 1904,
  },
  {
    label: '1905',
    value: 1905,
  },
  {
    label: '1906',
    value: 1906,
  },
  {
    label: '1907',
    value: 1907,
  },
  {
    label: '1908',
    value: 1908,
  },
  {
    label: '1909',
    value: 1909,
  },
  {
    label: '1910',
    value: 1910,
  },
  {
    label: '1911',
    value: 1911,
  },
  {
    label: '1912',
    value: 1912,
  },
  {
    label: '1913',
    value: 1913,
  },
  {
    label: '1914',
    value: 1914,
  },
  {
    label: '1915',
    value: 1915,
  },
  {
    label: '1916',
    value: 1916,
  },
  {
    label: '1917',
    value: 1917,
  },
  {
    label: '1918',
    value: 1918,
  },
  {
    label: '1919',
    value: 1919,
  },
  {
    label: '1920',
    value: 1920,
  },
  {
    label: '1921',
    value: 1921,
  },
  {
    label: '1922',
    value: 1922,
  },
  {
    label: '1923',
    value: 1923,
  },
  {
    label: '1924',
    value: 1924,
  },
  {
    label: '1925',
    value: 1925,
  },
  {
    label: '1926',
    value: 1926,
  },
  {
    label: '1927',
    value: 1927,
  },
  {
    label: '1928',
    value: 1928,
  },
  {
    label: '1929',
    value: 1929,
  },
  {
    label: '1930',
    value: 1930,
  },
  {
    label: '1931',
    value: 1931,
  },
  {
    label: '1932',
    value: 1932,
  },
  {
    label: '1933',
    value: 1933,
  },
  {
    label: '1934',
    value: 1934,
  },
  {
    label: '1935',
    value: 1935,
  },
  {
    label: '1936',
    value: 1936,
  },
  {
    label: '1937',
    value: 1937,
  },
  {
    label: '1938',
    value: 1938,
  },
  {
    label: '1939',
    value: 1939,
  },
  {
    label: '1940',
    value: 1940,
  },
  {
    label: '1941',
    value: 1941,
  },
  {
    label: '1942',
    value: 1942,
  },
  {
    label: '1943',
    value: 1943,
  },
  {
    label: '1944',
    value: 1944,
  },
  {
    label: '1945',
    value: 1945,
  },
  {
    label: '1946',
    value: 1946,
  },
  {
    label: '1947',
    value: 1947,
  },
  {
    label: '1948',
    value: 1948,
  },
  {
    label: '1949',
    value: 1949,
  },
  {
    label: '1950',
    value: 1950,
  },
  {
    label: '1951',
    value: 1951,
  },
  {
    label: '1952',
    value: 1952,
  },
  {
    label: '1953',
    value: 1953,
  },
  {
    label: '1954',
    value: 1954,
  },
  {
    label: '1955',
    value: 1955,
  },
  {
    label: '1956',
    value: 1956,
  },
  {
    label: '1957',
    value: 1957,
  },
  {
    label: '1958',
    value: 1958,
  },
  {
    label: '1959',
    value: 1959,
  },
  {
    label: '1960',
    value: 1960,
  },
  {
    label: '1961',
    value: 1961,
  },
  {
    label: '1962',
    value: 1962,
  },
  {
    label: '1963',
    value: 1963,
  },
  {
    label: '1964',
    value: 1964,
  },
  {
    label: '1965',
    value: 1965,
  },
  {
    label: '1966',
    value: 1966,
  },
  {
    label: '1967',
    value: 1967,
  },
  {
    label: '1968',
    value: 1968,
  },
  {
    label: '1969',
    value: 1969,
  },
  {
    label: '1970',
    value: 1970,
  },
  {
    label: '1971',
    value: 1971,
  },
  {
    label: '1972',
    value: 1972,
  },
  {
    label: '1973',
    value: 1973,
  },
  {
    label: '1974',
    value: 1974,
  },
  {
    label: '1975',
    value: 1975,
  },
  {
    label: '1976',
    value: 1976,
  },
  {
    label: '1977',
    value: 1977,
  },
  {
    label: '1978',
    value: 1978,
  },
  {
    label: '1979',
    value: 1979,
  },
  {
    label: '1980',
    value: 1980,
  },
  {
    label: '1981',
    value: 1981,
  },
  {
    label: '1982',
    value: 1982,
  },
  {
    label: '1983',
    value: 1983,
  },
  {
    label: '1984',
    value: 1984,
  },
  {
    label: '1985',
    value: 1985,
  },
  {
    label: '1986',
    value: 1986,
  },
  {
    label: '1987',
    value: 1987,
  },
  {
    label: '1988',
    value: 1988,
  },
  {
    label: '1989',
    value: 1989,
  },
  {
    label: '1990',
    value: 1990,
  },
  {
    label: '1991',
    value: 1991,
  },
  {
    label: '1992',
    value: 1992,
  },
  {
    label: '1993',
    value: 1993,
  },
  {
    label: '1994',
    value: 1994,
  },
  {
    label: '1995',
    value: 1995,
  },
  {
    label: '1996',
    value: 1996,
  },
  {
    label: '1997',
    value: 1997,
  },
  {
    label: '1998',
    value: 1998,
  },
  {
    label: '1999',
    value: 1999,
  },
  {
    label: '2000',
    value: 2000,
  },
  {
    label: '2001',
    value: 2001,
  },
  {
    label: '2002',
    value: 2002,
  },
  {
    label: '2003',
    value: 2003,
  },
  {
    label: '2004',
    value: 2004,
  },
  {
    label: '2005',
    value: 2005,
  },
  {
    label: '2006',
    value: 2006,
  },
  {
    label: '2007',
    value: 2007,
  },
  {
    label: '2008',
    value: 2008,
  },
  {
    label: '2009',
    value: 2009,
  },
  {
    label: '2010',
    value: 2010,
  },
  {
    label: '2011',
    value: 2011,
  },
  {
    label: '2012',
    value: 2012,
  },
  {
    label: '2013',
    value: 2013,
  },
  {
    label: '2014',
    value: 2014,
  },
  {
    label: '2015',
    value: 2015,
  },
  {
    label: '2016',
    value: 2016,
  },
  {
    label: '2017',
    value: 2017,
  },
  {
    label: '2018',
    value: 2018,
  },
  {
    label: '2019',
    value: 2019,
  },
  {
    label: '2020',
    value: 2020,
  },
  {
    label: '2021',
    value: 2021,
  },
  {
    label: '2022',
    value: 2022,
  },
]

export const year_built_range_d =
  window.location.host === 'localhost:3000'
    ? year_built_range
    : window.__flex_g_settings.params.year_built_range

const lot_size_range = [
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

export const lot_size_range_d =
  window.location.host === 'localhost:3000'
    ? lot_size_range
    : window.__flex_g_settings.params.lot_size_range
