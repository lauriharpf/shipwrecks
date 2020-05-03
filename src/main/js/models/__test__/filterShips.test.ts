import filterShips from "../filterShips";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Ship } from "..";
import eras from "../../store/eras";

const ship = () => ({
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

const expectShipsNamed = (names: string[], results: Ship[]) => {
  expect(results.length).toBe(names.length);
  const actualNames = results.map((ship) => ship.name);
  expect(actualNames).toEqual(names);
};

const getFilterById = (id: string) => eras.filter((era) => era.id === id);

dayjs.extend(isBetween);

describe("filterShips", () => {
  const starredAndNotStarred = () => [
    { ...ship(), favorite: true },
    { ...ship(), name: "Ilmarinen" },
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
    { ...ship(), sunkDate: null },
    { ...ship(), name: "Ilmarinen" },
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
    ship(),
    { ...ship(), sunkDate: dayjs("1914-07-26"), name: "Ilmarinen" },
  ];
  it("can filter only ships sunk before World War I", () => {
    const prewwiFilter = getFilterById("PRE_WW_I");
    const results = filterShips(wwiiAndPrewwi(), false, prewwiFilter);

    expectShipsNamed(["Ilmarinen"], results);
  });
});
