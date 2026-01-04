"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Select from "../form/Select";

export const FinancialYearSelect = () => {
  const options = [
    { value: "2025-2026", label: "2025-2026" },
    { value: "2024-2025", label: "2024-2025" },
    { value: "2023-2024", label: "2023-2024" },
  ];

  const handleSelectChange = (value) => {
    console.log("Selected value:", value);
  };

  return (
    <div className="space-y-0 w-36">
      <div>
        {/* <Label>Select Input</Label> */}
        <div className="relative">
          <Select
            options={options}
            placeholder="Select Year"
            onChange={handleSelectChange}
            className="dark:bg-dark-900 cursor-pointer h-4"
          />
        </div>
      </div>
    </div>
  );
};
