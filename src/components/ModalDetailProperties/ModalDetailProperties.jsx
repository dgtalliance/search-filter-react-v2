import React, { useContext, useState } from "react";
import FilterContext from "../../Contexts/FilterContext";
import Carousel from "../common/Carousel";
import { getpropertiesDetails } from "../../config/slices/propertiesDetails";
import { useSelector } from "react-redux";
import ModalPropertyMap from "../common/ModalPropertyMap";
export const ModalDetailProperties = () => {
  const { closeModal } = useContext(FilterContext);

  const propertiesData = useSelector(getpropertiesDetails);
  console.log("dataaaa", propertiesData);

  const [isOpenCarusel, setIsOpenCarusel] = useState(false);
  const handlefullscreenButton = (e) => {
    e.preventDefault();
    setIsOpenCarusel(true);
  };

  const address_large = (resultDetail) => {
    return resultDetail.address_large !== null
      ? resultDetail.address_large
      : "";
  };

  return (
    <>
      {Object.keys(propertiesData).length > 0 && (
        <div className="ib-modal active" id="modalDetailProperty" tabIndex={-1}>
          <div className="ib-modal-dialog">
            <div className="ib-modal-content">
              <div className="ib-modal-header">
                <div className="ib-wrapper-flex">
                  <div className="ib-flex">
                    <button className="ib-btn -addFavorite">Save</button>
                    <div className="ib-dropdown">
                      <button className="ib-share-btn">
                        <i className="idx-icons-shared"></i> Share
                      </button>
                      <ul className="ib-share-list">
                        <li>
                          <a
                            href="#"
                            className="js-show-modals"
                            data-modal="#modalAlert"
                          >
                            <i className="idx-icons-envelope"></i> Email to a
                            friend
                          </a>
                        </li>
                        <li>
                          <a href="#" className="-clipboard">
                            <i className="idx-icons-link"></i> Copy Link{" "}
                            <span
                              className="-copied"
                              style={{ display: "none" }}
                            >
                              URL copied!
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="idx-icons-facebook"></i> Facebook
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="idx-icons-twitter"></i> Twitter
                          </a>
                        </li>
                      </ul>
                    </div>
                    <a href="#" className="ib-btn -open">
                      <i className="idx-icons-open"></i> Open
                    </a>
                    <a href="#" className="ib-btn">
                      <i className="idx-icons-phone"></i> +1(888) 533-8736
                    </a>
                    <button
                      className="ib-close js-close-modals"
                      aria-label="Close"
                      data-modal="#modalDetailProperty"
                      onClick={closeModal}
                    ></button>
                  </div>
                  <div className="ib-header-detail">
                    <div className="ib-flex-column">
                      <h2 className="ib-title">
                        {propertiesData.address_large}
                      </h2>
                      <span>{propertiesData.address_short}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ib-modal-body">
                <div className="ib-slider-detail">
                  <div className="ib-pviews ib-pva-photos">
                    <div className="ib-pvwcta">
                      <ul className="ib-pvcta">
                        <li
                          className="ib-pvitem ib-pvi-active"
                          data-id="photos"
                        >
                          Photos
                        </li>
                        <li
                          className="ib-pvitem"
                          data-id="map"
                          data-lat="25.805033"
                          data-lng="-80.185699"
                        >
                          Map View
                        </li>
                      </ul>
                    </div>

                    <div className="ib-pvlist">
                      <div className="ib-pvphotos ib-pvlitem">
                        <div className="ib-pvslider" id="sliderModal">
                          <Carousel
                            itemsSlider={true}
                            address={
                              propertiesData.address_short +
                              " " +
                              address_large(propertiesData)
                            }
                            images={propertiesData.gallery}
                            isOpenModal={isOpenCarusel}
                            setIsOpenCarusel={setIsOpenCarusel}
                            swipe={false}
                          />
                        </div>
                      </div>

                      <div className="ib-pvmap">
                        <div className="ib-pmap">
                          <ModalPropertyMap
                            lat={parseFloat(propertiesData.lat)}
                            lng={parseFloat(propertiesData.lng)}
                            activeFullScreen={true}
                            activeStreetView={true}
                            activeControls={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ib-flex">
                  <div className="ib-row">
                    <div className="ib-info-property">
                      <ul className="ib-info">
                        <li className="ib-item ib-pilprice">
                          <span className="ib-price">
                            {propertiesData.price}
                          </span>
                          <div className="ib-asking">
                            <div className="ib-txt -mobile js-est-payment">
                              Est. Payment
                              <button className="ib-price-calculator">
                                $4,329.41/mo
                              </button>
                            </div>
                          </div>
                        </li>
                        <li className="ib-item ib-beds">
                          <span className="ib-number">
                            {propertiesData.bed}
                          </span>
                          <span className="ib-txt">Bedroom(s)</span>{" "}
                          <span className="ib-txt -min">Beds(s)</span>
                        </li>
                        <li className="ib-item ib-baths">
                          <span className="ib-number">
                            {propertiesData.bath}
                          </span>
                          <span className="ib-txt">Bathroom(s)</span>{" "}
                          <span className="ib-txt -min">Baths(s)</span>
                        </li>
                        <li className="ib-item ib-hbaths">
                          <span className="ib-number">
                            {propertiesData.baths_half}
                          </span>
                          <span className="ib-txt">Half Bath(s)</span>{" "}
                          <span className="ib-txt -min">Half Bath(s)</span>
                        </li>
                        <li className="ib-item ib-size">
                          <span className="ib-number">
                            {propertiesData.sqft}
                          </span>
                          <span className="ib-txt">Size sqft</span>{" "}
                          <span className="ib-txt -min">Sqft</span>
                        </li>
                        <li className="ib-item ib-lsize">
                          <span className="ib-number">
                            {propertiesData.price_sqft}
                          </span>
                          <span className="ib-txt">$/Sqft</span>{" "}
                          <span className="ib-txt -min">$/Sq.Ft</span>
                        </li>
                      </ul>
                    </div>

                    <div className="ib-pdescription">
                      <p>{propertiesData.remark}</p>
                    </div>

                    <div className="ib-plist-details">
                      <div className="ib-plist-card">
                        <h2 className="ib-plist-card-title">
                          Basic Information
                        </h2>
                        <ul className="ib-plist-list">
                          <li>
                            <span className="ib-plist-st">MLS #</span>
                            <span className="ib-plist-pt">
                              {propertiesData.mls_num}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Type</span>
                            <span className="ib-plist-pt">
                              {propertiesData.class_id}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Status</span>
                            <span className="ib-plist-pt">
                              {propertiesData.status_name}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Suddivision/Complex
                            </span>
                            <span className="ib-plist-pt">
                              {propertiesData.subdivision}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Year Built</span>
                            <span className="ib-plist-pt">
                              {propertiesData.year}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Total Sqft</span>
                            <span className="ib-plist-pt">
                              {propertiesData.total_sqft}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Date Listed</span>
                            <span className="ib-plist-pt">
                              {propertiesData.list_date}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Days on Market</span>
                            <span className="ib-plist-pt">
                              {propertiesData.days_market}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="ib-plist-details">
                      <div className="ib-plist-card">
                        <h2 className="ib-plist-card-title">
                          Exterior Features
                        </h2>
                        <ul className="ib-plist-list">
                          <li>
                            <span className="ib-plist-st">Waterfront</span>
                            <span className="ib-plist-pt">
                              {propertiesData.water_front}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Pool</span>
                            <span className="ib-plist-pt">
                              {propertiesData.pool}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">View</span>
                            <span className="ib-plist-pt">
                              {propertiesData.more_info_info.view}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Construction Type
                            </span>
                            <span className="ib-plist-pt">
                              {propertiesData.more_info_info.construction}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Design Description
                            </span>
                            <span className="ib-plist-pt">
                              {
                                propertiesData.more_info_info
                                  .architectural_style
                              }
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Exterior Features
                            </span>
                            <span className="ib-plist-pt">
                              {propertiesData.feature_exterior.map(
                                (feature_exterior, index) => (
                                  <span key={feature_exterior}>
                                    {" "}
                                    {feature_exterior}
                                    {propertiesData.feature_exterior.length >=
                                      1 &&
                                    propertiesData.feature_exterior.length !==
                                      index + 1
                                      ? ", "
                                      : ""}
                                    {propertiesData.feature_exterior.length ===
                                    index + 1
                                      ? "."
                                      : ""}
                                  </span>
                                )
                              )}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Parking Description
                            </span>
                            <span className="ib-plist-pt">
                              {propertiesData.parking_desc}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Roof Description
                            </span>
                            <span className="ib-plist-pt">
                              {propertiesData.more_info_info.roof}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Style</span>
                            <span className="ib-plist-pt">
                              {propertiesData.more_info_info.style}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="ib-plist-details">
                      <div className="ib-plist-card">
                        <h2 className="ib-plist-card-title">
                          Interior Features
                        </h2>
                        <ul className="ib-plist-list">
                          <li>
                            <span className="ib-plist-st">Adjusted Sqft</span>
                            <span className="ib-plist-pt">
                              {propertiesData.sqft}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Cooling Description
                            </span>
                            <span className="ib-plist-pt">
                              {propertiesData.more_info_info.cooling}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Equipment Appliances
                            </span>
                            <span className="ib-plist-pt">
                              {propertiesData.more_info_info.appliance}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Floor Description
                            </span>
                            <span className="ib-plist-pt">
                              {propertiesData.more_info_info.floor_desc}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Heating Description
                            </span>
                            <span className="ib-plist-pt">
                              {propertiesData.more_info_info.heating}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Interior Features
                            </span>
                            <span className="ib-plist-pt">
                              {propertiesData.feature_interior.map(
                                (feature_interior, index) => (
                                  <span key={feature_interior}>
                                    {" "}
                                    {feature_interior}
                                    {propertiesData.feature_interior.length >=
                                      1 &&
                                    propertiesData.feature_interior.length !==
                                      index + 1
                                      ? ", "
                                      : ""}
                                    {propertiesData.feature_interior.length ===
                                    index + 1
                                      ? "."
                                      : ""}
                                  </span>
                                )
                              )}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Sqft</span>
                            <span className="ib-plist-pt">
                              {propertiesData.sqft}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="ib-plist-details">
                      <div className="ib-plist-card">
                        <h2 className="ib-plist-card-title">
                          Property Features
                        </h2>
                        <ul className="ib-plist-list">
                          <li>
                            <span className="ib-plist-st">Address</span>
                            <span className="ib-plist-pt">
                              {propertiesData.more_info_info.addres}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Aprox. Lot Size</span>
                            <span className="ib-plist-pt">
                              {propertiesData.lot_size}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Architectural Style
                            </span>
                            <span className="ib-plist-pt">
                              {
                                propertiesData.more_info_info
                                  .architectural_style
                              }
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">City</span>
                            <span className="ib-plist-pt">
                              {propertiesData.more_info_info.city}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Construction Materials
                            </span>
                            <span className="ib-plist-pt">
                              {" "}
                              {propertiesData.more_info_info.construction}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">County</span>
                            <span className="ib-plist-pt">
                              {propertiesData.more_info_info.county}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Direction Faces</span>
                            <span className="ib-plist-pt">
                              {" "}
                              {propertiesData.more_info_info.faces}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Furnished Info</span>
                            <span className="ib-plist-pt">
                              {propertiesData.furnished}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Listing Terms</span>
                            <span className="ib-plist-pt">
                              {propertiesData.more_info_info.terms}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Lot Description</span>
                            <span className="ib-plist-pt">
                              {propertiesData.lot_desc}
                            </span>
                          </li>

                          <li>
                            <span className="ib-plist-st">Lot Features</span>
                            <span className="ib-plist-pt">
                              {propertiesData.more_info_info.lot_features}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Occupant Type</span>
                            <span className="ib-plist-pt">
                              {propertiesData.more_info_info.ocupant_type}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Parking Features
                            </span>
                            <span className="ib-plist-pt">
                              {propertiesData.more_info_info.parking_features}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Pets Allowed</span>
                            <span className="ib-plist-pt">
                              {propertiesData.more_info_info.pets}
                            </span>
                          </li>

                          <li>
                            <span className="ib-plist-st">Pool Features</span>
                            <span className="ib-plist-pt">
                              {propertiesData.more_info_info.pool_features}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Possession</span>
                            <span className="ib-plist-pt">
                              {propertiesData.more_info_info.possession}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Postal City </span>
                            <span className="ib-plist-pt">
                              {propertiesData.more_info_info.postal_city}
                            </span>
                          </li>

                          <li>
                            <span className="ib-plist-st">Roof</span>
                            <span className="ib-plist-pt">
                              {propertiesData.more_info_info.roof}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Sewer Description
                            </span>
                            <span className="ib-plist-pt">{propertiesData.more_info_info.sewer}</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Short Sale</span>
                            <span className="ib-plist-pt">{propertiesData.short_sale}</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Subdivision Complex
                            </span>
                            <span className="ib-plist-pt">{propertiesData.complex}</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Subdivision Info
                            </span>
                            <span className="ib-plist-pt">
                            {propertiesData.subdivision}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Tax Amount</span>
                            <span className="ib-plist-pt">{propertiesData.tax_amount}</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Tax Legal desc</span>
                            <span className="ib-plist-pt">
                            {propertiesData.more_info_info.tax_information}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Tax Year</span>
                            <span className="ib-plist-pt">{propertiesData.tax_year}</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Terms Considered
                            </span>
                            <span className="ib-plist-pt">
                            {propertiesData.more_info_info.terms}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Type of Property
                            </span>
                            <span className="ib-plist-pt">
                            {propertiesData.more_info_info.type_property}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">View</span>
                            <span className="ib-plist-pt">{propertiesData.more_info_info.view}</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Water Source</span>
                            <span className="ib-plist-pt">{propertiesData.more_info_info.water_source}</span>
                          </li>

                          <li>
                            <span className="ib-plist-st">
                              Year Built Details
                            </span>
                            <span className="ib-plist-pt">{propertiesData.more_info_info.year_built_details}</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* <div className="ib-plist-details">
                      <div className="ib-plist-card">
                        <h2 className="ib-plist-card-title">
                          Interior Features
                        </h2>
                        <ul className="ib-plist-list">
                          <li>
                            <span className="ib-plist-st">Adjusted Sqft</span>
                            <span className="ib-plist-pt">2,416</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Cooling Description
                            </span>
                            <span className="ib-plist-pt">
                              Central Air, Electric
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Equipment Appliances
                            </span>
                            <span className="ib-plist-pt">
                              SomeGasAppliances,Dryer,Dishwasher,GasRange,Microwave,Refrigerator,Washer
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Floor Description
                            </span>
                            <span className="ib-plist-pt">Tile, Wood</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Heating Description
                            </span>
                            <span className="ib-plist-pt">Central</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Interior Features
                            </span>
                            <span className="ib-plist-pt">
                              Bedroomon Main Level , Kitchen Island ,{" "}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Sqft</span>
                            <span className="ib-plist-pt">2,416</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="ib-plist-details">
                      <div className="ib-plist-card">
                        <h2 className="ib-plist-card-title">
                          Property Features
                        </h2>
                        <ul className="ib-plist-list">
                          <li>
                            <span className="ib-plist-st">Address</span>
                            <span className="ib-plist-pt">
                              1644 Washington St
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Aprox. Lot Size</span>
                            <span className="ib-plist-pt">10,947</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Architectural Style
                            </span>
                            <span className="ib-plist-pt">Detached,Ranch</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">City</span>
                            <span className="ib-plist-pt">Hollywood</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Construction Materials
                            </span>
                            <span className="ib-plist-pt">Block</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">County</span>
                            <span className="ib-plist-pt">Broward County</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Direction Faces</span>
                            <span className="ib-plist-pt">South</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Furnished Info</span>
                            <span className="ib-plist-pt">No</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Listing Terms</span>
                            <span className="ib-plist-pt">
                              Cash, Conventional
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Lot Description</span>
                            <span className="ib-plist-pt">
                              Item14to12AcreLot
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Lot Features</span>
                            <span className="ib-plist-pt">
                              Item14to12 Acre Lot
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Occupant Type</span>
                            <span className="ib-plist-pt">Call Agent</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Parking Features
                            </span>
                            <span className="ib-plist-pt">Driveway</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Pets Allowed</span>
                            <span className="ib-plist-pt">SizeLimit,Yes</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Pool Features</span>
                            <span className="ib-plist-pt">
                              Fenced, Heated, In Ground, Other, Pool
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Possession</span>
                            <span className="ib-plist-pt">Closing Funding</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Postal City </span>
                            <span className="ib-plist-pt">Hollywood</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Roof</span>
                            <span className="ib-plist-pt">
                              Composition,Shingle
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Sewer Description
                            </span>
                            <span className="ib-plist-pt">PublicSewer</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Short Sale</span>
                            <span className="ib-plist-pt">Regular Sale</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Subdivision Complex
                            </span>
                            <span className="ib-plist-pt"></span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Subdivision Info
                            </span>
                            <span className="ib-plist-pt">
                              HOLLYWOOD SOUTH SIDE ADD
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Tax Amount</span>
                            <span className="ib-plist-pt">$7,018</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Tax Legal desc</span>
                            <span className="ib-plist-pt">
                              HOLLYWOOD SOUTH SIDE ADD 3-16 B LOT 12,13 BLK 9
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Tax Year</span>
                            <span className="ib-plist-pt">2021</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Terms Considered
                            </span>
                            <span className="ib-plist-pt">
                              Cash, Conventional
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Type of Property
                            </span>
                            <span className="ib-plist-pt">
                              Single Family Residence
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">View</span>
                            <span className="ib-plist-pt">Pool</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Water Source</span>
                            <span className="ib-plist-pt">Public</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Year Built Details
                            </span>
                            <span className="ib-plist-pt">Unknown</span>
                          </li>
                        </ul>
                      </div>
                    </div> */}

                    <div className="ib-plist-details -map">
                      <div className="ib-pheader">
                        <h2 className="ib-ptitle"> {propertiesData.address_large}</h2>
                        <span> {propertiesData.address_short}</span>
                      </div>
                      <div
                        className="ib-wrapper-map"
                        id="ib-modal-property-map"
                      >
                        <ModalPropertyMap
                          lat={parseFloat(propertiesData.lat)}
                          lng={parseFloat(propertiesData.lng)}
                          activeFullScreen={true}
                          activeStreetView={true}
                          activeControls={true}
                        />
                      </div>
                    </div>

                    <div className="ib-disclaimer">
                      <p>
                        The multiple listing information is provided by the
                        GREATER FORT LAURDERDALE REALTORS® from a copyrighted
                        compilation of listings. The compilation of listings and
                        each individual listing are ©2022-present GREATER FORT
                        LAURDERDALE REALTORS®. All Rights Reserved. The
                        information provided is for consumers' personal,
                        noncommercial use and may not be used for any purpose
                        other than to identify prospective properties consumers
                        may be interested in purchasing. All properties are
                        subject to prior sale or withdrawal. All information
                        provided is deemed reliable but is not guaranteed
                        accurate, and should be independently verified. Listing
                        courtesy of:{" "}
                        <span className="ib-bdcourtesy">
                          The K Company Realty, LLC
                        </span>{" "}
                        <a className="ib-phone-office" href="tel:954-545-5583">
                          Ph.954-545-5583
                        </a>
                      </p>
                      <p>
                        Real Estate IDX Powered by:{" "}
                        <a
                          href="https://www.tremgroup.com"
                          title="TREMGROUP"
                          rel="nofollow"
                          target="_blank"
                        >
                          TREMGROUP
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="ib-row -aside">
                    <div className="ib-modal-form">
                      <div className="ib-modal-dialog">
                        <div className="ib-modal-content">
                          <div className="ib-modal-header">
                            <div className="ib-avatar-detail">
                              <img src="https://idxboost.s3.amazonaws.com/agent_profiles/80d4d4f82260.7a7e74677c15.jpg" />
                              <div className="ib-avatar-info">
                                <span className="ib-title">
                                  Fracisco Aguirre
                                </span>
                                <a href="tel:8885338736" className="ib-phone">
                                  Ph. +1(888) 533-8736
                                </a>
                              </div>
                            </div>
                            <button
                              aria-label="Close"
                              className="ib-close js-close-modal-aside"
                            ></button>
                          </div>
                          <div className="ib-modal-body">
                            <div className="ib-form">
                              <form action="" id="propertyForm">
                                <input
                                  id="form_txt_first_name_valid"
                                  type="hidden"
                                  value="Please Enter Your First Name"
                                />
                                <input
                                  id="form_txt_lastname_valid"
                                  type="hidden"
                                  value="Please Enter Your Last Name"
                                />
                                <input
                                  id="form_txt_email_valid"
                                  type="hidden"
                                  value="Please Enter a Valid Email Address"
                                />
                                <input
                                  id="form_txt_phone_valid"
                                  type="hidden"
                                  value="Please Enter a Valid Phone Number"
                                />

                                <div className="ib-input">
                                  <label htmlFor="firstName">First Name</label>
                                  <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    placeholder="First Name*"
                                    onPaste={() => {
                                      return false;
                                    }}
                                    onDrop={() => {
                                      return false;
                                    }}
                                    autoComplete="off"
                                    required
                                  />
                                </div>

                                <div className="ib-input">
                                  <label htmlFor="lastName">Last Name</label>
                                  <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    placeholder="Last Name*"
                                    onPaste={() => {
                                      return false;
                                    }}
                                    onDrop={() => {
                                      return false;
                                    }}
                                    autoComplete="off"
                                    required
                                  />
                                </div>

                                <div className="ib-input">
                                  <label htmlFor="email">Email</label>
                                  <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder="Email*"
                                    onPaste={() => {
                                      return false;
                                    }}
                                    onDrop={() => {
                                      return false;
                                    }}
                                    autoComplete="off"
                                    required
                                  />
                                </div>

                                <div className="ib-input">
                                  <label htmlFor="phone">Phone</label>
                                  <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    placeholder="Phone*"
                                    onPaste={() => {
                                      return false;
                                    }}
                                    onDrop={() => {
                                      return false;
                                    }}
                                    autoComplete="off"
                                    required
                                  />
                                </div>

                                <div className="ib-input -comment">
                                  <label htmlFor="Comment">Comment</label>
                                  <textarea
                                    name="comment"
                                    id="comment"
                                    defaultValue={
                                      "I am interested in 2900 NE 7th Ave #4106 Miami, FL 33137"
                                    }
                                    cols="30"
                                    rows="10"
                                  ></textarea>
                                </div>

                                <div className="ib-button-form">
                                  <button className="ib-btn">Submit</button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="ib-disclaimer">
                      <p>
                        The multiple listing information is provided by the
                        GREATER FORT LAURDERDALE REALTORS® from a copyrighted
                        compilation of listings. The compilation of listings and
                        each individual listing are ©2022-present GREATER FORT
                        LAURDERDALE REALTORS®. All Rights Reserved. The
                        information provided is for consumers' personal,
                        noncommercial use and may not be used for any purpose
                        other than to identify prospective properties consumers
                        may be interested in purchasing. All properties are
                        subject to prior sale or withdrawal. All information
                        provided is deemed reliable but is not guaranteed
                        accurate, and should be independently verified. Listing
                        courtesy of:{" "}
                        <span className="ib-bdcourtesy">
                          The K Company Realty, LLC
                        </span>{" "}
                        <a className="ib-phone-office" href="tel:954-545-5583">
                          Ph.954-545-5583
                        </a>
                      </p>
                      <p>
                        Real Estate IDX Powered by:{" "}
                        <a
                          href="https://www.tremgroup.com"
                          title="TREMGROUP"
                          rel="nofollow"
                          target="_blank"
                        >
                          TREMGROUP
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ib-modal-footer">
                <button className="ib-btn -addFavorite">Save</button>
                <div className="ib-dropdown">
                  <button className="ib-share-btn">
                    <i className="idx-icons-shared"></i> Share
                  </button>
                  <ul className="ib-share-list">
                    <li>
                      <a href="#">
                        <i className="idx-icons-envelope"></i> Email to a friend
                      </a>
                    </li>
                    <li>
                      <a href="#" className="-clipboard">
                        <i className="idx-icons-link"></i> Copy Link{" "}
                        <span className="-copied" style={{ display: "none" }}>
                          URL copied!
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="idx-icons-facebook"></i> Facebook
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="idx-icons-twitter"></i> Twitter
                      </a>
                    </li>
                  </ul>
                </div>
                <button className="ib-btn-rq js-float-form">
                  Contact Agent
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
