"use client";
interface MapPageProps {}
import geoJSONData from "../../assets/custom.geo.json";
import geoJSONDataExtended from "../../assets/customextended.geo.json";
import { useRef } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";
const MapPage = ({}: MapPageProps) => {
  const globeMethods = useRef<GlobeMethods | undefined>(undefined);
  // city coords

  const istanbulCoords = {
    startLat: 41.0082,
    startLng: 28.9784,
    lat: 41.0082,
    lng: 28.9784,
    size: 0.1,
    testing: "Istanbul Server",
  };

  const amsterdamCoords = { endLat: 52.3792, endLng: 4.8994, alt: 1 };
  const hamburgCoords = {
    endLat: 53.4388,
    endLng: 9.9872,
    size: 0.05,
    lng: 9.9872,
    lat: 53.4388,
    testing: "Hamburg Server",
  };

  const arcsData = [
    // {
    //   ...londonCoords,
    //   ...amsterdamCoords,
    //   color: ["red", "blue"], // Arc color
    // },
    {
      ...hamburgCoords,
      ...istanbulCoords,
      // color: ["purple", "white"], // Arc color

      color: ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
    },

    {
      ...istanbulCoords,
      ...hamburgCoords,
      // color: ["purple", "white"], // Arc color

      color: ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
    },
  ];

  const N = 20;
  const gData = [...Array(N).keys()].map(() => ({
    lat: (Math.random() - 0.5) * 180,
    lng: (Math.random() - 0.5) * 360,
    size: Math.random() / 3,
    color: ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
    testing: "Point description",
  }));
  const arcsDataOrig = [...Array(N).keys()].map(() => ({
    startLat: (Math.random() - 0.5) * 180,
    startLng: (Math.random() - 0.5) * 360,
    endLat: (Math.random() - 0.5) * 180,
    endLng: (Math.random() - 0.5) * 360,
    color: [
      ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
      ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
    ],
  }));
  return (
    <Globe
      ref={globeMethods}
      arcStroke={0.5}
      hexPolygonsData={geoJSONData.features}
      // hexPolygonsData={geoJSONDataExtended.features}
      onGlobeReady={() =>
        globeMethods.current?.pointOfView({
          lng: 30,
          lat: 35,
          altitude: 0.87,
        })
      }
      onZoom={(x) => {
        console.log("Zoomed to globe");
        console.log(x);
      }}
      // globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      arcsData={arcsData}
      arcLabel={(d) => {
        console.log(d);
        return `
        <div class="p-4 bg-red-500">
        <b>${d.testing}</b>
        <ul>
            <li>934.34TB Traffic</li>
       </ul>
        </div>
      `;
      }}
      arcColor={"color"}
      arcDashLength={0.8}
      arcDashGap={0.3}
      arcDashAnimateTime={() => Math.random() * 1500 + 500}
      pointsData={arcsData}
      pointAltitude="size"
      pointColor="color"
      pointLabel={(d) => {
        console.log(d);
        return `
        <div class="p-4 bg-blue-500">
        <b>${d.testing}</b>
        <ul>
            <li>934.34TB Traffic</li>
       </ul>
        </div>
      `;
      }}
    />
  );
};

export default MapPage;
