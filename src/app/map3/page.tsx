"use client";
import { MapLegend } from "@/MapLegend";
const MapComponent = dynamic(() => import("./Map").then((mod) => mod.Map), {
  ssr: false,
});
import dynamic from "next/dynamic";
const MapTwoPage = () => {
  return (
    <div className="h-screen relative">
      <MapLegend />
      <MapComponent />
    </div>
  );
};

export default MapTwoPage;
