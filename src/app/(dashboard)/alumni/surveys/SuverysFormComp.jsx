"use client";
import React from "react";
import Select from "@/src/components/form/Select";
import { ChevronDown } from "lucide-react";

export const AreYouPlanningSelectInput = ({ value, onChange }) => {
  const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  const handleSelectChange = (selectedValue) => {
    console.log("Selected value:", selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className="relative">
      <Select
        options={options}
        placeholder="Select are you planning to attend the reunion?"
        onChange={handleSelectChange}
        value={value}
        className="dark:bg-dark-900 cursor-pointer"
      />
    </div>
  );
};

export const PreRegistrationFeeReq = ({ value, onChange }) => {
  const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  const handleSelectChange = (selectedValue) => {
    console.log("Selected value:", selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className="relative">
      <Select
        options={options}
        placeholder="Pre Registration Fee Required?"
        onChange={handleSelectChange}
        value={value}
        className="dark:bg-dark-900 cursor-pointer"
      />
    </div>
  );
};

export const SelectGender = ({ value, onChange }) => {
  const options = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const handleSelectChange = (selectedValue) => {
    console.log("Selected value:", selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className="relative">
      <Select
        options={options}
        placeholder="Select Gender"
        onChange={handleSelectChange}
        value={value}
        className="dark:bg-dark-900 cursor-pointer"
      />
    </div>
  );
};

export const SelectTshirtSizeAlumni = ({ value, onChange }) => {
  const options = [
    { value: "xs", label: "XS -32" },
    { value: "s", label: "S -34" },
    { value: "m", label: "M -38" },
    { value: "l", label: "L -40" },
    { value: "xl", label: "XL -42" },
    { value: "2xl", label: "2XL -44" },
    { value: "3xl", label: "3XL -48" },
  ];

  const handleSelectChange = (selectedValue) => {
    console.log("Selected value:", selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className="relative">
      <Select
        options={options}
        placeholder="Select T-Shirt Size"
        onChange={handleSelectChange}
        value={value}
        className="dark:bg-dark-900 cursor-pointer"
      />
    </div>
  );
};

export const SelectTshirtSizePartner = ({ value, onChange }) => {
  const options = [
    { value: "xs", label: "XS -32" },
    { value: "s", label: "S -34" },
    { value: "m", label: "M -38" },
    { value: "l", label: "L -40" },
    { value: "xl", label: "XL -42" },
    { value: "2xl", label: "2XL -44" },
    { value: "3xl", label: "3XL -48" },
  ];

  const handleSelectChange = (selectedValue) => {
    console.log("Selected value:", selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className="relative">
      <Select
        options={options}
        placeholder="Select T-Shirt Size"
        onChange={handleSelectChange}
        value={value}
        className="dark:bg-dark-900 cursor-pointer"
      />
    </div>
  );
};

export const SelectPickupRequired = ({ value, onChange }) => {
  const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  const handleSelectChange = (selectedValue) => {
    console.log("Selected value:", selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className="relative">
      <Select
        options={options}
        placeholder="Select Pickup Required"
        onChange={handleSelectChange}
        value={value}
        className="dark:bg-dark-900 cursor-pointer"
      />
    </div>
  );
};

export const SelectPickupLocation = ({ value, onChange }) => {
  const options = [
    { value: "kanpur-railway", label: "Kanpur Railway Station" },
    { value: "kanpur-airport", label: "Kanpur Airport" },
    { value: "lucknow-airport", label: "Lucknow Airport" },
    { value: "others", label: "Others" },
  ];

  const handleSelectChange = (selectedValue) => {
    console.log("Selected value:", selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className="relative">
      <Select
        options={options}
        placeholder="Select Pickup Location"
        onChange={handleSelectChange}
        value={value}
        className="dark:bg-dark-900 cursor-pointer"
      />
    </div>
  );
};

export const SelectDropLocation = ({ value, onChange }) => {
  const options = [
    { value: "kanpur-railway", label: "Kanpur Railway Station" },
    { value: "kanpur-airport", label: "Kanpur Airport" },
    { value: "lucknow-airport", label: "Lucknow Airport" },
    { value: "others", label: "Others" },
  ];

  const handleSelectChange = (selectedValue) => {
    console.log("Selected value:", selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className="relative">
      <Select
        options={options}
        placeholder="Select Drop Location"
        onChange={handleSelectChange}
        value={value}
        className="dark:bg-dark-900 cursor-pointer"
      />
    </div>
  );
};

export const SelectDropRequired = ({ value, onChange }) => {
  const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  const handleSelectChange = (selectedValue) => {
    console.log("Selected value:", selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className="relative">
      <Select
        options={options}
        placeholder="Select Drop Required"
        onChange={handleSelectChange}
        value={value}
        className="dark:bg-dark-900 cursor-pointer"
      />
    </div>
  );
};

export const SelectNumberOfDays = ({ value, onChange }) => {
  const options = [
    { value: "2-nights", label: "2 Nights & 3 Days" },
    { value: "3-nights", label: "3 Nights & 4 Days" },
  ];

  const handleSelectChange = (selectedValue) => {
    console.log("Selected value:", selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className="relative">
      <Select
        options={options}
        placeholder="Select Number of Days"
        onChange={handleSelectChange}
        value={value}
        className="dark:bg-dark-900 cursor-pointer"
      />
    </div>
  );
};

export const SelectNumberOfPax = ({ value, onChange }) => {
  const options = [
    { value: "alumni-alone", label: "Alumni Alone (1 Room)" },
    { value: "alumni-alumni", label: "Alumni + Alumni (1 Room)" },
    { value: "alumni-spouse", label: "Alumni + Spouse/Partner (1 Room)" },
    {
      value: "alumni-partner-1kid",
      label: "Alumni + Partner + 1 Kid (1 Room)",
    },
    {
      value: "alumni-partner-2kids",
      label: "Alumni + Partner + 2 Kids (2 Room)",
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
        placeholder="Select Number of Pax"
        onChange={handleSelectChange}
        value={value}
        className="dark:bg-dark-900 cursor-pointer"
      />
    </div>
  );
};

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

export const SelectFoodPreference = ({ value, onChange }) => {
  const options = [
    { value: "veg", label: "Veg" },
    { value: "non-veg", label: "Non Veg" },
  ];

  const handleSelectChange = (selectedValue) => {
    console.log("Selected value:", selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className="relative">
      <Select
        options={options}
        placeholder="Select Food Preference"
        onChange={handleSelectChange}
        value={value}
        className="dark:bg-dark-900 cursor-pointer"
      />
    </div>
  );
};

export const SelectDegree = ({ value, onChange }) => {
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
    console.log("Selected value:", selectedValue);
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

export const SelectProgram = ({ value, onChange }) => {
  const options = [
    { value: "ae", label: "Aerospace Engineering - AE" },
    { value: "bsbe", label: "Biological Sciences & Bioengineering - BSBE" },
    { value: "che", label: "Chemical Engineering - CHE" },
    { value: "ce", label: "Civil Engineering - CE" },
    { value: "cse", label: "Computer Sciences & Engineering - CSE" },
    { value: "ee", label: "Electrical Engineering - EE" },
    { value: "mse", label: "Materials Science & Engineering - MSE" },
    { value: "me", label: "Mechanical Engineering - ME" },
    { value: "ime", label: "Industrial & Management Engineering - IME" },
    { value: "see", label: "Sustainable Energy Engineering" },
    { value: "hss", label: "Humanities & Social Sciences - HSS" },
    { value: "chm", label: "Chemistry - CHM" },
    { value: "mth", label: "Mathematics & Statistics - MTH" },
    { value: "phy", label: "Physics - PHY" },
    { value: "es", label: "Earth Sciences - ES" },
    { value: "eco", label: "Economic Sciences" },
    { value: "cog", label: "Cognitive Science" },
    { value: "eem", label: "Environmental Engineering & Management" },
    { value: "pse", label: "Phonotics Science & Engineering Programme" },
    { value: "design", label: "Design Programme" },
    { value: "msp", label: "Material Science Programme" },
    { value: "net", label: "Nuclear Engineering & Technology" },
  ];

  const handleSelectChange = (selectedValue) => {
    console.log("Selected value:", selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className="relative">
      <Select
        options={options}
        placeholder="Select Program"
        onChange={handleSelectChange}
        value={value}
        className="dark:bg-dark-900 cursor-pointer"
      />
    </div>
  );
};

export const SelectCountry = ({ value, onChange }) => {
  const options = Array.from(
    new Set([
      "India",
      "Afghanistan",
      "Åland Islands",
      "Albania",
      "Algeria",
      "American Samoa",
      "Andorra",
      "Angola",
      "Anguilla",
      "Antarctica",
      "Antigua and Barbuda",
      "Argentina",
      "Armenia",
      "Aruba",
      "Australia",
      "Austria",
      "Azerbaijan",
      "Bahamas",
      "Bahrain",
      "Bangladesh",
      "Barbados",
      "Belarus",
      "Belgium",
      "Belize",
      "Benin",
      "Bermuda",
      "Bhutan",
      "Bolivia",
      "Bonaire, Sint Eustatius and Saba",
      "Bosnia and Herzegovina",
      "Botswana",
      "Bouvet Island",
      "Brazil",
      "British Indian Ocean Territory",
      "Brunei",
      "Bulgaria",
      "Burkina Faso",
      "Burundi",
      "Cabo Verde",
      "Cambodia",
      "Cameroon",
      "Canada",
      "Cayman Islands",
      "Central African Republic",
      "Chad",
      "Chile",
      "China",
      "Christmas Island",
      "Cocos (Keeling) Islands",
      "Colombia",
      "Comoros",
      "Congo",
      "Congo (the Democratic Republic of the)",
      "Cook Islands",
      "Costa Rica",
      "Côte d'Ivoire",
      "Croatia",
      "Cuba",
      "Curaçao",
      "Cyprus",
      "Czechia",
      "Denmark",
      "Djibouti",
      "Dominica",
      "Dominican Republic",
      "Ecuador",
      "Egypt",
      "El Salvador",
      "Equatorial Guinea",
      "Eritrea",
      "Estonia",
      "Eswatini",
      "Ethiopia",
      "Falkland Islands (Malvinas)",
      "Faroe Islands",
      "Fiji",
      "Finland",
      "France",
      "French Guiana",
      "French Polynesia",
      "French Southern Territories",
      "Gabon",
      "Gambia",
      "Georgia",
      "Germany",
      "Ghana",
      "Gibraltar",
      "Greece",
      "Greenland",
      "Grenada",
      "Guadeloupe",
      "Guam",
      "Guatemala",
      "Guernsey",
      "Guinea",
      "Guinea-Bissau",
      "Guyana",
      "Haiti",
      "Heard Island and McDonald Islands",
      "Holy See",
      "Honduras",
      "Hong Kong",
      "Hungary",
      "Iceland",
      "Indonesia",
      "Iran",
      "Iraq",
      "Ireland",
      "Isle of Man",
      "Israel",
      "Italy",
      "Jamaica",
      "Japan",
      "Jersey",
      "Jordan",
      "Kazakhstan",
      "Kenya",
      "Kiribati",
      "Kuwait",
      "Kyrgyzstan",
      "Laos",
      "Latvia",
      "Lebanon",
      "Lesotho",
      "Liberia",
      "Libya",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Macao",
      "Madagascar",
      "Malawi",
      "Malaysia",
      "Maldives",
      "Mali",
      "Malta",
      "Marshall Islands",
      "Martinique",
      "Mauritania",
      "Mauritius",
      "Mayotte",
      "Mexico",
      "Micronesia (Federated States of)",
      "Moldova",
      "Monaco",
      "Mongolia",
      "Montenegro",
      "Montserrat",
      "Morocco",
      "Mozambique",
      "Myanmar",
      "Namibia",
      "Nauru",
      "Nepal",
      "Netherlands",
      "New Caledonia",
      "New Zealand",
      "Nicaragua",
      "Niger",
      "Nigeria",
      "Niue",
      "Norfolk Island",
      "North Korea",
      "North Macedonia",
      "Northern Mariana Islands",
      "Norway",
      "Oman",
      "Pakistan",
      "Palau",
      "Palestine, State of",
      "Panama",
      "Papua New Guinea",
      "Paraguay",
      "Peru",
      "Philippines",
      "Pitcairn",
      "Poland",
      "Portugal",
      "Puerto Rico",
      "Qatar",
      "Réunion",
      "Romania",
      "Russia",
      "Rwanda",
      "Saint Barthélemy",
      "Saint Helena, Ascension and Tristan da Cunha",
      "Saint Kitts and Nevis",
      "Saint Lucia",
      "Saint Martin (French part)",
      "Saint Pierre and Miquelon",
      "Saint Vincent and the Grenadines",
      "Samoa",
      "San Marino",
      "Sao Tome and Principe",
      "Saudi Arabia",
      "Senegal",
      "Serbia",
      "Seychelles",
      "Sierra Leone",
      "Singapore",
      "Sint Maarten (Dutch part)",
      "Slovakia",
      "Slovenia",
      "Solomon Islands",
      "Somalia",
      "South Africa",
      "South Georgia and the South Sandwich Islands",
      "South Korea",
      "South Sudan",
      "Spain",
      "Sri Lanka",
      "Sudan",
      "Suriname",
      "Svalbard and Jan Mayen",
      "Sweden",
      "Switzerland",
      "Syria",
      "Taiwan",
      "Tajikistan",
      "Tanzania",
      "Thailand",
      "Timor-Leste",
      "Togo",
      "Tokelau",
      "Tonga",
      "Trinidad and Tobago",
      "Tunisia",
      "Turkey",
      "Turkmenistan",
      "Turks and Caicos Islands",
      "Tuvalu",
      "Uganda",
      "Ukraine",
      "United Arab Emirates",
      "United Kingdom",
      "United States Minor Outlying Islands",
      "United States of America",
      "Uruguay",
      "Uzbekistan",
      "Vanuatu",
      "Venezuela",
      "Vietnam",
      "Virgin Islands (British)",
      "Virgin Islands (U.S.)",
      "Wallis and Futuna",
      "Western Sahara",
      "Yemen",
      "Zambia",
      "Zimbabwe",
    ])
  ).map((country) => ({
    value: country.toLowerCase().replace(/\s+/g, "-"),
    label: country,
  }));

  const handleSelectChange = (selectedValue) => {
    console.log("Selected value:", selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className="relative">
      <Select
        options={options}
        placeholder="Select Country"
        onChange={handleSelectChange}
        value={value}
        className="dark:bg-dark-900 cursor-pointer"
      />
    </div>
  );
};
