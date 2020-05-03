import dayjs from "dayjs";

interface Ship {
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

export default Ship;
