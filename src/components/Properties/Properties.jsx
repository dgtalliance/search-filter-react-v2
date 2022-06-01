import { memo, useContext, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncSearch } from '../../config/actions/properties'
import {
  getpropertiesItems,
  getloading,
  updateForm,
  updateTriggered,
} from '../../config/slices/properties'
import FilterContext from '../../Contexts/FilterContext'
import NewestListings from './NewestListings'
import PropertiesItem from './PropertiesItem'
import PropertiesPaginate from './PropertiesPaginate'

function Properties() {
  const propertiesItems = useSelector(getpropertiesItems)
  const loading = useSelector(getloading)
  const dispatch = useDispatch()
 
  const { setSlug } = useContext(FilterContext)
  useEffect(() => {
    setSlug(propertiesItems.slug)
  }, [propertiesItems])
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

  const renderItem = (index, itemData, hackbox) => {
    return (
      <PropertiesItem
        key={index}
        index={index}
        itemData={itemData}
        hackbox={hackbox}
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
                  renderItem(index, itemData, propertiesItems.hackbox),
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
              your <span className="ib-gnpoall">filter</span> preferences to get
              new results or{' '}
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
