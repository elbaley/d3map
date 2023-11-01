"use client";
import { MapLegend } from "@/MapLegend";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./Map").then((mod) => mod.Map), {
  ssr: false,
});
const MapTwoPage = () => {
  return (
    <div className="h-screen relative">
      <MapLegend />
      <MapComponent />
    </div>
  );
};

export default MapTwoPage;
