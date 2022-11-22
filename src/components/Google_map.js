import React, {useEffect, useRef } from "react";

export default function GoogleMap({ lat, lng, zoom }) {

  // Global Refs to the Map Container and the Google Map Object - They are created after the component is rendered
  const mapContainer = useRef(null)
  const map = useRef(null)

  // Empty dependency array happens only on first render (why can't I create the map object in "UseRef")
  useEffect(() => {
    map.current = new window.google.maps.Map(mapContainer.current, {
      center: { lat, lng },
      zoom,
    })  
  } ,[])

  // Update the map location and zoom each time they change in the props
  useEffect(() => {
    map.current.setCenter({ lat, lng });
  }, [lat, lng])

  useEffect(() => {
    map.current.setZoom(zoom);
  }, [zoom])
  
  return <div ref={ mapContainer } className="map-box" />
}