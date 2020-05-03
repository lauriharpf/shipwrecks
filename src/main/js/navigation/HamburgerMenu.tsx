import React from "react";
import { slide as Menu } from "react-burger-menu";
import { FormControlLabel, Switch, Typography } from "@material-ui/core";
import EraSelector from "./EraSelector";
import { Settings } from "../models/";

const HamburgerMenu: React.FC<{ settings: Settings }> = ({ settings }) => (
  <Menu right disableAutoFocus>
    <FormControlLabel
      control={
        <Switch
          color="secondary"
          checked={settings.onlyShowStarred}
          onChange={(event) =>
            settings.setOnlyShowStarred(event.target.checked)
          }
        />
      }
      label={
        <Typography display="inline" color="primary">
          Only show starred
        </Typography>
      }
    />
    <EraSelector eras={settings.eras} setEras={settings.setEras} />
  </Menu>
);

export default HamburgerMenu;
