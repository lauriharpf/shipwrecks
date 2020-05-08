import React, { useState, useEffect } from "react";
import { GoogleMap, MarkerClusterer } from "@react-google-maps/api";
import { Clusterer } from "@react-google-maps/marker-clusterer";
import { Ship } from "../models/";
import { markerBuilder } from "./markerBuilder/";

const options = {
  imagePath: "images/markerclusterer/m",
  minimumClusterSize: 3,
};

interface Props {
  ships: Ship[];
  isVisible: boolean;
}

const MapComponent: React.FC<Props> = ({ ships, isVisible }) => {
  const [center] = useState({
    lat: 43.13,
    lng: 27.55,
  });
  const [currentClusterer, setCurrentClusterer] = useState<Clusterer | null>(
    null
  );

  const onClick = ({ latLng: { lat, lng } }: google.maps.MouseEvent) => {
    const clickedShip = ships.find(
      (ship) => ship.latitude === lat() && ship.longitude === lng()
    );

    if (clickedShip) {
      clickedShip.select();
    }
  };

  useEffect(() => {
    if (!currentClusterer) {
      return;
    }

    const oldMarkers = new Map(
      //@ts-ignore
      currentClusterer.getMarkers().map((marker) => [marker.label, marker])
    );
    const changes = markerBuilder(oldMarkers, ships, onClick);

    changes.removed.forEach((marker) =>
      currentClusterer.removeMarker(marker, true)
    );

    changes.updated.forEach((update) => {
      update.marker.setIcon(update.newIcon);
    });

    currentClusterer.addMarkers(changes.added, true);
    if (currentClusterer.clusters.length > 0) {
      currentClusterer.repaint();
    } else {
      currentClusterer.redraw();
    }
  });

  const onLoad = (clusterer: Clusterer) => {
    setCurrentClusterer(clusterer);
  };

  return (
    <GoogleMap
      id="shipwreck-map"
      mapContainerClassName="mainContent"
      mapContainerStyle={isVisible ? undefined : { display: "none" }}
      zoom={3}
      center={center}
    >
      <MarkerClusterer options={options} onLoad={onLoad}>
        {() => {
          return <></>;
        }}
      </MarkerClusterer>
    </GoogleMap>
  );
};

export default MapComponent;
