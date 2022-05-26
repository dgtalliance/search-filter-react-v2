import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getparams,
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
import { fetchAsyncDetails } from '../../config/actions/propertiesDetails'

const defaultCenter = { lat: 25.91157267302583, lng: -80.21950243519076 }
const defaultZoom = 11

const bootstrapURLKeys = {
  googleMapsApiKey: 'AIzaSyBdlczEuxYRH-xlD_EZH4jv0naeVT1JaA4',
  libraries: ['drawing', 'geometry'], 
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
  const [autoMapSearch, setAutoMapSearch] = useState(true)
  const [polygons, setPolygons] = useState([])
  const [initPolygons, setInitPolygons] = useState([])
  const [polygonsDraw, setPolygonsDraw] = useState([])

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

  var polygonsDrawTemp = []

  useEffect(() => {
    console.log('load data')
    if (paramsItems.length > 0 && mapRef.current !== null) {
      set_IB_MARKERS(paramsItems)
      if (!isDrawing) {
        loadMakers(paramsItems)
      }
    }

    if ('' != params.kml_boundaries && autoMapSearch && !isDrawing) {
      drawPolygonInit(params.kml_boundaries)
    }
  }, [paramsItems])

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
    setIsDrawing(false)
    initPolygons.setMap(mapRef.current)
    setPolygons(initPolygons)
    loadMakers(IB_MARKERS)
    drawingManager.current.setMap(null)
    drawingManager.current = null
    console.log(newPolygons.current)

    polygonsDrawTemp = []

    /*  if (polygonRefTemp.current?.length > 0) {
      for (let index = 0; index < polygonRefTemp.current.length; index++) {
        polygonRefTemp.current[index].setMap(null)
      }
      polygonRefTemp.current = []
    } */
  }
  const handleApply = (e) => {
    e.stopPropagation()
    e.preventDefault()
    console.log('polygonsDrawTemp', polygonRefTemp.current)
    setIsDrawing(false)
    removePolygons()
    // buscar class'#map-draw-apply-tg'
    // preguntar si la drawpolygons tiene valores y  drawingManager.setMap(null);
    // sino tiene regresar los markes y polygon inicial y return

    // mostrar btn de 'search this area'
    // drawingManager.setMap(null);
    // obtener array de coordenadas para hacer la consulta al api
  }
  const handleRemove = (e) => {
    e.stopPropagation()
    e.preventDefault()
    removePolygons()
  }
  // Impletation for map
  const handleMapDrawing = () => {
    // mostrar btn de 'search this area'

    setIsDrawing(true)
    removePolygons()
    removeloadMakers()
    initializeDraw()
  }
  const drawFreeHand = () => {
    var poly
    var move
    var mouseup
    //the polygon
    poly = new google.maps.Polyline({
      map: mapRef.current,
      clickable: false,
      editable: false,
      strokeColor: '#31239a',
      fillOpacity: 0.1,
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: '#31239a',
    })

    //move-listener
    move = google.maps.event.addListener(
      mapRef.current,
      isMobile ? 'touchmove' : 'mousemove',
      function (e) {
        poly.getPath().push(e.latLng)
      },
    )

    //mouseup-listener
    mouseup = google.maps.event.addListenerOnce(
      mapRef.current,
      'mouseup',
      function (e) {
        google.maps.event.removeListener(move)
        poly.setMap(null)
        var path = poly.getPath()
        poly = new google.maps.Polygon({
          map: mapRef.current,
          path: path,
          clickable: false,
          editable: false,
          strokeColor: '#31239a',
          fillOpacity: 0.1,
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: '#31239a',
        })
        console.log('path finish')
        polygonsDrawTemp.push(poly)
        polygonRefTemp.current = polygonsDrawTemp

        google.maps.event.removeListener(mouseup)
      },
    )
  }

  const initializeDraw = () => {
    drawingManager.current = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.LEFT_CENTER,
        drawingModes: [google.maps.drawing.OverlayType.POLYGON],
      },
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

    drawingManager.current.setMap(mapRef.current)

    google.maps.event.addListener(
      drawingManager.current,
      'overlaycomplete',
      function (event) {
        if (event.type != google.maps.drawing.OverlayType.MARKER) {
          drawingManager.current.setDrawingMode(null)
        }

        var newShape = event.overlay
        newShape.type = event.type
        console.log(
          newShape
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
  }

  const drawPolygonInit = (kml_boundaries) => {
    if ('undefined' === typeof mapRef.current || mapRef.current === null) {
      return
    }
    if (polygonRef.current !== null && polygonRef.current !== undefined) {
      polygonRef.current.setMap(null)
    }

    removePolygons()
    console.log('drawPolygonInit')

    setAutoMapSearch(false)
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
    setPolygons(tmpPolygon)
    polygonRef.current = tmpPolygon
  }

  const removePolygons = () => {
    setInitPolygons(polygons)
    if (Object.keys(polygons).length > 0) {
      polygonRef.current.setMap(null)
      setPolygons(null)
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
    fitBounds(mapRef.current, data)
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
    // fitBounds(map)
  }
  const onChangeMap = (e) => {
    console.log(e)
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

            <button onClick={initializeDraw} className="ib-btn js-show-area">
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
