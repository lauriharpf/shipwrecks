import { useState } from "react";
import settingsStore from "./settingsStore";

const useShowOnlyStarredStore = (): [boolean, (value: boolean) => void] => {
  const [onlyShowStarred, setOnlyShowStarred] = useState(
    settingsStore.onlyShowStarred
  );

  const handleSetOnlyStarred = (value: boolean) => {
    settingsStore.onlyShowStarred = value;
    setOnlyShowStarred(value);
  };

  return [onlyShowStarred, handleSetOnlyStarred];
};

export default useShowOnlyStarredStore;
