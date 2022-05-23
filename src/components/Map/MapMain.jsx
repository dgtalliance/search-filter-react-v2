import React, { useEffect, useRef, useState } from 'react'
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api'
import { useDispatch, useSelector } from 'react-redux'
import {
  getpropertiesMapData,
  updateDataMap,
} from '../../config/slices/properties'
import CustomInfoWindow from './CustomInfoWindow'
import { isMobile } from 'react-device-detect'

const mapContainerStyle = {
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  margin: '0px',
  padding: '0px',
  position: 'relative',
}
const defaultCenter = { lat: 25.91157267302583, lng: -80.21950243519076 }
const defaultZoom = 11

function MapMain() {
  const dispatch = useDispatch()

  //load Data from redux
  const params = useSelector(getpropertiesMapData)
  // set States
  const [activeMarker, setActiveMarker] = useState(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [IB_MARKERS, set_IB_MARKERS] = useState([])
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
  }, [params])

  const handleActiveMarker = (marker, active) => {
    setActiveMarker(marker)
    if (!active) {
      dispatch(
        updateDataMap({
          mls_num: marker.item.mls_num,
          active: false,
          infoWin: false,
        }),
      )
    } else {
      dispatch(
        updateDataMap({
          mls_num: marker.item.mls_num,
          active: true,
          infoWin: true,
        }),
      )
    }
  }

  const fitBounds = () => {
    const bounds = new google.maps.LatLngBounds()
    IB_MARKERS.forEach((element) => {
      let position = new google.maps.LatLng({
        lat: Number(element.item.lat),
        lng: Number(element.item.lng),
      })
      bounds.extend(position)
    })
    mapRef.current.fitBounds(bounds)
  }

  const handleOnLoad = (map) => {
    mapRef.current = map
    fitBounds()
  }

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
          {Object.keys(IB_MARKERS).length > 0 && (
            <GoogleMap
              onLoad={handleOnLoad}
              onClick={() => setActiveMarker(null)}
              mapContainerStyle={mapContainerStyle}
              defaultCenter={defaultCenter}
              defaultZoom={defaultZoom}
              options={{
                scrollwheel: false,
                mapTypeControl: false,
                fullscreenControl: false,
                zoomControl: false,
                disableDefaultUI: true,
                disableDoubleClickZoom: true,
                panControl: true,
                gestureHandling: true,
                rotateControl: false,
                streetViewControl: !isDrawing,
                streetViewControlOptions: {
                  position: google.maps.ControlPosition.TOP_RIGHT,
                },
                draggableCursor: 'pointer', // Inicial cursor    crosshair -cruz   grabbing  -mano cerrada
                draggingCursor: 'grabbing', //
              }}
            >
              {IB_MARKERS.map((element, index) => (
                <Marker
                  key={index}
                  position={{
                    lat: Number(element.item.lat),
                    lng: Number(element.item.lng),
                  }}
                  onClick={() => handleActiveMarker(element, true)}
                >
                  {element.item.infoWin && !isMobile ? (
                    <InfoWindow
                      position={{
                        lat: Number(element.item.lat),
                        lng: Number(element.item.lng),
                      }}
                      onCloseClick={() => handleActiveMarker(element, false)}
                    >
                      <CustomInfoWindow info={element} />
                    </InfoWindow>
                  ) : null}
                </Marker>
              ))}
            </GoogleMap>
          )}
        </div>
      </div>
    </>
  )
}

export default MapMain
