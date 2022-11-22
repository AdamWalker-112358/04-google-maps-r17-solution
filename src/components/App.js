import React, { useState, useRef } from "react";
import TopBar from "./TopBar";
import GoogleMap from "./Google_map";

export default function App(){

  const [coordinates, setCoordinates] = useState({ lat: -34.397, lng: 150.644 })
  const [zoom, setZoom] = useState(8)
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


    return (
      <div className="app">
        <TopBar>Google Maps Example in React</TopBar>
        <div className="hbox mb20">
          {/* How should we format components with lots of props?  */}
          <button
            data-city="london"
            onClick={() => reposition("tel aviv")}
          > Tel Aviv </button>
          <button data-city="paris" onClick={() => reposition("paris")}> Paris </button>
          <button onClick={() => reposition("london")}>London</button>
          <input
            ref={input}
            type="number"
            min="8"
            max="16"
            placeholder="8"
            onChange={updateZoom}
          />
        </div>
        <GoogleMap zoom={zoom} lat={coordinates.lat} lng={ coordinates.lng} />
      </div>
    )
}
