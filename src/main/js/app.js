import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import api from "./api";
import Navbar from "./Navbar";
import MapLoader from "./MapLoader";
import ShipwreckDetails from "./ShipwreckDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import "../resources/static/css/navigation.css";
import "../resources/static/css/shipwrecks.css";

const NONE = -1;

const App = () => {
  const [shipwrecks, setShipwrecks] = useState([]);
  const [selectedShipwreckId, setSelectedShipwreckId] = useState(NONE);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchShipwrecks = async () => {
    const response = await api.getShipwrecks();
    const data = response.data.map((ship, index) => ({ id: index, ...ship }));
    setShipwrecks(data);
  };

  useEffect(() => {
    fetchShipwrecks();
  }, []);

  const handleMarkerClick = id => setSelectedShipwreckId(id);
  const handleCloseButtonClick = () => setSelectedShipwreckId(NONE);

  const handleLoginSuccess = async googleUser => {
    await api.login(googleUser.getAuthResponse().id_token);
    await fetchShipwrecks();
    setIsLoggedIn(true);
  };

  const handleLogoutSuccess = async () => {
    await api.logout();
    window.location = window.location.origin;
  };

  const setFavourite = async () => {
    const shipwreck = shipwrecks[selectedShipwreckId];
    const response = await api.setFavourite({
      name: shipwreck.name,
      latitude: shipwreck.latitude,
      longitude: shipwreck.longitude
    });

    let updatedShipwrecks = shipwrecks.slice(0, selectedShipwreckId).concat({
      ...shipwreck,
      favourite: true,
      favouriteId: response.data.favouriteId
    });
    updatedShipwrecks = updatedShipwrecks.concat(
      shipwrecks.slice(selectedShipwreckId + 1)
    );

    setShipwrecks(updatedShipwrecks);
  };

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        handleLoginSuccess={handleLoginSuccess}
        handleLogoutSuccess={handleLogoutSuccess}
      />
      {shipwrecks[selectedShipwreckId] && (
        <ShipwreckDetails
          ship={shipwrecks[selectedShipwreckId]}
          isLoggedIn={isLoggedIn}
          handleCloseButtonClick={handleCloseButtonClick}
          handleFavouriteButtonClick={setFavourite}
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
ReactDOM.render(<App />, document.getElementById("react"));
