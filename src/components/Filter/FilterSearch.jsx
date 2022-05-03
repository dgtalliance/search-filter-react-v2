import { memo } from 'react'
import Complete from './AutoCompete'
import ContainerFilterBaths from './ContainerFilterBaths'
import ContainerFilterBeds from './ContainerFilterBeds'
import ContainerFilterPrice from './ContainerFilterPrice'
import ContainerFilterPropertyType from './ContainerFilterPropertyType'
import FilterModal from './FilterModal'
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

          <ContainerFilterBaths/>

          {/* 
          
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
          </div> */}

         <ContainerFilterPropertyType/>

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

        <FilterModal/>
      </div>
    </>
  )
}

export default memo(FilterSearch)
