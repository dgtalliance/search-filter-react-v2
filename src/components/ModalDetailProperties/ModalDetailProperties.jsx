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
                      <h2 className="ib-title">{propertiesData.address_large}</h2>
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
                          <span className="ib-price">{propertiesData.price}</span>
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
                          <span className="ib-number">{propertiesData.bed}</span>
                          <span className="ib-txt">Bedroom(s)</span>{" "}
                          <span className="ib-txt -min">Beds(s)</span>
                        </li>
                        <li className="ib-item ib-baths">
                          <span className="ib-number">3</span>
                          <span className="ib-txt">Bathroom(s)</span>{" "}
                          <span className="ib-txt -min">Baths(s)</span>
                        </li>
                        <li className="ib-item ib-hbaths">
                          <span className="ib-number">0</span>
                          <span className="ib-txt">Half Bath(s)</span>{" "}
                          <span className="ib-txt -min">Half Bath(s)</span>
                        </li>
                        <li className="ib-item ib-size">
                          <span className="ib-number">2,416</span>
                          <span className="ib-txt">Size sqft</span>{" "}
                          <span className="ib-txt -min">Sqft</span>
                        </li>
                        <li className="ib-item ib-lsize">
                          <span className="ib-number">$517</span>
                          <span className="ib-txt">$/Sqft</span>{" "}
                          <span className="ib-txt -min">$/Sq.Ft</span>
                        </li>
                      </ul>
                    </div>

                    <div className="ib-pdescription">
                      <p>
                        Check out this spectacular 8BR, 7-1/2BA Avalon beach
                        house located just 4 blocks to the beach and ½ block
                        into the north-end of downtown Avalon. With over 8,800
                        sq. ft. of living space, this monster of a home is a
                        VERY unique find on the island. The traditional floor
                        plan flows from the main living areas out to the covered
                        deck area overlooking the 15’x30’ heated pool surrounded
                        by mature landscaping giving the outdoor space a lot of
                        privacy. The first floor has a gourmet kitchen with a
                        huge center island and lots of counter seating, top of
                        the line appliances include a Sub-Zero
                        refrigerator/freezer, a 6 burner Wolf range with 2
                        ovens, 2 dishwashers and a large walk in pantry. The
                        cabinets are stocked with everything you will need to
                        celebrate meal time with your friends and family! There
                        is a breakfast nook off of the kitchen area overlooking
                        the pool – and an adjacent dining room with additional
                        seating on the covered deck. There is plenty of dining
                        space for everyone to be together. The beautifully
                        furnished and appointed living room features lots of
                        comfortable seating, a gas fireplace and a huge wall
                        mounted TV. Off of the kitchen is a child’s’ play room,
                        a powder room and a laundry room with utility sink and
                        extra full refrigerator and ice maker. There is a king
                        bedroom suite on this level with private bath. Take the
                        beautiful staircase to the 2nd floor that features 6
                        beautifully furnished bedrooms (1 King suite w/private
                        bath, 1 queen suite w/crib &amp; private bath, 1 queen
                        bedroom with an adjacent hall bath, 2 queen bedrooms
                        with a shared Jack and Jill bath and a bunk room with 2
                        sets of bunks/private bath &amp; TV/gaming area! There
                        is a Keuig coffee maker set up in the hallway for your
                        convenience and a second laundry room with another full
                        size washer/dryer. The Master Retreat is located on the
                        3rd level – with a private sitting/tv/living area, a
                        spacious master bedroom with walk in closet, and a huge
                        master bath with soaking tub and separate shower. You
                        will want for nothing as pretty much everything is
                        included with this rental – Linens and bath towels,
                        beach tags, beach chairs, umbrellas, cooler, bikes and
                        more! On top of that all – the owner provides a 6
                        passenger golf cart for easy transportation to the
                        beach! This is Avalon living at its finest. Take a
                        stroll into downtown and enjoy restaurants, bars,
                        boutique shopping, ice cream, mini-golf &amp; more! The
                        house sits on the south side of the street – so the
                        afternoon sun will keep you warm until sunset! Enjoy the
                        multiple furnished deck areas. Off street parking for 3
                        vehicles and non-metered parking on the street!
                      </p>
                    </div>

                    <div className="ib-plist-details">
                      <div className="ib-plist-card">
                        <h2 className="ib-plist-card-title">
                          Basic Information
                        </h2>
                        <ul className="ib-plist-list">
                          <li>
                            <span className="ib-plist-st">MLS #</span>
                            <span className="ib-plist-pt">A11188046</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Type</span>
                            <span className="ib-plist-pt">
                              Single Family Home
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Status</span>
                            <span className="ib-plist-pt">Active</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Suddivision/Complex
                            </span>
                            <span className="ib-plist-pt">
                              HOLLYWOOD SOUTH SIDE ADD
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Year Built</span>
                            <span className="ib-plist-pt">1955</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Total Sqft</span>
                            <span className="ib-plist-pt">10,947</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Date Listed</span>
                            <span className="ib-plist-pt">04/11/2022</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Days on Market</span>
                            <span className="ib-plist-pt">1</span>
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
                            <span className="ib-plist-pt">No</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Pool</span>
                            <span className="ib-plist-pt">Yes</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">View</span>
                            <span className="ib-plist-pt">Pool</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Construction Type
                            </span>
                            <span className="ib-plist-pt">Block</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Design Description
                            </span>
                            <span className="ib-plist-pt">Detached,Ranch</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Exterior Features
                            </span>
                            <span className="ib-plist-pt">
                              Fence, Fruit Trees, Security High Impact Doors,{" "}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Parking Description
                            </span>
                            <span className="ib-plist-pt">Driveway</span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Roof Description
                            </span>
                            <span className="ib-plist-pt">
                              Composition,Shingle
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Style</span>
                            <span className="ib-plist-pt">
                              Single Family Residence
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
                    </div>

                    <div className="ib-plist-details">
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
                    </div>

                    <div className="ib-plist-details -map">
                      <div className="ib-pheader">
                        <h2 className="ib-ptitle">4730 Bay Point Rd</h2>
                        <span>Miami, FL 33137</span>
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
