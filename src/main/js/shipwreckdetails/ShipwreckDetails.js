import React from "react";

const ShipwreckControls = ({
  handleCloseButtonClick,
  isFavourite,
  setFavourite
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

export default ({
  shipName,
  isFavourite,
  handleCloseButtonClick,
  handleFavouriteButtonClick
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
