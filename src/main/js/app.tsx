import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import api from "./api";
import Navbar from "./navigation/Navbar";
import MainContent from "./MainContent";
import settingsStore from "./settingsStore";
import favouriteStore from "./favouriteStore";
import { Ship } from "./Ship.types";
import "../resources/static/css/navigation.css";
import "../resources/static/css/shipwrecks.css";
import "../resources/static/css/hamburgermenu.css";
import "../resources/static/css/hamburgermenu_customizations.css";

export const NONE: string = "";

const App = () => {
  const [shipwrecks, setShipwrecks] = useState<Ship[]>([]);
  const [selectedShipwreckName, setSelectedShipwreckName] = useState<string>(
    NONE
  );
  const [onlyShowStarred, setOnlyShowStarred] = useState(
    settingsStore.onlyShowStarred
  );

  const handleSetOnlyStarred = (value: boolean) => {
    settingsStore.onlyShowStarred = value;
    setOnlyShowStarred(value);
  };

  const fetchShipwrecks = async () => {
    const response = await api.getShipwrecks();
    setShipwrecks(response);
  };

  useEffect(() => {
    fetchShipwrecks();
  }, []);

  const filteredShips = onlyShowStarred
    ? shipwrecks.filter(
        (ship) =>
          favouriteStore.has(ship.name) || ship.name === selectedShipwreckName
      )
    : shipwrecks;

  return (
    <>
      <Navbar
        shipwrecks={filteredShips}
        onlyShowStarred={onlyShowStarred}
        setOnlyShowStarred={handleSetOnlyStarred}
        selectedShipwreckName={selectedShipwreckName}
        setSelectedShipwreckName={setSelectedShipwreckName}
      />
      <MainContent
        shipwrecks={filteredShips}
        selectedShipwreckName={selectedShipwreckName}
        setSelectedShipwreckName={setSelectedShipwreckName}
      />
    </>
  );
};
ReactDOM.render(<App />, document.getElementById("react"));
