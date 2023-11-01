"use client";
import L, { LatLngExpression } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.motion/dist/leaflet.motion.js";
import "leaflet-easyprint";
import { icon } from "leaflet";
import { useEffect, useState } from "react";
import { routes } from "../routes";
const ICON = icon({
  iconUrl: "/marker.png",
  iconSize: [32, 32],
});
export const Map = () => {
  const [mapContext, setMapContext] = useState();
  useEffect(() => {
    if (mapContext) {
      L.easyPrint({
        title: "Print Map",
        exportOnly: true,
        position: "bottomleft",
        sizeModes: ["Current", "A4Portrait", "A4Landscape"],
      }).addTo(mapContext);
      mapContext.attributionControl.setPrefix(""); // remove Ukraine flag!
      routes.forEach((route) => {
        const routePolylineInstance = L.motion.polyline(
          [...route.route],
          {
            color: route.type === "POP" ? "orange" : "red",
            dashArray: route.type === "POP" ? "20, 20" : "",
            dashOffset: "0",
          },
          {
            auto: true,
            duration: 2000,
          },
        );
        mapContext.addLayer(routePolylineInstance);
      });
    }
  }, [mapContext]);
  const markerPosition = [40.993611, 28.825879]; // Comnet Datacenter

  // MAP CENTER POSITION
  const center: LatLngExpression = [
    (40.976204 + 53.63306) / 2,
    (28.814991 + 10.00537) / 2,
  ];

  return (
    <MapContainer
      whenReady={(event) => setMapContext(event.target)}
      minZoom={4.4}
      center={center}
      zoom={4.4}
      scrollWheelZoom={false}
      className="h-screen relative z-0"
    >
      <TileLayer noWrap {...tileLayer} />
      {routes.map((route) => {
        return (
          <Marker
            key={`route$-${route.name}-${route.type}`}
            icon={ICON}
            position={route.markerPosition as any}
          >
            <Popup>
              {route.name} <br />
              {route.type}
            </Popup>
          </Marker>
        );
      })}
      <Marker icon={ICON} position={markerPosition as any}>
        <Popup>
          Istanbul Server <br /> <strong>10 Gbit</strong>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

const tileLayer = {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
  url: "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png",
};
