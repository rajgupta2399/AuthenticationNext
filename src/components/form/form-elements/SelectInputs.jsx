"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../../ui/input/Label";
import Select from "../Select";
import MultiSelect from "../MultiSelect";
import { ChevronDown } from "lucide-react";

export default function SelectInputs() {
  const options = [
    { value: "marketing", label: "Marketing" },
    { value: "template", label: "Template" },
    { value: "development", label: "Development" },
  ];

  const [selectedValues, setSelectedValues] = useState([]);

  const handleSelectChange = (value) => {
    console.log("Selected value:", value);
  };

  const multiOptions = [
    { value: "1", text: "Option 1", selected: false },
    { value: "2", text: "Option 2", selected: false },
    { value: "3", text: "Option 3", selected: false },
  ];

  return (
    <div className="space-y-6">
      <div>
        {/* <Label>Select Input</Label> */}
        <div className="relative">
          <Select
            options={options}
            placeholder="Select Option"
            onChange={handleSelectChange}
            className="dark:bg-dark-900 cursor-pointer"
          />
          <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
            <ChevronDown />
          </span>
        </div>
      </div>
      {/* <div className="relative">
          <MultiSelect
            label="Multiple Select Options"
            options={multiOptions}
            defaultSelected={["1", "3"]}
            onChange={(values) => setSelectedValues(values)}
          />
          <p className="sr-only">
            Selected Values: {selectedValues.join(", ")}
          </p>
        </div> */}
    </div>
  );
}
