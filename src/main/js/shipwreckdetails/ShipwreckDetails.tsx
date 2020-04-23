import React from "react";
import { Ship } from "../Ship.types";
import ShipwreckControls from "./ShipwreckControls";

interface Props {
  ship: Ship;
}

const ShipwreckDetails: React.FC<Props> = ({ ship }) => {
  const wikipediaPage = ship.name.replace(/ /g, "_");
  const wikipediaUrl = `https://en.wikipedia.org/wiki/${wikipediaPage}?printable=yes`;

  return (
    <div className="mainContent">
      <ShipwreckControls ship={ship} />
      <iframe id="wikipediaFrame" frameBorder="0" src={wikipediaUrl}></iframe>
    </div>
  );
};

export default ShipwreckDetails;
