import Radio from "@/src/components/form/input/Radio";
import Select from "@/src/components/form/Select";
import { useState } from "react";

export const SelectCurrency = ({ value, onChange }) => {
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
    { value: "1995-25th-reunion", label: "1995 25th Reunion" },
    { value: "200-lecture-series-pl", label: "200 Lecture Series" },
    { value: "205-pledge-list", label: "205 Pledge List" },
    { value: "ak-pledge", label: "AK Pledge" },
    {
      value: "lecture-series-pledge-list",
      label: "Lecture Series Pledge List",
    },
  ];

  const handleSelectChange = (selectedValue) => {
    console.log("Selected value:", selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className="relative">
      <Select
        options={options}
        placeholder="Select Pledge"
        onChange={handleSelectChange}
        value={value}
        className="dark:bg-dark-900 cursor-pointer"
      />
    </div>
  );
};

export const SelectNumberOfYears = ({ value, onChange }) => {
  const options = [
    { value: "1", label: "1 Year" },
    { value: "2", label: "2 Years" },
    { value: "3", label: "3 Years" },
    { value: "4", label: "4 Years" },
    { value: "5", label: "5 Years" },
  ];

  const handleSelectChange = (selectedValue) => {
    console.log("Selected years:", selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className="relative">
      <Select
        options={options}
        placeholder="Select Number of Years of Graduation"
        onChange={handleSelectChange}
        value={value}
        className="dark:bg-dark-900 cursor-pointer"
      />
    </div>
  );
};

export const SelectHallResidence = ({ value, onChange }) => {
  const options = [
    { value: "hall1", label: "Hall 1" },
    { value: "hall2", label: "Hall 2" },
    { value: "hall3", label: "Hall 3" },
    { value: "hall4", label: "Hall 4" },
    { value: "hall5", label: "Hall 5" },
    // Add more halls as needed
  ];

  const handleSelectChange = (selectedValue) => {
    console.log("Selected hall:", selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className="relative">
      <Select
        options={options}
        placeholder="Select Hall of Residence during graduation year"
        onChange={handleSelectChange}
        value={value}
        className="dark:bg-dark-900 cursor-pointer"
      />
    </div>
  );
};

export const SelectDepartment = ({ value, onChange }) => {
  const options = [
    { value: "btech", label: "Bachelor of Technology - B.Tech" },
    { value: "bs", label: "Bachelor of Science - BS" },
    { value: "msc2", label: "Master of Science - MSc2" },
    { value: "msc5", label: "Master of Science (Integrated) - MSc5" },
    { value: "mtech", label: "Master of Technology - M.Tech" },
    { value: "mphil", label: "Master in Philosophy - M.Phil" },
    { value: "mba", label: "Master of Business Administration - MBA" },
    { value: "mdes", label: "Master in Design - M.Des" },
    { value: "btech-mtech", label: "B.Tech-M.Tech (DUAL)" },
    { value: "btech-ms", label: "B.Tech-M.S. (DUAL)" },
    { value: "btech-mdes", label: "B.Tech-M.Des. (DUAL)" },
    { value: "btech-mba", label: "B.Tech-MBA (DUAL)" },
    { value: "bs-ms", label: "BS-MS (DUAL)" },
    { value: "bs-mtech", label: "BS-M.Tech (DUAL)" },
    { value: "bs-mdes", label: "BS-M.DES. (DUAL)" },
    { value: "bs-mba", label: "BS-MBA (DUAL)" },
    { value: "phd", label: "PhD" },
    { value: "mt-phd", label: "MT-PhD (DUAL)" },
    { value: "msc-phd", label: "MSc-PhD (DUAL)" },
    { value: "ms-research", label: "MS (Research)" },
  ];

  const handleSelectChange = (selectedValue) => {
    console.log("Selected department:", selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className="relative">
      <Select
        options={options}
        placeholder="Select Degree"
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
        value="true"
        checked={value === "true"}
        onChange={() => onChange("true")}
        label="Yes"
      />
      <Radio
        id="anonymous-amount-no"
        name="anonymousAmount"
        value="false"
        checked={value === "false"}
        onChange={() => onChange("false")}
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
        value="true"
        checked={value === "true"}
        onChange={() => onChange("true")}
        label="Yes"
      />
      <Radio
        id="anonymous-name-no"
        name="anonymousName"
        value="false"
        checked={value === "false"}
        onChange={() => onChange("false")}
        label="No"
      />
    </div>
  );
};
