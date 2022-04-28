import { memo, useContext, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncSearch } from '../../config/actions/properties'
import {
  getpropertiesItems,
  getloading,
  updateForm,
} from '../../config/slices/properties'
import FilterContext from '../../Contexts/FilterContext'
import PropertiesItem from './PropertiesItem'
import PropertiesPaginate from './PropertiesPaginate'

function Properties() {
  const propertiesItems = useSelector(getpropertiesItems)
  const loading = useSelector(getloading)
  const dispatch = useDispatch()
  console.log('Render Properties')
  const { setSlug } = useContext(FilterContext)
  useEffect(() => {
    setSlug(propertiesItems.slug)
  }, [propertiesItems])

  const handleSort = (query) => {
    dispatch(updateForm({ page: 1, sort_type: query }))
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
  return (
    <>
      <div className="ib-wrapper-grid">
        {loading === true && !Object.keys(propertiesItems?.items).length > 0 ? (
          <div className="ib-gnopro">
            <span className="ib-gnpno">Searching...</span>
          </div>
        ) : (
          <>
            {Object.keys(propertiesItems?.items).length > 0 ? (
              <>
                <div className="ib-wrapper-info-search">
                  <span className="ib-text-info">
                    {`Showing ${propertiesItems.pagination.start} to ${propertiesItems.pagination.end} of ${propertiesItems.pagination.count} Properties.`}
                  </span>

                  <div className="ms-dropdown-filter">
                    <button className="ms-item-selected">
                      Newest Listings
                    </button>
                    <ul className="ms-dropdown-list">
                      <li>
                        <a
                          href="#"
                          className="active ms-item"
                          onClick={() => handleSort('list_date-desc')}
                        >
                          Newest Listings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="ms-item"
                          onClick={() => handleSort('price-desc')}
                        >
                          Highest Price
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="ms-item"
                          onClick={() => handleSort('price-asc')}
                        >
                          Lowest Price
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="ms-item"
                          onClick={() => handleSort('sqft-desc')}
                        >
                          Highest Sq.Ft
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="ms-item"
                          onClick={() => handleSort('sqft-asc')}
                        >
                          Lowest Sq.Ft
                        </a>
                      </li>
                    </ul>
                  </div>
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
                  />
                </div>
              </>
            ) : (
              <>
                <div className="ib-gnopro">
                  <span className="ib-gnpno">No matching results...</span>Modify
                  your <span className="ib-gnpoall">filter</span> preferences to
                  get new results or{' '}
                  <span className="ib-gnpclear" onClick={null}>
                    clear
                  </span>{' '}
                  your search.
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default memo(Properties)
