import React from "react";
import { LoadScript } from "@react-google-maps/api";
import { Ship } from "./Ship.types";
import Map from "./map/Map";
import ShipwreckDetails from "./shipwreckdetails/ShipwreckDetails";

interface Props {
  ships: Ship[];
}

const MainContent: React.FC<Props> = ({ ships }) => {
  const selectedShip = ships.find((ship) => ship.selected);

  return (
    <>
      {selectedShip && <ShipwreckDetails ship={selectedShip} />}
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyDWOU36_aLESVSSCFsrk4WdH9Q1mXdamgo"
      >
        <Map ships={ships} isVisible={!selectedShip} />
      </LoadScript>
    </>
  );
};

export default MainContent;
