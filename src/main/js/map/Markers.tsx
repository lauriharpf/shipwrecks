import React, { useEffect } from "react";
import { Clusterer } from "@react-google-maps/marker-clusterer";
import { Ship } from "../models";
import MemoMarker from "./MemoMarker";

interface Props {
  ships: Ship[];
  clusterer: Clusterer;
}

const Markers: React.FC<Props> = ({ ships, clusterer }) => {
  useEffect(() => {
    clusterer.repaint();
  });
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

  const onClick = ({ latLng: { lat, lng } }: google.maps.MouseEvent) => {
    const clickedShip = ships.find(
      (ship) => ship.latitude === lat() && ship.longitude === lng()
    );

    if (clickedShip) {
      clickedShip.select();
    }
  };

  const isLast = (index: number) => index === ships.length - 1;
  return (
    <>
      {ships.map((ship, index) => {
        const icon = ship.favorite ? favouriteMarkerIcon : defaultMarkerIcon;

        return (
          <MemoMarker
            key={ship.name}
            name={ship.name}
            position={{ lat: ship.latitude, lng: ship.longitude }}
            clusterer={clusterer}
            icon={icon}
            noClustererRedraw={!isLast(index)}
            onClick={onClick}
          />
        );
      })}
    </>
  );
};

export default Markers;
