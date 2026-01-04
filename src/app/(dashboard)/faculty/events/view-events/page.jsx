"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

export default function ViewEvents() {
  const events = [
    {
      Events:
        "One Day Workshop on Watershed Development Component under PMKSY-2.0",
      date: "04.04.2025",
    },
    {
      Events:
        "An Introductory Workshop on Exoplanet Detection and Characterization",
      date: "04.04.2025 - 06.04.2025",
    },
    {
      Events: "Metamaterial Antennas and Applications",
      date: "18.04.2025 - 20.04.2025",
    },
    {
      Events: "Hands on Workshop on Computational Thermodynamics",
      date: "22.04.2025 - 24.04.2025",
    },
    {
      Events: "Advances in CCUS",
      date: "24.04.2025 - 25.04.2025",
    },
    {
      Events:
        "Mastering Innovation & Valuation: Tools for Entrepreneurial Value Creation",
      date: "22.04.2025 - 26.04.2025",
    },
  ];

  // const typeColor = (type) => {
  //   if (type.toLowerCase().includes("workshop"))
  //     return "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300";
  //   if (type.toLowerCase().includes("conference"))
  //     return "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300";
  //   return "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300";
  // };

  return (
    <div className=" w-full h-full">
      {/* Heading */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="sm:text-xl text-md font-bold text-brand-500">
              Events List
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-white/10 backdrop-blur-xl shadow-md border border-gray-200/60 dark:border-white/10 rounded-md overflow-hidden">
        <Table className="w-full">
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-[#1D242F]">
            <TableRow>
              <TableCell
                isHeader
                className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-start text-sm"
              >
                Events
              </TableCell>

              <TableCell
                isHeader
                className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-start text-sm"
              >
                Date
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05] dark:bg-[#1D1F24]">
            {events.map((item, i) => (
              <TableRow
                key={i}
                className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                <TableCell className="px-6 py-4 text-start text-theme-sm text-gray-600 dark:text-gray-300 font-medium">
                  <span className="font-medium text-gray-800 dark:text-gray-100">
                    {item.Events}
                  </span>
                </TableCell>

                <TableCell className="px-6 py-4 text-start text-theme-sm text-gray-600 dark:text-gray-300 font-medium">
                  {item.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
