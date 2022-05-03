import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAsyncSearch } from '../../config/actions/properties'
import { updateForm } from '../../config/slices/properties'
import FilterBaths from './FilterBaths'

const ContainerFilterBaths = () => {
  const [title, settitle] = useState('Any Baths')
  const [minBeds, setMinBeds] = useState(0)
  const [maxBeds, setMaxBeds] = useState(0)
  const [activeMatch, setActiveMatch] = useState(false)
  const [error, setError] = useState(false)
  const dispatch = useDispatch()

  const TitleChange = () => {
    console.log('TitleChange', minBeds, maxBeds, activeMatch)
    if (parseInt(minBeds) !== 10) {
      if (activeMatch && parseInt(minBeds) === 0 && parseInt(maxBeds) === 0) {
        settitle('Studio Baths')
      }

      if (!activeMatch && parseInt(minBeds) === 0 && parseInt(maxBeds) === 0) {
        settitle('Any Baths')
      }

      if (activeMatch && parseInt(minBeds) !== 0) {
        settitle('Baths: ' + minBeds)
      }
      if (!activeMatch && parseInt(minBeds) !== 0) {
        settitle('Baths: ' + minBeds + '+')
      }
      if (activeMatch && parseInt(minBeds) !== 0 && parseInt(maxBeds) !== 0) {
        if (parseInt(maxBeds) !== 10) {
          settitle('Baths: ' + minBeds + '-' + maxBeds)
        }
      }
    } else {
      settitle('Any Baths')
    }
  }

  useEffect(() => {
    TitleChange()
  }, [minBeds, maxBeds, activeMatch])

  const cleanBeds = () => {
    var beds = { min_beds: '', max_beds: '', page: 1 }
    dispatch(updateForm(beds))
    dispatch(fetchAsyncSearch())
    settitle('Any Baths')
    setActiveMatch(false)
    setMinBeds(0)
    setMaxBeds(0)
    setError(false)
  }
  const handleClick = () => {
    var beds = {}
    var min = parseInt(minBeds)
    var max = parseInt(maxBeds)
    if (min > max) {
      setError(true)
      return
    } else {
      setError(false)
    }
    console.log('Click', min, max)
    var min_temp = min !== 10 ? min : ''
    var max_temp = max !== 10 ? max : ''

    if (!activeMatch) {
      min_temp = min_temp === 0 ? '' : min_temp
      max_temp = max_temp === 0 ? '' : max_temp
    }

    beds = { min_beds: min_temp, max_beds: max_temp, page: 1 }
    dispatch(updateForm(beds))
    dispatch(fetchAsyncSearch())
  }
  return (
    <>
      <div className="ib-wrapper-dropdown -baths">
        <button className="ib-action -baths js-show-basic-filter">
          <span id="text-baths" data-text="Any Baths">
            Any Baths
          </span>
        </button>
        <div className="ib-dropdown">
          <div className="ib-wrapper-title">Bathrooms</div>
          <div className="ib-wrapper">
            <div className="ib-flex-wrapper">
              <FilterBaths
                setMinBeds={setMinBeds}
                setMaxBeds={setMaxBeds}
                setActiveMatch={setActiveMatch}
                error={error}
                setError={setError}
              />

              <div className="ib-modal-footer">
                <a className="ib-link" onClick={() => cleanBeds()}>
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
