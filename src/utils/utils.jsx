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
    '$' +
    (s && p ? s : '') +
    (c ? num.replace('.', c) : num).replace(
      new RegExp(re, 'g'),
      '$&' + (d || ','),
    ) +
    (s && !p ? s : '')
  )
}

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

export const dateViewRental = (rental_stay)=>{
  var date_stay =  rental_stay.split('-');
  return date_stay[0]+" - "+date_stay[1];
}

export const datesConvertView = (dt)=>{
  if(dt!== null && dt!==undefined){
  var dat = dt.split('-');
  var dat_y_out = dat[0];
  var dat_m_out = dat[1];
  var dat_d_out = dat[2];
  return dat_m_out+"/"+dat_d_out+"/"+dat_y_out;
  }
  return {};
}

export const calculate_mortgage = (price, percent, year, interest) =>{
	var price = price.replace(/[^\d]/g, "");
	var percent = parseFloat(percent);
	var year = year.replace(/[^\d]/g, "");
	var interest = parseFloat(interest);
	var month_factor = 0;
	var month_term = year * 12;
	var down_payment = price * (percent / 100);
  
	interest = interest / 100;
  
	var month_interest = interest / 12;
	
	var financing_price = price - down_payment;
	var base_rate = 1 + month_interest;
	var denominator = base_rate;
	
	for (var i = 0; i < (year * 12); i++) {
	  month_factor += (1 / denominator);
	  denominator *= base_rate;
	}
  
	var month_payment = financing_price / month_factor;
	var pmi_per_month = 0;
	
	if (percent < 20) {
	  pmi_per_month = 55 * (financing_price / 100000);
	}
  
	var total_monthly = month_payment + pmi_per_month;
	
	return {
	  'mortgage': formatPrice(financing_price),
	  'down_payment': formatPrice(down_payment),
	  'monthly': formatPrice(month_payment, 2),
	  'total_monthly': formatPrice(total_monthly, 2)
	};
}

export const phoneFormat = (val) =>{
  return val.replace(/[^\d]/g, '');
  }
