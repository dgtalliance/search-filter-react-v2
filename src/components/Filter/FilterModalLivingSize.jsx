import { Input, Slider } from 'antd'
import { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncSearch } from '../../config/actions/properties'
import { living_size_range_d } from '../../config/config'
import { getparams, updateForm } from '../../config/slices/properties'
import { formatShortPriceX, numberWithCommas } from '../../utils/utils'

const FilterModalLivingSize = () => {
  const dispatch = useDispatch()

  const max_living_size =
    living_size_range_d[living_size_range_d.length - 1].value
  const [maxLivingDefault, setMaxLivingDefault] = useState(max_living_size)
  const [minPrice, setMinLiving] = useState(0)
  const [maxPrice, setMaxLiving] = useState(maxLivingDefault)
  const params = useSelector(getparams)
  const [error, setError] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState(0)

  useEffect(() => {
    var min, max
    var { min_living_size, max_living_size } = params

    min = min_living_size !== '' ? parseInt(min_living_size) : 0
    max = max_living_size !== '' ? parseInt(max_living_size) : maxLivingDefault
    setMinLiving(min_living_size !== '' ? parseInt(min_living_size) : 0)
    setMaxLiving(
      max_living_size !== '' ? parseInt(max_living_size) : maxLivingDefault,
    )
  }, [params])

  const onChangeMin = (e) => {
    if ('' === e.target.value) {
      setMinLiving(0)
      return
    }
    var inputValue = parseInt(numberNotCommas(e.target.value))
    if (!isNaN(inputValue)) {
      setMinLiving(parseInt(inputValue))
    }
    updateLiving(parseInt(inputValue), maxPrice)
  }

  const onChangeMax = (e) => {
    if ('' === e.target.value) {
      setMaxLiving(maxLivingDefault)
      return
    }

    var inputValue = parseInt(numberNotCommas(e.target.value))
    if (!isNaN(inputValue)) {
      setMaxLiving(parseInt(inputValue))
    }
    updateLiving(minPrice, parseInt(inputValue))
  }

  //function tools
  const transformPrice = (price) => {
    if (price === 0 || price === maxLivingDefault || price === null) {
      return 'Any Size'
    } else {
      return numberWithCommas(price)
    }
  }
  const formatter = (value) => {
    return `${numberWithCommas(value)} Sq.Ft.`
  }
  const numberNotCommas = (value) => value.replace(/,/g, '')

  const onChange = (value) => {
    if (parseInt(value[0]) < parseInt(value[1])) {
      setMinLiving(parseInt(value[0]))
      setMaxLiving(parseInt(value[1]))
    }

    if (value[0] === 0) {
      setMinLiving(0)
    }
    if (value[1] === maxLivingDefault) {
      setMaxLiving(maxLivingDefault)
    }
  }

  const updateLiving = (min, max) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }
    setTypingTimeout(
      setTimeout(function () {
        console.log('typingTimeout', min, max)  
        var temp = {
          min_living_size: parseInt(min) === 0 ? '' : min,
          max_living_size: parseInt(max) === maxLivingDefault ? '' : max,
          page: 1,
        }

        if (min > max) {
          setError(true)
          return
        } else {
          setError(false)
           dispatch(updateForm(temp))
           dispatch(fetchAsyncSearch())
        }
      }, 1000),
    )
  }
  const onAfterChangeLoad = (value) => {
    updateLiving(parseInt(value[0]), parseInt(value[1]))
  }

  return (
    <>
      <div className="ib-flex-item -icon-price">
        <span className="ib-label">Minimum Living Size</span>
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
        <span className="ib-label">Maximum Living Size</span>
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
        max={maxLivingDefault}
        step={1}
        tipFormatter={formatter}
        onChange={onChange}
        range={true}
        defaultValue={[minPrice, maxLivingDefault]}
        value={[minPrice, maxPrice]}
        onAfterChange={onAfterChangeLoad}
      />
    </>
  )
}

export default memo(FilterModalLivingSize)
