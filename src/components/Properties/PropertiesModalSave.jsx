import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getpropertiesData } from '../../config/slices/properties'
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
  const [nameSave, setName] = useState('')
  const [typeAlert, setTypeAlert] = useState('--')

  const [newListing, setNewListing] = useState(true)
  const [priceChange, setPriceChange] = useState(true)
  const [statusChange, setStatusChange] = useState(true)

  const propertiesData = useSelector(getpropertiesData)

  const onChangeNewListing = (e) => {
    console.log(e.target.checked)
    setNewListing(e.target.checked)
  }
  const onChangePriceChange = (e) => {
    console.log(e.target.checked)
    setPriceChange(e.target.checked)
  }
  const onChangeStatusChange = (e) => {
    console.log(e.target.checked)
    setStatusChange(e.target.checked)
  }

  const onChangeValue = (e) => {
    setTypeAlert(e.target.value)
  }
  const handleClickSudmit = () => {
    
    var temp = {
      search_name:nameSave,
      notification_day: typeAlert
    }
    if(newListing){
    //  temp = {...temp, {'notification_type[]' : 'new_listing'}}
    }
    console.log(nameSave, typeAlert, newListing, priceChange, statusChange)
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

                <div className="ms-form">
                  <div className="ms-item">
                    <label className="ms-label" htmlFor="searchSave_name">
                      Name your search*
                    </label>
                    <input
                      className="ms-input"
                      name="name"
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
                      name="notification"
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
                          name="update"
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
                          name="update"
                          value="price_change"
                          checked={priceChange}
                          onChange={(e) =>onChangePriceChange(e)}
                        />
                        <label htmlFor="priceChange">Price Change</label>
                      </div>
                     <div className="ib-chk-wrapper">
                        <input
                          type="checkbox"
                          id="statusChange"
                          name="update"
                          value="status_change"
                          checked={statusChange}
                          onChange={(e)=>onChangeStatusChange(e)}
                        />
                        <label htmlFor="statusChange">Status Change</label>
                      </div> 
                    </div>
                  </div>
                  <div className="ms-wrapper-btn">
                    <button
                      className="ms-btn"
                      onClick={() => handleClickSudmit()}
                    >
                      Save Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PropertiesModalSave
