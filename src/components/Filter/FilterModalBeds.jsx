import { memo, useEffect, useState } from 'react'
import { Checkbox, Radio } from 'antd'
import { getparams, updateForm } from '../../config/slices/properties'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncSearch } from '../../config/actions/properties'

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

const FilterModalBeds = () => {
  const [exactMatch, setexactMatch] = useState(false)
  const [options, setOptions] = useState(optionsAny)
  const [valueOption, setvalueOption] = useState(0)
  const [selectLeft, setselectLeft] = useState(10)
  const [selectRight, setselectRight] = useState(10)

  const [error, setError] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState(0)
  const dispatch = useDispatch()
  const params = useSelector(getparams)

  useEffect(() => {
    var { min_beds, max_beds } = params
    var min_v = parseInt(min_beds)
    var max_v = parseInt(max_beds)

    if (isNaN(min_v) && isNaN(max_v)) {
      console.log('1 Beds', min_v, max_v)
      setOptions(optionsAny)
      setexactMatch(false)
      setvalueOption(0)
      setselectLeft(10)
      setselectRight(10)
    }
    if (!isNaN(min_v) && !isNaN(max_v) && max_v === min_v) {
      setexactMatch(true)
      setOptions(optionsStudio)
      setvalueOption(min_v)
      setselectLeft(min_v)
      setselectRight(max_v)
      console.log('2 Beds', min_v, max_v)
    }
    if (!isNaN(min_v) && !isNaN(max_v) && max_v !== min_v) {
      setvalueOption(min_v)
      setselectLeft(min_v)
      setselectRight(max_v)
      setOptions(optionsAny)
      console.log('3 Beds', min_v, max_v)
    }

    if (!isNaN(min_v) && isNaN(max_v)) {
      setOptions(optionsAny)
      setexactMatch(false)
      setvalueOption(min_v)
      setselectLeft(min_v)
      setselectRight(10)
      console.log('4 Beds', min_v, max_v)
    }
    if (isNaN(min_v) && !isNaN(max_v)) {
      console.log('5 Beds', min_v, max_v)
      setOptions(optionsAny)
      setvalueOption(max_v)
      setexactMatch(false)
    }
  }, [params])

  const updateQuery = (min, max) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }
    setTypingTimeout(
      setTimeout(function () {
        console.log('typingTimeout', min, max)

        var temp = {
          min_beds: parseInt(min) === 10 ? '' : min,
          max_beds: parseInt(max) === 10 ? '' : max,
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

  const onChangeExact = (e) => {
    setexactMatch(e.target.checked)
    var min, max
    !e.target.checked ? setOptions(optionsAny) : setOptions(optionsStudio)
    if (e.target.checked) {
      setselectLeft(valueOption)
      setselectRight(valueOption)
      min = valueOption !== 10 ? valueOption : 10
      max = valueOption !== 10 ? valueOption : 10
    } else {
      setselectLeft(valueOption)
      setselectRight(10)
      min = valueOption !== 10 ? valueOption : 10
      max = 10
    }

    if (parseInt(valueOption) === 0 && !e.target.checked) {
      setselectLeft(10)
      setselectRight(10)
    }

    if (parseInt(valueOption) <= parseInt(selectRight)) {
      setError(false)
      updateQuery(min, max)
    } else {
      setError(true)
    }
  }
  const onChangeBtn = (e) => {
    var temp = parseInt(e.target.value)

    if (parseInt(valueOption) <= parseInt(selectRight)) {
      setError(false)
    } else {
      setError(true)
      return
    }
    var min, max

    setvalueOption(temp)
    if (exactMatch) {
      setselectLeft(temp)
      setselectRight(temp)
      min = temp
      max = temp
    } else {
      setselectLeft(temp)
      setselectRight(10)
      min = temp
      max = 10
    }
    if (parseInt(temp) === 0) {
      setselectLeft(10)
      setselectRight(10)
      min = 10
      max = 10
    }
    if (parseInt(temp) === 0 && exactMatch) {
      setselectLeft(0)
      setselectRight(0)
      min = temp
      max = temp
    }
    updateQuery(min, max)
  }
  const handleChangeStudioLeft = (e) => {
    var temp = parseInt(e.target.value)
    setselectLeft(temp !== 10 ? temp : 10)
    setvalueOption(temp !== 10 ? temp : 10)
    var min = temp !== 10 ? temp : 10
    var max = selectRight !== 10 ? selectRight : 10

    if (parseInt(temp) === 10) {
      setvalueOption(0)
      setselectRight(10)
      setexactMatch(false)
      setOptions(optionsAny)
    }
    if (parseInt(temp) === 0) {
      setexactMatch(true)
      setOptions(optionsStudio)
      setvalueOption(0)
      setselectRight(0)
      min = temp !== 10 ? temp : 10
      max = temp !== 10 ? temp : 10
    }
    if (exactMatch) {
      setselectRight(temp)
      min = temp !== 10 ? temp : 10
      max = temp !== 10 ? temp : 10
    }
    if (temp <= max) {
      setError(false)
      updateQuery(min, max)
    } else {
      setError(true)
      return
    }
  }
  const handleChangeStudioRight = (e) => {
    var temp = parseInt(e.target.value)
    setselectRight(temp)    
    if (parseInt(valueOption) <= temp) {
      setError(false)
      updateQuery(valueOption, temp !== 10 ? temp : 10)
    } else {
      setError(true)
      return
    }

    if (temp === valueOption) {
      setOptions(optionsStudio)
      setexactMatch(true)
      setvalueOption(temp)
    }
    if (parseInt(valueOption) < temp) {
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

export default memo(FilterModalBeds)
