"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Radio from "../input/Radio";

export default function RadioButtons() {
  const [selectedValue, setSelectedValue] = useState("option2");

  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };
  return (
    <div className="flex flex-wrap items-center gap-8 rounded-md border border-gray-200  dark:border-gray-600 py-6 px-5">
      <Radio
        id="radio1"
        name="group1"
        value="option1"
        checked={selectedValue === "option1"}
        onChange={handleRadioChange}
        label="Male"
      />
      <Radio
        id="radio2"
        name="group1"
        value="option2"
        checked={selectedValue === "option2"}
        onChange={handleRadioChange}
        label="Female"
      />
      <Radio
        id="radio3"
        name="group1"
        value="option3"
        checked={selectedValue === "option3"}
        onChange={handleRadioChange}
        label="Disabled"
        disabled={true}
      />
    </div>
  );
}
