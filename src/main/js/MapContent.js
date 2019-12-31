import React from "react";
import { Marker, MarkerClusterer } from "@react-google-maps/api";

const options = {
  imagePath: "images/markerclusterer/m",
  minimumClusterSize: 5
};

export default ({ shipwrecks, handleMarkerClick }) => {
  const defaultMarkerIcon = {
    path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
    scale: 5,
    strokeWeight: 1,
    fillColor: "white",
    fillOpacity: 1
  };
  const favouriteMarkerIcon = {
    ...defaultMarkerIcon,
    fillColor: "orange"
  };

  return (
    <MarkerClusterer options={options}>
      {clusterer => {
        return shipwrecks.map((ship, index) => {
          const onClick = () => handleMarkerClick(ship.id);
          const icon = ship.favourite ? favouriteMarkerIcon : defaultMarkerIcon;

          return (
            <Marker
              key={index}
              position={{ lat: ship.latitude, lng: ship.longitude }}
              clusterer={clusterer}
              title={ship.name}
              icon={icon}
              onClick={onClick}
            />
          );
        });
      }}
    </MarkerClusterer>
  );
};
