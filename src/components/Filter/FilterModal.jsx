import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncSearch } from '../../config/actions/properties'

import {
  getloading,
  getpropertiesItems,
  updateForm,
  updateTriggered,
} from '../../config/slices/properties'
import { formatShortPriceX } from '../../utils/utils'
import FilterSaleType from './FilterSaleType'
import FilterModalBaths from './FilterModalBaths'
import FilterModalBeds from './FilterModalBeds'
import FilterModalFeatures from './FilterModalFeatures'
import FilterModalLivingSize from './FilterModalLivingSize'
import FilterModalLandSize from './FilterModalLandSize'
import FilterModalYearBuilt from './FilterModalYearBuilt' 
import FilterModalParking from './FilterModalParking'
import FilterModalPrice from './FilterModalPrice'
import FilterModalWaterfront from './FilterModalWaterfront'
import FilterPropertyType from './FilterPropertyType'

const FilterModal = () => {
  const propertiesItems = useSelector(getpropertiesItems)
  const loadingData = useSelector(getloading)
  const dispatch = useDispatch()
  const [itemscount, setItems] = useState(0)
  const [loading, setloading] = useState(false)

  useEffect(() => {
    var { pagination } = propertiesItems
    setItems(pagination.count)
    setloading(loadingData)
  }, [propertiesItems, loadingData])

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

  return (
    <>
      <div className="ib-guests-search-modal">
        <div className="ib-wrapper-modal">
          <div className="ib-md-header">
            <span className="ib-text">More Filters</span>
            <button className="ib-btn -close js-close-filter">Close</button>
          </div>

          <div className="ib-body-guests">
            <div className="ib-gs-item -full -sale-type">
              <div className="ib-wrapper">
                <div className="ib-flex-wrapper">
                  <span className="ib-title">Property Search</span>
                  <FilterSaleType />
                </div>
              </div>
            </div>
            <div className="ib-gs-item -bedrooms">
              <div className="ib-wrapper">
                <div className="ib-flex-wrapper">
                  <span className="ib-title">Bedrooms</span>
                  <div className="ms-flex-wp">
                    <FilterModalBeds />
                  </div>
                </div>
              </div>
            </div>
            <div className="ib-gs-item -bathrooms">
              <div className="ib-wrapper">
                <div className="ib-flex-wrapper">
                  <span className="ib-title">Bathrooms</span>
                  <div className="ms-flex-wp">
                    <FilterModalBaths />
                  </div>
                </div>
              </div>
            </div>
            <div className="ib-gs-item -price-range">
              <div className="ib-wrapper">
                <div className="ib-flex-wrapper">
                  <span className="ib-title">Price Range</span>
                  <div className="ms-flex-wp">
                    <FilterModalPrice />
                  </div>
                </div>
              </div>
            </div>
            <div className="ib-gs-item -living-size">
              <div className="ib-wrapper">
                <div className="ib-flex-wrapper">
                  <span className="ib-title">Living Size</span>
                  <div className="ms-flex-wp">
                    <FilterModalLivingSize />
                  </div>
                </div>
              </div>
            </div>
            <div className="ib-gs-item -land-size">
              <div className="ib-wrapper">
                <div className="ib-flex-wrapper">
                  <span className="ib-title">Land Size</span>
                  <div className="ms-flex-wp">
                     <FilterModalLandSize />
                  </div>
                </div>
              </div>
            </div>
            <div className="ib-gs-item -year-built">
              <div className="ib-wrapper">
                <div className="ib-flex-wrapper">
                  <span className="ib-title">Year Built</span>
                  <div className="ms-flex-wp">
                    <FilterModalYearBuilt />
                  </div>
                </div>
              </div>
            </div>
            <div className="ib-gs-item -parking-spaces">
              <div className="ib-wrapper">
                <div className="ib-flex-wrapper">
                  <span className="ib-title">Parking Spaces</span>
                  <div className="ms-flex-wp">
                    <FilterModalParking />
                  </div>
                </div>
              </div>
            </div>
            <div className="ib-gs-item -waterfront">
              <div className="ib-wrapper">
                <div className="ib-flex-wrapper">
                  <span className="ib-title">Waterfront Description</span>
                  <div className="ms-flex-wp">
                    <FilterModalWaterfront />
                  </div>
                </div>
              </div>
            </div>
            <div className="ib-gs-item -property-type">
              <div className="ib-wrapper">
                <div className="ib-flex-wrapper">
                  <span className="ib-title">Property Type</span>
                  <div className="ib-typesList">
                    <FilterPropertyType />
                  </div>
                </div>
              </div>
            </div>
            <div className="ib-gs-item -features">
              <div className="ib-wrapper">
                <div className="ib-flex-wrapper">
                  <span className="ib-title">Features</span>
                  <div className="ib-typesList">
                    <FilterModalFeatures />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ib-modal-footer">
            <a onClick={() => handleClean()} className="ib-link">
              Clear
            </a>
            <Button className="ib-btn js-submit-filter" loading={loading}>
              View {formatShortPriceX(itemscount)} Listings
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default FilterModal
