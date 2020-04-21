import React, { useState } from "react";
import { LoadScript } from "@react-google-maps/api";
import { Ship } from "./Ship.types";
import favouriteStore from "./favouriteStore";
import Map from "./map/Map";
import ShipwreckDetails from "./shipwreckdetails/ShipwreckDetails";
import { NONE } from "./app";

interface Props {
  shipwrecks: Ship[];
  selectedShipwreckName: string;
  setSelectedShipwreckName: (id: string) => void;
}

const MainContent: React.FC<Props> = ({
  shipwrecks,
  selectedShipwreckName,
  setSelectedShipwreckName,
}) => {
  const [favourites, setFavourites] = useState(favouriteStore.getAll());

  const handleMarkerClick = (name: string) => setSelectedShipwreckName(name);
  const handleCloseButtonClick = () => setSelectedShipwreckName(NONE);

  const handleFavouriteButtonClick = () => {
    if (favouriteStore.has(selectedShipwreckName)) {
      favouriteStore.remove(selectedShipwreckName);
    } else {
      favouriteStore.add(selectedShipwreckName);
    }

    setFavourites(favouriteStore.getAll());
  };

  return (
    <>
      {selectedShipwreckName !== NONE && (
        <ShipwreckDetails
          shipName={selectedShipwreckName}
          isFavourite={favourites.includes(selectedShipwreckName)}
          handleCloseButtonClick={handleCloseButtonClick}
          handleFavouriteButtonClick={handleFavouriteButtonClick}
        />
      )}
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyDWOU36_aLESVSSCFsrk4WdH9Q1mXdamgo"
      >
        <Map
          shipwrecks={shipwrecks}
          favourites={favourites}
          isVisible={selectedShipwreckName === NONE}
          handleMarkerClick={handleMarkerClick}
        />
      </LoadScript>
    </>
  );
};

export default MainContent;
