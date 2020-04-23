import React, { useState } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { Ship } from "../Ship.types";
import MapContent from "./MapContent";

interface Props {
  ships: Ship[];
  isVisible: boolean;
}

const Map: React.FC<Props> = ({ ships, isVisible }) => {
  const [center] = useState({
    lat: 43.13,
    lng: 27.55,
  });

  return (
    <GoogleMap
      id="shipwreck-map"
      mapContainerClassName={isVisible ? "mainContent" : "hidden"}
      zoom={3}
      center={center}
    >
      {isVisible && <MapContent ships={ships} />}
    </GoogleMap>
  );
};

export default Map;
