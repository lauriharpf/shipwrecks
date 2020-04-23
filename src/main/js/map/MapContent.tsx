import React from "react";
import { Marker, MarkerClusterer } from "@react-google-maps/api";
import { Ship } from "../Ship.types";
import { Clusterer } from "@react-google-maps/marker-clusterer";
const options = {
  imagePath: "images/markerclusterer/m",
  minimumClusterSize: 3,
};

interface Props {
  ships: Ship[];
}

interface MarkerClickEvent {
  latLng: {
    lat: () => number;
    lng: () => number;
  };
}

const MapContent: React.FC<Props> = ({ ships }) => {
  const defaultMarkerIcon = {
    path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
    scale: 5,
    strokeWeight: 1,
    fillColor: "white",
    fillOpacity: 1,
    labelOrigin: new google.maps.Point(0, 2),
  };
  const favouriteMarkerIcon = {
    ...defaultMarkerIcon,
    fillColor: "orange",
  };

  const onClick = ({ latLng: { lat, lng } }: MarkerClickEvent) => {
    const clickedShip = ships.find(
      (ship) => ship.latitude === lat() && ship.longitude === lng()
    );

    clickedShip.select();
  };

  const isLast = (index: number) => index === ships.length - 1;

  return (
    <MarkerClusterer options={options}>
      {(clusterer: Clusterer) => {
        return ships.map((ship, index) => {
          const icon = ship.favorite ? favouriteMarkerIcon : defaultMarkerIcon;

          return (
            <Marker
              key={ship.name}
              position={{ lat: ship.latitude, lng: ship.longitude }}
              clusterer={clusterer}
              label={{ text: ship.name, fontSize: "12px", fontWeight: "bold" }}
              title={ship.name}
              icon={icon}
              noClustererRedraw={!isLast(index)}
              onClick={onClick}
            />
          );
        });
      }}
    </MarkerClusterer>
  );
};

export default MapContent;
