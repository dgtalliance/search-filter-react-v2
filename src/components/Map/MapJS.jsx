import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getpropertiesMapData,
  updateDataMap,
} from '../../config/slices/properties'
import { isMobile } from 'react-device-detect'
import GoogleMapReact from 'google-map-react'
import { abbreviateNumber } from '../../utils/utils'
import createHTMLMapMarker from './HtmlMarker'
import { renderToString } from 'react-dom/server'
import CustomInfoWindow from './CustomInfoWindow'
import FilterContext from '../../Contexts/FilterContext'

const defaultCenter = { lat: 25.91157267302583, lng: -80.21950243519076 }
const defaultZoom = 11

const bootstrapURLKeys = {
  googleMapsApiKey: 'AIzaSyBdlczEuxYRH-xlD_EZH4jv0naeVT1JaA4',
  language: 'en',
  region: 'us',
  libraries: ['drawing', 'geometry'],
}

const MapJS = () => {
  console.log('Render MAP')
  const dispatch = useDispatch()
  const { setModalInfoWindow } = useContext(FilterContext)
  //load Data from redux
  const params = useSelector(getpropertiesMapData)
  // set States
  const [activeMarker, setActiveMarker] = useState(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [IB_MARKERS, set_IB_MARKERS] = useState([])
  const [markersData, setMarkersData] = useState([])
  //ref elements
  const containerMap = useRef()
  const mapRef = useRef()
  const fullscreen = useRef()
  const zoomIn = useRef()
  const zoomOut = useRef()
  const satellite = useRef()
  const draw = useRef()

  useEffect(() => {
    set_IB_MARKERS(params)
    if (params.length > 0) {
      if (mapRef.current !== null) {
        loadMakers(params)
      }
    }
  }, [params])

  //Btn fullscreenButton
  const handlefullscreenButton = (event) => {
    event.stopPropagation()
    event.preventDefault()
    const classFullScreen = 'is-fullscreen'
    var elementToSendFullscreen = containerMap.current

    if (isFullscreen(elementToSendFullscreen)) {
      exitFullscreen()
    } else {
      requestFullscreen(elementToSendFullscreen)
    }

    document.onwebkitfullscreenchange = document.onmsfullscreenchange = document.onmozfullscreenchange = document.onfullscreenchange = function () {
      if (isFullscreen(elementToSendFullscreen)) {
        fullscreen.current.classList.add(classFullScreen)
      } else {
        fullscreen.current.classList.remove(classFullScreen)
      }
    }
  }

  const isFullscreen = (element) => {
    return (
      (document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement) == element
    )
  }

  const requestFullscreen = (element) => {
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.msRequestFullScreen) {
      element.msRequestFullScreen()
    }
  }

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  }
  //Btn ZoomIn
  const handleZoomIn = (event) => {
    event.stopPropagation()
    event.preventDefault()
    mapRef.current.setZoom(mapRef.current.getZoom() + 1)
  }
  // Btn ZoomOut
  const handleZoomOut = (event) => {
    event.stopPropagation()
    event.preventDefault()
    mapRef.current.setZoom(mapRef.current.getZoom() - 1)
  }
  // Btn View Satellite
  const handleSatellite = (event) => {
    event.stopPropagation()
    event.preventDefault()
    mapRef.current.setMapTypeId(google.maps.MapTypeId.HYBRID)
    if (satellite.current.classList.contains('is-active')) {
      satellite.current.classList.remove('is-active')
      mapRef.current.setMapTypeId(google.maps.MapTypeId.ROADMAP)
    } else {
      satellite.current.classList.add('is-active')
      mapRef.current.setMapTypeId(google.maps.MapTypeId.HYBRID)
    }
  }

  const handleCancel = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }
  const handleApply = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }
  const handleRemove = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }
  // Impletation for map

  const fitBounds = (map, arr) => {
    const bounds = new google.maps.LatLngBounds()
    arr.forEach((element) => {
      let position = new google.maps.LatLng({
        lat: Number(element.item.lat),
        lng: Number(element.item.lng),
      })
      bounds.extend(position)
    })
    map.fitBounds(bounds)
  }

  const loadMakers = (IB_MARKERS) => {
    if ('undefined' === typeof mapRef.current || mapRef.current === null) {
      return
    }

    if (markersData.length > 0) {
      for (let i = 0; i < markersData.length; i++) {
        markersData[i].setMap(null)
      }
      markersData.length = 0
      setMarkersData(markersData)
    }

    let marker
    let markers = []

    const handleOnClick = (e) => {
      const parentNode = jQuery(e.target).parents('.ib-ibpitem').eq(0)
      // const permalink = jQuery(parentNode).data("permalink");
      const mls = jQuery(parentNode).data('mls')
      console.log(mls)
      /*  openModal({
        mls_num: mls
      }, props.stay) */
    }

    IB_MARKERS.forEach((grouped_properties, index) => {
      let infoWindow = new google.maps.InfoWindow({
        disableAutoPan: true,
      })

      /*  google.maps.event.addListener(infoWindow, 'domready', function () {
        var doc = document.getElementsByClassName('.ib-ibpitem')[0];
        doc.addEventListener("click", handleOnClick)
      }); */

      const { lat, lng } = grouped_properties.item

      let markerLabel = abbreviateNumber(grouped_properties.item.price)
      let markerClass = 'dgt-richmarker-single '
      let markerActive = grouped_properties.item.hovered
        ? ' ib-search-marker-active'
        : ''

      if (grouped_properties.group.length > 1) {
        markerLabel = grouped_properties.group.length + ' Units'
        markerClass = 'dgt-richmarker-group '
      }

      marker = createHTMLMapMarker({
        latlng: new google.maps.LatLng({
          lat: Number(lat),
          lng: Number(lng),
        }),
        map: mapRef.current,
        html: markerLabel,
        classDiv: markerClass + '' + markerActive,
      })
      if (isMobile) {
        // for movile show modal center bottom
        if (grouped_properties.item.infoWin) {
          setModalInfoWindow(grouped_properties)
        }
      } else {
        if (grouped_properties.item.infoWin) {
          infoWindow.setContent(
            renderToString(<CustomInfoWindow info={grouped_properties} />),
          )
          infoWindow.open({
            anchor: marker,
            map: mapRef.current,
            shouldFocus: false,
          })
        }
      }

      //events that
      marker.addListener('click', () => {
        dispatch(
          updateDataMap({
            mls_num: grouped_properties.item.mls_num,
            active: true,
            infoWin: true,
          }),
        )
      })

      google.maps.event.addListener(infoWindow, 'closeclick', (event) => {
        infoWindow.close()
        console.log('close click')
        dispatch(
          updateDataMap({
            mls_num: grouped_properties.item.mls_num,
            active: false,
            infoWin: false,
          }),
        )
      })

      markers.push(marker)
    })

    setMarkersData(markers)
  }

  const onGoogleApiLoaded = ({ map, maps }) => {
    mapRef.current = map
    // fitBounds(map)
  }

  const handleOnChildClick = (e) => {
    e.preventDefault()
  }
  return (
    <>
      <div className="ib-wrapper-map" ref={containerMap}>
        {!isDrawing && (
          <div
            className="flex-map-controls-ct"
            style={{
              zIndex: '1',
              position: 'absolute',
              right: '0px',
              top: '0px',
            }}
          >
            <div
              className="flex-map-fullscreen"
              ref={fullscreen}
              onClick={handlefullscreenButton}
            ></div>

            <div
              className="flex-map-zoomIn"
              ref={zoomIn}
              onClick={handleZoomIn}
            ></div>
            <div
              className="flex-map-zoomOut"
              ref={zoomOut}
              onClick={handleZoomOut}
            ></div>
            <div className="flex-map-draw" ref={draw}></div>
            <div
              className="flex-satellite-button"
              ref={satellite}
              onClick={handleSatellite}
            ></div>
          </div>
        )}
        {isDrawing ? (
          <div
            id="wrap-map-draw-actions"
            style={{
              display: 'flex',
              position: 'absolute',
            }}
          >
            <div>
              Draw a shape around the region(s) you would like to live in
            </div>
            <div className="flex-content-btn-draw">
              <button
                onClick={handleCancel}
                type="button"
                className="map-draw-cancel-tg"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                type="button"
                className="map-draw-apply-tg"
              >
                Apply
              </button>
            </div>
          </div>
        ) : null}
        {undefined === undefined ? (
          <div className="content-rsp-btn">
            <div className="idx-btn-content">
              <div className="idx-bg-group">
                <button
                  style={{ padding: '0 20px' }}
                  onClick={handleRemove}
                  className="idx-btn-act ib-removeb-tg"
                  aria-label="remove"
                >
                  Search this area
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <div className="ib-map-content">
          <GoogleMapReact
            bootstrapURLKeys={bootstrapURLKeys}
            defaultCenter={defaultCenter}
            defaultZoom={defaultZoom}
            onChange={(m) => console.log(m)}
            yesIWantToUseGoogleMapApiInternals
            options={{
              scrollwheel: false,
              mapTypeControl: false,
              fullscreenControl: false,
              zoomControl: false,
              disableDefaultUI: true,
              disableDoubleClickZoom: true,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              panControl: true,
              clickableIcons: false,
              gestureHandling: true,
              rotateControl: false,
              streetViewControl: !isDrawing,
              streetViewControlOptions: {
                position: google.maps.ControlPosition.TOP_RIGHT,
              },
              draggableCursor: 'grab', // Inicial cursor    crosshair -cruz   grabbing  -mano cerrada
              draggingCursor: 'grabbing', //
            }}
            onGoogleApiLoaded={onGoogleApiLoaded}
          ></GoogleMapReact>
        </div>
      </div>
    </>
  )
}

export default MapJS
