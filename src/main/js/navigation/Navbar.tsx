import React from "react";
import Select from "react-select";
import { Ship, Settings } from "../models/";
import HamburgerMenu from "./HamburgerMenu";

interface Props {
  ships: Ship[];
  settings: Settings;
}

interface Option {
  value: Ship;
  label: string;
}

const Navbar: React.FC<Props> = ({ ships, settings }) => {
  const options: Option[] = ships.map((ship: Ship) => ({
    value: ship,
    label: ship.name,
  }));
  const selectedOption =
    options.find((option) => option.value.selected) || null;

  const onChange = (option: Option) => option.value.select();

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
        onChange={onChange}
        options={options}
        isSearchable={true}
        placeholder={"Search"}
      />
      <HamburgerMenu settings={settings} />
    </div>
  );
};

export default Navbar;
