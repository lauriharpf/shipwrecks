import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./Navbar";
import Map from "./Map";
import "bootstrap/dist/css/bootstrap.min.css";
import "../resources/static/css/navigation.css";
import "../resources/static/css/shipwrecks.css";

const App = () => (
  <>
    <Navbar />
    <Map />
  </>
);
ReactDOM.render(<App />, document.getElementById("react"));
