import React, { useRef,useEffect  } from 'react';
import GoogleMapReact from 'google-map-react';


const ModalPropertyMap = (
  {
    lat,
    lng,    
    activeFullScreen,
    activeStreetView,
    activeDraw=true,
    activeSatellite=true,
    activeControls,
    gestureHandling="greedy"})=>{
  
  //ref elements
  const containerMap = useRef();
  const mapRef = useRef();
  const mapsRef = useRef();
  const fullscreen = useRef();
  const zoomIn = useRef();
  const zoomOut = useRef();
  const satellite = useRef();
  const markersRef = useRef([]);

  useEffect(() => {
    if(mapRef.current !==null && mapRef.current!==undefined) {
      createMarker();
    }
  },[lat,lng])

  //actions for bottons
  const handlefullscreenButton = ()=> {
    const classFullScreen = "is-fullscreen"
    var elementToSendFullscreen = containerMap.current;
  
    if (isFullscreen(elementToSendFullscreen)) {
      exitFullscreen();
    } else {
      requestFullscreen(elementToSendFullscreen);
    }
  
    document.onwebkitfullscreenchange = document.onmsfullscreenchange = document.onmozfullscreenchange = document.onfullscreenchange = function () {
      if (isFullscreen(elementToSendFullscreen)) {
        fullscreen.current.classList.add(classFullScreen);
      } else {
        fullscreen.current.classList.remove(classFullScreen);
      }
    };
  }

  const isFullscreen = (element)=> {
    return (
      (document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement) == element
    );
  }

  const requestFullscreen = (element) =>{
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullScreen) {
      element.msRequestFullScreen();
    }
  }

  const exitFullscreen = ()=> {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }

  const handleZoomIn = (event)=>{
    event.stopPropagation();
		event.preventDefault();
    mapRef.current.setZoom(mapRef.current.getZoom() + 1);
  }
  const handleZoomOut = (event)=>{
    event.stopPropagation();
		event.preventDefault();
    mapRef.current.setZoom(mapRef.current.getZoom() - 1);
  }
  const handleSatellite = (event)=>{
    event.stopPropagation();
		event.preventDefault();
		mapRef.current.setMapTypeId(google.maps.MapTypeId.HYBRID)					
			if(satellite.current.classList.contains("is-active")){		  	 
         satellite.current.classList.remove("is-active");
         mapRef.current.setMapTypeId(google.maps.MapTypeId.ROADMAP)
			}else{
        satellite.current.classList.add("is-active");
        mapRef.current.setMapTypeId(google.maps.MapTypeId.HYBRID)
			}
  }


  const createMapOptions = (maps) => ({
    scrollwheel: false,
    mapTypeControl: false,
    fullscreenControl:false,
    zoomControl: false,
    streetViewControl: activeStreetView,
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    panControl: true,
    gestureHandling: gestureHandling,
    rotateControl:false,
    draggableCursor: "default",
    draggingCursor: "pointer"
  });
 
  // create and remove markers
  const createMarker = () => {
    if(markersRef.current.length>0){
      cleanMarker(markersRef.current);
    }
    let map = mapRef.current;
    let maps =  mapsRef.current;
    
    let marker = new maps.Marker({
      position: { lat, lng },
      map,
    });

    markersRef.current.push(marker);
  }
  const cleanMarker = (markers) => {
    for (let m of markers) {
      m.setMap(null);
    }
  }

  const onGoogleApiLoaded = ({
    map,
    maps,
  }) => {
    mapRef.current = map;
    mapsRef.current = maps;
    createMarker();
  };
    
  return (
    
    <div className="ib-wrapper-map" 
    ref={containerMap}
    >
          {activeControls && (
            <div className="flex-map-controls-ct" 
              style={
                {
                  zIndex: "1", 
                  position: "absolute", 
                  right: "0px", 
                  top: "0px"
                }}>
               {activeFullScreen && (
                <div className="flex-map-fullscreen" ref={fullscreen} onClick={handlefullscreenButton}></div>
                )} 
                <div className="flex-map-zoomIn" ref={zoomIn} onClick={handleZoomIn}></div>
                <div className="flex-map-zoomOut" ref={zoomOut} onClick={handleZoomOut}></div>
                
                {activeSatellite && (
                <div className="flex-satellite-button" ref={satellite} onClick={handleSatellite}></div>
                )}
          </div> 
          )}
         
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyBdlczEuxYRH-xlD_EZH4jv0naeVT1JaA4',
            language: 'en',
            region: 'us',
          }}
          style={{ height: '100%', position: 'relative', width: '100%' }}   
          zoom={18}     
          center={{
            lat: lat,
            lng: lng,
          }}
          yesIWantToUseGoogleMapApiInternals
          options={createMapOptions}
          onGoogleApiLoaded={onGoogleApiLoaded}
          >
        </GoogleMapReact>
          </div>
        
  );
}

export default ModalPropertyMap;
