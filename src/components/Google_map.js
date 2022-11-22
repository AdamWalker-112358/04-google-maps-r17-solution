import React, {useEffect, useRef } from "react";

export default function GoogleMap({ lat, lng, zoom, markerCount, markerDetails }) {

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

  useEffect(() => {
    const contentString = `<div><h1>${markerDetails.title}</h1><h2>${markerDetails.shop}</h2></div>`
    const infoWindow = new google.maps.InfoWindow({
      content: contentString,
    });

    let marker = new google.maps.Marker();
    marker.setPosition(map.current.getCenter().toJSON())
    marker.setMap(map.current);
    marker.addListener('mouseover', event => {infoWindow.open({
      anchor:marker,
      map: map.current,
    })})
    marker.addListener('mouseout', event => {infoWindow.close()})
  }, [markerCount])

  // How do we stop the div from rerendering without "shouldComponentUpdate"?
  
  return <>
    <div ref={mapContainer} className="map-box"></div>
  </>
}