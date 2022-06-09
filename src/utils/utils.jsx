import Cookies from 'js-cookie'

export const generateSlug = (params) => {
  var request = ''
  var cont = 0
  for (const prop in params) {
    if (cont === 1) {
      request += `&${prop}=${params[prop]}`
    } else {
      cont++
      request += `${prop}=${params[prop]}`
    }
  }
  return request
}

export const formatPrice = (value, n, x, d, c, s, p) => {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
    num = Number(value).toFixed(Math.max(0, ~~n))

  return (
    (s && p ? s : '') +
    (c ? num.replace('.', c) : num).replace(
      new RegExp(re, 'g'),
      '$&' + (d || ','),
    ) +
    (s && !p ? s : '')
  )
}

export const pluck = (arr, key) => {
  return arr.map((o) => o[key])
}

export const ib_fetch_default_cities = (cities) => {
  var ib_autocomplete_cities = pluck(cities, 'name')
  var featured_cities = []

  if (ib_autocomplete_cities.length) {
    for (var i = 0, l = ib_autocomplete_cities.length; i < l; i++) {
      featured_cities.push({
        label: ib_autocomplete_cities[i],
        type: 'city',
      })
    }
  }

  return featured_cities
}

export const convertParamsArray = (data) => {
  var temp = []
  if (Array.isArray(data)) {
    data.forEach((item) => {
      var t = { label: item.name, value: item.code }
      temp.push(t)
    })
  } else {
    return []
  }
  return temp
}

export const numberWithCommas = (x) =>
  x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0

export const transformPrice = (price) => {
  if (
    price === 0 ||
    price === 100000000 ||
    price === 100000 ||
    price === null
  ) {
    return 'Any'
  } else {
    return numberWithCommas(price)
  }
}

export const formatShortPriceX = (value) => {
  var price = Number(value),
    short_price

  if (price < 1000) {
    return new String(price)
  }

  if (price < 10000) {
    short_price = Math.ceil(price / 100) / 10

    return short_price + 'K'
  } else {
    if (price < 1000000) {
      short_price = Math.ceil(price / 1000)

      if (short_price < 100) {
        return String(short_price).substring(0, 2) + 'K'
      }

      if (short_price >= 1000) {
        return '1M'
      }

      return short_price + 'K'
    } else {
      if (price < 10000000) {
        short_price = Math.ceil(price / 10000) / 100
      } else {
        short_price = Math.ceil(price / 100000) / 10
      }
    }
  }

  if (String(short_price, '.') != -1) {
    short_price = String(short_price).substring(0, 4)
  }

  return short_price + 'M'
}

// function to agroup items map
export const groupProperties = (map_items) => {
  let row
  let inner
  let geocode
  const hashed_properties = []
  const filtered_properties = []
  const unique_properties = []

  // reduce markers [first step]
  for (var i = 0, l = map_items.length; i < l; i++) {
    // if (i >= 39) { break; }
    row = map_items[i]
    geocode = `${row.lat}:${row.lng}`
    if (hashed_properties.indexOf(geocode) === -1) {
      hashed_properties.push(geocode)
      filtered_properties.push(row)
    }
  }
  // reduce markers [second step]
  for (i = 0, l = filtered_properties.length; i < l; i++) {
    row = filtered_properties[i]
    geocode = [row.lat, row.lng]

    // reset array
    const related_properties = []
    for (let k = 0, m = map_items.length; k < m; k++) {
      inner = map_items[k]
      if (inner.lat === geocode[0] && inner.lng === geocode[1]) {
        related_properties.push(inner)
      }
    }
    unique_properties.push({
      item: Object.assign(row, { hovered: false, infoWin: false }),
      group: related_properties,
    })
  }

  return unique_properties
}

