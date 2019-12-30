import React, { useEffect, useState } from "react";
import api from "./api";
import {
  GoogleMap,
  LoadScript,
  MarkerClusterer,
  Marker
} from "@react-google-maps/api";

const simpleMap = props => {
  const [shipwrecks, setShipwrecks] = useState([]);
  useEffect(() => {
    async function fetchShipwrecks() {
      const result = await api.getShipwrecks();
      setShipwrecks(result.data);
    }
    fetchShipwrecks();
  }, []);

  const options = {
    imagePath: "images/markerclusterer/m",
    minimumClusterSize: 5
  };

  return (
    <LoadScript
      id="script-loader"
      googleMapsApiKey="AIzaSyDWOU36_aLESVSSCFsrk4WdH9Q1mXdamgo"
      style={{ height: "calc(100% - 50px)", width: "100%" }}
    >
      <GoogleMap
        id="shipwreck-map"
        mapContainerStyle={{
          height: "calc(100% - 50px)",
          width: "100%"
        }}
        zoom={3}
        center={{
          lat: 43.13,
          lng: 27.55
        }}
      >
        <MarkerClusterer options={options}>
          {clusterer => {
            const defaultMarkerIcon = {
              path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
              scale: 5,
              strokeWeight: 1,
              fillColor: "white",
              fillOpacity: 1
            };
            return shipwrecks.map((ship, index) => (
              <Marker
                key={index}
                position={{ lat: ship.latitude, lng: ship.longitude }}
                clusterer={clusterer}
                title={ship.name}
                icon={defaultMarkerIcon}
              />
            ));
          }}
        </MarkerClusterer>
      </GoogleMap>
    </LoadScript>
  );
};

export default simpleMap;
