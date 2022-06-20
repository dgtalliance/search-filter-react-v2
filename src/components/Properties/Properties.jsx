import { memo, useContext, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAsyncGetSaveFavorite,
  fetchAsyncSearch,
} from '../../config/actions/properties'
import { fetchAsyncDetails } from '../../config/actions/propertiesDetails'
import {
  getpropertiesItems,
  getloading,
  updateForm,
  updateTriggered,
  getsavedlistings,
  getmls,
  updateMLS,
} from '../../config/slices/properties'
import FilterContext from '../../Contexts/FilterContext'
import { flex_g_settings } from '../../utils/utils'
import NewestListings from './NewestListings'
import PropertiesItem from './PropertiesItem'
import PropertiesPaginate from './PropertiesPaginate'

const useMutationObserver = (
  ref,
  callback,
  options = {
    attributes: false,
    characterData: false,
    childList: false,
    subtree: false,
  },
) => {
  useEffect(() => {
    if (ref.current) {
      const observer = new MutationObserver(callback)
      observer.observe(ref.current, options)
      return () => observer.disconnect()
    }
  }, [callback, options])
}

const Properties = () => {
  const propertiesItems = useSelector(getpropertiesItems)
  const savedlistings = useSelector(getsavedlistings)
  const loading = useSelector(getloading)
  const mls = useSelector(getmls)
  const dispatch = useDispatch()

  // Observable for html elements
  const observerRef = useRef()

  observerRef.current = document.getElementById('ip-header')

  const getSaveListings = () => {
    var __flex_g_settings =
      window.location.host === 'localhost:3000'
        ? flex_g_settings
        : window.__flex_g_settings

    if (
      __flex_g_settings.hasOwnProperty('anonymous') &&
      __flex_g_settings.anonymous === 'no'
    ) {
      dispatch(fetchAsyncGetSaveFavorite())
    }
  }

  useMutationObserver(observerRef, getSaveListings, {
    attributes: true,
    characterData: false,
    childList: true,
    subtree: true,
  })

  const { setSlug,setModalData } = useContext(FilterContext)

  useEffect(() => {
    setSlug(propertiesItems.slug)

    console.log('mls_num', mls)
    if (null !== mls) {
      dispatch(fetchAsyncDetails(mls))     
      if (!document.body.classList.contains('openModals')) {
        document.body.classList.add('openModals')

        var url = ''

        if (window.location.search !== '' && window.location.search !== '?') {
          url = window.location.search.replace('?','')
        }
        var new_slug = url !== '' ? url + `&show=${mls}` : `show=${mls}`
        console.log('slug', new_slug)
        history.replaceState(null, null, '?' + new_slug)
        setSlug(new_slug.replace('?',''))
        setModalData({ mls_num: mls })
        dispatch(updateMLS(null))
      }
    }
  }, [propertiesItems, savedlistings])

  const infoSearch = useRef()

  const handleClean = () => {
    var params = {
      sale_type: '',
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
      page: '',
    }
    dispatch(updateTriggered('no'))
    dispatch(updateForm(params))
    dispatch(fetchAsyncSearch())
  }
  const isFavorite = (mls_num) => {
    if (Object.keys(savedlistings).length > 0) {
      var result = savedlistings.filter((item) => item.mls_num == mls_num)
      if (result.length === 1) {
        return true
      }
    }
    return false
  }

  const renderItem = (index, itemData, hackbox, isFavorite, count) => {
    return (
      <PropertiesItem
        key={index}
        index={index}
        itemData={itemData}
        hackbox={hackbox}
        isFavorite={isFavorite}
        count={count}
      />
    )
  }
  const html_properties = () => {
    return (
      <>
        {Object.keys(propertiesItems?.items).length > 0 ? (
          <>
            <div className="ib-wrapper-info-search" ref={infoSearch}>
              <span className="ib-text-info">
                {`Showing ${propertiesItems.pagination.start} to ${propertiesItems.pagination.end} of ${propertiesItems.pagination.count} Properties.`}
              </span>
              <NewestListings />
            </div>
            <div className="ib-wrapper-grid-result">
              <ul className="ib-lproperties ib-listings-ct">
                {propertiesItems.items.map((itemData, index) =>
                  renderItem(
                    index,
                    itemData,
                    propertiesItems.hackbox,
                    isFavorite(itemData.mls_num),
                    propertiesItems.items?.length,
                  ),
                )}
              </ul>
            </div>
            <div className="ib-wrapper-pagination">
              <PropertiesPaginate
                pagination={propertiesItems.pagination}
                current={propertiesItems.currentpage}
                infoSearch={infoSearch}
              />
            </div>
          </>
        ) : (
          <>
            <div className="ib-gnopro">
              <span className="ib-gnpno">No matching results...</span>Modify
              your <span className="ib-gnpoall js-show-all-filter">filter</span>{' '}
              preferences to get new results or{' '}
              <span className="ib-gnpclear" onClick={handleClean}>
                clear
              </span>{' '}
              your search.
            </div>
          </>
        )}
      </>
    )
  }
  return (
    <>
      <div className="ib-wrapper-grid">
        {loading == true && !Object.keys(propertiesItems?.items).length > 0 ? (
          <div className="ib-gnopro">
            <span className="ib-gnpno">Searching...</span>
          </div>
        ) : (
          html_properties()
        )}
      </div>
    </>
  )
}

export default memo(Properties)
