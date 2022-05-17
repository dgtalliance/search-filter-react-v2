import { memo, useEffect, useRef, useState } from 'react'
import Map from 'google-map-react'
import { getpropertiesMapData } from '../../config/slices/properties'
import { useSelector } from 'react-redux'
import { abbreviateNumber } from '../../utils/utils'
import Marker from './Marker'

function MapSearch() {
  const bootstrapURLKeys = { key: 'AIzaSyBdlczEuxYRH-xlD_EZH4jv0naeVT1JaA4' }
  const defaultCenter = { lat: 25.91157267302583, lng: -80.21950243519076 }
  const defaultZoom = 11
  const params = useSelector(getpropertiesMapData)
  //set states
  const [isDrawing, setIsDrawing] = useState(false)
  const [IB_MARKERS, set_IB_MARKERS] = useState([])
  //ref elements
  const containerMap = useRef()
  const mapRef = useRef()
  const mapsRef = useRef()
  const fullscreen = useRef()
  const zoomIn = useRef()
  const zoomOut = useRef()
  const satellite = useRef()
  const draw = useRef()

  useEffect(() => {
    set_IB_MARKERS(params)
  }, [params])

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

  const handleZoomIn = (event) => {
    event.stopPropagation()
    event.preventDefault()
    mapRef.current.setZoom(mapRef.current.getZoom() + 1)
  }
  const handleZoomOut = (event) => {
    event.stopPropagation()
    event.preventDefault()
    mapRef.current.setZoom(mapRef.current.getZoom() - 1)
  }
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

  //PIN MARKERS

  const updateDataMap = (mapData) => {
    if (mapRef === null && mapRef === undefined) {
      return
    }
    var markers = []
    mapData.forEach((property) => {
      let markerLabel = abbreviateNumber(property.item.price)

      if (property.group.length > 1) {
        markerLabel = property.group.length + ' Units'
      }
    })
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
  console.log('Render Map')

  const handleOnChildClick = () => {}
  const handleOnChildMouseEnter = () => {}
  const handleOnChildMouseLeave = () => {}

  /// for marker

  const onGoogleApiLoaded = ({ map, maps }) => {
    mapRef.current = map
    mapsRef.current = maps
  }
  return (
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
          <div>Draw a shape around the region(s) you would like to live in</div>
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
        <Map
          bootstrapURLKeys={bootstrapURLKeys}
          defaultCenter={defaultCenter}
          defaultZoom={defaultZoom}
          onChildClick={handleOnChildClick}
          onChildMouseEnter={handleOnChildMouseEnter}
          onChildMouseLeave={handleOnChildMouseLeave}
          onChange={(m) => console.log(m)}
          yesIWantToUseGoogleMapApiInternals
          options={() => ({
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
          })}
          onGoogleApiLoaded={onGoogleApiLoaded}
        >
          {IB_MARKERS.map((element, index) => {
            return (
              <Marker
                key={index}
                lat={element.item.lat}
                lng={element.item.lng}
                info={element}
              />
            )
          })}
        </Map>
      </div>
    </div>
  )
}

export default memo(MapSearch)
