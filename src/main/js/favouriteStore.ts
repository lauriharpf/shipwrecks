import store from "store2";

const favourites = store.namespace("favourites");

export default {
  add: (shipName: string) => favourites.set(shipName, true),
  remove: (shipName: string) => favourites.remove(shipName),
  has: (shipName: string): boolean => favourites.has(shipName),
  getAll: (): string[] => Object.keys(favourites.getAll()),
};
