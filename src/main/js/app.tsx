import React from "react";
import ReactDOM from "react-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import Navbar from "./navigation/Navbar";
import MainContent from "./MainContent";
import { useSettingsStore } from "./store";
import { filterShips } from "./models/";
import useShips from "./useShips";
import "../resources/static/css/navigation.css";
import "../resources/static/css/shipwrecks.css";
import "../resources/static/css/hamburgermenu.css";
import "../resources/static/css/hamburgermenu_customizations.css";

dayjs.extend(isBetween);
const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: grey,
  },
});

const App = () => {
  const ships = useShips();
  const settings = useSettingsStore();

  const filteredShips = filterShips(
    ships,
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

ReactDOM.render(
  <ThemeProvider theme={darkTheme}>
    <App />
  </ThemeProvider>,
  document.getElementById("react")
);
