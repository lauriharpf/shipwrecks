import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import api from "./api";
import Navbar from "./navigation/Navbar";
import MainContent from "./MainContent";
import "../resources/static/css/navigation.css";
import "../resources/static/css/shipwrecks.css";

export const NONE = -1;

const App = () => {
  const [shipwrecks, setShipwrecks] = useState([]);
  const [selectedShipwreckId, setSelectedShipwreckId] = useState(NONE);

  const fetchShipwrecks = async () => {
    const response = await api.getShipwrecks();
    const data = response.data.map((ship, index) => ({ id: index, ...ship }));
    setShipwrecks(data);
  };

  useEffect(() => {
    fetchShipwrecks();
  }, []);

  return (
    <>
      <Navbar
        shipwrecks={shipwrecks}
        selectedShipwreckId={selectedShipwreckId}
        setSelectedShipwreckId={setSelectedShipwreckId}
      />
      <MainContent
        shipwrecks={shipwrecks}
        selectedShipwreckId={selectedShipwreckId}
        setSelectedShipwreckId={setSelectedShipwreckId}
      />
    </>
  );
};
ReactDOM.render(<App />, document.getElementById("react"));
