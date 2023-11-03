"use client";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// https://nextjs.org/docs/messages/react-hydration-error
export default function Leaflet() {
  return (
    <div style={{ height: "30em", width: "30em" }}>
      <MapContainer
        center={[39.93707, 32.86386]}
        zoom={20}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[39.93707, 32.86386]}>
          <Popup>
            <h3>Avare_Ink</h3>
            <p>Pilavoğlu Han Çarşısı, Ankara, Türkiye</p>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}