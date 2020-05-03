import React from "react";
import { slide as Menu } from "react-burger-menu";
import { FormControlLabel, Switch, Typography } from "@material-ui/core";
import EraSelector from "./EraSelector";
import { EraOption } from "../Ship.types";

interface Props {
  onlyShowStarred: boolean;
  setOnlyShowStarred: (value: boolean) => void;
  erasToFilterBy: EraOption[];
  setErasToFilterBy: (value: EraOption[]) => void;
}

const HamburgerMenu: React.FC<Props> = ({
  onlyShowStarred,
  setOnlyShowStarred,
  erasToFilterBy,
  setErasToFilterBy,
}) => (
  <Menu right disableAutoFocus>
    <FormControlLabel
      control={
        <Switch
          color="secondary"
          checked={onlyShowStarred}
          onChange={(event) => setOnlyShowStarred(event.target.checked)}
        />
      }
      label={
        <Typography display="inline" color="primary">
          Only show starred
        </Typography>
      }
    />
    <EraSelector
      erasToFilterBy={erasToFilterBy}
      setErasToFilterBy={setErasToFilterBy}
    />
  </Menu>
);

export default HamburgerMenu;
