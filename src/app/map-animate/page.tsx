"use client";
import dynamic from "next/dynamic";
const MapComponent = dynamic(() => import("./Map").then((mod) => mod.Map), {
  ssr: false,
});
const MapTwoPage = () => {
  return (
    <div className="h-screen relative">
      <div className="hidden text-black sm:block shadow-lg p-2 bg-white absolute bottom-20 left-5 h-max z-30 w-[250px]">
        <span className="block font-bold">
          <i className="align-middle mr-2 w-14 inline-block border-dashed border-b-[orange] border-b-4" />
          PoP
        </span>
        <span className="block font-bold">
          <i className="align-middle mr-2 w-14 inline-block border-b-[red] border-b-4" />
          PoP2
        </span>
      </div>
      <MapComponent />
    </div>
  );
};

export default MapTwoPage;
