import { memo } from 'react'
import Complete from './AutoCompete'
import ContainerFilterBeds from './ContainerFilterBeds'
import ContainerFilterPrice from './ContainerFilterPrice'
import FilterSaleType from './FilterSaleType'

const FilterSearch = () => {
  console.log('Render Filter')
  return (
    <>
      <div className="ib-guests-search">
        <div className="ib-wrapper-item -default">
          <div className="ib-wrapper-dropdown -search">
            <div className="ib-action -search js-show-basic-filter">
              <Complete />
            </div>
          </div>

          <ContainerFilterPrice />

          <ContainerFilterBeds />

          <div className="ib-wrapper-dropdown -baths">
            <button className="ib-action -baths js-show-basic-filter">
              <span id="text-baths" data-text="Any Baths">
                Any Baths
              </span>
            </button>
            <div className="ib-dropdown">
              <div className="ib-wrapper-title">Bathrooms</div>
              <div className="ib-wrapper">
                <div className="ib-flex-wrapper">
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

          <div className="ib-wrapper-dropdown -types">
            <button className="ib-action -types js-show-basic-filter">
              <span id="text-types" data-text="Any Types">
                Any Types
              </span>
            </button>
            <div className="ib-dropdown">
              <div className="ib-wrapper-title">Any Types</div>
              <div className="ib-wrapper">
                <div className="ib-flex-wrapper">
                  <div className="ib-typesList">
                    <div className="ib-chk-wrapper">
                      <input
                        type="checkbox"
                        id="ib-ppt-outer_0"
                        name="any_types"
                        value="0"
                      />
                      <label htmlFor="ib-ppt-outer_0">
                        Single Family Homes
                      </label>
                    </div>
                    <div className="ib-chk-wrapper">
                      <input
                        type="checkbox"
                        id="ib-ppt-outer_1"
                        name="any_types"
                        value="1"
                      />
                      <label htmlFor="ib-ppt-outer_1">Condominiums</label>
                    </div>
                    <div className="ib-chk-wrapper">
                      <input
                        type="checkbox"
                        id="ib-ppt-outer_2"
                        name="any_types"
                        value="2"
                      />
                      <label htmlFor="ib-ppt-outer_2">Townhouses</label>
                    </div>
                    <div className="ib-chk-wrapper">
                      <input
                        type="checkbox"
                        id="ib-ppt-outer_3"
                        name="any_types"
                        value="3"
                      />
                      <label htmlFor="ib-ppt-outer_3">Multi-Family</label>
                    </div>
                    <div className="ib-chk-wrapper">
                      <input
                        type="checkbox"
                        id="ib-ppt-outer_4"
                        name="any_types"
                        value="4"
                      />
                      <label htmlFor="ib-ppt-outer_4">Vacant Land</label>
                    </div>
                    <input type="text" className="temporal-txt" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ib-wrapper-dropdown -filter">
            <button className="ib-action -filter js-show-all-filter">
              Filter
            </button>
          </div>

          <div className="ib-wrapper-dropdown -clear">
            <button className="ib-action">
              <i className="idx-icons-clear"></i> Clear
            </button>
          </div>

          <div className="ib-wrapper-dropdown -save">
            <button className="ib-action">
              <i className="idx-icons-save"></i> Save
            </button>
          </div>
        </div>

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
                      Aquí va el componente en react
                    </div>
                  </div>
                </div>
              </div>
              <div className="ib-gs-item">
                <div className="ib-wrapper">
                  <div className="ib-flex-wrapper">
                    <span className="ib-title">Bedrooms</span>
                    <div className="ms-flex-wp">
                      <div className="ib-chk-list -round">
                        <div className="ant-radio-group ant-radio-group-outline">
                          <label className="ant-radio-button-wrapper ant-radio-button-wrapper-checked">
                            <span className="ant-radio-button ant-radio-button-checked">
                              <input
                                type="radio"
                                className="ant-radio-button-input"
                                value="studio"
                              />
                              <span className="ant-radio-button-inner"></span>
                            </span>
                            <span>Studio</span>
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
                            <option value="Studio">Studio</option>
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
                            <option value="Studio">Studio</option>
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
                      <select
                        style={{
                          width: '100%',
                          padding: '15px',
                          fontSize: '14px',
                          border: '1px solid #e3e3e3',
                          borderRadius: '6px',
                        }}
                      >
                        <option value="--">Any</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">5+</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ib-gs-item">
                <div className="ib-wrapper">
                  <div className="ib-flex-wrapper">
                    <span className="ib-title">Waterfront Description</span>
                    <div className="ms-flex-wp">
                      <select
                        style={{
                          width: '100%',
                          padding: '15px',
                          fontSize: '14px',
                          border: '1px solid #e3e3e3',
                          borderRadius: '6px',
                        }}
                      >
                        <option value="--">Any</option>
                        <option value="bay">Bay</option>
                        <option value="canal">Canal</option>
                        <option value="fixed-bridge">Fixed Bridge</option>
                        <option value="intracoastal">Intracoastal</option>
                        <option value="lake">Lake Front</option>
                        <option value="ocean-access">Ocean Access</option>
                        <option value="point-lot">Point Lot</option>
                        <option value="river">River Front</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ib-gs-item">
                <div className="ib-wrapper">
                  <div className="ib-flex-wrapper">
                    <span className="ib-title">Type</span>
                    <div className="ib-typesList">
                      <div className="ib-chk-wrapper">
                        <input
                          type="checkbox"
                          id="ib-ppt-outer_min_0"
                          name="any_types"
                          value="0"
                        />
                        <label htmlFor="ib-ppt-outer_min_0">
                          Single Family Homes
                        </label>
                      </div>
                      <div className="ib-chk-wrapper">
                        <input
                          type="checkbox"
                          id="ib-ppt-outer_min_1"
                          name="any_types"
                          value="1"
                        />
                        <label htmlFor="ib-ppt-outer_min_1">Condominiums</label>
                      </div>
                      <div className="ib-chk-wrapper">
                        <input
                          type="checkbox"
                          id="ib-ppt-outer_min_2"
                          name="any_types"
                          value="2"
                        />
                        <label htmlFor="ib-ppt-outer_min_2">Townhouses</label>
                      </div>
                      <div className="ib-chk-wrapper">
                        <input
                          type="checkbox"
                          id="ib-ppt-outer_min_3"
                          name="any_types"
                          value="3"
                        />
                        <label htmlFor="ib-ppt-outer_min_3">Multi-Family</label>
                      </div>
                      <div className="ib-chk-wrapper">
                        <input
                          type="checkbox"
                          id="ib-ppt-outer_min_4"
                          name="any_types"
                          value="4"
                        />
                        <label htmlFor="ib-ppt-outer_min_4">Vacant Land</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ib-gs-item">
                <div className="ib-wrapper">
                  <div className="ib-flex-wrapper">
                    <span className="ib-title">Features</span>
                    <div className="ib-typesList">
                      <div className="ib-chk-wrapper">
                        <input
                          type="checkbox"
                          id="ib-amt-inner-amt_0"
                          name="any_features"
                          value="pool"
                        />
                        <label htmlFor="ib-amt-inner-amt_0">
                          Swimming Pool
                        </label>
                      </div>
                      <div className="ib-chk-wrapper">
                        <input
                          type="checkbox"
                          id="ib-amt-inner-amt_1"
                          name="any_features"
                          value="golf"
                        />
                        <label htmlFor="ib-amt-inner-amt_1">Golf Course</label>
                      </div>
                      <div className="ib-chk-wrapper">
                        <input
                          type="checkbox"
                          id="ib-amt-inner-amt_2"
                          name="any_features"
                          value="tennis"
                        />
                        <label htmlFor="ib-amt-inner-amt_2">
                          Tennis Courts
                        </label>
                      </div>
                      <div className="ib-chk-wrapper">
                        <input
                          type="checkbox"
                          id="ib-amt-inner-amt_3"
                          name="any_features"
                          value="gated_community"
                        />
                        <label htmlFor="ib-amt-inner-amt_3">
                          Gated Community
                        </label>
                      </div>
                      <div className="ib-chk-wrapper">
                        <input
                          type="checkbox"
                          id="ib-amt-inner-amt_4"
                          name="any_features"
                          value="penthouse"
                        />
                        <label htmlFor="ib-amt-inner-amt_4">Penthouse</label>
                      </div>
                      <div className="ib-chk-wrapper">
                        <input
                          type="checkbox"
                          id="ib-amt-inner-amt_5"
                          name="any_features"
                          value="water_front"
                        />
                        <label htmlFor="ib-amt-inner-amt_5">Waterfront</label>
                      </div>
                      <div className="ib-chk-wrapper">
                        <input
                          type="checkbox"
                          id="ib-amt-inner-amt_6"
                          name="any_features"
                          value="pets"
                        />
                        <label htmlFor="ib-amt-inner-amt_6">Pets</label>
                      </div>
                      <div className="ib-chk-wrapper">
                        <input
                          type="checkbox"
                          id="ib-amt-inner-amt_7"
                          name="any_features"
                          value="furnished"
                        />
                        <label htmlFor="ib-amt-inner-amt_7">Furnished</label>
                      </div>
                      <div className="ib-chk-wrapper">
                        <input
                          type="checkbox"
                          id="ib-amt-inner-amt_8"
                          name="any_features"
                          value="boat_dock"
                        />
                        <label htmlFor="ib-amt-inner-amt_8">Boat Dock</label>
                      </div>
                      <div className="ib-chk-wrapper">
                        <input
                          type="checkbox"
                          id="ib-amt-inner-amt_9"
                          name="any_features"
                          value="short_sale"
                        />
                        <label htmlFor="ib-amt-inner-amt_9">Short Sales</label>
                      </div>
                      <div className="ib-chk-wrapper">
                        <input
                          type="checkbox"
                          id="ib-amt-inner-amt_10"
                          name="any_features"
                          value="foreclosure"
                        />
                        <label htmlFor="ib-amt-inner-amt_10">
                          Foreclosures
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ib-modal-footer">
              <a href="#" className="ib-link">
                Clear
              </a>
              <button className="ib-btn js-submit-filter">
                View 4K Listings
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(FilterSearch)
