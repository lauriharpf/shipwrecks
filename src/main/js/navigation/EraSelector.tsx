import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, Typography } from "@material-ui/core";
import { allEras } from "../store";
import { EraOption } from "../models/";

interface Props {
  erasToFilterBy: EraOption[];
  setErasToFilterBy: (value: EraOption[]) => void;
}

const EraSelector: React.FC<Props> = ({
  erasToFilterBy,
  setErasToFilterBy,
}) => {
  return (
    <Autocomplete
      multiple
      options={allEras}
      value={erasToFilterBy}
      onChange={(event, newValues) => {
        setErasToFilterBy(newValues);
      }}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label={
            <Typography color="primary">Filter ships by period</Typography>
          }
          placeholder="Select eras to show"
        />
      )}
    />
  );
};

export default EraSelector;
