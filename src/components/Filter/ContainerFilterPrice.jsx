import { memo, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAsyncSearch } from '../../config/actions/properties'
import { updateForm } from '../../config/slices/properties'
import { formatShortPriceX } from '../../utils/utils'
import FilterPrice from './FilterPrice'
const ContainerFilterPrice = () => {
  const dispatch = useDispatch()
  const maxPriceDefaultSales = 100000000
  const maxPriceDefaultRent = 100000
  const [title, settitle] = useState('Any Price')
  const [minPrice, setMinPriceParent] = useState(0)
  const [maxPrice, setMaxPriceParent] = useState(0)
  const [salestype, setSalesType] = useState(0)
  const [error, setError] = useState(false)
  const [maxPriceDefault, setMaxPriceDefault] = useState(maxPriceDefaultSales)

  const updateTitle = (min, max) => {
    if (min === 0) {
      settitle('Any' + '- $' + formatShortPriceX(max))
    }
    if (min > 0 && max === maxPriceDefault) {
      settitle('$' + formatShortPriceX(min) + '- Any')
    }
    if (min > 0 && max < maxPriceDefault) {
      settitle('$' + formatShortPriceX(min) + '- $' + formatShortPriceX(max))
    }
    if (min === 0 && max === maxPriceDefault) {
      settitle('Any Price')
    }
  }

  useEffect(() => {
    updateTitle(minPrice, maxPrice)
  }, [minPrice, maxPrice])

  const searchByPrice = () => {
    var tempPrice = {}
    if (parseInt(salestype) === 0) {
      tempPrice = {
        min_sale_price: parseInt(minPrice) === 0 ? '' : minPrice,
        max_sale_price:
          parseInt(maxPrice) === maxPriceDefaultSales ? '' : maxPrice,
        page: 1,
      }
    } else {
      tempPrice = {
        min_rent_price: parseInt(minPrice) === 0 ? '' : minPrice,
        max_rent_price:
          parseInt(maxPrice) === maxPriceDefaultRent ? '' : maxPrice,
        page: 1,
      }
    }

    if (parseInt(minPrice) > parseInt(maxPrice)) {
      setError(true)
      return
    } else {
      setError(false)
      // default params
      dispatch(updateForm(tempPrice))
      dispatch(fetchAsyncSearch())
    }
  }

  const cleanPrice = () => {
    setError(false)
    var tempPrice = {
      min_sale_price: '',
      max_sale_price: '',
      min_rent_price: '',
      max_rent_price: '',
      page: 1,
    }
    // default params
    dispatch(updateForm(tempPrice))
    dispatch(fetchAsyncSearch())
  }
  return (
    <>
      <div className="ib-wrapper-dropdown -price">
        <button className="ib-action -price js-show-basic-filter">
          <span id="text-price" data-text="Any Price">
            {title}
          </span>
        </button>
        <div className="ib-dropdown">
          <div className="ib-wrapper-title">Price Range</div>
          <div className="ib-wrapper">
            <div className="ib-flex-wrapper">
              <FilterPrice
                setMaxPriceDefault={setMaxPriceDefault}
                setMinPriceParent={setMinPriceParent}
                setMaxPriceParent={setMaxPriceParent}
                setSalesType={setSalesType}
                error={error}
                setError={setError}
              />
              <div className="ib-modal-footer">
                <a className="ib-link" onClick={() => cleanPrice()}>
                  Clear
                </a>
                <button
                  className="ib-btn js-submit-filter"
                  onClick={() => searchByPrice()}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(ContainerFilterPrice)
