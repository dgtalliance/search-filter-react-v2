import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { defaultPropsShortCode } from '../../App'
import { fetchAsyncSaveSearch } from '../../config/actions/properties'
import { getpropertiesData } from '../../config/slices/properties'
import { flex_g_settings, flex_idx_search_filter } from '../../utils/utils'
const alerts = [
  {
    label: 'No Alert',
    value: '--',
  },
  {
    label: 'Daily',
    value: 1,
  },
  {
    label: 'Weekly',
    value: 7,
  },
  {
    label: 'Monthly',
    value: 30,
  },
]
function PropertiesModalSave() {
  const dispatch = useDispatch()
  const [nameSave, setName] = useState('')
  const [typeAlert, setTypeAlert] = useState('--')
  const [newListing, setNewListing] = useState(true)
  const [priceChange, setPriceChange] = useState(true)
  const [statusChange, setStatusChange] = useState(true)
  const properties = useSelector(getpropertiesData)

  const filter_id = defaultPropsShortCode.filter

  const onChangeNewListing = (e) => {
    setNewListing(e.target.checked)
  }
  const onChangePriceChange = (e) => {
    setPriceChange(e.target.checked)
  }
  const onChangeStatusChange = (e) => {
    setStatusChange(e.target.checked)
  }

  const onChangeValue = (e) => {
    setTypeAlert(e.target.value)
  }
  const handleClickSudmit = (event) => {
    event.preventDefault()

    var name = nameSave.trim()
    
    if ( parseInt(typeAlert) === 1 || parseInt(typeAlert) === 7 || parseInt(typeAlert) === 30) {
    if (!newListing && !priceChange && !statusChange) {
      sweetAlert(
        'Oops...',
        'You must select at least one checkbox from below.',
        'error',
      )
      return
    }
  }

    if (name != null && name.length > 0) {
      var bodyFormData = jQuery('#form-save-search').serialize()
      dispatch(fetchAsyncSaveSearch({ bodyFormData }))
    } else {
      sweetAlert('Oops...', 'You must provide a name for this search.', 'error')
    }
  }
  return (
    <>
      <div
        className="ib-modal -standar -alert"
        id="modalSaveSearch"
        tabIndex="-1"
      >
        <div className="ib-modal-dialog">
          <div className="ib-modal-content">
            <div className="ib-modal-header">
              <button
                className="ib-close js-close-modals"
                aria-label="Close"
                data-modal="#modalSaveSearch"
              ></button>
            </div>
            <div className="ib-modal-body">
              <div className="ms-wrapper-form-info">
                <span className="ms-title">Save search</span>
                <p>
                  You will receive automatic updates every time there are new
                  listings and price reductions.
                </p>

                <form
                  className="ms-form"
                  id="form-save-search"
                  onSubmit={(e) => handleClickSudmit(e)}
                >
                  <div className="ms-item">
                    <label className="ms-label" htmlFor="searchSave_name">
                      Name your search*
                    </label>
                    <input
                      className="ms-input"
                      name="search_name"
                      type="text"
                      placeholder="Name your search"
                      id="searchSave_name"
                      value={nameSave}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="ms-item">
                    <label
                      className="ms-label"
                      htmlFor="searchSave_notification"
                    >
                      Email Updates
                    </label>

                    <select
                      className="ms-input"
                      name="notification_day"
                      id="searchSave_notification"
                      value={typeAlert}
                      onChange={(e) => onChangeValue(e)}
                    >
                      {Object.keys(alerts).length > 0 && (
                        <>
                          {alerts.map((item, index) => {
                            return (
                              <option key={index} value={item.value}>
                                {item.label}
                              </option>
                            )
                          })}
                        </>
                      )}
                    </select>
                  </div>
                  <div className="ms-item">
                    <span className="ms-label">Only Update me On</span>
                    <div className="ms-chk-list">
                      <div className="ib-chk-wrapper">
                        <input
                          type="checkbox"
                          id="newListing"
                          name="notification_type[]"
                          value="new_listing"
                          checked={newListing}
                          onChange={(e) => onChangeNewListing(e)}
                        />
                        <label htmlFor="newListing">New Listing (Always)</label>
                      </div>
                      <div className="ib-chk-wrapper">
                        <input
                          type="checkbox"
                          id="priceChange"
                          name="notification_type[]"
                          value="price_change"
                          checked={priceChange}
                          onChange={(e) => onChangePriceChange(e)}
                        />
                        <label htmlFor="priceChange">Price Change</label>
                      </div>
                      <div className="ib-chk-wrapper">
                        <input
                          type="checkbox"
                          id="statusChange"
                          name="notification_type[]"
                          value="status_change"
                          checked={statusChange}
                          onChange={(e) => onChangeStatusChange(e)}
                        />
                        <label htmlFor="statusChange">Status Change</label>
                      </div>
                    </div>
                  </div>
                  <div className="ms-wrapper-btn">
                    <button className="ms-btn" type="submit">
                      Save Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PropertiesModalSave