export const hoveredItem = (mls, markers, active, info) => {
  return markers.map((marker) => {
    var t = Object.assign({}, marker.item)
    var tem = marker.group.filter((group) => group.mls_num === mls)

    if (tem.length > 0) {
      return {
        item: Object.assign(t, { hovered: active, infoWin: info }),
        group: marker.group,
      }
    } else {
      return {
        item: Object.assign(t, { hovered: false, infoWin: false }),
        group: marker.group,
      }
    }
  })
}
export const hoverMapGrid = (ele) => {
  Array.from(document.getElementsByClassName('markerOverlay')).forEach((f) => {
    if (f.className.includes('active')) {
      document.getElementById(f.id).classList.remove('active')
    }
  })
  if (document.getElementById(ele) !== null)
    document.getElementById(ele).classList.add('active')
}

export const clearHover = () => {
  Array.from(document.getElementsByClassName('markerOverlay')).forEach((f) => {
    if (f.className.includes('active')) {
      document.getElementById(f.id).classList.remove('active')
    }
  })
}

export const removeChild = () => {
  const removeChild = document.getElementsByClassName('gm-style')[0].children[1]
    .children[1].children[0].children[2]
  removeChild.innerHTML = ''
}

export const abbreviateNumber = (number) => {
  if (number === null) {
    return '$'
  }
  const SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E']

  // what tier? (determines SI symbol)
  const tier = (Math.log10(number) / 3) | 0

  // if zero, we don't need a suffix
  if (tier === 0) return number

  // get suffix and determine scale
  const suffix = SI_SYMBOL[tier]
  const scale = Math.pow(10, tier * 3)

  // scale the number
  const scaled = number / scale

  // format number and add suffix
  return '$' + scaled.toFixed(1) + suffix
}

