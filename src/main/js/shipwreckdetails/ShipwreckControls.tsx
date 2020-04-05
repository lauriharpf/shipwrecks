import React from "react";

interface Props {
  handleCloseButtonClick: () => void;
  isFavourite: boolean;
  setFavourite: () => void;
}

const ShipwreckControls: React.FC<Props> = ({
  handleCloseButtonClick,
  isFavourite,
  setFavourite,
}) => (
  <div className="shipwreck-controls">
    <button onClick={handleCloseButtonClick} className="closeButton">
      <img src="/images/close.svg" />
    </button>
    <button onClick={setFavourite}>
      <img src={`/images/${isFavourite ? "yellow" : "black"}_star.svg`} />
    </button>
  </div>
);

export default ShipwreckControls;
