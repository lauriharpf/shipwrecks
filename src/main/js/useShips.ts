import { useState, useEffect } from "react";
import dayjs from "dayjs";
import api from "./api";
import { useFavoriteStore } from "./store";
import { Ship } from "./models";

const NONE: string = "";

const useShips = (): Ship[] => {
  const [ships, setShips] = useState<Ship[]>([]);
  const [selectedShipName, setSelectedShipName] = useState<string>(NONE);
  const [favorites, toggleFavorite] = useFavoriteStore();

  useEffect(() => {
    fetchShips();
  }, []);

  const fetchShips = async () => {
    const response = await api.getShipwrecks();
    const deselect = () => setSelectedShipName(NONE);
    const shipsFromResponse = response.map((ship) => ({
      ...ship,
      toggleFavorite: () => toggleFavorite(ship.name),
      select: () => setSelectedShipName(ship.name),
      deselect,
      sunkDate: ship.sunkDate !== null ? dayjs(ship.sunkDate) : ship.sunkDate,
    }));
    setShips(shipsFromResponse);
  };

  const shipsWithFavoriteData = ships.map((ship) => ({
    ...ship,
    favorite: favorites.includes(ship.name),
    selected: ship.name === selectedShipName,
  }));

  return shipsWithFavoriteData;
};

export default useShips;
