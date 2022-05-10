import { fetchAsyncSearch } from '../../config/actions/properties'
import { getparams, updateForm } from '../../config/slices/properties'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const NewestListings = () => {
  const dispatch = useDispatch()
  const params = useSelector(getparams)
  const [active, setActive] = useState('list_date-desc')

  useEffect(() => {
    var { sort_type } = params
    setActive(sort_type)
    console.log('NewestListings', sort_type)
  }, [params])

  const handleSort = (query) => {
    dispatch(updateForm({ page: 1, sort_type: query }))
    dispatch(fetchAsyncSearch())
  }
  const isActive = (compare, key) => {
    return compare === key ? 'active' : ''
  }
  const isActiveName = (key) => {
    switch (key) {
      case 'list_date-desc':
        return 'Newest Listings'
      case 'last_updated-desc':
        return 'Modified Listings'
      case 'price-desc':
        return 'Highest Price'
      case 'price-asc':
        return 'Lowest Price'
      case 'sqft-desc':
        return 'Highest Sq.Ft'
      case 'sqft-asc':
        return ' Lowest Sq.Ft'
      case 'check_price_change_timestamp-desc':
        return 'Just Reduced'
      case 'price_sqft-desc':
        return 'Highest Price/Sq.Ft'
      case 'price_sqft-asc':
        return 'Lowest Price/Sq.Ft'
      default:
        return 'Newest Listings'
    }
  }

  return (
    <>
      <div className="ms-dropdown-filter">
        <button className="ms-item-selected">{isActiveName(active)}</button>
        <ul className="ms-dropdown-list">
          <li>
            <a
              className={`${isActive('list_date-desc', active)} ms-item`}
              onClick={() => handleSort('list_date-desc')}
            >
              Newest Listings
            </a>
          </li>
          <li>
            <a
              className={`${isActive('last_updated-desc', active)} ms-item`}
              onClick={() => handleSort('last_updated-desc')}
            >
              Modified Listings
            </a>
          </li>
          <li>
            <a
              className={`${isActive('price-desc', active)} ms-item`}
              onClick={() => handleSort('price-desc')}
            >
              Highest Price
            </a>
          </li>
          <li>
            <a
              className={`${isActive('price-asc', active)} ms-item`}
              onClick={() => handleSort('price-asc')}
            >
              Lowest Price
            </a>
          </li>

          <li>
            <a
              className={`${isActive('sqft-desc', active)} ms-item`}
              onClick={() => handleSort('sqft-desc')}
            >
              Highest Sq.Ft
            </a>
          </li>
          <li>
            <a
              className={`${isActive('sqft-asc', active)} ms-item`}
              onClick={() => handleSort('sqft-asc')}
            >
              Lowest Sq.Ft
            </a>
          </li>
          <li>
            <a
              className={`${isActive(
                'check_price_change_timestamp-desc',
                active,
              )} ms-item`}
              onClick={() => handleSort('check_price_change_timestamp-desc')}
            >
              Just Reduced
            </a>
          </li>

          <li>
            <a
              className={`${isActive('price_sqft-desc', active)} ms-item`}
              onClick={() => handleSort('price_sqft-desc')}
            >
              Highest Price/Sq.Ft
            </a>
          </li>
          <li>
            <a
              className={`${isActive('price_sqft-asc', active)} ms-item`}
              onClick={() => handleSort('price_sqft-asc')}
            >
              Lowest Price/Sq.Ft
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default NewestListings
