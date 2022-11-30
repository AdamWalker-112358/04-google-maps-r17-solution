import React, { useState, useEffect, useRef } from "react";
import useLocalStorage from "../hooks/use-local-storage";
import TopBar from "./TopBar";
import GoogleMap from "./Google_map";

const LOCATIONS = {
  TELAVIV: {lat: 32.0042938, lng: 34.7615399 }, 
  SALE: {lat: 53.4160301, lng:-2.345692},
  BROMLEY: {lat: 51.4142897, lng:0.0186523},
  SYDNEY: {lat: -34.397,lng: 150.644}, 
  TALSHAHAR: {lat: 31.8055516, lng:34.8975763}
}

export default function App(){
  const [coordinates, setCoordinates] = useLocalStorage({ lat: -34.397, lng: 150.644 }, 'coordinates')
  const [zoom, setZoom] = useLocalStorage(8, 'zoom')
  const [markerDetails, setMarkerDetails] = useLocalStorage({ title: '', shop: '' }, 'markerDetails')
  const [markerCount, setMarkerCount] = useLocalStorage(0, 'markerCount');
  const [markers, setMarkers] = useLocalStorage([], 'markers')
  const input = useRef(null)



  function setLocation(city){
    switch (city) {
      case LOCATIONS.TELAVIV:
        setCoordinates(LOCATIONS.TELAVIV);
        break;
      case LOCATIONS.TALSHAHAR:
        setCoordinates(LOCATIONS.TALSHAHAR);
        break;
      case LOCATIONS.SALE:
        setCoordinates(LOCATIONS.SALE)
        break
      case LOCATIONS.BROMLEY:
        setCoordinates(LOCATIONS.BROMLEY)
        break;
      case LOCATIONS.SYDNEY:
        setCoordinates(LOCATIONS.SYDNEY)
        break;;
    }
  }

  function updateZoom() {
    setZoom(Number(input.current.value))
  };

  function showLocation() {
    window.navigator.geolocation.getCurrentPosition((location) => {
      const { coords: {latitude: lat, longitude: lng } } = location
      setCoordinates({lat,lng})
    })
  }

  const updateDetails = event => {
    setMarkerDetails({ ...markerDetails, [event.target.name]: event.target.value })
    
  }

  function setMarkerCoordinates(coordinates) {
    setCoordinates(coordinates)
  }

  const addMarker = () => {
    setMarkerCount(markerCount + 1)
    setMarkers([...markers, {...markerDetails, coordinates}])
    console.log(markers)
  }

  useEffect(() => {
    markers.for
  },[])


    return (
      <div className="app">
        <TopBar>Google Maps Example in React</TopBar>
        <div className="hbox mb20">
          {/* How should we format components with lots of props?  */}
          <button onClick={() => setLocation(LOCATIONS.TELAVIV)}> Tel Aviv </button>
          <button onClick={() => setLocation(LOCATIONS.TALSHAHAR)}> Tal Shahar </button>
          <button onClick={() => setLocation(LOCATIONS.BROMLEY)}> Bromley </button>
          <button onClick={() => setLocation(LOCATIONS.SALE)}> Sale </button>
          <button onClick={() => setLocation(LOCATIONS.SYDNEY)}> Sydney </button>
          <button onClick={showLocation}>Where Am I?</button>
        </div>
        
        <div className="hbox mb20">
          <input name='title' onChange={updateDetails} type='text'/>
          <select name='shop' onChange={updateDetails}>
            <option value=''>None</option>
            <option value='starbucks'>StarBucks</option>
            <option value='costa'>Costa Coffee</option>
            <option value='waterstones'>Waterstone</option>
            <option value='next'>Next</option>
            <option value='marks'>Marks & Spencers</option>
          </select>
          <button onClick={addMarker}>Add Marker</button>
          <input
            ref={input}
            type="number"
            min="8"
            max="16"
            value={zoom}
            onChange={updateZoom}
          />
        </div>
        <GoogleMap {...{zoom, markerCount, markerDetails, setMarkerCoordinates}} lat={coordinates.lat} lng={coordinates.lng} />
      </div>
    )
}
