import React from "react";

const ShipwreckControls = ({
  handleCloseButtonClick,
  isLoggedIn,
  isFavorite,
  setFavourite
}) => (
  <div className="shipwreck-controls">
    <button onClick={handleCloseButtonClick} className="closeButton">
      <img src="/images/close.svg" />
    </button>
    {isLoggedIn && (
      <button onClick={setFavourite}>
        <img src={`/images/${isFavorite ? "yellow" : "black"}_star.svg`} />
      </button>
    )}
  </div>
);

export default ({
  ship: { name, favourite },
  handleCloseButtonClick,
  isLoggedIn,
  handleFavouriteButtonClick
}) => {
  const wikipediaPage = name.replace(/ /g, "_");
  const wikipediaUrl = `https://en.wikipedia.org/wiki/${wikipediaPage}?printable=yes`;

  return (
    <div className="mainContent">
      <ShipwreckControls
        handleCloseButtonClick={handleCloseButtonClick}
        isLoggedIn={isLoggedIn}
        isFavorite={favourite}
        setFavourite={handleFavouriteButtonClick}
      />
      <iframe id="wikipediaFrame" frameBorder="0" src={wikipediaUrl}></iframe>
    </div>
  );
};
