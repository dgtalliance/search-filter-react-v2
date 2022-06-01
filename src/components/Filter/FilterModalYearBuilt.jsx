import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { year_built_range_d } from '../../config/config'
import { numberWithCommas } from '../../utils/utils'
import { Input, Slider } from 'antd'
import { getparams, updateForm } from '../../config/slices/properties'
import { fetchAsyncSearch } from '../../config/actions/properties'

const FilterModalYearBuilt = () => {
  const max_year_built = year_built_range_d[year_built_range_d.length - 1].value
  const min_year_built = year_built_range_d[0].value

  const [maxYearBuiltDefault, setYearBuiltDefault] = useState(max_year_built)
  const [minYearBuilt, setMinYearBuilt] = useState(min_year_built)
  const [maxYearBuilt, setMaxYearBuilt] = useState(maxYearBuiltDefault)
  const params = useSelector(getparams)
  const [error, setError] = useState(false)
  const [yearBuiltTimeout, setYearBuiltTimeout] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    var { min_year, max_year } = params
    setMinYearBuilt(min_year !== '' ? parseInt(min_year) : min_year_built)
    setMaxYearBuilt(max_year !== '' ? parseInt(max_year) : maxYearBuiltDefault)
  }, [params])
  const updateYearBuilt = (min, max) => {
    if (yearBuiltTimeout) {
      clearTimeout(yearBuiltTimeout)
    }
    setYearBuiltTimeout(
      setTimeout(function () {       
        var temp = {
          min_year: parseInt(min) === 0 ? '' : min,
          max_year: parseInt(max) === maxYearBuiltDefault ? '' : max,
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
      setMinYearBuilt(0)
      return
    }
    var inputValue = parseInt(numberNotCommas(e.target.value))
    if (!isNaN(inputValue)) {
      setMinYearBuilt(parseInt(inputValue))
    }
    updateYearBuilt(parseInt(inputValue), maxYearBuilt)
  }

  const onChangeMax = (e) => {
    if ('' === e.target.value) {
      setMaxYearBuilt(maxYearBuiltDefault)
      return
    }

    var inputValue = parseInt(numberNotCommas(e.target.value))
    if (!isNaN(inputValue)) {
      setMaxYearBuilt(parseInt(inputValue))
    }
    updateYearBuilt(minYearBuilt, parseInt(inputValue))
  }

  //function tools
  const transformYear = (year) => {
    if (year === minYearBuilt || year === maxYearBuiltDefault || year === null) {
      return 'Any Year'
    } else {
      return year
    }
  }
  const formatter = (value) => {
    return `${numberWithCommas(value)} Sq.Ft.`
  }
  const numberNotCommas = (value) => value.replace(/,/g, '')

  const onChange = (value) => {
    if (parseInt(value[0]) < parseInt(value[1])) {
      setMinYearBuilt(parseInt(value[0]))
      setMaxYearBuilt(parseInt(value[1]))
    }

    if (value[0] === 0) {
      setMinYearBuilt(0)
    }
    if (value[1] === maxYearBuiltDefault) {
      setMaxYearBuilt(maxYearBuiltDefault)
    }
  }

  const onAfterChangeLoad = (value) => {
    updateYearBuilt(parseInt(value[0]), parseInt(value[1]))
  }

  return (
    <>
      <div className="ib-flex-item -icon-price">
        <span className="ib-label">Minimum Year Built</span>
        <Input
          style={error ? { border: '1px solid var(--color-red)' } : null}
          type="text"
          pattern="[0-9]*"
          className="ib-input"
          onChange={transformYear(onChangeMin)}
          value={minYearBuilt}
        />
      </div>
      <div className="ib-flex-item -icon-price">
        <span className="ib-label">Maximum Year Built</span>
        <Input
          style={error ? { border: '1px solid var(--color-red)' } : null}
          type="text"
          pattern="[0-9]*"
          className="ib-input"
          onChange={onChangeMax}
          value={transformYear(maxYearBuilt)}
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
        min={min_year_built}
        max={max_year_built}
        step={1}
        onChange={onChange}
        range={true}
        defaultValue={[minYearBuilt, maxYearBuiltDefault]}
        value={[minYearBuilt, maxYearBuilt]}
        onAfterChange={onAfterChangeLoad}
      />
    </>
  )
}

export default FilterModalYearBuilt
