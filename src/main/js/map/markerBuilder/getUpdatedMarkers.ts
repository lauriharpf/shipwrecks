import { Ship } from "../../models";
import UpdateMarker from "./UpdateMarker";

const getUpdatedMarkers = (
  oldMarkers: Map<string, google.maps.Marker>,
  ships: Map<string, Ship>,
  favouriteMarkerIcon: string,
  defaultMarkerIcon: string
): UpdateMarker[] => {
  const updatedMarkers = [];
  for (let [shipName, ship] of ships) {
    const oldMarker = oldMarkers.get(shipName);
    const expectedPath = ship.favorite
      ? favouriteMarkerIcon
      : defaultMarkerIcon;
    //@ts-ignore
    if (oldMarker && oldMarker.getIcon().url !== expectedPath) {
      updatedMarkers.push(new UpdateMarker(oldMarker, expectedPath));
    }
  }
  return updatedMarkers;
};

export default getUpdatedMarkers;
