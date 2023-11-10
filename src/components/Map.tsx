import React from "react";
import { MapContainer, TileLayer, useMap, Marker as MarkerObj, Popup } from "react-leaflet";

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
    attribution:
      "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community",
  },
  image: {
    name: "Imagery",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
  },
};

export interface MarkerObj {
  position: [number, number];
  popup: string;
}

interface Props {
  tile: keyof typeof tileLayers;
  markers: MarkerObj[];
}

export const Map: React.FC<Props> = (props) => {
  const { tile, markers } = props;
  const tileLayer = tileLayers[tile];

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      className="h-[300px] rounded-md"
    >
      <TileLayer attribution={tileLayer.attribution} url={tileLayer.url} />
      <MarkerObj position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </MarkerObj>
    </MapContainer>
  );
};
