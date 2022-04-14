import { memo } from 'react'
import { initializeElement } from '../utils/utils'
import FilterSearch from './Filter/FilterSearch'
import MapSearch from './Map/MapSearch'
import Properties from './Properties/Properties'

initializeElement()

const ContainerFiftyFifty = () => {
  return (
    <>
      <FilterSearch />
      <div id="ib-idx-search-filter" className="-ib-fifty-fifty">
        <MapSearch />
        <Properties/>
        <div className="ib-wrapper-float-actions -grid">
          <div className="ib-wrapper -round-sv">
            <button className="ib-btn">
              Save <i className="idx-icons-save"></i>
            </button>
            <button className="ib-btn js-show-grid">
              Grid <i className="idx-icons-grid"></i>
            </button>
            <button className="ib-btn js-show-map">
              Map <i className="idx-icons-map"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(ContainerFiftyFifty)
