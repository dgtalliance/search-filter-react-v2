import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { living_size_range_d } from '../../config/config'
import { numberWithCommas } from '../../utils/utils'
import { Input, Slider } from 'antd'
import { getparams, updateForm } from '../../config/slices/properties'
import { fetchAsyncSearch } from '../../config/actions/properties'

const FilterModalLivingSize = () => {
  const max_living_size =
    living_size_range_d[living_size_range_d.length - 1].value
  const [maxLivingDefault, setMaxLivingDefault] = useState(max_living_size)
  const [minLiving, setMinLiving] = useState(0)
  const [maxLiving, setMaxLiving] = useState(maxLivingDefault)
  /* const params = useSelector(getparams) */
  const [error, setError] = useState(false)
  const [livingTimeout, setLivingTimeout] = useState(0)
  const dispatch = useDispatch()

 /*  useEffect(() => {
    var { min_living_size, max_living_size } = params
    setMinLiving(min_living_size !== '' ? parseInt(min_living_size) : 0)
    setMaxLiving(
      max_living_size !== '' ? parseInt(max_living_size) : maxLivingDefault,
    )
  }, [params]) */
  const updateLiving = (min, max) => {
    /* if (livingTimeout) {
      clearTimeout(livingTimeout)
    }
    setLivingTimeout(
      setTimeout(function () {
        console.log('typingTimeout updateLiving', min, max)
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
    ) */
  }
  const onChangeMin = (e) => {
    /*  if ('' === e.target.value) {
      setMinLiving(0)
      return
    }
    var inputValue = parseInt(numberNotCommas(e.target.value))
    if (!isNaN(inputValue)) {
      setMinLiving(parseInt(inputValue))
    }
    updateLiving(parseInt(inputValue), maxLiving) */
  }

  const onChangeMax = (e) => {
    /*  if ('' === e.target.value) {
      setMaxLiving(maxLivingDefault)
      return
    }

    var inputValue = parseInt(numberNotCommas(e.target.value))
    if (!isNaN(inputValue)) {
      setMaxLiving(parseInt(inputValue))
    }
    updateLiving(minLiving, parseInt(inputValue)) */
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
    /*  if (parseInt(value[0]) < parseInt(value[1])) {
      setMinLiving(parseInt(value[0]))
      setMaxLiving(parseInt(value[1]))
    }

    if (value[0] === 0) {
      setMinLiving(0)
    }
    if (value[1] === maxLivingDefault) {
      setMaxLiving(maxLivingDefault)
    } */
  }

  const onAfterChangeLoad = (value) => {
    //  updateLiving(parseInt(value[0]), parseInt(value[1]))
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
          value={transformPrice(minLiving)}
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
          value={transformPrice(maxLiving)}
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
        defaultValue={[minLiving, maxLivingDefault]}
        value={[minLiving, maxLiving]}
        onAfterChange={onAfterChangeLoad}
      />
    </>
  )
}

export default FilterModalLivingSize
