import store from "store2";

const favourites = store.namespace("favourites");

export default {
  add: shipName => favourites.set(shipName, true),
  remove: shipName => favourites.remove(shipName),
  has: shipName => favourites.has(shipName),
  getAll: () => Object.keys(favourites.getAll())
};