export const flex_g_settings = {
  events: {
    trackingServiceUrl: 'https://api.idxboost.dev/tracking/events',
  },
  domain_service: 'https://api.idxboost.dev',
  fetchLeadActivitiesEndpoint:
    'https://api.idxboost.dev/leads/fetch_activities',
  hideTooltipLeadEndpoint: 'https://api.idxboost.dev/leads/hide/tooltip',
  shareWithFriendEndpoint: 'https://api.idxboost.dev/sharing/{{mlsNumber}}',
  signup_left_clicks: '2',
  force_registration_forced: 'yes',
  has_facebook_login_enabled: 'no',
  has_google_login_enabled: 'no',
  checkLeadUsername: 'https://api.idxboost.dev/leads/check_username',
  accessToken:
    'YTMwN2M5ZDc3ZTcxNTNjOGUxZTU2YTQ5ZWM1NzBhN2UzOWRhYTg2MzM5MjA0N2YwMjMzMzU0N2QzNDYzMzMxMQ',
  boardId: '1',
  is_mobile: '',
  socketAuthUrl:
    'https://idxbrentalsdev.wpengine.com/wp-content/plugins/idxboost/socket-auth.php',
  ajaxUrl: 'https://idxbrentalsdev.wpengine.com/wp-admin/admin-ajax.php',
  anonymous: 'yes',
  params: {
    amenities: [
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
    ],
    baths_range: [
      {
        label: '0',
        value: 0,
      },
      {
        label: ' ',
        value: 0.5,
      },
      {
        label: '1',
        value: 1,
      },
      {
        label: ' ',
        value: 1.5,
      },
      {
        label: '2',
        value: 2,
      },
      {
        label: ' ',
        value: 2.5,
      },
      {
        label: '3',
        value: 3,
      },
      {
        label: ' ',
        value: 3.5,
      },
      {
        label: '4',
        value: 4,
      },
      {
        label: ' ',
        value: 4.5,
      },
      {
        label: '5',
        value: 5,
      },
      {
        label: ' ',
        value: 5.5,
      },
      {
        label: '5+',
        value: 6,
      },
    ],
    beds_range: [
      {
        label: 'Studio',
        value: 0,
      },
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
    ],
    cities: [
      {
        name: 'Aventura',
        code: '2',
      },
      {
        name: 'Belle Glade',
        code: '5',
      },
      {
        name: 'Boca Raton',
        code: '8',
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
        name: 'Coral Springs',
        code: '15',
      },
      {
        name: 'Davie',
        code: '18',
      },
      {
        name: 'Doral',
        code: '21',
      },
      {
        name: 'Fisher Island',
        code: '25',
      },
      {
        name: 'Fort Pierce',
        code: '28',
      },
      {
        name: 'Green Acres',
        code: '31',
      },
      {
        name: 'Hialeah Gardens',
        code: '34',
      },
      {
        name: 'Hobe Sound',
        code: '37',
      },
      {
        name: 'Hutchinson Island',
        code: '40',
      },
    ],
    default_sort: 'list_date-desc',
    default_view: 'grid',
    living_size_range: [
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
    ],
    lot_size_range: [
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
    ],
    parking_options: [
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
    ],
    price_rent_range: [
      {
        label: '$0',
        value: 0,
      },
      {
        label: '$500',
        value: 500,
      },
      {
        label: '$1,000',
        value: 1000,
      },
      {
        label: '$1,500',
        value: 1500,
      },
      {
        label: '$2,000',
        value: 2000,
      },
      {
        label: '$2,500',
        value: 2500,
      },
      {
        label: '$3,000',
        value: 3000,
      },
      {
        label: '$3,500',
        value: 3500,
      },
      {
        label: '$4,000',
        value: 4000,
      },
      {
        label: '$4,500',
        value: 4500,
      },
      {
        label: '$5,000',
        value: 5000,
      },
      {
        label: '$6,000',
        value: 6000,
      },
      {
        label: '$7,000',
        value: 7000,
      },
      {
        label: '$8,000',
        value: 8000,
      },
      {
        label: '$9,000',
        value: 9000,
      },
      {
        label: '$10,000',
        value: 10000,
      },
      {
        label: '$12,500',
        value: 12500,
      },
      {
        label: '$15,000',
        value: 15000,
      },
      {
        label: '$17,500',
        value: 17500,
      },
      {
        label: '$20,000',
        value: 20000,
      },
      {
        label: '$25,000',
        value: 25000,
      },
      {
        label: '$30,000',
        value: 30000,
      },
      {
        label: '$35,000',
        value: 35000,
      },
      {
        label: '$40,000',
        value: 40000,
      },
      {
        label: '$45,000',
        value: 45000,
      },
      {
        label: '$50,000',
        value: 50000,
      },
      {
        label: '$60,000',
        value: 60000,
      },
      {
        label: '$70,000',
        value: 70000,
      },
      {
        label: '$80,000',
        value: 80000,
      },
      {
        label: '$90,000',
        value: 90000,
      },
      {
        label: '$100,000',
        value: 100000,
      },
    ],
    price_sale_range: [
      {
        label: '$50,000',
        value: 50000,
      },
      {
        label: '$100,000',
        value: 100000,
      },
      {
        label: '$150,000',
        value: 150000,
      },
      {
        label: '$200,000',
        value: 200000,
      },
      {
        label: '$250,000',
        value: 250000,
      },
      {
        label: '$300,000',
        value: 300000,
      },
      {
        label: '$350,000',
        value: 350000,
      },
      {
        label: '$400,000',
        value: 400000,
      },
      {
        label: '$450,000',
        value: 450000,
      },
      {
        label: '$500,000',
        value: 500000,
      },
      {
        label: '$550,000',
        value: 550000,
      },
      {
        label: '$600,000',
        value: 600000,
      },
      {
        label: '$650,000',
        value: 650000,
      },
      {
        label: '$700,000',
        value: 700000,
      },
      {
        label: '$750,000',
        value: 750000,
      },
      {
        label: '$800,000',
        value: 800000,
      },
      {
        label: '$850,000',
        value: 850000,
      },
      {
        label: '$900,000',
        value: 900000,
      },
      {
        label: '$1M',
        value: 1000000,
      },
      {
        label: '$1.25M',
        value: 1250000,
      },
      {
        label: '$1.5M',
        value: 1500000,
      },
      {
        label: '$1.75M',
        value: 1750000,
      },
      {
        label: '$2M',
        value: 2000000,
      },
      {
        label: '$2.5M',
        value: 2500000,
      },
      {
        label: '$3M',
        value: 3000000,
      },
      {
        label: '$3.5M',
        value: 3500000,
      },
      {
        label: '$4M',
        value: 4000000,
      },
      {
        label: '$4.5M',
        value: 4500000,
      },
      {
        label: '$5M',
        value: 5000000,
      },
      {
        label: '$7.5M',
        value: 7500000,
      },
      {
        label: '$10M',
        value: 10000000,
      },
      {
        label: '$12.5M',
        value: 12500000,
      },
      {
        label: '$15M',
        value: 15000000,
      },
      {
        label: '$17.5M',
        value: 17500000,
      },
      {
        label: '$20M',
        value: 20000000,
      },
      {
        label: '$22.5M',
        value: 22500000,
      },
      {
        label: '$25M',
        value: 25000000,
      },
      {
        label: '$27.5M',
        value: 27500000,
      },
      {
        label: '$30M',
        value: 30000000,
      },
      {
        label: '$35M',
        value: 35000000,
      },
      {
        label: '$40M',
        value: 40000000,
      },
    ],
    property_types: [
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
    ],
    rental_types: '0',
    view_grid_type: '0',
    view_icon_type: '1',
    schools_ratio: 15,
    waterfront_options: [
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
    ],
    year_built_range: [
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
    ],
    default_language: 'en',
    default_floor_plan: ['den', 'size_sqft', 'size_m2'],
    idx_listings_type: 0,
    hide_pending_content_options: 0,
  },
  searchUrl: 'https://idxbrentalsdev.wpengine.com/search',
  propertyDetailPermalink: 'https://idxbrentalsdev.wpengine.com/property',
  siteUrl: 'https://idxbrentalsdev.wpengine.com',
  templateDirectoryUrl:
    'https://idxbrentalsdev.wpengine.com/wp-content/themes/builder-cms',
  pusher: {
    app_cluster: 'mt1',
    app_key: '18dae50f1061b3bbf220',
    presence_channel: 'presence-7d085816b2_channel',
  },
  suggestions: {
    board: 1,
    service_url: 'https://autocomplete.idxboost.dev',
  },
  g_analytics_account: '',
  g_adwords_account: '',
  force_registration: '1',
  page_setting: {},
  user_show_quizz: '1',
  has_dynamic_ads: '',
  has_seo_client: '',
  google_recaptcha_public_key: '6LfEzb4eAAAAAFDj82cxqSMHBcf65OEe7ezaftNm',
  has_enterprise_recaptcha: '',
  has_cms: '1',
  recaptcha_site_key: null,
  recaptcha_api_key: null,
}

