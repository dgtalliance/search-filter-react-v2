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
import FilterModalBeds from './FilterModalBeds'
import FilterModalFeatures from './FilterModalFeatures'
import FilterModalParking from './FilterModalParking'
import FilterModalPrice from './FilterModalPrice'
import FilterModalWaterfront from './FilterModalWaterfront'
import FilterPropertyType from './FilterPropertyType'
import FilterSaleType from './FilterSaleType'

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
            <div className="ib-gs-item">
              <div className="ib-wrapper">
                <div className="ib-flex-wrapper">
                  <span className="ib-title">Property Search</span>
                  <FilterSaleType />
                </div>
              </div>
            </div>
            <div className="ib-gs-item">
              <div className="ib-wrapper">
                <div className="ib-flex-wrapper">
                  <span className="ib-title">Price Range</span>
                  <div className="ms-flex-wp">
                    <FilterModalPrice />
                  </div>
                </div>
              </div>
            </div>
            <div className="ib-gs-item">
              <div className="ib-wrapper">
                <div className="ib-flex-wrapper">
                  <span className="ib-title">Bedrooms</span>
                  <div className="ms-flex-wp">
                    <FilterModalBeds />
                  </div>
                </div>
              </div>
            </div>
            <div className="ib-gs-item">
              <div className="ib-wrapper">
                <div className="ib-flex-wrapper">
                  <span className="ib-title">Bathrooms</span>
                  <div className="ms-flex-wp">
                    <div className="ib-chk-list -round">
                      <div className="ant-radio-group ant-radio-group-outline">
                        <label className="ant-radio-button-wrapper ant-radio-button-wrapper-checked">
                          <span className="ant-radio-button ant-radio-button-checked">
                            <input
                              type="radio"
                              className="ant-radio-button-input"
                              value="0"
                            />
                            <span className="ant-radio-button-inner"></span>
                          </span>
                          <span>0</span>
                        </label>
                        <label className="ant-radio-button-wrapper">
                          <span className="ant-radio-button">
                            <input
                              type="radio"
                              className="ant-radio-button-input"
                              value="1+"
                            />
                            <span className="ant-radio-button-inner"></span>
                          </span>
                          <span>1+</span>
                        </label>
                        <label className="ant-radio-button-wrapper">
                          <span className="ant-radio-button">
                            <input
                              type="radio"
                              className="ant-radio-button-input"
                              value="2+"
                            />
                            <span className="ant-radio-button-inner"></span>
                          </span>
                          <span>2+</span>
                        </label>
                        <label className="ant-radio-button-wrapper">
                          <span className="ant-radio-button">
                            <input
                              type="radio"
                              className="ant-radio-button-input"
                              value="3+"
                            />
                            <span className="ant-radio-button-inner"></span>
                          </span>
                          <span>3+</span>
                        </label>
                        <label className="ant-radio-button-wrapper">
                          <span className="ant-radio-button">
                            <input
                              type="radio"
                              className="ant-radio-button-input"
                              value="4+"
                            />
                            <span className="ant-radio-button-inner"></span>
                          </span>
                          <span>4+</span>
                        </label>
                        <label className="ant-radio-button-wrapper">
                          <span className="ant-radio-button">
                            <input
                              type="radio"
                              className="ant-radio-button-input"
                              value="5+"
                            />
                            <span className="ant-radio-button-inner"></span>
                          </span>
                          <span>5+</span>
                        </label>
                      </div>
                    </div>
                    <div className="ms-line-br">
                      <span>Or Select Bedrooms Range</span>
                    </div>
                    <div className="ms-flex">
                      <div className="ms-item">
                        <select
                          style={{
                            width: '100%',
                            padding: '15px',
                            fontSize: '14px',
                            border: '1px solid #e3e3e3',
                            borderRadius: '6px',
                          }}
                        >
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                      <span className="ms-txt">to</span>
                      <div className="ms-item">
                        <select
                          style={{
                            width: '100%',
                            padding: '15px',
                            fontSize: '14px',
                            border: '1px solid #e3e3e3',
                            borderRadius: '6px',
                          }}
                        >
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ib-gs-item">
              <div className="ib-wrapper">
                <div className="ib-flex-wrapper">
                  <span className="ib-title">Living Size</span>
                  <div className="ms-flex-wp">
                    Aquí va el componente en react
                  </div>
                </div>
              </div>
            </div>
            <div className="ib-gs-item">
              <div className="ib-wrapper">
                <div className="ib-flex-wrapper">
                  <span className="ib-title">Land Size</span>
                  <div className="ms-flex-wp">
                    Aquí va el componente en react
                  </div>
                </div>
              </div>
            </div>
            <div className="ib-gs-item">
              <div className="ib-wrapper">
                <div className="ib-flex-wrapper">
                  <span className="ib-title">Year Built</span>
                  <div className="ms-flex-wp">
                    Aquí va el componente en react
                  </div>
                </div>
              </div>
            </div>
            <div className="ib-gs-item">
              <div className="ib-wrapper">
                <div className="ib-flex-wrapper">
                  <span className="ib-title">Parking Spaces</span>
                  <div className="ms-flex-wp">
                    <FilterModalParking />
                  </div>
                </div>
              </div>
            </div>
            <div className="ib-gs-item">
              <div className="ib-wrapper">
                <div className="ib-flex-wrapper">
                  <span className="ib-title">Waterfront Description</span>
                  <div className="ms-flex-wp">
                    <FilterModalWaterfront />
                  </div>
                </div>
              </div>
            </div>
            <div className="ib-gs-item">
              <div className="ib-wrapper">
                <div className="ib-flex-wrapper">
                  <span className="ib-title">Property Type</span>
                  <div className="ib-typesList">
                    <FilterPropertyType />
                  </div>
                </div>
              </div>
            </div>
            <div className="ib-gs-item">
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
