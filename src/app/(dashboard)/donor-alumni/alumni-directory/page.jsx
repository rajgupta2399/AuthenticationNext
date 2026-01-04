// import GridShape from "@/components/common/GridShape";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="relative flex flex-col items-center justify-center p-6 overflow-hidden z-1">
      {/* <GridShape /> */}
      <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[1000px]">
        <h1 className="mb-8 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-2xl uppercase text-center">
          No data Available
        </h1>
      </div>
    </div>
  );
}
