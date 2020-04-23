import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import api from "./api";
import Navbar from "./navigation/Navbar";
import MainContent from "./MainContent";
import settingsStore from "./settingsStore";
import { useFavoriteStore } from "./store";
import { Ship } from "./Ship.types";
import "../resources/static/css/navigation.css";
import "../resources/static/css/shipwrecks.css";
import "../resources/static/css/hamburgermenu.css";
import "../resources/static/css/hamburgermenu_customizations.css";

const NONE: string = "";

const App = () => {
  const [ships, setShips] = useState<Ship[]>([]);
  const [selectedShipName, setSelectedShipName] = useState<string>(NONE);
  const [onlyShowStarred, setOnlyShowStarred] = useState(
    settingsStore.onlyShowStarred
  );
  const [favorites, toggleFavorite] = useFavoriteStore();

  const handleSetOnlyStarred = (value: boolean) => {
    settingsStore.onlyShowStarred = value;
    setOnlyShowStarred(value);
  };

  const fetchShips = async () => {
    const response = await api.getShipwrecks();
    setShips(response);
  };

  useEffect(() => {
    fetchShips();
  }, []);

  const deselect = () => setSelectedShipName(NONE);
  const shipsWithFavoriteData = ships.map((ship) => {
    ship.favorite = favorites.includes(ship.name);
    ship.toggleFavorite = () => toggleFavorite(ship.name);
    ship.selected = ship.name === selectedShipName;
    ship.select = () => setSelectedShipName(ship.name);
    ship.deselect = deselect;
    return ship;
  });

  const filteredShips = onlyShowStarred
    ? shipsWithFavoriteData.filter(
        (ship) => ship.favorite || ship.name === selectedShipName
      )
    : shipsWithFavoriteData;

  return (
    <>
      <Navbar
        ships={filteredShips}
        onlyShowStarred={onlyShowStarred}
        setOnlyShowStarred={handleSetOnlyStarred}
      />
      <MainContent ships={filteredShips} />
    </>
  );
};
ReactDOM.render(<App />, document.getElementById("react"));
