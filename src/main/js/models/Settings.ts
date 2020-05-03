import EraOption from "./EraOption";

interface Settings {
  onlyShowStarred: boolean;
  eras: EraOption[];
  setOnlyShowStarred: (value: boolean) => void;
  setEras: (value: EraOption[]) => void;
}

export default Settings;
