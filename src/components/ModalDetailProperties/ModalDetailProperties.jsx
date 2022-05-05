import React, { useContext, useEffect, useRef, useState } from "react";
import FilterContext from "../../Contexts/FilterContext";
import Carousel from "../common/Carousel";
import { getpropertiesDetails } from "../../config/slices/propertiesDetails";
import { useDispatch, useSelector } from "react-redux";
import ModalPropertyMap from "../common/ModalPropertyMap";
import axios from "axios";
import { fetchAsyncDetails } from "../../config/actions/propertiesDetails";
import { Select, Spin } from "antd";
import { Segmented } from "antd";

import {
  calculate_mortgage,
  formatPrice,
  phoneFormat,
} from "../../utils/utils";

import RentalFormContact from "./RentalFormContact";
import ModalSendToFriend from "./ModalSendToFriend";
import { API_PROPERTIES_DETAIL_CHART } from "../../config/config";
import { Chart } from "./Chart";

import { ChartTabs } from "./ChartTabs";

export const ModalDetailProperties = () => {
  const { closeModal, openModal, setSlug, slug, modalData } =
    useContext(FilterContext);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [showModalEmailThankYou, setShowModalEmailThankYou] = useState(false);

  const [mediaElement, setMediaElement] = useState(0);
  const [propertymcpp, setPropertymcpp] = useState("$");
  const [propertymcty, setPropertymcty] = useState("30");
  const [propertymcdp, setPropertymcdp] = useState("20");
  const [propertymcir, setPropertymcir] = useState("3.215");

  const [chartDataApi, setChartDataApi] = useState([]);
  const [chartDataShow, setChartDataShow] = useState({});
  const [defaultHome, setDefaultHome] = useState("1");
  const [defaultCity, setDefaultCity] = useState("city");
  const [loadingDataChart, setLoadingDataChart] = useState(true);
  const [defaultTab, setDefaultTab] = useState("media_price");
  const [defaultYears, setDefaultYears] = useState(1);
  const [defaultYearsSegment, setDefaultYearsSegment] = useState("1 year");

  const refFormMortgage = useRef();
  const refPropertyMcTy = useRef();
  const refPropertyMcDp = useRef();
  const refPropertyMcIr = useRef();
  const refEstPayment = useRef();
  const refMortageCalculator = useRef();
  const refPriceCalculator = useRef();
  const refCalcMcMonthly = useRef();
  const refPropertyMcPp = useRef();
  const refCalculatorYears = useRef();
  const refCalculatorYearsList = useRef();
  const agentPhone = "(305) 614-4048";

  const styleMapModalShared = {
    position: "absolute",
    overflow: "hidden",
    height: "100%",
    width: "100%",
    top: "0",
    left: "0",
  };

  const styleMapModal = {
    backgroundColor: "rgb(238, 238, 238)",
    height: "100%",
    width: "100%",
    margin: "0px",
    left: "0px",
    top: "0px",
    position: "absolute",
    overflow: "hidden",
  };

  const handleOpenModal = (mls_num) => {
    // var new_slug = slug ? slug +`&show=${mls_num}`: `show=${mls_num}`;
    // var new_slug =  `show=${mls_num}`;
    // history.replaceState(null, null, "?" + new_slug);
    // setSlug(new_slug);

    // if(slug.includes("&")){
    //   let pos = slug.lastIndexOf("&");
    //   let new_str = slug.slice(0, pos);
    //   history.replaceState(null, null, "?" + new_str);
    //   setSlug(new_str);
    // }else{
    //   history.replaceState(null, null, "?");
    //   setSlug("");
    // }

    var currentSlug = "show=" + propertiesData.mls_num;
    var str = slug.replace(new RegExp(currentSlug, "g"), `show=${mls_num}`);
    history.replaceState(null, null, "?" + str);
    setSlug(str);
    dispatch(fetchAsyncDetails(mls_num));
  };

  const calculate = (val_cal) => {
    var price = val_cal.price;
    if (refFormMortgage.current.length > 0) {
      refFormMortgage.current.reset();

      var dp = refPropertyMcDp.current.value;
      var ty = refPropertyMcTy.current.value;
      var ir = refPropertyMcIr.current.value;

      var calc_mg = calculate_mortgage(price, dp, ty, ir);

      // refPriceCalculator.current.innerText = "$" + calc_mg.monthly + "/mo";
      refPriceCalculator.current.innerText = calc_mg.monthly + "/mo";

      var pp = price.replace(/[^\d]/g, "");
      setPropertymcpp("$" + formatPrice(pp));

      refEstPayment.current.style.display = "none";

      if (val_cal.is_rental == "0") {
        refEstPayment.current.style.display = "block";
      }
    }
  };

  const propertiesData = useSelector(getpropertiesDetails);

  useEffect(() => {
    if (Object.keys(propertiesData).length > 0) calculate(propertiesData);
  }, [propertiesData]);

  useEffect(() => {
    if (Object.keys(propertiesData).length > 0) {
      chartsDetails();
    }
  }, [propertiesData]);

  const chartsDetails = async () => {
    setDefaultHome("1");
    setDefaultTab("media_price");
    setDefaultYears(1);
    setDefaultYearsSegment("1 year");
    setLoadingDataChart(true);
    setDefaultCity("city");

    const response = await axios.get(
      API_PROPERTIES_DETAIL_CHART +
        `?city_id=${propertiesData.city_id}&board_id=${propertiesData.board_id}&zip=${propertiesData.zip}&is_rental=${propertiesData.is_rental}`
    );

    if (response.data.length != 0) {
      setChartDataApi(response.data);
      setChartDataShow({});
      setChartDataShow({
        categories: response.data.value.city.month,
        series: response.data.value.city.metadata["1"]["media_price"],
      });
      setLoadingDataChart(false);
    }
  };

  //cart events

  const { Option } = Select;

  function onChange(value) {
    console.log(`selected ${value}`);
    setChartDataShow({
      ...chartDataShow,
      series: chartDataApi.value[defaultCity].metadata[value][defaultTab],
    });
    setDefaultHome(value);
  }
  function onChangeCity(value) {
    console.log(`selected ${value}`);
    setChartDataShow({
      ...chartDataShow,
      series: chartDataApi.value[value].metadata[defaultHome][defaultTab],
    });
    setDefaultCity(value);
  }
  function changeYear(value) {
    setDefaultYears(value.charAt(0));
    setDefaultYearsSegment(value);
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  function callback(key) {
    setChartDataShow({
      ...chartDataShow,
      series: chartDataApi.value[defaultCity].metadata[defaultHome][key],
    });
    setDefaultTab(key);
  }

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

  const formatPriceSqft = (sqft, price) => {
    if (sqft > 0 && price > 0) {
      return formatPrice(price / sqft);
    }
    return "";
  };

  const refOpenUrl = useRef();
  const openUrl = (e) => {
    e.preventDefault();
    const linkToOpen = refOpenUrl.current.getAttribute("data-permalink");
    //window.open(linkToOpen);
    window.open(linkToOpen);
  };

  const urlParseOpen = () => {
    return `/property/${propertiesData.slug}`;
  };

  const refSharedTwiter = useRef();
  const sharedTwitter = (e) => {
    e.preventDefault();
    let shareURL = "http://twitter.com/share?"; // url base
    const buildTextShare = [];
    const propertyRental =
      refSharedTwiter.current.getAttribute("data-rental") == 1
        ? "Rent "
        : "Sale ";
    buildTextShare.push(refSharedTwiter.current.getAttribute("data-type"));
    buildTextShare.push(` for ${propertyRental}`);
    buildTextShare.push(refSharedTwiter.current.getAttribute("data-price"));
    buildTextShare.push(
      ` #${refSharedTwiter.current.getAttribute("data-mls")}`
    );
    buildTextShare.push(" in ");
    buildTextShare.push(
      `${refSharedTwiter.current.getAttribute("data-address")} `
    );

    // params
    const params = {
      url: refSharedTwiter.current.href,
      text: buildTextShare.join(""),
    };

    for (const prop in params) {
      shareURL += `&${prop}=${encodeURIComponent(params[prop])}`;
    }

    const wo = window.open(
      shareURL,
      "",
      "left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
    );

    if (wo.focus) {
      wo.focus();
    }
  };

  const refSharedFacebook = useRef();

  const sharedFacebook = (e) => {
    e.preventDefault();
    let shareURL = "https://www.facebook.com/sharer/sharer.php?";

    // params
    const params = {
      u: refSharedFacebook.current.href,
    };

    for (const prop in params) {
      shareURL += `&${prop}=${encodeURIComponent(params[prop])}`;
    }
    console.log(shareURL);
    const wo = window.open(
      shareURL,
      "",
      "left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
    );

    if (wo.focus) {
      wo.focus();
    }
  };

  const openModalEmailToFriend = (e) => {
    e.preventDefault();
    setShowModal(true);

    // update fields from store data user
    // var fn = (typeof Cookies.get("_ib_user_firstname") !== "undefined") ? Cookies.get("_ib_user_firstname") : "";
    // var ln = (typeof Cookies.get("_ib_user_lastname") !== "undefined") ? Cookies.get("_ib_user_lastname") : "";
    // var em = (typeof Cookies.get("_ib_user_email") !== "undefined") ? Cookies.get("_ib_user_email") : "";
    // if (fn.lenght || ln.length) {
    // 	$("#_sf_name").val(fn + " " + ln);
    // }
    // $("#_sf_email").val(em);
  };

  const closeModalEmailToFriend = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  const openEmailThankYou = (e) => {
    e.preventDefault();
    setShowModalEmailThankYou(true);
  };

  const handleSubmitSendToFriend = (e, data) => {
    e.preventDefault();
    // console.log('resultDetail.mls_num:',resultDetail.mls_num);
  };

  const openCalculatorYears = (e) => {
    e.preventDefault();
    refCalculatorYearsList.current.style.display = "block";
  };

  const closeCalculatorYears = (e) => {
    e.preventDefault();

    var itemValue = e.target.getAttribute("data-value");
    var itemText = e.target.innerText;

    setPropertymcty(itemValue);
    refCalculatorYears.current.innerText = itemText;

    refCalculatorYearsList.current.style.display = "none";
  };

  const calculatePrice = (e) => {
    e.preventDefault();
    var pp = refPropertyMcPp.current.value.replace(/[^\d]/g, "");
    var dp = refPropertyMcDp.current.value;
    var ty = refPropertyMcTy.current.value;
    var ir = refPropertyMcIr.current.value;

    var calc_mg = calculate_mortgage(pp, dp, ty, ir);

    // refCalcMcMonthly.current.innerText = "$" + calc_mg.monthly;
    refCalcMcMonthly.current.innerText = calc_mg.monthly;
  };

  const onClosePriceCalculator = (e) => {
    e.preventDefault();
    if (refFormMortgage.current.length > 0) {
      refFormMortgage.current.reset();
      setPropertymcty("30");
      setPropertymcdp("20");
      setPropertymcir("3.215");
    }
    refMortageCalculator.current.classList.remove("ib-md-active");
  };

  const onClickPriceCalculator = (e) => {
    e.preventDefault();

    var pp = refPropertyMcPp.current.value;
    var dp = refPropertyMcDp.current.value;
    var ty = refPropertyMcTy.current.value;
    var ir = refPropertyMcIr.current.value;

    var calc_mg = calculate_mortgage(pp, dp, ty, ir);

    var price = pp.replace(/[^\d]/g, "");
    // setPropertymcpp("$" + formatPrice(price));
    setPropertymcpp(formatPrice(price));

    refMortageCalculator.current.classList.add("ib-md-active");

    // refCalcMcMonthly.current.innerText = "$" + calc_mg.monthly;
    refCalcMcMonthly.current.innerText = calc_mg.monthly;
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
                            data-status={propertiesData.status_type}
                            data-mls={propertiesData.mls_num}
                            onClick={openModalEmailToFriend}
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
                          <a
                            href={`/property/${propertiesData.slug}`}
                            ref={refSharedFacebook}
                            className="ib-plsitem ib-plsifb"
                            onClick={sharedFacebook}
                          >
                            <i className="idx-icons-facebook"></i> Facebook
                          </a>
                        </li>
                        <li>
                          <a
                            href={`/property/${propertiesData.slug}`}
                            className="ib-plsitem ib-plsitw"
                            data-address={`${propertiesData.address_short} ${propertiesData.address_large}`}
                            data-price={propertiesData.price}
                            data-type={propertiesData.class_id}
                            data-rental={propertiesData.is_rental}
                            data-mls={propertiesData.mls_num}
                            ref={refSharedTwiter}
                            onClick={sharedTwitter}
                          >
                            <i className="idx-icons-twitter"></i> Twitter
                          </a>
                        </li>
                      </ul>
                    </div>

                    <a
                      href="#"
                      className="ib-btn -open"
                      data-permalink={urlParseOpen()}
                      ref={refOpenUrl}
                      onClick={openUrl}
                    >
                      <i className="idx-icons-open"></i> Open
                    </a>
                    <a href="#" className="ib-btn">
                      <i className="idx-icons-phone"></i> +1(888) 533-8736
                    </a>
                    <button
                      className="ib-close js-close-modals"
                      aria-label="Close"
                      data-modal="#modalDetailProperty"
                      onClick={() => {
                        setDefaultHome("1");
                        setDefaultTab("media_price");
                        setDefaultYears(1);
                        setDefaultYearsSegment("1 year");
                        setChartDataShow({});
                        setDefaultCity("city");
                        closeModal();
                      }}
                    ></button>
                  </div>
                  <div className="ib-header-detail">
                    <div className="ib-flex-column">
                      <h2 className="ib-title">
                        {propertiesData.address_short}
                      </h2>
                      <span>{propertiesData.address_large}</span>
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
                            <div
                              className="ib-txt -mobile js-est-payment"
                              ref={refEstPayment}
                            >
                              Est. Payment
                              <button
                                className="ib-price-calculator"
                                ref={refPriceCalculator}
                                onClick={onClickPriceCalculator}
                              ></button>
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
                            <span className="ib-plist-pt">
                              {propertiesData.more_info_info.sewer}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Short Sale</span>
                            <span className="ib-plist-pt">
                              {propertiesData.short_sale}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">
                              Subdivision Complex
                            </span>
                            <span className="ib-plist-pt">
                              {propertiesData.complex}
                            </span>
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
                            <span className="ib-plist-pt">
                              {propertiesData.tax_amount}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Tax Legal desc</span>
                            <span className="ib-plist-pt">
                              {propertiesData.more_info_info.tax_information}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Tax Year</span>
                            <span className="ib-plist-pt">
                              {propertiesData.tax_year}
                            </span>
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
                            <span className="ib-plist-pt">
                              {propertiesData.more_info_info.view}
                            </span>
                          </li>
                          <li>
                            <span className="ib-plist-st">Water Source</span>
                            <span className="ib-plist-pt">
                              {propertiesData.more_info_info.water_source}
                            </span>
                          </li>

                          <li>
                            <span className="ib-plist-st">
                              Year Built Details
                            </span>
                            <span className="ib-plist-pt">
                              {propertiesData.more_info_info.year_built_details}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {propertiesData.related_properties && (
                      <div className="ib-plist-details">
                        <div className="ib-plist-card">
                          <h2 className="ib-plist-card-title">
                            Similar Properties For sale
                          </h2>
                          <ul className="ib-similar-property">
                            {propertiesData.related_properties.map(
                              (element) => (
                                <li
                                  className="ib-item ib-property"
                                  data-mls={element.mls_num}
                                  key={element.mls_num}
                                >
                                  <div className="ib-wrapper-item">
                                    <h4 className="ib-title">
                                      {element.address_short}
                                    </h4>
                                    <ul className="ib-details">
                                      <li className="ib-address">
                                        {element.address_large}
                                      </li>
                                      <li className="ib-price">{`$ ${element.price}`}</li>
                                      <li className="ib-beds">
                                        <strong>{element.bed}</strong> Bed(s)
                                      </li>
                                      <li className="ib-baths">
                                        <strong>{element.bath}</strong> Bath(s)
                                      </li>
                                      <li className="ib-sqft">
                                        <strong>
                                          {formatPrice(element.sqft)}
                                        </strong>{" "}
                                        Sqft
                                      </li>
                                      <li className="ib-sqft">
                                        <strong>
                                          {formatPriceSqft(
                                            element.sqft,
                                            element.price
                                          )}
                                        </strong>{" "}
                                        / Sqft
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="ib-figure">
                                    <img
                                      className="ib-img"
                                      src={element.thumbnail}
                                      alt={element.address_large}
                                    />
                                  </div>
                                  <a
                                    className="ib-link"
                                    onClick={() =>
                                      handleOpenModal(element.mls_num)
                                    }
                                  >
                                    Details of
                                    {element.address_short}
                                    {element.address_large}
                                  </a>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    )}

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

                    {Object.keys(chartDataShow).length > 0 && (
                      <Spin spinning={loadingDataChart}>
                        <div style={{ padding: 12 }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: '15px'
                            }}
                          >
                            <div>
                            <Select
                              style={{ width: 200, marginRight: 10}}
                              showSearch
                              placeholder="Select"
                              optionFilterProp="children"
                              onChange={onChangeCity}
                              value={defaultCity}
                              onSearch={onSearch}
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              <Option value="city">City</Option>
                              <Option value="zip">Zip</Option>
                            </Select>
                            <Select
                              style={{ width: 200 }}
                              showSearch
                              placeholder="Select a home type"
                              optionFilterProp="children"
                              onChange={onChange}
                              value={defaultHome}
                              onSearch={onSearch}
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              <Option value="1">Condos</Option>
                              <Option value="2">Homes</Option>
                              <Option value="26">Lands</Option>
                              <Option value="100">TownHomes</Option>
                            </Select>
                            </div>
                            
                            <Segmented
                              options={["1 year", "2 years", "3 years"]}
                              value={defaultYearsSegment}
                              onChange={changeYear}
                            />
                          </div>

                          <ChartTabs
                            callback={callback}
                            defaultTab={defaultTab}
                            chartDataApi={chartDataApi}
                            defaultHome={defaultHome}
                            chartDataShow={chartDataShow}
                            defaultYears={defaultYears}
                            defaultCity={defaultCity}
                          ></ChartTabs>
                        </div>
                      </Spin>
                    )}

                    <div className="ib-plist-details -map">
                      <div className="ib-pheader">
                        <h2 className="ib-ptitle">
                          {" "}
                          {propertiesData.address_short}
                        </h2>
                        <span> {propertiesData.address_large}</span>
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
                    {/* <div className="ib-modal-form">
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
                                      `I am interested in ${propertiesData.address_large} ${propertiesData.address_short }`
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
                    </div> */}

                    <RentalFormContact
                      mls_num={propertiesData.mls_num}
                      address_large={address_large(propertiesData)}
                      address_short={propertiesData.address_short}
                      key_val={propertiesData.key}
                      owner={propertiesData.owner}
                    />

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
          {/* modal calculator */}
          <div
            className="ib-modal-master"
            id="ib-mortage-calculator"
            ref={refMortageCalculator}
          >
            <div className="ib-mmcontent">
              <div className="ib-mwrapper ib-mgeneric">
                <div className="ib-mgheader">
                  <h4 className="ib-mghtitle">Estimated Monthly Payment</h4>
                </div>
                <div className="ib-mg-detail">
                  <p style={{ marginTop: "0" }}>Monthly Amount</p>
                  <span
                    className="ib-price-mont ib-mcdinumbers ib-calc-mc-monthly"
                    ref={refCalcMcMonthly}
                  ></span>
                  <div id="chart-container"></div>
                  <p>
                    Estimate includes principal and interest, taxes and
                    insurance.
                  </p>
                </div>
                <div className="ib-mgcontent">
                  <div className="mb-mcform">
                    <form
                      className="ib-property-mortgage-f"
                      ref={refFormMortgage}
                    >
                      <ul className="ib-mcinputs">
                        <li className="ib-mcitem">
                          <span className="ib-mgitxt">Purchase Price</span>
                          <div className="ib-mgiwrapper ib-property-mc-pp">
                            <label
                              className="ms-hidden"
                              htmlFor="ib-property-mc-pp"
                            >
                              Purchase Price
                            </label>
                            <input
                              id="ib-property-mc-pp"
                              ref={refPropertyMcPp}
                              className="ib-mcipurchase ib-property-mc-pp"
                              value={propertymcpp}
                              type="text"
                              readOnly
                            />
                          </div>
                        </li>
                        <li className="ib-mcitem">
                          <span className="ib-mgitxt">Year Term (Years)</span>
                          <div className="ib-mgiwrapper ib-mgwselect">
                            <label
                              className="ms-hidden"
                              htmlFor="ib-property-mc-ty"
                            >
                              Select year
                            </label>
                            <input
                              className="ib-mcsyears ib-property-mc-ty"
                              id="ib-property-mc-ty"
                              ref={refPropertyMcTy}
                              defaultValue={propertymcty}
                            />
                            <div className="ms-wrapper-dropdown-menu">
                              <button
                                id="calculatorYears"
                                ref={refCalculatorYears}
                                onClick={openCalculatorYears}
                              >
                                30 Years
                              </button>
                              <ul
                                id="calculatorYearsList"
                                ref={refCalculatorYearsList}
                                className="ms-dropdown-menu"
                                role="menu"
                              >
                                <li>
                                  <a
                                    href="#"
                                    data-value="30"
                                    className="-js-item-cl"
                                    onClick={closeCalculatorYears}
                                  >
                                    30 Years
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    data-value="20"
                                    className="-js-item-cl"
                                    onClick={closeCalculatorYears}
                                  >
                                    20 Years
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    data-value="15"
                                    className="-js-item-cl"
                                    onClick={closeCalculatorYears}
                                  >
                                    15 Years
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    data-value="10"
                                    className="-js-item-cl"
                                    onClick={closeCalculatorYears}
                                  >
                                    10 Years
                                  </a>
                                </li>
                              </ul>
                            </div>
                            {/* <select className="ib-mcsyears ib-property-mc-ty" id="ib-property-mc-ty">
                          <option value="30">30 Years</option>
                          <option value="15">15 Years</option>
                        </select> */}
                          </div>
                        </li>
                        <li className="ib-mcitem">
                          <span className="ib-mgitxt">Interest Rate(%)</span>
                          <div className="ib-mgiwrapper">
                            <label
                              className="ms-hidden"
                              htmlFor="ib-property-mc-ir"
                            >
                              Interest Rate(%)
                            </label>
                            <div className="ms-item-input">
                              <input
                                className="ib-mcidpayment ib-property-mc-ir"
                                data-default="3.215"
                                ref={refPropertyMcIr}
                                defaultValue={propertymcir}
                                onChange={(e) =>
                                  setPropertymcir(e.target.value)
                                }
                                step="any"
                                type="text"
                                max="100"
                                min="0"
                              />
                              <span>%</span>
                            </div>
                          </div>
                        </li>
                        <li className="ib-mcitem">
                          <span className="ib-mgitxt">Down Payment(%)</span>
                          <div className="ib-mgiwrapper">
                            <label
                              className="ms-hidden"
                              htmlFor="ib-property-mc-dp"
                            >
                              Down Payment(%)
                            </label>
                            <div className="ms-item-input">
                              <input
                                className="ib-mcidpayment ib-property-mc-dp"
                                data-default="20"
                                ref={refPropertyMcDp}
                                defaultValue={propertymcdp}
                                onChange={(e) =>
                                  setPropertymcdp(e.target.value)
                                }
                                step="any"
                                type="text"
                                max="100"
                                min="0"
                              />
                              <span>%</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <button
                        type="button"
                        className="ib-mgsubmit ib-property-mortage-submit"
                        onClick={calculatePrice}
                      >
                        Calculate
                      </button>
                    </form>
                  </div>
                  <div className="mb-mcdata">
                    <p>
                      Let's us know the best time for showing.{" "}
                      <a
                        href={`tel:${phoneFormat(agentPhone)}`}
                        title={`Call Us ${phoneFormat(agentPhone)}`}
                      >
                        {agentPhone}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="ib-img-calculator"></div>
              </div>
              <div className="ib-mmclose" onClick={onClosePriceCalculator}>
                <span className="ib-mmctxt">Close</span>
              </div>
            </div>
            <div className="ib-mmbg"></div>
          </div>
          {/* modal calculator */}
          <ModalSendToFriend
            isOpen={showModal}
            closeModal={closeModalEmailToFriend}
            openEmailThankYou={openEmailThankYou}
            mediaElement={
              (parseInt(propertiesData.img_cnt, 10) > 0 ? 1 : 0) > 0
                ? "ib-pva-photos"
                : "ib-pva-map"
            }
            itemLt={parseFloat(propertiesData.lat)}
            itemLg={parseFloat(propertiesData.lng)}
            styleMapModalShared={styleMapModalShared}
            styleMapModal={styleMapModal}
            itemYear={propertiesData.year}
            itemCity={propertiesData.city_name}
            origin={1}
            imgProp={
              propertiesData.gallery.length > 0 ? propertiesData.gallery[0] : ""
            }
            itemPrice={propertiesData.price}
            itemBeds={propertiesData.bed}
            itemBaths={propertiesData.bath}
            itemSqft={propertiesData.sqft}
            itemAddress={
              propertiesData.address_short + ", " + propertiesData.address_large
            }
            handleSubmitSendToFriend={handleSubmitSendToFriend}
          />
        </div>
      )}
    </>
  );
};
