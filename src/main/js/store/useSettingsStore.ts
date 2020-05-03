import { useState } from "react";
import eras from "./eras";
import { SettingValues, SettingMutators, EraOption } from "../Ship.types";
import settingsStore from "./settingsStore";

const useSettingsStore = (): [SettingValues, SettingMutators] => {
  const [onlyShowStarred, setOnlyShowStarred] = useState(
    settingsStore.onlyShowStarred
  );
  const [filters, setFilters] = useState(settingsStore.filters);

  const handleSetOnlyStarred = (value: boolean) => {
    settingsStore.onlyShowStarred = value;
    setOnlyShowStarred(value);
  };

  const setEras = (value: EraOption[]) => {
    const ids = value.map((era) => era.id);
    settingsStore.filters = ids;
    setFilters(ids);
  };

  return [
    {
      onlyShowStarred,
      eras: eras.filter((era) => filters.some((filter) => filter === era.id)),
    },
    { setOnlyShowStarred: handleSetOnlyStarred, setEras },
  ];
};

export default useSettingsStore;
