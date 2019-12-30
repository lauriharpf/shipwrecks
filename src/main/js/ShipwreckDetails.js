import React from "react";

const ShipwreckControls = ({ handleCloseButtonClick }) => (
  <div className="shipwreck-controls">
    <button onClick={handleCloseButtonClick} className="closeButton">
      <img src="/images/close.svg" />
    </button>
  </div>
);

export default ({ shipwreckName, handleCloseButtonClick }) => {
  const wikipediaPage = shipwreckName.replace(/ /g, "_");
  const wikipediaUrl = `https://en.wikipedia.org/wiki/${wikipediaPage}?printable=yes`;

  return (
    <div className="mainContent">
      <ShipwreckControls handleCloseButtonClick={handleCloseButtonClick} />
      <iframe id="wikipediaFrame" frameBorder="0" src={wikipediaUrl}></iframe>
    </div>
  );
};
