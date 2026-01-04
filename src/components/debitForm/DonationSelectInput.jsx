"use client";
import React, { useState } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../ui/input/Label";
import Select from "../form/Select";
import MultiSelect from "../form/MultiSelect";
import { ChevronDown } from "lucide-react";

export const DonationSelectInput = () => {
  const options = [
    { value: "alumni", label: "Alumni" },
    { value: "non-alumni", label: "Non-Alumni" },
    { value: "organization", label: "Organization" },
  ];

  const handleSelectChange = (value) => {
    console.log("Selected value:", value);
  };

  return (
    <div className="space-y-6">
      <div>
        {/* <Label>Select Input</Label> */}
        <div className="relative">
          <Select
            options={options}
            placeholder="Select Affiliation"
            onChange={handleSelectChange}
            className="dark:bg-dark-900 cursor-pointer "
          />
        </div>
      </div>
    </div>
  );
};

export const DonationRecurring = () => {
  const options = [
    { value: "monthly", label: "Monthly" },
    { value: "quaterly", label: "Quaterly" },
    { value: "yearly", label: "Yearly" },
  ];

  const handleSelectChange = (value) => {
    console.log("Selected value:", value);
  };

  return (
    <div className="space-y-6 w-full">
      <div>
        {/* <Label>Select Input</Label> */}
        <div className="relative">
          <Select
            options={options}
            placeholder="Select Month"
            onChange={handleSelectChange}
            className="dark:bg-dark-900 cursor-pointer "
          />
        </div>
      </div>
    </div>
  );
};
export const DonationRecurringDuration = () => {
  const options = [
    { value: "1 year", label: "1 Year" },
    { value: "2 years", label: "2 Years" },
    { value: "3 years", label: "3 Years" },
    { value: "5 years", label: "5 Years" },
    { value: "10 yeas", label: "10 Years" },
  ];

  const handleSelectChange = (value) => {
    console.log("Selected value:", value);
  };

  return (
    <div className="space-y-6 w-full">
      <div>
        {/* <Label>Select Input</Label> */}
        <div className="relative">
          <Select
            options={options}
            placeholder="Select Duration"
            onChange={handleSelectChange}
            className="dark:bg-dark-900 cursor-pointer "
          />
        </div>
      </div>
    </div>
  );
};

export const DonationSelectPrefix = () => {
  const options = [
    { value: "mr.", label: "Mr." },
    { value: "ms.", label: "Ms." },
    { value: "dr.", label: "Dr." },
    { value: "prof.", label: "Prof." },
    { value: "mrs.", label: "Mrs." },
    { value: "m/s", label: "M/S" },
    { value: "shri", label: "Shri" },
    { value: "mx.", label: "Mx." },
    { value: "rev.", label: "Rev." },
    { value: "hon.", label: "Hon." },
    { value: "maj.", label: "Maj." },
    { value: "col.", label: "Col." },
    { value: "capt.", label: "Capt." },
    { value: "lt.", label: "Lt." },
    { value: "fr.", label: "Fr." },
  ];

  const handleSelectChange = (value) => {
    console.log("Selected value:", value);
  };

  return (
    <div className="space-y-6">
      <div>
        {/* <Label>Select Input</Label> */}
        <div className="relative">
          <Select
            options={options}
            placeholder="Select Prefix"
            onChange={handleSelectChange}
            className="dark:bg-dark-900 cursor-pointer "
          />
        </div>
      </div>
    </div>
  );
};
