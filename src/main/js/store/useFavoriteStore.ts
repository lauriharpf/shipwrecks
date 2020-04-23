import { useState } from "react";
import favoriteStore from "./favoriteStore";

const useFavoriteStore = (): [string[], (shipName: string) => void] => {
  const [favorites, setFavorites] = useState(favoriteStore.getAll());

  const toggleFavorite = (shipName: string) => {
    favoriteStore.toggle(shipName);
    setFavorites(favoriteStore.getAll());
  };

  return [favorites, toggleFavorite];
};

export default useFavoriteStore;
