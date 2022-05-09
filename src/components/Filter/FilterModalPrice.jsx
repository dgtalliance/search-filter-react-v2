import { Input, Slider } from 'antd'
import { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncSearch } from '../../config/actions/properties'
import { getparams, updateForm } from '../../config/slices/properties'
import { formatShortPriceX, numberWithCommas } from '../../utils/utils'

const FilterModalPrice = () => {
  const dispatch = useDispatch()
  const maxPriceDefaultSales = 100000000
  const maxPriceDefaultRent = 100000
  const [maxPriceDefault, setmaxPriceDefault] = useState(maxPriceDefaultSales)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(maxPriceDefault)
  const params = useSelector(getparams)
  const [error, setError] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState(0)
  const [saletype, setSaletype] = useState(0)

  useEffect(() => {
    var min, max
    var {
      sale_type,
      min_rent_price,
      max_rent_price,
      min_sale_price,
      max_sale_price,
    } = params
    setSaletype(sale_type)
    if (parseInt(sale_type) === 0) {
      setmaxPriceDefault(maxPriceDefaultSales)
      min = min_sale_price !== '' ? parseInt(min_sale_price) : 0
      max =
        max_sale_price !== '' ? parseInt(max_sale_price) : maxPriceDefaultSales
      setMinPrice(min_sale_price !== '' ? parseInt(min_sale_price) : 0)
      setMaxPrice(
        max_sale_price !== '' ? parseInt(max_sale_price) : maxPriceDefaultSales,
      )
    } else {
      setmaxPriceDefault(maxPriceDefaultRent)
      min = min_rent_price !== '' ? parseInt(min_rent_price) : 0
      max =
        max_rent_price !== '' ? parseInt(max_rent_price) : maxPriceDefaultRent
      setMinPrice(min_rent_price !== '' ? parseInt(min_rent_price) : 0)
      setMaxPrice(
        max_rent_price !== '' ? parseInt(max_rent_price) : maxPriceDefaultRent,
      )
    }
  }, [params])

  const onChangeMin = (e) => {
    if ('' === e.target.value) {
      setMinPrice(0)
      return
    }
    var inputValue = parseInt(numberNotCommas(e.target.value))
    if (!isNaN(inputValue)) {
      setMinPrice(parseInt(inputValue))
    }
    updatePrice(parseInt(inputValue), maxPrice, saletype)
  }

  const onChangeMax = (e) => {
    if ('' === e.target.value) {
      setMaxPrice(maxPriceDefault)
      return
    }

    var inputValue = parseInt(numberNotCommas(e.target.value))
    if (!isNaN(inputValue)) {
      setMaxPrice(parseInt(inputValue))
    }
    updatePrice(minPrice, parseInt(inputValue), saletype)
  }

  //function tools
  const transformPrice = (price) => {
    if (
      price === 0 ||
      price === maxPriceDefault ||
      price === null
    ) {
      return 'Any'
    } else {
      return numberWithCommas(price)
    }
  }
  const formatter = (value) => {
    return `$${formatShortPriceX(value)}`
  }
  const numberNotCommas = (value) => value.replace(/,/g, '')

  const onChange = (value) => {
    if (parseInt(value[0]) < parseInt(value[1])) {
      setMinPrice(parseInt(value[0]))
      setMaxPrice(parseInt(value[1]))
    }

    if (value[0] === 0) {
      setMinPrice(0)
    }
    if (value[1] === maxPriceDefault) {
      setMaxPrice(maxPriceDefault)
    }
  }

  const updatePrice = (min, max, type) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }
    setTypingTimeout(
      setTimeout(function () {
        console.log('typingTimeout', min, max, type)

        var tempPrice = {}
        if (parseInt(type) === 0) {
          tempPrice = {
            min_sale_price: parseInt(min) === 0 ? '' : min,
            max_sale_price: parseInt(max) === maxPriceDefaultSales ? '' : max,
            page: 1,
          }
        } else {
          tempPrice = {
            min_rent_price: parseInt(min) === 0 ? '' : min,
            max_rent_price: parseInt(max) === maxPriceDefaultRent ? '' : max,
            page: 1,
          }
        }

        if (min > max) {
          setError(true)
          return
        } else {
          setError(false)
          dispatch(updateForm(tempPrice))
          dispatch(fetchAsyncSearch())
        }
      }, 1000),
    )
  }
  const onAfterChangeLoad = (value) => {
    updatePrice(parseInt(value[0]), parseInt(value[1]), saletype)
  }

  return (
    <>
      <div className="ib-flex-item -icon-price">
        <span className="ib-label">Minimum Price</span>
        <Input
          style={error ? { border: '1px solid var(--color-red)' } : null}
          type="text"
          pattern="[0-9]*"
          className="ib-input"
          onChange={onChangeMin}
          value={transformPrice(minPrice)}
        />
      </div>
      <div className="ib-flex-item -icon-price">
        <span className="ib-label">Maximum Price</span>
        <Input
          style={error ? { border: '1px solid var(--color-red)' } : null}
          type="text"
          pattern="[0-9]*"
          className="ib-input"
          onChange={onChangeMax}
          value={transformPrice(maxPrice)}
        />
      </div>
      {error && (
        <div className="error-label">
          The Min. value should be lower or equal to the Max. value.
        </div>
      )}

      <Slider
        style={{ margin: '2rem' }}
        className="slider-main-div"
        min={0}
        max={maxPriceDefault}
        step={1}
        tipFormatter={formatter}
        onChange={onChange}
        range={true}
        defaultValue={[minPrice, maxPriceDefault]}
        value={[minPrice, maxPrice]}
        onAfterChange={onAfterChangeLoad}
      />
    </>
  )
}

export default memo(FilterModalPrice)
