import { useState } from "react";
import eras from "./eras";
import { Settings, EraOption } from "../models/";
import settingsStore from "./settingsStore";

const useSettingsStore = (): Settings => {
  const [onlyShowStarred, setOnlyShowStarred] = useState(
    settingsStore.onlyShowStarred
  );
  const [filters, setFilters] = useState(settingsStore.filters);

  return {
    onlyShowStarred,
    setOnlyShowStarred: (value: boolean) => {
      settingsStore.onlyShowStarred = value;
      setOnlyShowStarred(value);
    },
    eras: eras.filter((era) => filters.some((filter) => filter === era.id)),
    setEras: (value: EraOption[]) => {
      const ids = value.map((era) => era.id);
      settingsStore.filters = ids;
      setFilters(ids);
    },
  };
};

export default useSettingsStore;
