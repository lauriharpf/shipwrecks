import React, { useState } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { Ship } from "../Ship.types";
import MapContent from "./MapContent";

interface Props {
  shipwrecks: Ship[];
  isVisible: boolean;
  favourites: string[];
  handleMarkerClick: (name: string) => void;
}

const Map: React.FC<Props> = ({
  shipwrecks,
  favourites,
  isVisible,
  handleMarkerClick,
}) => {
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
      {isVisible && (
        <MapContent
          shipwrecks={shipwrecks}
          favourites={favourites}
          handleMarkerClick={handleMarkerClick}
        />
      )}
    </GoogleMap>
  );
};

export default Map;
