import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";

interface TileLayer {
  url: string;
  attribution: string;
  name: string;
}

const tileLayers: Record<string, TileLayer> = {
  street: {
    name: "Street",
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  topo: {
    name: "Topographic",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri",
  },
  image: {
    name: "Imagery",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri",
  },
};

export interface MarkerObj {
  position: [number, number];
  popup: string;
}

interface Props {
  tile: keyof typeof tileLayers;
  markers: MarkerObj[];
  height?: number;
}

export const Map: React.FC<Props> = (props) => {
  const { tile, markers } = props;
  const tileLayer = tileLayers[tile];

  const centerLat =
    markers.reduce((acc, val) => acc + val.position[0], 0) / markers.length;
  const centerLon =
    markers.reduce((acc, val) => acc + val.position[1], 0) / markers.length;

  return (
    <MapContainer
      center={[53.91745588242724, -122.74997120715773]}
      zoom={8}
      scrollWheelZoom={false}
      style={{ height: props.height ?? 300 }}
      className="rounded-md"
    >
      <TileLayer attribution={tileLayer.attribution} url={tileLayer.url} />
      {markers.map((marker) => (
        <Marker position={marker.position}>
          <Tooltip>{marker.popup}</Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
};
