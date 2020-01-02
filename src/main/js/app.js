import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import api from "./api";
import Navbar from "./navigation/Navbar";
import MainContent from "./MainContent";
import "../resources/static/css/navigation.css";
import "../resources/static/css/shipwrecks.css";

const App = () => {
  const [shipwrecks, setShipwrecks] = useState([]);

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
      <Navbar />
      <MainContent shipwrecks={shipwrecks} />
    </>
  );
};
ReactDOM.render(<App />, document.getElementById("react"));
