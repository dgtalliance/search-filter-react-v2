import { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAsyncDetails } from '../../config/actions/propertiesDetails'
import { updateDataMap } from '../../config/slices/properties'
import FilterContext from '../../Contexts/FilterContext'
import { abbreviateNumber } from '../../utils/utils'

function CustomInfoWindowMobile() {
  const dispatch = useDispatch()
  const { modalInfoWindow, setModalInfoWindow, openModal } = useContext(
    FilterContext,
  )
  const [info, setInfo] = useState([])
  useEffect(() => {
    setInfo(modalInfoWindow)
  }, [modalInfoWindow])

  const handleCloseModal = (value) => {
    setModalInfoWindow([])
    dispatch(updateDataMap({ mls_num: value, active: false, infoWin: false }))
  }
  const handleOpenModal = (mls) => {
    dispatch(fetchAsyncDetails(mls))
    openModal({ mls_num: mls })
  }
  const itemRender = (item,index) => {
    return (
      <li
        className="ib-item-list js-ib-item-list"
        data-mls={item.mls_num}
        key={`info-box-` + index}
        onClick={() => handleOpenModal(item.mls_num)}
      >
        <div className="ib-detail">
          <span className="ib-ibptitle">{item.address_short}</span>
          <ul className="ib-ibdetails">
            <li className="ib-item -address">{item.address_large}</li>
            <li className="ib-item -price">{abbreviateNumber(item.price)}</li>
            <li className="ib-item -beds">
              <strong>{item.bed}</strong>Bed(s)
            </li>
            <li className="ib-item -baths">
              <strong>{item.bath}</strong>Bath(s)
            </li>
            <li className="ib-item -sqft">
              <strong>{item.sqft}</strong>Sq.Ft.
            </li>
            {/* <li className="ib-item -sqft">
              <strong>{item.bath}</strong>/ Sq.Ft.
            </li> */}
          </ul>
        </div>
        <div className="ib-image">
          <img
            src={
              item.thumbnail ||
              'https://www.idxboost.com/i/default_thumbnail.jpg'
            }
          />
        </div>
      </li>
    )
  }
  return (
    <>
      {Object.keys(info).length > 0 && (
        <div className="ib-temporal-infobox -active">
          <div className="ib-temporal-wrapper-infobox">
            <div className="ib-temporal-wrapper-infobox-title">
              {info.group.length > 1 && (
                <span className="ib-count"> {info.group.length} Units</span>
              )}
              <span className="ib-text-title">{info.item.address_short}</span>
              <button
                onClick={() => handleCloseModal(info.item.mls_num)}
                className="ib-close js-temporal-infobox-close"
                aria-label="Close infobox"
              ></button>
            </div>
            <ul className="ib-temporal-wrapper-infobox-list">
              {info.group.map((item,index) => itemRender(item,index))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default CustomInfoWindowMobile
