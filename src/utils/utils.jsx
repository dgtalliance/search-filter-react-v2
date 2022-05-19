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
      item: Object.assign(row, { hovered: false }),
      group: related_properties,
    })
  }

  return unique_properties
}

export const hoveredItem = (mls, markers, active) => {
  var updatedMarkers = []

  markers.forEach((marker) => {
    var t = Object.assign({}, marker.item)
    if (marker.item.mls_num === mls) {
      updatedMarkers.push({
        item: Object.assign(t, { hovered: active }),
        group: marker.group,
      })
    } else {
      updatedMarkers.push({
        item: Object.assign(t, { hovered: false }),
        group: marker.group,
      })
    }
  })
  return updatedMarkers
}
export const hoverMapGrid = (ele) => {
  Array.from(document.getElementsByClassName('markerOverlay')).forEach(f => {
    if (f.className.includes('active')) {
      document.getElementById(f.id).classList.remove('active')
    }
  });
  if (document.getElementById(ele) !== null)
    document.getElementById(ele).classList.add('active')
}

export const clearHover = () => {
  Array.from(document.getElementsByClassName('markerOverlay')).forEach(f => {
    if (f.className.includes('active')) {
      document.getElementById(f.id).classList.remove('active')
    }
  });
}

export const removeChild = () => {
  const removeChild = document.getElementsByClassName('gm-style')[0].children[1].children[1].children[0].children[2];
  removeChild.innerHTML = '';
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
  let options = ['-heart','-star', '-square']
  const position = window.location.host === 'http://wordpress.test/'
    ? 0
    : parseInt(window.__flex_g_settings.params.view_icon_type)
  return options[position];
}
