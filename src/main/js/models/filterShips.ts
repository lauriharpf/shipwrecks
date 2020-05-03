import Ship from "./Ship";
import EraOption from "./EraOption";

const filterShips = (
  ships: Ship[],
  onlyShowStarred: boolean,
  eras: EraOption[]
) => {
  const afterStarredFiltering = onlyShowStarred
    ? ships.filter((ship) => ship.favorite || ship.selected)
    : ships;
  return eras.length > 0
    ? afterStarredFiltering.filter((ship) =>
        eras.some((era) => era.wasSunkDuring(ship))
      )
    : afterStarredFiltering;
};

export default filterShips;
