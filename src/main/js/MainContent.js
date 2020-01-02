import React, { useState } from "react";
import api from "./api";
import MapLoader from "./map/MapLoader";
import ShipwreckDetails from "./shipwreckdetails/ShipwreckDetails";

const NONE = -1;

export default ({ shipwrecks, setFavouriteId, isLoggedIn }) => {
  const [selectedShipwreckId, setSelectedShipwreckId] = useState(NONE);
  const handleMarkerClick = id => setSelectedShipwreckId(id);
  const handleCloseButtonClick = () => setSelectedShipwreckId(NONE);

  const handleFavouriteButtonClick = () => {
    const shipwreck = shipwrecks[selectedShipwreckId];
    if (shipwreck.favourite) {
      removeFavourite(shipwreck);
    } else {
      setFavourite(shipwreck);
    }
  };

  const setFavourite = async shipwreck => {
    const response = await api.setFavourite({
      name: shipwreck.name,
      latitude: shipwreck.latitude,
      longitude: shipwreck.longitude
    });

    setFavouriteId(response.data.favouriteId, selectedShipwreckId);
  };

  const removeFavourite = async shipwreck => {
    await api.removeFavourite(shipwreck.favouriteId);

    setFavouriteId(null, selectedShipwreckId);
  };

  return (
    <>
      {shipwrecks[selectedShipwreckId] && (
        <ShipwreckDetails
          ship={shipwrecks[selectedShipwreckId]}
          isLoggedIn={isLoggedIn}
          handleCloseButtonClick={handleCloseButtonClick}
          handleFavouriteButtonClick={handleFavouriteButtonClick}
        />
      )}
      <MapLoader
        shipwrecks={shipwrecks}
        isVisible={selectedShipwreckId === NONE}
        handleMarkerClick={handleMarkerClick}
      />
    </>
  );
};
