import React from "react";
import { Ship } from "../models/";

interface Props {
  ship: Ship;
}

const ShipwreckControls: React.FC<Props> = ({ ship }) => (
  <div className="shipwreck-controls">
    <button onClick={ship.deselect} className="closeButton">
      <img src="/images/close.svg" />
    </button>
    <button onClick={ship.toggleFavorite}>
      <img src={`/images/${ship.favorite ? "yellow" : "black"}_star.svg`} />
    </button>
  </div>
);

export default ShipwreckControls;
