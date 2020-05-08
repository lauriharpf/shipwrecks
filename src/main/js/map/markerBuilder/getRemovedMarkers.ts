const getRemovedMarkers = (
  oldMarkers: Map<string, google.maps.Marker>,
  shipsNames: Set<string>
): google.maps.Marker[] => {
  const removedMarkers = [];
  for (let [oldMarkerName, oldMarker] of oldMarkers) {
    if (!shipsNames.has(oldMarkerName)) {
      removedMarkers.push(oldMarker);
    }
  }

  return removedMarkers;
};

export default getRemovedMarkers;
