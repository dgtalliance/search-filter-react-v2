import React from 'react'
import { abbreviateNumber } from '../../utils/utils'

const CustomInfoWindow = ({ info, openModal }) => {
  return (
    <>
      {info.group.length === 1 && (
        <div
          className="infoWindowSingle"
          data-permalink={window.location.href + info.item.slug}
          data-mls={info.item.mls_num}
        >
          <div className="ib-ibwtitle">
            <h3 className="ib-ibtitle">
              <span className="ib-ibtxt">{info.item.address_short}</span>
            </h3>
          </div>
          <ul className="ib-ibproperties">
            <li
              className="ib-ibpitem ms-order-m"
              data-mls={info.item.mls_num}
              data-status="1"
              id={info.item.mls_num}
              onClick={() => {
                document.getElementById(info.item.mls_num).click()
              }}
            >
              <div className="ib-ibpa">
                <h4 className="ib-ibptitle">{info.item.address_short}</h4>

                <ul className="ib-ibdetails">
                  <li className="ib-ibditem ib-ibaddress">
                    {info.item.address_large}
                  </li>
                </ul>
                {info.item.price ? (
                  <ul className="ib-ibdetails">
                    <li className="ib-ibditem ib-ibbaths">
                      <span className="ib-ibdbold">
                        {abbreviateNumber(info.item.price)}
                      </span>
                    </li>
                  </ul>
                ) : (
                  <></>
                )}
                <ul className="ib-ibdetails">
                  <li className="ib-ibditem ib-ibbeds">
                    <span className="ib-ibdbold">{info.item.bed}</span>
                    Bed(s)
                  </li>
                </ul>
                <ul className="ib-ibdetails">
                  <li className="ib-ibditem ib-ibbaths">
                    <span className="ib-ibdbold">
                      {Number(info.item.bath) +
                        Number(info.item.baths_half) * 0.5}
                    </span>
                    Bath(s)
                  </li>
                </ul>
              </div>

              <div className="ib-ibpb">
                <img
                  alt="property"
                  className="ib-ibimg"
                  onError={(e) => {
                    e.target.src =
                      'https://www.idxboost.com/i/default_thumbnail.jpg'
                  }}
                  src={
                    info.item.thumbnail ||
                    'https://www.idxboost.com/i/default_thumbnail.jpg'
                  }
                />
              </div>

              <a href={window.location.href + info.item.slug} />
            </li>
          </ul>
        </div>
      )}
      {info.group.length > 1 && (
        <div
          className="ib-ibmulti infoWindowSingle"
          data-permalink={window.location.href + info.item.slug}
          data-mls={info.item.mls_num}
        >
          <div className="ib-ibwtitle">
            <div className="ib-ibcount">
              {info.group.length}
              <span>Units -</span>
            </div>
            <h3 className="ib-ibtitle">
              <span className="ib-ibtxt">{info.group[0].address_short}</span>
            </h3>
          </div>
          <ul className="ib-ibproperties">
            {info.group.map((item, index) => {
              return (
                <li
                  key={`info-box-multi-` + index}
                  id={item.mls_num}
                  className="ib-ibpitem ms-order-m"
                  data-mls={item.mls_num}
                  onClick={() => openModal(info.item)}
                  data-status="1"
                >
                  <div className="ib-ibpa">
                    <h4 className="ib-ibptitle">{item.address_short}</h4>

                    <ul className="ib-ibdetails">
                      <li className="ib-ibditem ib-ibaddress">
                        {item.address_large}
                      </li>
                    </ul>
                    {info.item.price ? (
                      <ul className="ib-ibdetails">
                        <li className="ib-ibditem ib-ibbaths">
                          <span className="ib-ibdbold">
                            {abbreviateNumber(info.item.price)}
                          </span>
                        </li>
                      </ul>
                    ) : (
                      <></>
                    )}
                    <ul className="ib-ibdetails">
                      <li className="ib-ibditem ib-ibbeds">
                        <span className="ib-ibdbold">{info.item.bed}</span>
                        Bed(s)
                      </li>
                    </ul>
                    <ul className="ib-ibdetails">
                      <li className="ib-ibditem ib-ibbaths">
                        <span className="ib-ibdbold">
                          {Number(item.bath) + Number(item.baths_half) * 0.5}
                        </span>
                        Bath(s)
                      </li>
                    </ul>
                  </div>

                  <div className="ib-ibpb">
                    <img
                      alt="property"
                      className="ib-ibimg"
                      onError={(e) => {
                        e.target.src =
                          'https://www.idxboost.com/i/default_thumbnail.jpg'
                      }}
                      src={
                        item.thumbnail ||
                        'https://www.idxboost.com/i/default_thumbnail.jpg'
                      }
                    />
                  </div>

                  <a href={window.location.href + item.slug} />
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}

export default CustomInfoWindow
