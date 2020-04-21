import React from "react";
import Select from "react-select";
import { Ship } from "../Ship.types";
import { NONE } from "../app";
import HamburgerMenu from "./HamburgerMenu";

interface Props {
  shipwrecks: Ship[];
  selectedShipwreckName: string;
  setSelectedShipwreckName: (name: string) => void;
  onlyShowStarred: boolean;
  setOnlyShowStarred: (value: boolean) => void;
}

interface Option {
  value: string;
  label: string;
}

const Navbar: React.FC<Props> = ({
  shipwrecks,
  selectedShipwreckName,
  setSelectedShipwreckName,
  onlyShowStarred,
  setOnlyShowStarred,
}) => {
  const options: Option[] = shipwrecks.map((ship: Ship) => ({
    value: ship.name,
    label: ship.name,
  }));
  const selectedOption =
    selectedShipwreckName !== NONE
      ? options.find((option) => option.value === selectedShipwreckName)
      : null;
  const handleSelectionChange = (option: Option) =>
    setSelectedShipwreckName(option.value);

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
      <HamburgerMenu
        onlyShowStarred={onlyShowStarred}
        setOnlyShowStarred={setOnlyShowStarred}
      />
    </div>
  );
};

export default Navbar;
