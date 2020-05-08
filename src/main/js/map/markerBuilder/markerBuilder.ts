import { Ship } from "../../models";
import { MarkerExtended } from "@react-google-maps/marker-clusterer";
import UpdateMarker from "./UpdateMarker";
import getRemovedMarkers from "./getRemovedMarkers";
import getAddedMarkers from "./getAddedMarkers";
import getUpdatedMarkers from "./getUpdatedMarkers";

interface MarkerChanges {
  added: MarkerExtended[];
  removed: MarkerExtended[];
  updated: UpdateMarker[];
}

const path = "/images/markerclusterer";
const defaultMarkerIcon = `${path}/marker.png`;
const favouriteMarkerIcon = `${path}/marker_starred.png`;

const markerBuilder = (
  currentMarkers: Map<string, google.maps.Marker>,
  newShips: Ship[],
  onClick: (event: google.maps.MouseEvent) => void
): MarkerChanges => {
  const ships = new Map(newShips.map((ship) => [ship.name, ship]));
  const shipNames = new Set(ships.keys());
  const oldMarkerNames = new Set(currentMarkers.keys());

  return {
    added: getAddedMarkers(
      oldMarkerNames,
      ships,
      onClick,
      favouriteMarkerIcon,
      defaultMarkerIcon
    ),
    removed: getRemovedMarkers(currentMarkers, shipNames),
    updated: getUpdatedMarkers(
      currentMarkers,
      ships,
      favouriteMarkerIcon,
      defaultMarkerIcon
    ),
  };
};

export default markerBuilder;
