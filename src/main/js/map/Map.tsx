import React, { useState } from "react";
import { GoogleMap, MarkerClusterer } from "@react-google-maps/api";
import { Clusterer } from "@react-google-maps/marker-clusterer";
import { Ship } from "../models/";
import Markers from "./Markers";

const options = {
  imagePath: "images/markerclusterer/m",
  minimumClusterSize: 3,
};

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
      mapContainerClassName="mainContent"
      mapContainerStyle={isVisible ? undefined : { display: "none" }}
      zoom={3}
      center={center}
    >
      <MarkerClusterer options={options}>
        {(clusterer: Clusterer) => (
          <Markers ships={ships} clusterer={clusterer} />
        )}
      </MarkerClusterer>
    </GoogleMap>
  );
};

export default Map;
