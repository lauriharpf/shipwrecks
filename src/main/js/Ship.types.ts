export interface Ship {
  name: string;
  latitude: number;
  longitude: number;
  favorite: boolean;
  toggleFavorite: () => void;
  selected: boolean;
  select: () => void;
  deselect: () => void;
}
