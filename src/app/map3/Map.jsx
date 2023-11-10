"use client";
import L, { LatLngExpression } from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-easyprint";
import MarkerClusterGroup from "react-leaflet-cluster";
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
    }
  }, [mapContext]);
  const markerPosition = [40.993611, 28.825879]; // Comnet Datacenter

  // MAP CENTER POSITION
  const center = [
    (40.976204 + 53.63306) / 2,
    (28.814991 + 10.00537) / 2,
  ];

  return (
    <MapContainer
      whenReady={(event) => setMapContext(event.target)}
      minZoom={5}
      center={center}
      zoom={5}
      scrollWheelZoom={true}
      className="h-screen relative z-0"
    >
      <TileLayer noWrap {...tileLayer} />
      <MarkerClusterGroup
        maxClusterRadius={(zoom) => {
          return zoom * 2;
        }}
        iconCreateFunction={(cluster) => {
          const childCount = cluster.getChildCount();
          return new L.DivIcon({
            html: `
              <span class="h-10 w-10 -ml-5 -mt-5 relative inline-block">
                <img class="ml-[5px] mt-[5px] w-8 h-8 text-gray-700 fill-current" src="/marker.png" />
                <span class="!leading-4 absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                ${childCount}
                </span>
              </span>
              `,
            className: "marker-cluster",
          });
        }}
      >
        <Marker icon={ICON} position={markerPosition}>
          <Popup>
            Istanbul Server <br /> <strong>10 Gbit</strong>
          </Popup>
        </Marker>
        {routes.map((route) => {
          return (
            <Marker
              key={`route$-${route.name}-${route.type}`}
              icon={ICON}
              position={route.markerPosition}
            >
              <Popup>
                {route.name} <br />
                {route.type}
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
      {routes.map((route) => {
        return (
          <Polyline
            key={`polyline-${route.name}`}
            positions={route.route}
            color={route.type === "POP" ? "orange" : "red"}
            dashArray={route.type === "POP" ? "10, 10" : ""}
            dashOffset="0"
          ></Polyline>
        );
      })}
    </MapContainer>
  );
};

const tileLayer = {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
  url: "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png",
};
