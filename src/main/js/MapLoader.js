import React from "react";
import { LoadScript } from "@react-google-maps/api";
import Map from "./Map";

export default props => (
  <LoadScript
    id="script-loader"
    googleMapsApiKey="AIzaSyDWOU36_aLESVSSCFsrk4WdH9Q1mXdamgo"
    className="mainContent"
  >
    <Map {...props} />
  </LoadScript>
);
