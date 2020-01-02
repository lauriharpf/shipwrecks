import React, { useState } from "react";
import { GoogleMap } from "@react-google-maps/api";
import MapContent from "./MapContent";

export default ({ shipwrecks, isVisible, handleMarkerClick }) => {
  const [center, setCenter] = useState({
    lat: 43.13,
    lng: 27.55
  });

  let map;
  const onMapLoad = loadedMap => (map = loadedMap);
  const centerChanged = () =>
    map && setCenter({ lat: map.center.lat(), lng: map.center.lng() });

  return (
    <GoogleMap
      id="shipwreck-map"
      mapContainerClassName={isVisible ? "mainContent" : "hidden"}
      zoom={3}
      center={center}
      onLoad={onMapLoad}
      onCenterChanged={centerChanged}
    >
      <MapContent
        shipwrecks={shipwrecks}
        handleMarkerClick={handleMarkerClick}
      />
    </GoogleMap>
  );
};
