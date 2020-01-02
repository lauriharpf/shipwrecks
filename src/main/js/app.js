import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import api from "./api";
import Navbar from "./navigation/Navbar";
import MainContent from "./MainContent";
import "../resources/static/css/navigation.css";
import "../resources/static/css/shipwrecks.css";

const App = () => {
  const [shipwrecks, setShipwrecks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchShipwrecks = async () => {
    const response = await api.getShipwrecks();
    const data = response.data.map((ship, index) => ({ id: index, ...ship }));
    setShipwrecks(data);
  };

  useEffect(() => {
    fetchShipwrecks();
  }, []);

  const handleLoginSuccess = async googleUser => {
    await api.login(googleUser.getAuthResponse().id_token);
    await fetchShipwrecks();
    setIsLoggedIn(true);
  };

  const handleLogoutSuccess = async () => {
    await api.logout();
    window.location = window.location.origin;
  };

  const setFavouriteId = (favouriteId, index) => {
    const updatedShipwrecks = [
      ...shipwrecks.slice(0, index),
      { ...shipwrecks[index], favourite: !!favouriteId, favouriteId },
      ...shipwrecks.slice(index + 1)
    ];

    setShipwrecks(updatedShipwrecks);
  };

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        handleLoginSuccess={handleLoginSuccess}
        handleLogoutSuccess={handleLogoutSuccess}
      />
      <MainContent
        isLoggedIn={isLoggedIn}
        setFavouriteId={setFavouriteId}
        shipwrecks={shipwrecks}
      />
    </>
  );
};
ReactDOM.render(<App />, document.getElementById("react"));
