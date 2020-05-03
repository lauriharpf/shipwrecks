import dayjs from "dayjs";

export interface Ship {
  name: string;
  latitude: number;
  longitude: number;
  sunkDate: dayjs.Dayjs | null;
  favorite: boolean;
  toggleFavorite: () => void;
  selected: boolean;
  select: () => void;
  deselect: () => void;
}

export class EraOption {
  id: string;
  label: string;

  constructor(id: string, label: string) {
    this.id = id;
    this.label = label;
  }

  wasSunkDuring(ship: Ship): boolean {
    return ship.sunkDate === null;
  }
}

export class Era extends EraOption {
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;

  constructor(id: string, label: string, start: dayjs.Dayjs, end: dayjs.Dayjs) {
    super(id, label);
    this.start = start;
    this.end = end;
  }

  wasSunkDuring(ship: Ship): boolean {
    return (
      ship.sunkDate && ship.sunkDate.isBetween(this.start, this.end, null, "[]")
    );
  }
}

export interface Settings {
  values: SettingValues;
  mutators: SettingMutators;
}

export interface SettingValues {
  onlyShowStarred: boolean;
  eras: EraOption[];
}

export interface SettingMutators {
  setOnlyShowStarred: (value: boolean) => void;
  setEras: (value: EraOption[]) => void;
}
