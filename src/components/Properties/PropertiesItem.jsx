import { memo } from 'react'
import { formatPrice } from '../../utils/utils'
import Carousel from '../common/Carousel'

function PropertiesItem({ itemData }) {
  return (
    <li
      className="ib-pitem"
      data-geocode="25.772612:-80.279587"
      data-mls="A11149258"
      data-status="1"
    >
      <ul className="ib-info">
        <li className="ib-item -price">{formatPrice(itemData.price)}</li>
        <li className="ib-item -beds">{itemData.bed} Bed(s)</li>
        <li className="ib-item -baths">{itemData.bath} Bath(s)</li>
        <li className="ib-item -sqft">{itemData.sqft} Sq.Ft.</li>
        <li className="ib-item -address">
          {itemData.address_short}, {itemData.address_large}
        </li>
        {itemData.recently_listed === 'yes' && (
          <li className="ib-item -status">new listing</li>
        )}
        <li className="ms-logo-board"></li>
      </ul>
      <div
        className="ib-pislider gs-container-slider"
        data-img-cnt="2"
        data-mls="A11149258"
        data-status="1"
      >
        <Carousel
          itemsSlider={false}
          swipe={true}
          address={itemData.address_short + ' ' + itemData.address_large}
          images={itemData.gallery}
        />
      </div>
      <button
        className="ib-favorite-btn -heart"
        data-mls="A11188138"
        data-status="1"
        data-token-alert=""
        aria-label="Add Favorite"
      ></button>
      <a
        className="ib-pipermalink js-show-modals"
        data-modal="#modalDetailProperty"
        href="#"
        title=""
      ></a>
    </li>
  )
}

export default memo(PropertiesItem)
