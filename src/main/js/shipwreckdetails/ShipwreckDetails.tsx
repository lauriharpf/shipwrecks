import React from "react";
import ShipwreckControls from "./ShipwreckControls";

interface Props {
  shipName: string;
  isFavourite: boolean;
  handleCloseButtonClick: () => void;
  handleFavouriteButtonClick: () => void;
}

const ShipwreckDetails: React.FC<Props> = ({
  shipName,
  isFavourite,
  handleCloseButtonClick,
  handleFavouriteButtonClick,
}) => {
  const wikipediaPage = shipName.replace(/ /g, "_");
  const wikipediaUrl = `https://en.wikipedia.org/wiki/${wikipediaPage}?printable=yes`;

  return (
    <div className="mainContent">
      <ShipwreckControls
        handleCloseButtonClick={handleCloseButtonClick}
        isFavourite={isFavourite}
        setFavourite={handleFavouriteButtonClick}
      />
      <iframe id="wikipediaFrame" frameBorder="0" src={wikipediaUrl}></iframe>
    </div>
  );
};

export default ShipwreckDetails;
