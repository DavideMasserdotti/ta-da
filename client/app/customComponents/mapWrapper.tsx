"use client";

import dynamic from "next/dynamic";

const MapComponent = dynamic(
  () => import("./mapComponent"),
  { ssr: false }
);

export default MapComponent;
