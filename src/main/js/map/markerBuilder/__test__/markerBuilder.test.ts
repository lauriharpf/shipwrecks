import markerBuilder from "../markerBuilder";
import { newShip } from "../../../models/__test__/testShips";
import { Ship } from "../../../models";

const defaultMarkerIcon = "/images/markerclusterer/marker.png";
const favoriteMarkerIcon = "/images/markerclusterer/marker_starred.png";

describe("markerBuilder", () => {
  let original: any;
  let ship: Ship;

  beforeEach(() => {
    ship = newShip();
    original = window.google;

    window.google = {
      //@ts-ignore
      maps: { Marker: () => ({ addListener: () => void false }) },
    };
  });

  afterEach(() => {
    window.google = original;
  });

  describe("when there are no existing markers", () => {
    describe("one visible ship", () => {
      let result: any;
      beforeEach(() => {
        result = markerBuilder(new Map(), [ship], () => void false);
      });

      it("should add one marker", () => {
        expect(result.added.length).toBe(1);
      });

      it("should not remove markers", () => {
        expect(result.removed.length).toBe(0);
      });

      it("should not update markers", () => {
        expect(result.updated.length).toBe(0);
      });
    });
  });

  describe("when there is one existing marker", () => {
    const newMarker = (text: string, favorite: boolean): any => ({
      getLabel: () => ({ text }),
      getIcon: () => ({
        url: favorite ? favoriteMarkerIcon : defaultMarkerIcon,
      }),
    });
    describe("same visible ship without changes", () => {
      let result: any;
      beforeEach(() => {
        const oldMarker: any = newMarker(ship.name, ship.favorite);
        result = markerBuilder(
          new Map([[ship.name, oldMarker]]),
          [ship],
          () => void false
        );
      });

      it("should not add markers", () => {
        expect(result.added.length).toBe(0);
      });

      it("should not remove markers", () => {
        expect(result.removed.length).toBe(0);
      });

      it("should not update markers", () => {
        expect(result.updated.length).toBe(0);
      });
    });

    describe("no ships", () => {
      let result: any;
      beforeEach(() => {
        const oldMarker: any = newMarker(ship.name, ship.favorite);
        result = markerBuilder(
          new Map([[ship.name, oldMarker]]),
          [],
          () => void false
        );
      });

      it("should not add markers", () => {
        expect(result.added.length).toBe(0);
      });

      it("should remove one marker", () => {
        expect(result.removed.length).toBe(1);
      });

      it("should not update markers", () => {
        expect(result.updated.length).toBe(0);
      });
    });

    describe("same visible ship was not starred and has been starred", () => {
      let result: any;
      beforeEach(() => {
        const starredShip = { ...ship, favorite: true };
        const oldMarker: any = newMarker(ship.name, false);
        result = markerBuilder(
          new Map([[ship.name, oldMarker]]),
          [starredShip],
          () => void false
        );
      });

      it("should not add markers", () => {
        expect(result.added.length).toBe(0);
      });

      it("should not remove markers", () => {
        expect(result.removed.length).toBe(0);
      });

      it("should update marker to starred", () => {
        expect(result.updated.length).toBe(1);
        expect(result.updated[0].newIcon).toBe(favoriteMarkerIcon);
      });
    });

    describe("same visible ship was starred and has been unstarred", () => {
      let result: any;
      beforeEach(() => {
        const oldMarker: any = newMarker(ship.name, true);
        result = markerBuilder(
          new Map([[ship.name, oldMarker]]),
          [ship],
          () => void false
        );
      });

      it("should not add markers", () => {
        expect(result.added.length).toBe(0);
      });

      it("should not remove markers", () => {
        expect(result.removed.length).toBe(0);
      });

      it("should update marker to unstarred", () => {
        expect(result.updated.length).toBe(1);
        expect(result.updated[0].newIcon).toBe(defaultMarkerIcon);
      });
    });
  });
});
