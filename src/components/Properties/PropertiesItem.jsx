import { memo, useContext } from 'react'
import FilterContext from '../../Contexts/FilterContext'
import { formatPrice } from '../../utils/utils'
import Carousel from '../common/Carousel'
import { fetchAsyncDetails } from '../../config/actions/propertiesDetails'
import { useDispatch } from 'react-redux'
function PropertiesItem({ itemData }) {
  const { openModal } = useContext(FilterContext)
  const dispatch = useDispatch()

  const handleOpenModal = () => {
    dispatch(fetchAsyncDetails(itemData.mls_num))
    openModal({ mls_num: itemData.mls_num })
  }
  const newListing = (property) => {
    if ('yes' === property.recently_listed || property.min_ago_txt != '') {
      if (property.min_ago > 0 && property.min_ago_txt != '') {
        return <li className="ib-item -status">{property.min_ago_txt}</li>
      } else {
        return <li className="ib-item -status">new listing</li>
      }
    } else if (1 != property.status) {
      return <li className="ib-item -status">{property.status_name}</li>
    }
  }

  return (
    <li className="ib-pitem">
      <ul className="ib-info">
        <li className="ib-item -price">{formatPrice(itemData.price)}</li>
        <li className="ib-item -beds">{itemData.bed} Bed(s)</li>
        <li className="ib-item -baths">{itemData.bath} Bath(s)</li>
        <li className="ib-item -sqft">{itemData.sqft} Sq.Ft.</li>
        <li className="ib-item -address">
          {itemData.address_short}, {itemData.address_large}
        </li>
        {newListing(itemData)}
        <li className="ms-logo-board"></li>
      </ul>
      <div className="ib-pislider gs-container-slider">
        <Carousel
          itemsSlider={false}
          swipe={true}
          address={itemData.address_short + ' ' + itemData.address_large}
          images={itemData.gallery}
        />
      </div>
      <button
        className="ib-favorite-btn -heart"
        aria-label="Add Favorite"
      ></button>
      <a
        className="ib-pipermalink js-show-modals"
        onClick={handleOpenModal}
      ></a>
    </li>
  )
}

export default memo(PropertiesItem)
