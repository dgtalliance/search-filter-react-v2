import { Input, Slider } from 'antd'
import { memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getparams } from '../../config/slices/properties'
import { formatShortPriceX, numberWithCommas } from '../../utils/utils'

const FilterPrice = ({
  setMinPriceParent,
  setMaxPriceParent,
  setSalesType,
  error,
  setMaxPriceDefault
}) => {
  const maxPriceDefaultSales = 100000000
  const maxPriceDefaultRent = 100000
  const [maxPriceDefault, setmaxPriceDefault] = useState(maxPriceDefaultSales)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(maxPriceDefault)
  const params = useSelector(getparams)

  useEffect(() => {
    var min, max
    var {
      sale_type,
      min_rent_price,
      max_rent_price,
      min_sale_price,
      max_sale_price,
    } = params
    setSalesType(parseInt(sale_type))
    if (parseInt(sale_type) === 0) {
      setmaxPriceDefault(maxPriceDefaultSales)
      setMaxPriceDefault(maxPriceDefaultSales)
      min = min_sale_price !== '' ? parseInt(min_sale_price) : 0
      max =
        max_sale_price !== '' ? parseInt(max_sale_price) : maxPriceDefaultSales
      setMinPrice(min_sale_price !== '' ? parseInt(min_sale_price) : 0)
      setMaxPrice(
        max_sale_price !== '' ? parseInt(max_sale_price) : maxPriceDefaultSales,
      )
    } else {
      setmaxPriceDefault(maxPriceDefaultRent)
      setMaxPriceDefault(maxPriceDefaultRent)
      min = min_rent_price !== '' ? parseInt(min_rent_price) : 0
      max =
        max_rent_price !== '' ? parseInt(max_rent_price) : maxPriceDefaultRent
      setMinPrice(min_rent_price !== '' ? parseInt(min_rent_price) : 0)
      setMaxPrice(
        max_rent_price !== '' ? parseInt(max_rent_price) : maxPriceDefaultRent,
      )
    }
    console.log('Prices----', min, max)
    updateTitle(min, max)
  }, [params])

  const onChangeMin = (e) => {
    if ('' === e.target.value) {
      console.log(e.target.value)
      setMinPrice(0)
      updateTitle(parseInt(0), maxPrice)
      return
    }
    var inputValue = parseInt(numberNotCommas(e.target.value))
    if (!isNaN(inputValue)) {
      console.log('min', e.target.value, maxPrice)
      setMinPrice(parseInt(inputValue))
      updateTitle(parseInt(inputValue), maxPrice)
    }
  }

  const onChangeMax = (e) => {
    if ('' === e.target.value) {
      console.log(e.target.value)
      setMaxPrice(maxPriceDefault)
      updateTitle(minPrice, maxPriceDefault)
      return
    }

    var inputValue = parseInt(numberNotCommas(e.target.value))
    if (!isNaN(inputValue)) {
      console.log('max', minPrice, inputValue)
      setMaxPrice(parseInt(inputValue))
      updateTitle(minPrice, parseInt(inputValue))
    }
  }

  //function tools
  const transformPrice = (price) => {
    if (
      price === 0 ||
      price === maxPriceDefaultSales ||
      price === maxPriceDefaultRent ||
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
    console.log(value)
    if (parseInt(value[0]) < parseInt(value[1])) {
      setMinPrice(parseInt(value[0]))
      setMaxPrice(parseInt(value[1]))
    }
    updateTitle(parseInt(value[0]), parseInt(value[1]))

    if (value[0] === 0) {
      setMinPrice(0)
    }
    if (value[1] === maxPriceDefault) {
      setMaxPrice(maxPriceDefault)
    }
  }

  const updateTitle = (min, max) => {
    console.log('min-max:', min, max)
    
 /*    if (min === 0) {
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
    } */
    setMinPriceParent(min)
    setMaxPriceParent(max)
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
      />
    </>
  )
}

export default memo(FilterPrice)
