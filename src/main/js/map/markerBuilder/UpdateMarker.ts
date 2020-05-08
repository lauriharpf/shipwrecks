import { MarkerExtended } from "@react-google-maps/marker-clusterer";

class UpdateMarker {
  marker: MarkerExtended;
  newIcon: string;

  constructor(marker: MarkerExtended, newIcon: string) {
    this.marker = marker;
    this.newIcon = newIcon;
  }
}

export default UpdateMarker;
