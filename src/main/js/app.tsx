import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import api from "./api";
import Navbar from "./navigation/Navbar";
import MainContent from "./MainContent";
import { Ship } from "./Ship.types";
import "../resources/static/css/navigation.css";
import "../resources/static/css/shipwrecks.css";

export const NONE: string = "";

const App = () => {
  const [shipwrecks, setShipwrecks] = useState<Ship[]>([]);
  const [selectedShipwreckName, setSelectedShipwreckName] = useState<string>(
    NONE
  );

  const fetchShipwrecks = async () => {
    const response = await api.getShipwrecks();
    setShipwrecks(response);
  };

  useEffect(() => {
    fetchShipwrecks();
  }, []);

  return (
    <>
      <Navbar
        shipwrecks={shipwrecks}
        selectedShipwreckName={selectedShipwreckName}
        setSelectedShipwreckName={setSelectedShipwreckName}
      />
      <MainContent
        shipwrecks={shipwrecks}
        selectedShipwreckName={selectedShipwreckName}
        setSelectedShipwreckName={setSelectedShipwreckName}
      />
    </>
  );
};
ReactDOM.render(<App />, document.getElementById("react"));