// init script to jquery
export const initializeElement = () => {
  jQuery(document).on('click', '.js-float-form', function (e) {
    e.preventDefault()
    jQuery('body').addClass('active-modal-form')
  })

  jQuery(document).on('click', '.js-close-modal-aside', function (e) {
    e.preventDefault()
    jQuery('body').removeClass('active-modal-form')
  })

  jQuery(document).on('click', '.ms-item-selected', function (e) {
    e.preventDefault()
    jQuery(this).parent().toggleClass('active')
  })

  jQuery(document).on('click', '.ms-dropdown-filter .ms-item', function (e) {
    e.preventDefault()
    jQuery('.ms-dropdown-filter .ms-item').removeClass('active')
    jQuery(this).addClass('active')
    jQuery('.ms-dropdown-filter .ms-item-selected').text(jQuery(this).text())
    jQuery('.ms-dropdown-filter').removeClass('active')
  })

  jQuery(document).click(function (e) {
    e.stopPropagation()
    var container = jQuery('.ib-dropdown')
    if (container.has(e.target).length === 0) {
      jQuery('.ib-dropdown').removeClass('active')
    }

    var showPriceFilter = jQuery('.ms-dropdown-filter')
    if (showPriceFilter.has(e.target).length === 0) {
      jQuery('.ms-dropdown-filter').removeClass('active')
    }
  })

  jQuery(document).on('click', '.js-show-filter-date', function (e) {
    e.preventDefault()

    jQuery('.ib-guests-search .ib-wrapper-dropdown').removeClass('active')
    var activeItem = jQuery(this).attr('data-show')
    var parent = jQuery(this).parents('.ib-wrapper-dropdown')

    jQuery('.js-show-filter-date').removeClass('-show')
    jQuery(this).addClass('-show')

    switch (activeItem) {
      case 'in':
        parent.removeClass('out')
        if (parent.hasClass('in')) {
          parent.removeClass('active-dp in')
          jQuery('.js-show-filter-date').removeClass('-show')
        } else {
          parent.addClass('active-dp in')
          jQuery(this).addClass('-show')
        }
        break

      case 'out':
        parent.removeClass('in')
        if (parent.hasClass('out')) {
          parent.removeClass('active-dp out')
          jQuery('.js-show-filter-date').removeClass('-show')
        } else {
          parent.addClass('active-dp out')
          jQuery(this).addClass('-show')
        }
        break
    }
  })

  // FORCE REGISTRATION

  var __flex_g_settings =
    window.location.host === 'localhost:3000'
      ? flex_g_settings
      : window.__flex_g_settings

  var IB_HAS_LEFT_CLICKS =
    __flex_g_settings.hasOwnProperty('signup_left_clicks') &&
    null != __flex_g_settings.signup_left_clicks
  var IB_CURRENT_LEFT_CLICKS

  if (true === IB_HAS_LEFT_CLICKS) {
    if (
      typeof Cookies.get('_ib_left_click_force_registration') === 'undefined'
    ) {
      Cookies.set(
        '_ib_left_click_force_registration',
        parseInt(__flex_g_settings.signup_left_clicks, 10),
      )
    }
  }

  jQuery(document).on(
    'click',
    '.js-show-modals-item ,.ib-wrapper-grid .slick-arrow.slick-next, .ib-wrapper-grid .slick-arrow.slick-prev',
    function (e) {
      e.preventDefault()
      e.stopPropagation()

      if ('undefined' === typeof Cookies.get('_ib_disabled_forcereg')) {
        if (true === IB_HAS_LEFT_CLICKS) {
          IB_CURRENT_LEFT_CLICKS =
            parseInt(Cookies.get('_ib_left_click_force_registration'), 10) - 1

          Cookies.set(
            '_ib_left_click_force_registration',
            IB_CURRENT_LEFT_CLICKS,
          )

          if (
            parseInt(Cookies.get('_ib_left_click_force_registration'), 10) <=
              0 &&
            'yes' === __flex_g_settings.anonymous
          ) {
            // no left click then open popup registration
            jQuery('#modal_login')
              .addClass('active_modal')
              .find('[data-tab]')
              .removeClass('active')

            jQuery('#modal_login')
              .addClass('active_modal')
              .find('[data-tab]:eq(1)')
              .addClass('active')

            jQuery('#modal_login').find('.item_tab').removeClass('active')

            jQuery('#tabRegister').addClass('active')

            jQuery('button.close-modal').addClass('ib-close-mproperty')
            jQuery('.overlay_modal').css('background-color', 'rgba(0,0,0,0.8);')

            jQuery('#modal_login h2').html(
              jQuery('#modal_login')
                .find('[data-tab]:eq(1)')
                .data('text-force'),
            )

            /*Asigamos el texto personalizado*/
            var titleText = jQuery(
              ".header-tab a[data-tab='tabRegister']",
            ).attr('data-text')
            jQuery(
              '#modal_login .modal_cm .content_md .heder_md .ms-title-modal',
            ).html(titleText)
          }
        } else {
          if ('yes' === __flex_g_settings.anonymous) {
            if (
              __flex_g_settings.hasOwnProperty('force_registration') &&
              1 == __flex_g_settings.force_registration
            ) {
              console.log('is forced registration')
              jQuery('#modal_login')
                .addClass('active_modal')
                .find('[data-tab]')
                .removeClass('active')

              jQuery('#modal_login')
                .addClass('active_modal')
                .find('[data-tab]:eq(1)')
                .addClass('active')

              jQuery('#modal_login').find('.item_tab').removeClass('active')

              jQuery('#tabRegister').addClass('active')

              jQuery('button.close-modal').addClass('ib-close-mproperty')
              jQuery('.overlay_modal').css(
                'background-color',
                'rgba(0,0,0,0.8);',
              )

              jQuery('#modal_login h2').html(
                jQuery('#modal_login')
                  .find('[data-tab]:eq(1)')
                  .data('text-force'),
              )

              /*Asigamos el texto personalizado*/
              var titleText = jQuery(
                ".header-tab a[data-tab='tabRegister']",
              ).attr('data-text')
              jQuery(
                '#modal_login .modal_cm .content_md .heder_md .ms-title-modal',
              ).html(titleText)
            }
          }
        }
      }
    },
  )

  jQuery(document).on('click', '.ib-close-mproperty', function (event) {
    event.preventDefault()

    if (
      __flex_g_settings.hasOwnProperty('force_registration_forced') &&
      'yes' == __flex_g_settings.force_registration_forced
    ) {
      jQuery('.js-close-modals').click()
    }
  })

  jQuery(document).on('click', '.js-show-modals', function (e) {
    e.preventDefault()

    var __flex_g_settings =
      window.location.host === 'localhost:3000'
        ? flex_g_settings
        : window.__flex_g_settings

    if (
      __flex_g_settings.hasOwnProperty('anonymous') &&
      'yes' === __flex_g_settings.anonymous
    ) {
      jQuery('#modal_login')
        .addClass('active_modal')
        .find('[data-tab]')
        .removeClass('active')

      jQuery('#modal_login')
        .addClass('active_modal')
        .find('[data-tab]:eq(1)')
        .addClass('active')

      jQuery('#modal_login').find('.item_tab').removeClass('active')

      jQuery('#tabRegister').addClass('active')

      jQuery('button.close-modal').addClass('ib-close-mproperty')
      jQuery('.overlay_modal').css('background-color', 'rgba(0,0,0,0.8);')

      jQuery('#modal_login h2').html(
        jQuery('#modal_login').find('[data-tab]:eq(1)').data('text-force'),
      )

      /*Asigamos el texto personalizado*/
      var titleText = jQuery(".header-tab a[data-tab='tabRegister']").attr(
        'data-text',
      )
      jQuery(
        '#modal_login .modal_cm .content_md .heder_md .ms-title-modal',
      ).html(titleText)
    } else {
      
    }
    if (document.body.classList.contains('openModals')) {
      document.body.classList.remove('openModals')
    } else {
      document.body.classList.add('openModals')
    }

    var parent = jQuery('#modalSaveSearch')
    if (parent.hasClass('active')) {
      parent.removeClass('active')
    } else {
      parent.addClass('active')
    }
  })

  jQuery(document).on('click', '.js-close-modals', function (e) {
    e.preventDefault()

    if (document.body.classList.contains('openModals')) {
      document.body.classList.remove('openModals')
    }

    var parent = jQuery('#modalSaveSearch')
    if (parent.hasClass('active')) {
      parent.removeClass('active')
    }
  })

  jQuery(document).on('click', '.js-show-basic-filter', function (e) {
    e.preventDefault()
    jQuery('.ib-guests-search .ib-wrapper-dropdown').removeClass(
      'active-dp in out',
    )
    jQuery('.js-show-filter-date').removeClass('-show')

    var parent = jQuery(this).parents('.ib-wrapper-dropdown')
    if (parent.hasClass('active')) {
      parent.removeClass('active')
    } else {
      jQuery('.ib-guests-search .ib-wrapper-dropdown').removeClass('active')
      parent.addClass('active')
    }
  })

  jQuery(document).on('click', '.js-show-all-filter', function (e) {
    e.preventDefault()
    jQuery('.ib-guests-search .ib-wrapper-dropdown').removeClass('active')
    jQuery('body').toggleClass('ms-show-guests-filter')
  })

  jQuery(document).on('click', '.js-close-filter', function (e) {
    e.preventDefault()
    jQuery('body').removeClass('ms-show-guests-filter')
  })

  jQuery(document).on('click', '.js-submit-filter', function (e) {
    e.preventDefault()
    jQuery('body').removeClass('ms-show-guests-filter')
  })

  jQuery(document).on('click', '.js-show-grid', function (e) {
    e.preventDefault()
    jQuery('.ib-wrapper-float-actions').addClass('-grid')
    jQuery('.ib-wrapper-float-actions').removeClass('-map')
    jQuery('#ib-idx-search-filter').removeClass('-map-active')
  })

  jQuery(document).on('click', '.js-show-map', function (e) {
    e.preventDefault()
    jQuery('.ib-wrapper-float-actions').removeClass('-grid')
    jQuery('.ib-wrapper-float-actions').addClass('-map')
    jQuery('#ib-idx-search-filter').addClass('-map-active')
  })

  jQuery(document).on('click', '.ib-share-btn', function (e) {
    e.preventDefault()
    jQuery(this).parents('.ib-dropdown').toggleClass('active')
  })

  jQuery(document).on('click', '.ib-pvcta .ib-pvitem', function (e) {
    e.preventDefault()

    var showElement = jQuery(this).attr('data-id')
    if (showElement == 'photos') {
      jQuery(this)
        .parents('.ib-slider-detail')
        .find('.ib-pviews')
        .removeClass('ib-pva-map')
        .addClass('ib-pva-photos')
    } else {
      jQuery(this)
        .parents('.ib-slider-detail')
        .find('.ib-pviews')
        .removeClass('ib-pva-photos')
        .addClass('ib-pva-map')
    }

    jQuery('.ib-pvcta .ib-pvitem').removeClass('ib-pvi-active')
    jQuery(this).addClass('ib-pvi-active')
  })

  var temp = jQuery('<input>')
  jQuery(document).on('click', '.-clipboard', function (e) {
    e.preventDefault()
    var url = jQuery(location).attr('href')
    jQuery('body').append(temp)
    temp.val(url).select()
    document.execCommand('copy')
    temp.remove()
    jQuery('.-copied').text('URL copied!').show().delay(2000).fadeOut()
  })
}

