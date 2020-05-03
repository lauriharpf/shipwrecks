import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import api from "./api";
import Navbar from "./navigation/Navbar";
import MainContent from "./MainContent";
import { useFavoriteStore, useSettingsStore } from "./store";
import { filterShips, Ship } from "./models/";
import "../resources/static/css/navigation.css";
import "../resources/static/css/shipwrecks.css";
import "../resources/static/css/hamburgermenu.css";
import "../resources/static/css/hamburgermenu_customizations.css";

const NONE: string = "";

const App = () => {
  const [ships, setShips] = useState<Ship[]>([]);
  const [selectedShipName, setSelectedShipName] = useState<string>(NONE);
  const settings = useSettingsStore();
  const [favorites, toggleFavorite] = useFavoriteStore();

  const fetchShips = async () => {
    const response = await api.getShipwrecks();
    const deselect = () => setSelectedShipName(NONE);
    const shipsFromResponse = response.map((ship) => ({
      ...ship,
      toggleFavorite: () => toggleFavorite(ship.name),
      select: () => setSelectedShipName(ship.name),
      deselect,
      sunkDate: ship.sunkDate !== null ? dayjs(ship.sunkDate) : ship.sunkDate,
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
  const filteredShips = filterShips(
    shipsWithFavoriteData,
    settings.onlyShowStarred,
    settings.eras
  );

  return (
    <>
      <Navbar ships={filteredShips} settings={settings} />
      <MainContent ships={filteredShips} />
    </>
  );
};

const ThemedApp = () => {
  dayjs.extend(isBetween);
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: grey,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  );
};
ReactDOM.render(<ThemedApp />, document.getElementById("react"));
