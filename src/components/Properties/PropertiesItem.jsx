import { memo, useContext, useEffect, useState } from 'react'
import FilterContext from '../../Contexts/FilterContext'
import { favoriteIcon, flex_g_settings, formatPrice } from '../../utils/utils'
import { fetchAsyncDetails } from '../../config/actions/propertiesDetails'
import { useDispatch, useSelector } from 'react-redux'
import { getloadingfav, updateDataMap } from '../../config/slices/properties'
import CarouselLoadLazy from '../common/CarouselLoadLazy'
import { isMobile } from 'react-device-detect'
import Cookies from 'js-cookie'
import { fetchAsyncSaveFavorite } from '../../config/actions/properties'

function PropertiesItem({ itemData, isFavorite }) {
  const { openModal, setAutoMapSearch } = useContext(FilterContext)
  const getloading = useSelector(getloadingfav)
  const dispatch = useDispatch()

  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false)
  useEffect(() => {
    setIsFavoriteLoading(getloading)
  }, [getloading])

  const handleOpenModal = () => {
    dispatch(fetchAsyncDetails(itemData.mls_num))
    openModal({ mls_num: itemData.mls_num })
  }

  const newListing = (property) => {
    if ('yes' === property.recently_listed || property.min_ago_txt != '') {
      if (property.min_ago > 0 && property.min_ago_txt != '') {
        return <li className="ib-item -status">{property.min_ago_txt}</li>
      } else {
        return <li className="ib-item -status">new listing</li>
      }
    } else if (1 != property.status) {
      return <li className="ib-item -status">{property.status_name}</li>
    }
  }

  const handleOnItemMouseEnter = (e, value) => {
    e.preventDefault()
    setAutoMapSearch(false)
    if (!isMobile) {
      dispatch(updateDataMap({ mls_num: value, active: true, infoWin: true }))
    }
  }

  const handleOnItemMouseLeave = (e, value) => {
    e.preventDefault()
    setAutoMapSearch(false)
    if (!isMobile) {
      dispatch(updateDataMap({ mls_num: value, active: false, infoWin: false }))
    }
  }
  const handleFavoriteClick = (itemData) => {
    var __flex_g_settings =
      window.location.host === 'localhost:3000'
        ? flex_g_settings
        : window.__flex_g_settings

    if (__flex_g_settings.hasOwnProperty('anonymous') && 'yes' === __flex_g_settings.anonymous) {
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
      dispatch(fetchAsyncSaveFavorite({ mls_num: itemData.mls_num }))
      if (jQuery('#_ib_lead_activity_tab').length) {
        jQuery('#_ib_lead_activity_tab button:eq(1)').click()
      }
    }
  }

  return (
    <li
      className="ib-pitem"
      onMouseEnter={(e) => handleOnItemMouseEnter(e, itemData.mls_num)}
      onMouseLeave={(e) => handleOnItemMouseLeave(e, itemData.mls_num)}
    >
      <ul className="ib-info">
        <li className="ib-item -price">${formatPrice(itemData.price)}</li>
        <li className="ib-item -beds">{itemData.bed} Bed(s)</li>
        <li className="ib-item -baths">{itemData.bath} Bath(s)</li>
        <li className="ib-item -sqft">{itemData.sqft} Sq.Ft.</li>
        <li className="ib-item -address">
          {itemData.address_short}, {itemData.address_large}
        </li>
        {newListing(itemData)}
        <li className="ms-logo-board"></li>
      </ul>
      <div className="ib-pislider gs-container-slider">
        <CarouselLoadLazy
          itemsSlider={false}
          swipe={true}
          address={itemData.address_short + ' ' + itemData.address_large}
          images={itemData.gallery}
        />
      </div>
      <button
        className={
          isFavorite
            ? `ib-favorite-btn ${favoriteIcon()} -active`
            : `ib-favorite-btn ${favoriteIcon()}`
        }
        aria-label="Add Favorite"
        onClick={() => handleFavoriteClick(itemData)}
      ></button>
      <a
        mls={itemData.mls_num}
        className="ib-pipermalink js-show-modals"
        onClick={() => handleOpenModal()}
      ></a>
    </li>
  )
}

export default memo(PropertiesItem)
