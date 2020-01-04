import React, { useState } from "react";
import Select from "react-select";
import { NONE } from "../app";

export default ({
  shipwrecks,
  selectedShipwreckId,
  setSelectedShipwreckId
}) => {
  const options = shipwrecks.map((shipwreck, index) => ({
    value: index,
    label: shipwreck.name
  }));
  const selectedOption =
    selectedShipwreckId !== NONE ? options[selectedShipwreckId] : null;
  const handleSelectionChange = selectedOption =>
    setSelectedShipwreckId(selectedOption.value);

  return (
    <div className="navBarContainer">
      <a className="logo" href="#">
        Shipwrecks.cc
      </a>
      <a className="github" href="https://github.com/lauriharpf/shipwrecks">
        GitHub
      </a>
      <Select
        className="search"
        value={selectedOption}
        onChange={handleSelectionChange}
        options={options}
        isSearchable={true}
        placeholder={"Search"}
      />
    </div>
  );
};
