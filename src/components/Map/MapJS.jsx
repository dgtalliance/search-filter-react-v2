import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getparams,
  getpropertiesMapData,
  updateDataMap,
  updateForm,
} from '../../config/slices/properties'
import { isMobile } from 'react-device-detect'
import GoogleMapReact from 'google-map-react'
import { abbreviateNumber } from '../../utils/utils'
import createHTMLMapMarker from './HtmlMarker'
import { renderToString } from 'react-dom/server'
import CustomInfoWindow from './CustomInfoWindow'
import FilterContext from '../../Contexts/FilterContext'
import { fetchAsyncDetails } from '../../config/actions/propertiesDetails'
import { fetchAsyncSearch } from '../../config/actions/properties'

const defaultCenter = { lat: 25.91157267302583, lng: -80.21950243519076 }
const defaultZoom = 11

const bootstrapURLKeys = {
  googleMapsApiKey: 'AIzaSyBdlczEuxYRH-xlD_EZH4jv0naeVT1JaA4',
  libraries: ['geometry', 'drawing'],
}

const MapJS = () => {
  console.log('Render MAP')
  const dispatch = useDispatch()
  const { setModalInfoWindow, openModal } = useContext(FilterContext)
  //load Data from redux
  const paramsItems = useSelector(getpropertiesMapData)
  const params = useSelector(getparams)
  // set States
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
  const polygonRef = useRef()
  const polygonRefTemp = useRef()
  var drawingManager = useRef()
  var newPolygons = useRef()
  var dontReloadBounds = useRef(true)
  var autoMapSearch = useRef(true)
 

  useEffect(() => {
    console.log('load data')
    if (paramsItems.length > 0 && mapRef.current !== null) {
      set_IB_MARKERS(paramsItems)
      if (!isDrawing) {
        loadMakers(paramsItems)
      }
    } else {
      if (!isDrawing) {
        removeloadMakers()
      }
    }
    if (params?.kml_boundaries && '' != params.kml_boundaries && !isDrawing) {
      drawPolygonInit(params.kml_boundaries)
    }
  }, [paramsItems])
  useEffect(() => {
    console.log('change params')
    dontReloadBounds.current = true
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

    document.body.classList.add('draw-map')
    setIsDrawing(false)

    polygonRef.current = polygonRefTemp.current
    polygonRef.current.setMap(mapRef.current)
    polygonRefTemp.current = null

    loadMakers(IB_MARKERS)

    drawingManager.current?.setMap(null)
    drawingManager.current = null
    newPolygons.current?.setMap(null)
    newPolygons.current = null
  }
  const handleApply = (e) => {
    e.stopPropagation()
    e.preventDefault()
    document.body.classList.add('draw-map')
    setIsDrawing(false)
   
    if (newPolygons.current?.getPath()) {
      var points = newPolygons.current.getPath()
      var coords = []
      var currentPathArray = []

      points.forEach((point) => {
        coords.push(point.lat() + ' ' + point.lng())
        currentPathArray.push({ lat: point.lat(), lng: point.lng() })
      })

      var lastPoint = points.getAt(0)

      coords.push(lastPoint.lat() + ' ' + lastPoint.lng())

      currentPathArray.push({ lat: lastPoint.lat(), lng: lastPoint.lng() })

      var points = new google.maps.MVCArray()

      for (var i = 0, l = currentPathArray.length; i < l; i++) {
        points.push(
          new google.maps.LatLng(
            currentPathArray[i].lat,
            currentPathArray[i].lng,
          ),
        )
      }   

      var encodedPath = google.maps.geometry.encoding.encodePath(points)

      // encode base64
      encodedPath = btoa(encodedPath)

      // make URL friendly
      encodedPath = encodedPath
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/\=+$/, '')

      var mapZoom = mapRef.current.getZoom()
      var mapBounds = mapRef.current.getBounds()

      var params = {
        rect: mapBounds.toUrlValue(),
        zm: mapZoom,
        filter_search_keyword_label: '',
        polygon_search: encodedPath,
        page: 1,
      }
      dispatch(updateForm(params))
      dispatch(fetchAsyncSearch())
    } else {
      polygonRef.current = polygonRefTemp.current
      polygonRef.current.setMap(mapRef.current)
      polygonRefTemp.current = null
      loadMakers(IB_MARKERS)
      if (newPolygons.current !== null || newPolygons.current !== undefined) {
        newPolygons.current?.setMap(null)
        newPolygons.current = null
      }
    }

    drawingManager.current?.setMap(null)
    drawingManager.current = null
    
  }
  const handleRemove = (e) => {
    e.stopPropagation()
    e.preventDefault()
    removePolygons()
    removeloadMakers()
    var mapZoom = mapRef.current.getZoom()
    var mapBounds = mapRef.current.getBounds()

    var params = {
      rect: mapBounds.toUrlValue(),
      zm: mapZoom,
      kml_boundaries: '',
      filter_search_keyword_label: '',
      polygon_search: '',
      page: 1,
    }
    dispatch(updateForm(params))
    dispatch(fetchAsyncSearch())
  }
  // Impletation for map
  const handleMapDrawing = () => {
    // mostrar btn de 'search this area'
    document.body.classList.remove('draw-map')
    setIsDrawing(true)
    removePolygons()
    removeloadMakers()
    initializeDraw()
  }

  const initializeDraw = () => {
    drawingManager.current = new google.maps.drawing.DrawingManager({
      map: mapRef.current,
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: false,
      polygonOptions: {
        strokeColor: '#31239a',
        fillOpacity: 0.1,
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: '#31239a',
        clickable: true,
        zIndex: 1,
        editable: true,
      },
    })

    google.maps.event.addListener(
      drawingManager.current,
      'overlaycomplete',
      (event) => {
        if (event.type != google.maps.drawing.OverlayType.MARKER) {
          drawingManager.current.setDrawingMode(null)
        }
        newPolygons.current = event.overlay
        newPolygons.current.type = event.type
        console.log(
          newPolygons.current
            .getPath()
            .getArray()
            .map((t) => t.lat() + '-' + t.lng()),
        )
      },
    )
  }

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

    if (isMobile) {
      map.setZoom(13)
    }
  }

  const drawPolygonInit = (kml_boundaries) => {
    if ('undefined' === typeof mapRef.current || mapRef.current === null) {
      return
    }
    if (polygonRef.current !== null && polygonRef.current !== undefined) {
      polygonRef.current.setMap(null)
    }

    if (newPolygons.current !== null || newPolygons.current !== undefined) {
      newPolygons.current?.setMap(null)
      newPolygons.current = null
    }

    removePolygons()
    
   
    var kb_exp = kml_boundaries.split(',')
    var tmp_points = new google.maps.MVCArray()
    for (var nn = 0, mm = kb_exp.length; nn < mm; nn++) {
      var tmp_point = kb_exp[nn].split(' ')
      tmp_points.push(new google.maps.LatLng(tmp_point[0], tmp_point[1]))
    }

    var tmpPolygon = new google.maps.Polygon({
      path: tmp_points,
      editable: false,
      strokeColor: '#31239a',
      fillOpacity: 0.1,
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: '#31239a',
    })

    tmpPolygon.setMap(mapRef.current)
    polygonRef.current = tmpPolygon
  }

  const removePolygons = () => {
    if (polygonRef.current?.getPath()) {
      polygonRefTemp.current = polygonRef.current
      polygonRef.current.setMap(null)
      polygonRef.current = null
    }
  }
  const removeloadMakers = () => {
    if (markersData.length > 0) {
      for (let i = 0; i < markersData.length; i++) {
        markersData[i].setMap(null)
      }
      setMarkersData([])
    }
  }
  const loadMakers = (data) => {
    if ('undefined' === typeof mapRef.current || mapRef.current === null) {
      return
    }
    console.log('load markers')
    removeloadMakers()
    let marker
    let markers = []

    const handleOnClick = (e) => {
      var mls = jQuery(e.target).parents('.infoWindowSingle').attr('data-mls')
      dispatch(fetchAsyncDetails(mls))
      openModal({ mls_num: mls })
    }

    data.forEach((grouped_properties, index) => {
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
        if (grouped_properties.item.infoWin) {
          setModalInfoWindow(grouped_properties)
        }
      } else {
        if (grouped_properties.item.infoWin) {
          let infoWindow = new google.maps.InfoWindow({
            disableAutoPan: true,
          })

          google.maps.event.addListener(infoWindow, 'domready', function () {
            var doc = document.getElementsByClassName('infoWindowSingle')
            for (var i = 0; i < doc.length; i++) {
              doc[i].addEventListener('click', handleOnClick)
            }
          })

          infoWindow.setContent(
            renderToString(<CustomInfoWindow info={grouped_properties} />),
          )
          infoWindow.open({
            anchor: marker,
            map: mapRef.current,
            shouldFocus: false,
          })

          google.maps.event.addListener(infoWindow, 'closeclick', (event) => {
            infoWindow.close()
            dispatch(
              updateDataMap({
                mls_num: grouped_properties.item.mls_num,
                active: false,
                infoWin: false,
              }),
            )
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
      markers.push(marker)
    })

    setMarkersData(markers)
    if (dontReloadBounds.current === true && autoMapSearch.current === true) {
      fitBounds(mapRef.current, data)
    }
    dontReloadBounds.current = false
    autoMapSearch.current = true
  }

  const onGoogleApiLoaded = ({ map, maps }) => {
    mapRef.current = map
    if (IB_MARKERS.length > 0) {
      console.log('onGoogleApiLoaded onGoogleApiLoaded')
      loadMakers(IB_MARKERS)
    }
    if (params?.kml_boundaries) {
      drawPolygonInit(params.kml_boundaries)
    }
     
    mapRef.current.addListener('dragend', () => {
      var idleListener = mapRef.current.addListener('idle', function () {
        google.maps.event.removeListener(idleListener)
        handleDragSearchEvent()
      })
    })
  }
  const onChangeMap = (e) => {}

  const handleDragSearchEvent = () => {
    if (true === isDrawing) {
      return
    }

    if (mapRef.current !== undefined && mapRef.current !== null) {
      var mapZoom = mapRef.current?.getZoom()
      var mapBounds = mapRef.current?.getBounds()
      var params = {
        rect: mapBounds.toUrlValue(),
        zm: mapZoom,
        page: 1,
      }

      dispatch(updateForm(params))
      dispatch(fetchAsyncSearch())
      autoMapSearch.current = false
    }
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
            <div className="flex-map-draw" onClick={handleMapDrawing}></div>
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

        <div className="ib-wrapper-float-actions -grid -view-map">
          <div className="ib-wrapper -round-sv">
            <button className="ib-btn">
              Save <i className="idx-icons-save"></i>
            </button>
            <button className="ib-btn js-show-grid">
              Grid <i className="idx-icons-grid"></i>
            </button>

            <button
              onClick={handleRemove}
              className={` ${
                params?.kml_boundaries &&
                '' != params.kml_boundaries &&
                !isDrawing
                  ? ''
                  : '-hidden'
              }  ib-btn js-show-area`}
            >
              Search this Area
            </button>
          </div>
        </div>

        <div className="ib-map-content">
          <GoogleMapReact
            bootstrapURLKeys={bootstrapURLKeys}
            defaultCenter={defaultCenter}
            defaultZoom={defaultZoom}
            onChange={(m) => onChangeMap(m)}
            yesIWantToUseGoogleMapApiInternals
            options={{
              scrollwheel: false,
              mapTypeControl: true,
              fullscreenControl: false,
              zoomControl: false,
              disableDefaultUI: true,
              disableDoubleClickZoom: true,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              panControl: !isDrawing,
              clickableIcons: false,
              gestureHandling: isDrawing ? 'none' : 'greedy',
              rotateControl: false,
              streetViewControl: !isDrawing,
              streetViewControlOptions: {
                position: google.maps.ControlPosition.TOP_RIGHT,
              },
              draggableCursor: !isDrawing ? 'grab' : 'crosshair', // Inicial cursor    crosshair -cruz   grabbing  -mano cerrada
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
