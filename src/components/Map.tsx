import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import { type LatLngTuple } from "leaflet";
import L from "leaflet";
import { Card } from "./ui/card";

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
  markers: MarkerObj[];
  tile?: keyof typeof tileLayers;
  height?: number;
  zoom?: number;
  centerPg?: boolean;
}

const PG_COORDS: LatLngTuple = [53.91745588242724, -122.74997120715773];

const markerStar = new L.Icon({
  iconUrl: "/icons/star.svg",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -32],
});

const getCenter = (coords: [number, number][]): LatLngTuple => {
  const centerLat =
    coords.reduce((acc, val) => acc + val[0], 0) / coords.length;
  const centerLon =
    coords.reduce((acc, val) => acc + val[1], 0) / coords.length;
  return [centerLat, centerLon];
};

export const Map: React.FC<Props> = (props) => {
  const { tile = "topo", markers, centerPg, zoom } = props;
  const tileLayer = tileLayers[tile];

  return (
    <Card>
      <MapContainer
        center={
          centerPg ? PG_COORDS : getCenter(markers.map((m) => m.position))
        }
        zoom={zoom ?? 10}
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
        <Marker position={PG_COORDS} icon={markerStar}>
          <Tooltip>Prince George</Tooltip>
        </Marker>
      </MapContainer>
    </Card>
  );
};
