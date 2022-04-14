import { memo } from 'react'
import { useSelector } from 'react-redux'
import { getproperties } from '../../config/slices/properties'
import PropertiesItem from './PropertiesItem'
import PropertiesPaginate from './PropertiesPaginate'

function Properties() {
  const propertiesData = useSelector(getproperties)
  console.log(propertiesData)
  return (
    <>
      {Object.keys(propertiesData).length > 0 && (
        <div className="ib-wrapper-grid">
          <div className="ib-wrapper-info-search">
            <span className="ib-text-info">
              {`Showing ${propertiesData.pagination.start} to ${propertiesData.pagination.end} of ${propertiesData.pagination.count} Properties.`}
            </span>

            <div className="ms-dropdown-filter">
              <button className="ms-item-selected">Newest Listings</button>
              <ul className="ms-dropdown-list">
                <li>
                  <a href="#" className="active ms-item">
                    Newest Listings
                  </a>
                </li>
                <li>
                  <a href="#" className="ms-item">
                    Highest Price
                  </a>
                </li>
                <li>
                  <a href="#" className="ms-item">
                    Lowest Price
                  </a>
                </li>
                <li>
                  <a href="#" className="ms-item">
                    Highest Sq.Ft
                  </a>
                </li>
                <li>
                  <a href="#" className="ms-item">
                    Lowest Sq.Ft
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="ib-wrapper-grid-result">
            <ul className="ib-lproperties ib-listings-ct">
              {propertiesData.items.map((itemData, index) => (
                <PropertiesItem key={index} itemData={itemData} />
              ))}
            </ul>
          </div>
          <div className="ib-wrapper-pagination">
            <PropertiesPaginate pagination={propertiesData.pagination} current={propertiesData.params.currentpage} />
          </div>
        </div>
      )}
    </>
  )
}

export default memo(Properties)
