import React, { useState, useRef } from "react";
import TopBar from "./TopBar";
import GoogleMap from "./Google_map";

export default function App(){

  const [coordinates, setCoordinates] = useState({ lat: -34.397, lng: 150.644 })
  const [zoom, setZoom] = useState(8)
  const [markerDetails, setMarkerDetails] = useState({ title: '', shop: '' })
  const [markerCount, setMarkerCount] = useState(0);
  const input = useRef(null)

  function reposition(city) {
    switch (city) {
      case "tel aviv":
        setCoordinates({ lat: 32.0042938, lng: 34.7615399 });
        break;
      case "london":
        setCoordinates({ lat: 51.528308, lng: -0.3817828 });
        break;
      case "paris":
        setCoordinates({ lat: 48.8587741, lng: 2.2069754 });
        break;
      default:
        alert("wrong city");
    }
  }

  function updateZoom() {
    setZoom(Number(input.value))
  };

  function showLocation() {
    window.navigator.geolocation.getCurrentPosition((location) => {
      const { coords: {latitude: lat, longitude: lng } } = location
      setCoordinates({lat,lng})
    })
  }

  const updateDetails = event => {
    setMarkerDetails({...markerDetails, [event.target.name]: event.target.value})
  }

 


    return (
      <div className="app">
        <TopBar>Google Maps Example in React</TopBar>
        <div className="hbox mb20">
          {/* How should we format components with lots of props?  */}
          <button onClick={() => reposition("tel aviv")}> Tel Aviv </button>
          <button onClick={() => reposition("paris")}> Paris </button>
          <button onClick={() => reposition("london")}>London</button>
          <input
            ref={input}
            type="number"
            min="8"
            max="16"
            placeholder="8"
            onChange={updateZoom}
          />
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
          <button onClick={() => setMarkerCount(markerCount + 1)}>Add Marker</button>
        </div>
        <GoogleMap {...{zoom, markerCount, markerDetails}} lat={coordinates.lat} lng={coordinates.lng} />
      </div>
    )
}
