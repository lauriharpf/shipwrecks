import React from "react";
import { slide as Menu } from "react-burger-menu";
import { FormControlLabel, Switch } from "@material-ui/core";

interface Props {
  onlyShowStarred: boolean;
  setOnlyShowStarred: (value: boolean) => void;
}

const HamburgerMenu: React.FC<Props> = ({
  onlyShowStarred,
  setOnlyShowStarred,
}) => (
  <Menu right disableAutoFocus>
    <FormControlLabel
      control={
        <Switch
          color="primary"
          checked={onlyShowStarred}
          onChange={(event) => setOnlyShowStarred(event.target.checked)}
        />
      }
      label="Only show starred"
    />
  </Menu>
);

export default HamburgerMenu;