export const dateViewRental = (rental_stay) => {
  var date_stay = rental_stay.split('-')
  return date_stay[0] + ' - ' + date_stay[1]
}

export const datesConvertView = (dt) => {
  if (dt !== null && dt !== undefined) {
    var dat = dt.split('-')
    var dat_y_out = dat[0]
    var dat_m_out = dat[1]
    var dat_d_out = dat[2]
    return dat_m_out + '/' + dat_d_out + '/' + dat_y_out
  }
  return {}
}

export const calculate_mortgage = (pricev, percentv, yearv, interestv) => {
  var price = pricev.replace(/[^\d]/g, '')
  var percent = parseFloat(percentv)
  var year = yearv.replace(/[^\d]/g, '')
  var interest = parseFloat(interestv)
  var month_factor = 0
  var down_payment = price * (percent / 100)

  interest = interest / 100

  var month_interest = interest / 12

  var financing_price = price - down_payment
  var base_rate = 1 + month_interest
  var denominator = base_rate

  for (var i = 0; i < year * 12; i++) {
    month_factor += 1 / denominator
    denominator *= base_rate
  }

  var month_payment = financing_price / month_factor
  var pmi_per_month = 0

  if (percent < 20) {
    pmi_per_month = 55 * (financing_price / 100000)
  }

  var total_monthly = month_payment + pmi_per_month

  return {
    mortgage: formatPrice(financing_price),
    down_payment: formatPrice(down_payment),
    monthly: formatPrice(month_payment, 2),
    total_monthly: formatPrice(total_monthly, 2),
  }
}

export const phoneFormat = (val) => {
  return val.replace(/[^\d]/g, '')
}
export const favoriteIcon = () => {
  let options = ['-heart', '-star', '-square']
  const position =
    window.location.host !== 'localhost:3000'
      ? parseInt(window.__flex_g_settings.params.view_icon_type)
      : 0
  return options[position]
}
