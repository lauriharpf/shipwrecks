import dayjs from "dayjs";

const newShip = () => ({
  name: "German battleship Bismarck",
  latitude: 48.167,
  longitude: -16.2,
  sunkDate: dayjs("1941-05-27"),
  favorite: false,
  toggleFavorite: () => void false,
  selected: false,
  select: () => void false,
  deselect: () => void false,
});

export { newShip };
