"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Icon, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

type Props = {
  onSelect: (lat: number, lon: number) => void;
  pos?: LatLngExpression | null;
};

const pinIcon = new L.Icon({
  iconUrl: `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23EF4444'><path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/></svg>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function ClickHandler({ onSelect, position, setPosition }: {
  onSelect: Props["onSelect"];
  position: LatLngExpression | null;
  setPosition: React.Dispatch<React.SetStateAction<LatLngExpression | null>>;
}) {
  useMapEvents({
    click(e) {
      const newPos: LatLngExpression = [e.latlng.lat, e.latlng.lng];
      setPosition(newPos);
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function MapComponent({ onSelect, pos}: Props) {
  const [position, setPosition] = useState<LatLngExpression | null>(pos ?? null);
  const center: [number, number] = [45.53602809263448, 10.218210455495866];

  return (
    <div className="h-[400px] w-full">
      <MapContainer
        center={center}
        zoom={6}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {position && (
          <Marker 
            position={position} 
            icon={pinIcon}
          />
        )}
        
        <ClickHandler 
          onSelect={onSelect}
          position={position}
          setPosition={setPosition}
        />
      </MapContainer>
    </div>
  );
}
