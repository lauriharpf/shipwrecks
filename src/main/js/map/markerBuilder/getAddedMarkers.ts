import { MarkerExtended } from "@react-google-maps/marker-clusterer";
import { Ship } from "../../models";

const getAddedMarkers = (
  oldMarkerNames: Set<string>,
  ships: Map<string, Ship>,
  onClick: (event: google.maps.MouseEvent) => void,
  favouriteMarkerIcon: string,
  defaultMarkerIcon: string
): MarkerExtended[] => {
  const addedMarkers = [];
  for (let [shipName, ship] of ships) {
    if (!oldMarkerNames.has(shipName)) {
      const marker = new google.maps.Marker({
        position: { lat: ship.latitude, lng: ship.longitude },
        icon: ship.favorite ? favouriteMarkerIcon : defaultMarkerIcon,
        label: ship.name,
      });
      marker.addListener("click", onClick);
      addedMarkers.push(marker);
    }
  }
  return addedMarkers;
};

export default getAddedMarkers;
