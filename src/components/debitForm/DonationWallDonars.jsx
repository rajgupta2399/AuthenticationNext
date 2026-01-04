"use client";
import React, { useState } from "react";
import Radio from "../form/input/Radio";

export const DonationWallDonars = () => {
  const [selectedValue, setSelectedValue] = useState("option2");

  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };
  return (
    <div className="flex flex-wrap items-center gap-8 rounded-md border border-gray-200  dark:border-gray-600 py-6 px-5">
      <Radio
        id="radio1"
        name="group2"
        value="option1"
        checked={selectedValue === "option1"}
        onChange={handleRadioChange}
        label="Yes"
      />
      <Radio
        id="radio2"
        name="group2"
        value="option2"
        checked={selectedValue === "option2"}
        onChange={handleRadioChange}
        label="No"
      />
    </div>
  );
};
