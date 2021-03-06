import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAsyncSearch } from '../../config/actions/properties'
import { updateForm } from '../../config/slices/properties'
import FilterBeds from './FilterBeds'

function ContainerFilterBeds() {
  const [title, settitle] = useState('Any Beds')
  const [minBeds, setMinBeds] = useState(0)
  const [maxBeds, setMaxBeds] = useState(0)
  const [activeMatch, setActiveMatch] = useState(false)
  const [error, setError] = useState(false)
  const dispatch = useDispatch()

  const TitleChange = (minBedsv, maxBedsv, activeMatchv) => {  
    if (parseInt(minBedsv) !== 10) {
      if (activeMatchv && parseInt(minBedsv) === 0 && parseInt(maxBedsv) === 0) {
        settitle('Studio Beds')
      }

      if (!activeMatchv && parseInt(minBedsv) === 0 && parseInt(maxBedsv) === 0) {
        settitle('Any Beds')
      }
      if (!activeMatchv && parseInt(minBedsv) === 0 && parseInt(maxBedsv) === 10) {
        settitle('Any Beds')
      }

      if (activeMatchv && parseInt(minBedsv) !== 0) {
        settitle('Beds: ' + minBedsv)
      }
      if (!activeMatch && parseInt(minBedsv) !== 0) {
        settitle('Beds: ' + minBedsv + '+')
      }
      if (activeMatch && parseInt(minBedsv) !== 0 && parseInt(maxBedsv) !== 0) {
        if (parseInt(maxBedsv) !== 10) {
          settitle('Beds: ' + minBedsv + '-' + maxBedsv)
        }
      }
    } else {
      settitle('Any Beds')
    }
  }

  useEffect(() => {
    TitleChange(minBeds, maxBeds, activeMatch)
    console.log('my change',minBeds, maxBeds, activeMatch)
  }, [minBeds, maxBeds, activeMatch])

  const cleanBeds = () => {
    var beds = { min_beds: '', max_beds: '', page: 1 }
    dispatch(updateForm(beds))
    dispatch(fetchAsyncSearch())
    settitle('Any Beds')
    setActiveMatch(false)
    setMinBeds(0)
    setMaxBeds(0)
    setError(false)
  }
  const handleClick = () => {
    var min = parseInt(minBeds)
    var max = parseInt(maxBeds)
    if (min > max && max !==10) {
      return
    } /*  else {
      setError(false)
    } */
    var min_temp = min !== 10 ? min : ''
    var max_temp = max !== 10 ? max : ''

    if (!activeMatch) {
      min_temp = min_temp === 0 ? '' : min_temp
      max_temp = max_temp === 0 ? '' : max_temp
    }

    var beds = { min_beds: min_temp, max_beds: max_temp, page: 1 }
    dispatch(updateForm(beds))
    dispatch(fetchAsyncSearch())
  }
  return (
    <>
      <div className="ib-wrapper-dropdown -beds">
        <button className="ib-action -beds js-show-basic-filter">
          <span id="text-beds" data-text={title}>
            {title}
          </span>
        </button>
        <div className="ib-dropdown">
          <div className="ib-wrapper-title">Bedrooms</div>
          <div className="ib-wrapper">
            <div className="ib-flex-wrapper">
              <FilterBeds
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

export default ContainerFilterBeds
