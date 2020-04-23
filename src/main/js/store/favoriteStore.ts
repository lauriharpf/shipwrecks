import store from "store2";

const favorites = store.namespace("favourites");

export default {
  toggle: (shipName: string) =>
    favorites.has(shipName)
      ? favorites.remove(shipName)
      : favorites.set(shipName, true),
  getAll: (): string[] => Object.keys(favorites.getAll()),
};
