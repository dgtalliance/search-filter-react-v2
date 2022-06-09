import { memo } from 'react'
import { flex_g_settings, initializeElement } from '../utils/utils'
import FilterSearch from './Filter/FilterSearch'
import { ModalDetailProperties } from './ModalDetailProperties/ModalDetailProperties'
import Properties from './Properties/Properties'
import MapJS from './Map/MapJS'
import CustomInfoWindowMobile from './Map/CustomInfoWindowMobile'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import { defaultPropsShortCode } from '../App'
import PropertiesModalSave from './Properties/PropertiesModalSave'

initializeElement()

const ContainerFiftyFifty = () => {
  document.body.classList.add('-react-filter')
  document.body.classList.add('draw-map')

  return (
    <>
      <LazyLoadComponent>
        <FilterSearch />
      </LazyLoadComponent>
      <div id="ib-idx-search-filter" className="-ib-fifty-fifty">
        <LazyLoadComponent>
          <MapJS />
        </LazyLoadComponent>
        <LazyLoadComponent>
          <Properties />
        </LazyLoadComponent>
        <div className="ib-wrapper-float-actions -grid">
          <div className="ib-wrapper -round-sv">
            <button
              className="ib-btn js-show-modals"
              data-modal="#modalSaveSearch"
            >
               Save <i className="idx-icons-save"></i>
            </button>
            <button className="ib-btn js-show-map">
              Map <i className="idx-icons-map"></i>
            </button>
          </div>
        </div>
        <LazyLoadComponent>
          <CustomInfoWindowMobile />
        </LazyLoadComponent>
      </div>

      {/* COMPONENTS MODALES PARA EL SEARCH FILTER */}
      <LazyLoadComponent>
        <ModalDetailProperties />
      </LazyLoadComponent>     
      <LazyLoadComponent>
        <PropertiesModalSave />
      </LazyLoadComponent>
    </>
  )
}

export default memo(ContainerFiftyFifty)
