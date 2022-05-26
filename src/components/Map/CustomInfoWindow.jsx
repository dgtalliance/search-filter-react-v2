import React from 'react'
import { abbreviateNumber } from '../../utils/utils'

const CustomInfoWindow = ({ info }) => {
  const itemRender = (item, index) => {
    return (
      <li
        key={`info-win-` + index}
        className="ib-ibpitem ms-order-m infoWindowSingle"
        data-mls={item.mls_num}
      >
        <div className="ib-ibpa">
          <h4 className="ib-ibptitle">{item.address_short}</h4>

          <ul className="ib-ibdetails">
            <li className="ib-ibditem ib-ibaddress">{item.address_large}</li>
            {item.price ? (
              <li className="ib-ibditem ib-ibprice">
                <span className="ib-ibdbold">
                  {abbreviateNumber(item.price)}
                </span>
              </li>
            ) : null}

            <li className="ib-ibditem ib-ibbeds">
              <span className="ib-ibdbold">{item.bed}</span>
              Bed(s)
            </li>

            <li className="ib-ibditem ib-ibbaths">
              <span className="ib-ibdbold">{item.bath}</span>
              Bath(s)
            </li>
            <li className="ib-ibditem ib-ibbaths">
              <span className="ib-ibdbold">{item.sqft}</span>Sq.Ft.
            </li>
            {/* <li className="ib-item -sqft">
              <strong>{item.bath}</strong>/ Sq.Ft.
            </li> */}
          </ul>
        </div>

        <div className="ib-ibpb">
          <img
            alt="property"
            className="ib-ibimg"
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
        <div>
          <div className="ib-ibwtitle">
            {info.group.length > 1 && (
              <span className="ib-ibcount"> {info.group.length} Units</span>
            )}

            <h3 className="ib-ibtitle">
              <span className="ib-ibtxt">{info.item.address_short}</span>
            </h3>
          </div>
          <ul className="ib-ibproperties">
            {info.group.map((item, index) => itemRender(item, index))}
          </ul>
        </div>
      )}
    </>
  )
}

export default CustomInfoWindow
