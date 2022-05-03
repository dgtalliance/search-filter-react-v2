import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAsyncSearch } from '../../config/actions/properties'
import { updateForm } from '../../config/slices/properties'
import FilterBaths from './FilterBaths'

const ContainerFilterBaths = () => {
  const [title, settitle] = useState('Any Baths')
  const [minBaths, setMinBaths] = useState(0)
  const [maxBaths, setMaxBaths] = useState(0)
  const [activeMatch, setActiveMatch] = useState(false)
  const [error, setError] = useState(false)
  const dispatch = useDispatch()

  const TitleChange = (minBaths, maxBaths, activeMatch) => {
    console.log('TitleChange', minBaths, maxBaths, activeMatch)
    if (parseInt(minBaths) !== 10) {
      if (activeMatch && parseInt(minBaths) === 0 && parseInt(maxBaths) === 0) {
        settitle('Studio Baths')
      }

      if (!activeMatch && parseInt(minBaths) === 0 && parseInt(maxBaths) === 0) {
        settitle('Any Baths')
      }
      if (!activeMatch && parseInt(minBaths) === 0 && parseInt(maxBaths) === 10) {
        settitle('Any Baths')
      }

      if (activeMatch && parseInt(minBaths) !== 0) {
        settitle('Baths: ' + minBaths)
      }
      if (!activeMatch && parseInt(minBaths) !== 0) {
        settitle('Baths: ' + minBaths + '+')
      }
      if (activeMatch && parseInt(minBaths) !== 0 && parseInt(maxBaths) !== 0) {
        if (parseInt(maxBaths) !== 10) {
          settitle('Baths: ' + minBaths + '-' + maxBaths)
        }
      }
    } else {
      settitle('Any Baths')
    }
  }

  useEffect(() => {
    TitleChange(minBaths, maxBaths, activeMatch)
  }, [minBaths, maxBaths, activeMatch])

  const cleanBaths = () => {
    var Baths = { min_baths: '', max_baths: '', page: 1 }
    dispatch(updateForm(Baths))
    dispatch(fetchAsyncSearch())
    settitle('Any Baths')
    setActiveMatch(false)
    setMinBaths(0)
    setMaxBaths(0)
    setError(false)
  }
  const handleClick = () => {
    var min = parseInt(minBaths)
    var max = parseInt(maxBaths)
     if (min > max && max !==10) {
      return
    } /*else {
      setError(false)
    } */
    console.log('Click', min, max)
    var min_temp = min !== 10 ? min : ''
    var max_temp = max !== 10 ? max : ''

    if (!activeMatch) {
      min_temp = min_temp === 0 ? '' : min_temp
      max_temp = max_temp === 0 ? '' : max_temp
    }

    var baths = { min_baths: min_temp, max_baths: max_temp, page: 1 }
    dispatch(updateForm(baths))
    dispatch(fetchAsyncSearch())
  }
  return (
    <>
      <div className="ib-wrapper-dropdown -baths">
        <button className="ib-action -baths js-show-basic-filter">
          <span id="text-baths" data-text="Any Baths">
            {title}
          </span>
        </button>
        <div className="ib-dropdown">
          <div className="ib-wrapper-title">Bathrooms</div>
          <div className="ib-wrapper">
            <div className="ib-flex-wrapper">
              <FilterBaths
                setMinBaths={setMinBaths}
                setMaxBaths={setMaxBaths}
                setActiveMatch={setActiveMatch}
                error={error}
                setError={setError}
              />

              <div className="ib-modal-footer">
                <a className="ib-link" onClick={() => cleanBaths()}>
                  Clear
                </a>
                <button
                  className="ib-btn js-submit-filter"
                  onClick={() => handleClick()}
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

export default ContainerFilterBaths
