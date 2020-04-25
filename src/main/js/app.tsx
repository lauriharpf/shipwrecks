import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import api from "./api";
import Navbar from "./navigation/Navbar";
import MainContent from "./MainContent";
import { useFavoriteStore, useOnlyShowStarredStore } from "./store";
import { Ship } from "./Ship.types";
import "../resources/static/css/navigation.css";
import "../resources/static/css/shipwrecks.css";
import "../resources/static/css/hamburgermenu.css";
import "../resources/static/css/hamburgermenu_customizations.css";

const NONE: string = "";

const App = () => {
  const [ships, setShips] = useState<Ship[]>([]);
  const [selectedShipName, setSelectedShipName] = useState<string>(NONE);
  const [onlyShowStarred, setOnlyShowStarred] = useOnlyShowStarredStore();
  const [favorites, toggleFavorite] = useFavoriteStore();

  const fetchShips = async () => {
    const response = await api.getShipwrecks();
    const deselect = () => setSelectedShipName(NONE);
    const shipsFromResponse = response.map((ship) => ({
      ...ship,
      toggleFavorite: () => toggleFavorite(ship.name),
      select: () => setSelectedShipName(ship.name),
      deselect,
    }));
    setShips(shipsFromResponse);
  };

  useEffect(() => {
    fetchShips();
  }, []);

  const shipsWithFavoriteData = ships.map((ship) => ({
    ...ship,
    favorite: favorites.includes(ship.name),
    selected: ship.name === selectedShipName,
  }));

  const filteredShips = onlyShowStarred
    ? shipsWithFavoriteData.filter((ship) => ship.favorite || ship.selected)
    : shipsWithFavoriteData;

  return (
    <>
      <Navbar
        ships={filteredShips}
        onlyShowStarred={onlyShowStarred}
        setOnlyShowStarred={setOnlyShowStarred}
      />
      <MainContent ships={filteredShips} />
    </>
  );
};
ReactDOM.render(<App />, document.getElementById("react"));
