import filterShips from "../filterShips";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Ship } from "..";
import eras from "../../store/eras";
import { newShip } from "./testShips";

const expectShipsNamed = (names: string[], results: Ship[]) => {
  expect(results.length).toBe(names.length);
  const actualNames = results.map((ship) => ship.name);
  expect(actualNames).toEqual(names);
};

const getFilterById = (id: string) => eras.filter((era) => era.id === id);

dayjs.extend(isBetween);

describe("filterShips", () => {
  const starredAndNotStarred = () => [
    { ...newShip(), favorite: true },
    { ...newShip(), name: "Ilmarinen" },
  ];

  it("can filter only starred ships", () => {
    const results = filterShips(starredAndNotStarred(), true, []);

    expectShipsNamed(["German battleship Bismarck"], results);
  });

  it("can filter both starred and non-starred ships", () => {
    const results = filterShips(starredAndNotStarred(), false, []);

    expectShipsNamed(["German battleship Bismarck", "Ilmarinen"], results);
  });

  const sinkingDateAndNoDate = () => [
    { ...newShip(), sunkDate: null },
    { ...newShip(), name: "Ilmarinen" },
  ];
  it("can filter only ships without sunk date", () => {
    const noSunkDateFilter = getFilterById("UNKNOWN");
    const results = filterShips(
      sinkingDateAndNoDate(),
      false,
      noSunkDateFilter
    );

    expectShipsNamed(["German battleship Bismarck"], results);
  });

  const wwiiAndPrewwi = () => [
    newShip(),
    { ...newShip(), sunkDate: dayjs("1914-07-26"), name: "Ilmarinen" },
  ];
  it("can filter only ships sunk before World War I", () => {
    const prewwiFilter = getFilterById("PRE_WW_I");
    const results = filterShips(wwiiAndPrewwi(), false, prewwiFilter);

    expectShipsNamed(["Ilmarinen"], results);
  });
});
