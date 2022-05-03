import { memo, useEffect, useState } from 'react'
import { Checkbox, Radio } from 'antd'
import { getparams } from '../../config/slices/properties'
import { useSelector } from 'react-redux'

const optionsAny = [
  { label: 'Any', value: 0 },
  { label: '1+', value: 1 },
  { label: '2+', value: 2 },
  { label: '3+', value: 3 },
  { label: '4+', value: 4 },
  { label: '5+', value: 5 },
]
const optionsStudio = [
  { label: 'Studio', value: 0 },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
]

const FilterBaths = ({
  error,
  setMinBeds,
  setMaxBeds,
  setActiveMatch,
  setError,
}) => {
  const [exactMatch, setexactMatch] = useState(false)
  const [options, setOptions] = useState(optionsAny)
  const [valueOption, setvalueOption] = useState(0)
  const [selectLeft, setselectLeft] = useState(10)
  const [selectRight, setselectRight] = useState(10)

  const params = useSelector(getparams)
  useEffect(() => {
    var { min_beds, max_beds } = params
    var min_v = parseInt(min_beds)
    var max_v = parseInt(max_beds)

    if (isNaN(min_v) && isNaN(max_v)) {
      console.log('1', min_v, max_v)
      setOptions(optionsAny)
      setexactMatch(false)
      setvalueOption(0)
      setselectLeft(10)
      setselectRight(10)
    }

    if (!isNaN(min_v) && !isNaN(max_v) && max_v === min_v) {
      setexactMatch(true)
      setOptions(optionsStudio)
      setActiveMatch(true)
      setvalueOption(min_v)
      setselectLeft(min_v)
      setselectRight(max_v)
      console.log('2', min_v, max_v)
    }

    if (!isNaN(min_v) && !isNaN(max_v) && max_v !== min_v) {
      setvalueOption(min_v)
      setselectLeft(min_v)
      setselectRight(max_v)
      setOptions(optionsAny)
      setActiveMatch(false)
      console.log('3', min_v, max_v)
    }

    if (!isNaN(min_v) && isNaN(max_v)) {
      setOptions(optionsAny)
      setexactMatch(false)
      setvalueOption(min_v)
      setselectLeft(min_v)
      setselectRight(10)
      console.log('4', min_v, max_v)
    }
    if (isNaN(min_v) && !isNaN(max_v)) {
      console.log('5', min_v, max_v)
      setOptions(optionsAny)
      setvalueOption(max_v)
      setexactMatch(false)
    }
    setMinBeds(!isNaN(min_v) ? min_v : 0)
    setMaxBeds(!isNaN(max_v) ? max_v : 10)
  }, [params])

  const onChangeExact = (e) => {
    setexactMatch(e.target.checked)
    setActiveMatch(e.target.checked)
    !e.target.checked ? setOptions(optionsAny) : setOptions(optionsStudio)
    if (e.target.checked) {
      setselectLeft(valueOption)
      setselectRight(valueOption)
      setMinBeds(valueOption)
      setMaxBeds(valueOption)
    } else {
      setselectLeft(valueOption)
      setselectRight(10)
      setMinBeds(valueOption)
      setMaxBeds(0)
    }

    if (parseInt(valueOption) === 0 && !e.target.checked) {
      console.log('my change')
      setselectLeft(10)
      setselectRight(10)
    }

    if (parseInt(valueOption) <= parseInt(selectRight)) {
      setError(false)
    } else {
      setError(true)
    }
  }
  const onChangeBtn = (e) => {
    var temp = parseInt(e.target.value)
    setvalueOption(temp)
    if (exactMatch) {
      setselectLeft(temp)
      setselectRight(temp)

      setMinBeds(temp)
      setMaxBeds(temp)
    } else {
      setselectLeft(temp)
      setselectRight(10)

      setMinBeds(temp)
      setMaxBeds(10)
    }
    if (parseInt(temp) === 0) {
      setselectLeft(10)
      setselectRight(10)

      setMinBeds(temp)
      setMaxBeds(temp)
    }
    if (parseInt(temp) === 0 && exactMatch) {
      setselectLeft(0)
      setselectRight(0)

      setMinBeds(temp)
      setMaxBeds(temp)
    }
    if (parseInt(valueOption) <= parseInt(selectRight)) {
      setError(false)
    } else {
      setError(true)
    }
  }
  const handleChangeStudioLeft = (e) => {
    var temp = parseInt(e.target.value)
    setselectLeft(temp !== 10 ? temp : 10)
    setMinBeds(temp !== 10 ? temp : 10)
    setvalueOption(temp !== 10 ? temp : 10)

    if (parseInt(temp) === 10) {
      setvalueOption(0)
      setselectRight(10)
      setexactMatch(false)
      setOptions(optionsAny)
    } else {
    }
    if (parseInt(temp) === 0) {
      setexactMatch(true)
      setOptions(optionsStudio)
      setActiveMatch(true)
      setvalueOption(0)
      setselectRight(0)
      setMinBeds(temp !== 10 ? temp : 10)
      setMaxBeds(temp !== 10 ? temp : 10)
    }
    if (exactMatch) {
      setselectRight(temp)
      setMinBeds(temp !== 10 ? temp : 10)
      setMaxBeds(temp !== 10 ? temp : 10)
    }
    if (temp <= parseInt(selectRight)) {
      setError(false)
    } else {
      setError(true)
    }
  }
  const handleChangeStudioRight = (e) => {
    var temp = parseInt(e.target.value)
    setselectRight(temp)
    setMaxBeds(temp)
    if (parseInt(valueOption) <= temp) {
      setError(false)
    } else {
      setError(true)
    }

    if(temp === valueOption) {
        setActiveMatch(true) 
        setOptions(optionsStudio)
        setexactMatch(true)
        setvalueOption(temp)
    }
    if (parseInt(valueOption) < temp) {
        setActiveMatch(false) 
        setOptions(optionsAny)
        setexactMatch(false)        
    }
  }

  return (
    <>
      <div className="ib-chk-list -round">
        <Radio.Group
          options={options}
          onChange={onChangeBtn}
          value={valueOption}
          optionType="button"
          defaultValue={valueOption}
        />
      </div>
      <Checkbox
        className="margin-checkbox-beds"
        onChange={onChangeExact}
        checked={exactMatch}
      >
        Use exact match
      </Checkbox>
      <div className="ms-line-br">
        <span>Or Select Bedrooms Range</span>
      </div>
      <div className="ms-flex">
        <div className="ms-item">
          <select
            style={error ? { border: '1px solid var(--color-red)' } : null}
            className="select-beds"
            value={selectLeft}
            onChange={handleChangeStudioLeft}
          >
            <option value="10">From</option>
            <option value="0">Studio</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <span className="ms-txt">-</span>
        <div className="ms-item">
          <select
            style={error ? { border: '1px solid var(--color-red)' } : null}
            className="select-beds"
            value={selectRight}
            onChange={handleChangeStudioRight}
          >
            <option value="10">To</option>
            <option value="0">Studio</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
      {error && (
        <div className="error-label">
          The Min. value should be lower or equal to the Max. value.
        </div>
      )}
    </>
  )
}

export default memo(FilterBaths)
