import React from "react";
import Select from "react-select";
import { Ship } from "../Ship.types";
import { NONE } from "../app";

interface Props {
  shipwrecks: Ship[];
  selectedShipwreckId: number;
  setSelectedShipwreckId: (id: number) => void;
}

interface Option {
  value: number;
  label: string;
}

const Navbar: React.FC<Props> = ({
  shipwrecks,
  selectedShipwreckId,
  setSelectedShipwreckId,
}) => {
  const options: Option[] = shipwrecks.map((ship: Ship, index: number) => ({
    value: index,
    label: ship.name,
  }));
  const selectedOption =
    selectedShipwreckId !== NONE ? options[selectedShipwreckId] : null;
  const handleSelectionChange = (option: Option) =>
    setSelectedShipwreckId(option.value);

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

export default Navbar;
