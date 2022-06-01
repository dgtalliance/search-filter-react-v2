import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { lot_size_range_d } from '../../config/config'
import { numberWithCommas } from '../../utils/utils'
import { Input, Slider } from 'antd'
import { getparams, updateForm } from '../../config/slices/properties'
import { fetchAsyncSearch } from '../../config/actions/properties'

const FilterModalLandSize = () => {
  const max_land_size = lot_size_range_d[lot_size_range_d.length - 1].value
  const [maxlandDefault, setMaxlandDefault] = useState(max_land_size)
  const [minland, setMinland] = useState(0)
  const [maxland, setMaxland] = useState(maxlandDefault)
  const params = useSelector(getparams)
  const [error, setError] = useState(false)
  const [landTimeout, setlandTimeout] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    var { min_lot_size, max_lot_size } = params
    setMinland(min_lot_size !== '' ? parseInt(min_lot_size) : 0)
    setMaxland(max_lot_size !== '' ? parseInt(max_lot_size) : maxlandDefault)
  }, [params])


  const updateland = (min, max) => {
    if (landTimeout) {
      clearTimeout(landTimeout)
    }
    setlandTimeout(
      setTimeout(function () {
        
        var temp = {
          min_lot_size: parseInt(min) === 0 ? '' : min,
          max_lot_size: parseInt(max) === maxlandDefault ? '' : max,
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
  const onChangeMin = (e) => {
    if ('' === e.target.value) {
      setMinland(0)
      return
    }
    var inputValue = parseInt(numberNotCommas(e.target.value))
    if (!isNaN(inputValue)) {
      setMinland(parseInt(inputValue))
    }
    updateland(parseInt(inputValue), maxland)
  }

  const onChangeMax = (e) => {
    if ('' === e.target.value) {
      setMaxland(maxlandDefault)
      return
    }

    var inputValue = parseInt(numberNotCommas(e.target.value))
    if (!isNaN(inputValue)) {
      setMaxland(parseInt(inputValue))
    }
    updateland(minland, parseInt(inputValue))
  }

  //function tools
  const transformPrice = (price) => {
    if (price === maxlandDefault || price === null) {
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
      setMinland(parseInt(value[0]))
      setMaxland(parseInt(value[1]))
    }

    if (value[0] === 0) {
      setMinland(0)
    }
    if (value[1] === maxlandDefault) {
      setMaxland(maxlandDefault)
    }
  }

  const onAfterChangeLoad = (value) => {
    updateland(parseInt(value[0]), parseInt(value[1]))
  }

  return (
    <>
      <div className="ib-flex-item -icon-price">
        <span className="ib-label">Minimum land Size</span>
        <Input
          style={error ? { border: '1px solid var(--color-red)' } : null}
          type="text"
          pattern="[0-9]*"
          className="ib-input"
          onChange={onChangeMin}
          value={transformPrice(minland)}
        />
      </div>
      <div className="ib-flex-item -icon-price">
        <span className="ib-label">Maximum land Size</span>
        <Input
          style={error ? { border: '1px solid var(--color-red)' } : null}
          type="text"
          pattern="[0-9]*"
          className="ib-input"
          onChange={onChangeMax}
          value={transformPrice(maxland)}
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
        max={maxlandDefault}
        step={1}
        tipFormatter={formatter}
        onChange={onChange}
        range={true}
        defaultValue={[minland, maxlandDefault]}
        value={[minland, maxland]}
        onAfterChange={onAfterChangeLoad}
      />
    </>
  )
}

export default FilterModalLandSize
