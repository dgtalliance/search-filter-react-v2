import { memo } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAsyncSearch } from '../../config/actions/properties'
import { updateForm, updateTriggered } from '../../config/slices/properties'
import Complete from './AutoCompete'
import ContainerFilterBaths from './ContainerFilterBaths'
import ContainerFilterBeds from './ContainerFilterBeds'
import ContainerFilterPrice from './ContainerFilterPrice'
import ContainerFilterPropertyType from './ContainerFilterPropertyType'
import FilterModal from './FilterModal'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import { flex_g_settings } from '../../utils/utils'
const FilterSearch = () => {
  const dispatch = useDispatch()
  const handleClean = () => {
    var params = {
      sale_type: 0,
      property_type: [],
      filter_search_keyword_label: '',
      filter_search_keyword_type: '',
      waterfront_options: '',
      polygon_search: '',
      rect: '',
      zm: '',
      parking_options: '',
      amenities: '',
      min_sale_price: '',
      max_sale_price: '',
      min_rent_price: '',
      max_rent_price: '',
      min_beds: '',
      max_beds: '',
      min_baths: '',
      max_baths: '',
      min_living_size: '',
      max_living_size: '',
      min_lot_size: '',
      max_lot_size: '',
      min_year: '',
      max_year: '',
      sort_type: '',
      page: 1,
    }
    history.replaceState(null, null, '?')
    dispatch(updateTriggered('no'))
    dispatch(updateForm(params))
    dispatch(fetchAsyncSearch())
  }

  const onClickSave = () => {
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
      // openModal save
      jQuery('#ib-fsearch-save-modal').addClass('ib-md-active')
    }
  }

  return (
    <>
      <div className="ib-guests-search">
        <div className="ib-wrapper-item -default">
          <div className="ib-wrapper-dropdown -search">
            <div className="ib-action -search js-show-basic-filter">
              <LazyLoadComponent>
                <Complete />
              </LazyLoadComponent>
            </div>
          </div>
          <LazyLoadComponent>
            <ContainerFilterPrice />
          </LazyLoadComponent>
          <LazyLoadComponent>
            <ContainerFilterBeds />
          </LazyLoadComponent>
          <LazyLoadComponent>
            <ContainerFilterBaths />
          </LazyLoadComponent>
          <LazyLoadComponent>
            <ContainerFilterPropertyType />
          </LazyLoadComponent>

          <div className="ib-wrapper-dropdown -filter">
            <button className="ib-action -filter js-show-all-filter">
              Filter
            </button>
          </div>

          <div className="ib-wrapper-dropdown -clear">
            <button className="ib-action" onClick={() => handleClean()}>
              <i className="idx-icons-clear"></i> Clear
            </button>
          </div>

          <div className="ib-wrapper-dropdown -save">
            <button
              className="ib-action js-show-modals"
              data-modal="#modalSaveSearch"              
            >
              <i className="idx-icons-save"></i> Save
            </button>
          </div>
        </div>
        <LazyLoadComponent>
          <FilterModal />
        </LazyLoadComponent>
      </div>
    </>
  )
}

export default memo(FilterSearch)
