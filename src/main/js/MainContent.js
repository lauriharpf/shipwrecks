import React, { useState } from "react";
import favouriteStore from "./favouriteStore";
import MapLoader from "./map/MapLoader";
import ShipwreckDetails from "./shipwreckdetails/ShipwreckDetails";

const NONE = -1;

export default ({ shipwrecks, isLoggedIn }) => {
  const [selectedShipwreckId, setSelectedShipwreckId] = useState(NONE);
  const [favourites, setFavourites] = useState(favouriteStore.getAll());

  const handleMarkerClick = id => setSelectedShipwreckId(id);
  const handleCloseButtonClick = () => setSelectedShipwreckId(NONE);

  const handleFavouriteButtonClick = () => {
    const shipwreckName = shipwrecks[selectedShipwreckId].name;
    if (favouriteStore.has(shipwreckName)) {
      favouriteStore.remove(shipwreckName);
    } else {
      favouriteStore.add(shipwreckName);
    }

    setFavourites(favouriteStore.getAll());
  };

  const shipName =
    selectedShipwreckId !== NONE ? shipwrecks[selectedShipwreckId].name : "";

  return (
    <>
      {selectedShipwreckId !== NONE && (
        <ShipwreckDetails
          shipName={shipName}
          isLoggedIn={isLoggedIn}
          isFavourite={favourites.includes(shipName)}
          handleCloseButtonClick={handleCloseButtonClick}
          handleFavouriteButtonClick={handleFavouriteButtonClick}
        />
      )}
      <MapLoader
        shipwrecks={shipwrecks}
        favourites={favourites}
        isVisible={selectedShipwreckId === NONE}
        handleMarkerClick={handleMarkerClick}
      />
    </>
  );
};
