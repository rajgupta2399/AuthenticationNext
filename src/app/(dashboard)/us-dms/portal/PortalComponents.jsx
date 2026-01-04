import Radio from "@/src/components/form/input/Radio";
import Select from "@/src/components/form/Select";
import { useState } from "react";

export const DonationSelectPrefix = ({ value, onChange }) => {
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

  const handleSelectChange = (selectedValue) => {
    console.log("Selected value:", selectedValue);
    // Call the parent's onChange function
    if (onChange) {
      onChange(selectedValue);
    }
  };

  return (
    <div>
      <div className="relative">
        <Select
          options={options}
          placeholder="Select Prefix"
          onChange={handleSelectChange}
          value={value}
          className="dark:bg-dark-900 cursor-pointer"
        />
      </div>
    </div>
  );
};

export const SelectCategory = ({ value, onChange }) => {
  const options = [
    { value: "inr", label: "India Rupees (INR)" },
    { value: "usd", label: "USD ($)" },
  ];

  const handleSelectChange = (selectedValue) => {
    console.log("Selected value:", selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className="relative">
      <Select
        options={options}
        placeholder="Select Currency"
        onChange={handleSelectChange}
        value={value}
        className="dark:bg-dark-900 cursor-pointer"
      />
    </div>
  );
};

export const SelectList = ({ value, onChange }) => {
  const options = [
    { value: "donation", label: "Donation" },
    { value: "matching-donation", label: "Matching-Donation" },
    { value: "reunion", label: "Reunion" },
  ];

  const handleSelectChange = (selectedValue) => {
    console.log("Selected value:", selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className="relative">
      <Select
        options={options}
        placeholder="Select Category"
        onChange={handleSelectChange}
        value={value}
        className="dark:bg-dark-900 cursor-pointer"
      />
    </div>
  );
};

export const SelectPurpose = ({ value, onChange }) => {
  const options = [
    { value: "faculty award", label: "Faculty Award" },
    { value: "annual giving", label: "Annual Giving" },
    { value: "scholorship", label: "Scholarship" },
    { value: "education", label: "Education" },
  ];

  const handleSelectChange = (selectedValue) => {
    console.log("Selected years:", selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className="relative">
      <Select
        options={options}
        placeholder="Select Purpose"
        onChange={handleSelectChange}
        value={value}
        className="dark:bg-dark-900 cursor-pointer"
      />
    </div>
  );
};

export const SelectDmsStatus = ({ value, onChange }) => {
  const options = [
    { value: "mapped", label: "Mapped" },
    { value: "unmapped", label: "Unmapped" },
    { value: "re-assigned to us-team", label: "Re-Assign to US-Team" },
  ];

  const handleSelectChange = (selectedValue) => {
    console.log("Selected hall:", selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className="relative">
      <Select
        options={options}
        placeholder="Select DMS Status"
        onChange={handleSelectChange}
        value={value}
        className="dark:bg-dark-900 cursor-pointer"
      />
    </div>
  );
};

export const SelectSubCategory = ({ value, onChange }) => {
  const options = [
    { value: "zeffy", label: "Zeffy" },
    { value: "wire-transfer", label: "Wire Transfer" },
    { value: "online-transfer", label: "Online Transfer" },
  ];

  const handleSelectChange = (selectedValue) => {
    console.log("Selected department:", selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className="relative">
      <Select
        options={options}
        placeholder="Select Sub Category"
        onChange={handleSelectChange}
        value={value}
        className="dark:bg-dark-900 cursor-pointer"
      />
    </div>
  );
};

// Radio button components (these are correct)
export const MarkAnonymouseAmount = ({ value, onChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-8 rounded-md border border-gray-200 dark:border-gray-600 py-3 px-5">
      <Radio
        id="anonymous-amount-yes"
        name="anonymousAmount"
        value="yes"
        checked={value === "yes"}
        onChange={() => onChange("yes")}
        label="Yes"
      />
      <Radio
        id="anonymous-amount-no"
        name="anonymousAmount"
        value="no"
        checked={value === "no"}
        onChange={() => onChange("no")}
        label="No"
      />
    </div>
  );
};

export const MarkAnonymouseName = ({ value, onChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-8 rounded-md border border-gray-200 dark:border-gray-600 py-3 px-5">
      <Radio
        id="anonymous-name-yes"
        name="anonymousName"
        value="yes"
        checked={value === "yes"}
        onChange={() => onChange("yes")}
        label="Yes"
      />
      <Radio
        id="anonymous-name-no"
        name="anonymousName"
        value="no"
        checked={value === "no"}
        onChange={() => onChange("no")}
        label="No"
      />
    </div>
  );
};
