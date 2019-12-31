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

  useEffect(() => {
    async function fetchShipwrecks() {
      const response = await api.getShipwrecks();
      const data = response.data.map((ship, index) => ({ id: index, ...ship }));
      setShipwrecks(data);
    }
    fetchShipwrecks();
  }, []);

  const handleMarkerClick = id => setSelectedShipwreckId(id);
  const handleCloseButtonClick = () => setSelectedShipwreckId(NONE);

  const selectedShipwreckName =
    selectedShipwreckId !== NONE ? shipwrecks[selectedShipwreckId].name : "";

  const handleLoginSuccess = async googleUser => {
    await api.login(googleUser.getAuthResponse().id_token);
    setIsLoggedIn(true);
  };

  const handleLogoutSuccess = async () => {
    await api.logout();
    setIsLoggedIn(false);
  };

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        handleLoginSuccess={handleLoginSuccess}
        handleLogoutSuccess={handleLogoutSuccess}
      />
      {selectedShipwreckName && (
        <ShipwreckDetails
          shipwreckName={selectedShipwreckName}
          handleCloseButtonClick={handleCloseButtonClick}
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
