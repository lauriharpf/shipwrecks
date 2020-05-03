import React from "react";
import { Marker } from "@react-google-maps/api";
import { Clusterer } from "@react-google-maps/marker-clusterer";

interface Props {
  name: string;
  clusterer: Clusterer;
  position: google.maps.LatLngLiteral;
  icon: google.maps.Symbol;
  noClustererRedraw: boolean;
  onClick: ({ latLng: { lat, lng } }: google.maps.MouseEvent) => void;
}

const SimpleMarker: React.FC<Props> = ({
  name,
  clusterer,
  position,
  icon,
  noClustererRedraw,
  onClick,
}) => (
  <Marker
    key={name}
    position={position}
    clusterer={clusterer}
    label={{ text: name, fontSize: "12px", fontWeight: "bold" }}
    title={name}
    icon={icon}
    noClustererRedraw={noClustererRedraw}
    onClick={onClick}
  />
);

const areMarkersEqual = (prevProps: Props, nextProps: Props) =>
  prevProps.name === nextProps.name &&
  prevProps.position.lat === nextProps.position.lat &&
  prevProps.position.lng === nextProps.position.lng &&
  prevProps.icon.fillColor === nextProps.icon.fillColor &&
  prevProps.noClustererRedraw === nextProps.noClustererRedraw;

const MarkerMemo = React.memo(SimpleMarker, areMarkersEqual);

export default MarkerMemo;
