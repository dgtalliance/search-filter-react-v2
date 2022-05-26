import { memo } from 'react'
import { initializeElement } from '../utils/utils'
import FilterSearch from './Filter/FilterSearch'
import { ModalDetailProperties } from './ModalDetailProperties/ModalDetailProperties'
import Properties from './Properties/Properties'
import MapJS from './Map/MapJS'
import CustomInfoWindowMobile from './Map/CustomInfoWindowMobile'

initializeElement()

const ContainerFiftyFifty = () => { 
  document.body.classList.add('-react-filter')
  return (
    <>
      <FilterSearch />
      <div id="ib-idx-search-filter" className="-ib-fifty-fifty">
        <MapJS />
        <Properties />
        <div className="ib-wrapper-float-actions -grid">
          <div className="ib-wrapper -round-sv">
            <button className="ib-btn">
              Save <i className="idx-icons-save"></i>
            </button>            
            <button className="ib-btn js-show-map">
              Map <i className="idx-icons-map"></i>
            </button>            
          </div>
        </div>
        <CustomInfoWindowMobile/>
      </div>

      

      {/* COMPONENTS MODALES PARA EL SEARCH FILTER */}
      <ModalDetailProperties />
    </>
  )
}

export default memo(ContainerFiftyFifty)
