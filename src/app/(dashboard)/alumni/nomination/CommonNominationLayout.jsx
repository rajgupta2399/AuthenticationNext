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
export const SelectCollege = ({ value, onChange }) => {
  const options = [
  { value: "iit-delhi", label: "IIT Delhi" },
  { value: "iit-bombay", label: "IIT Bombay" },
  { value: "iit-madras", label: "IIT Madras" },
  { value: "iit-kanpur", label: "IIT Kanpur" },
  { value: "iit-kharagpur", label: "IIT Kharagpur" },
  { value: "nit-trichy", label: "NIT Trichy" },
  { value: "nit-surathkal", label: "NIT Surathkal" },
  { value: "nit-warangal", label: "NIT Warangal" },
  { value: "bits-pilani", label: "BITS Pilani" },
  { value: "du", label: "University of Delhi" },
  { value: "mu", label: "Mumbai University" },
  { value: "other", label: "Other College" },
];


  const handleSelectChange = (selectedValue) => {
    console.log("Selected value:", selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className="relative">
      <Select
        options={options}
        placeholder="Select College"
        onChange={handleSelectChange}
        value={value}
        className="dark:bg-dark-900 cursor-pointer"
      />
    </div>
  );
};
export const SelectSolution = ({ value, onChange }) => {
  const options =  [
    { value: "algorithm-design", label: "Algorithm Design" },
    { value: "data-structures", label: "Data Structures" },
    { value: "problem-solving", label: "Problem Solving" },
    { value: "competitive-programming", label: "Competitive Programming" },
    { value: "system-design", label: "System Design" },
    { value: "software-engineering", label: "Software Engineering" },
  ];


  const handleSelectChange = (selectedValue) => {
    console.log("Selected value:", selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className="relative">
      <Select
        options={options}
        placeholder="Select Solution"
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

export const DomainSelection = ({ value, onChange, error }) => {
  const domains = [
    {
      id: "domain-radio1",
      value: "AcademicExcellence",
      label: "Academic Excellence"
    },
    {
      id: "domain-radio2", 
      value: "ProfessionalExcellence",
      label: "Professional Excellence"
    },
    {
      id: "domain-radio3",
      value: "EntrepreneurshipandManagement", 
      label: "Entrepreneurship and Management"
    },
    {
      id: "domain-radio4",
      value: "ServiceofHumanityatlarge",
      label: "Service of Humanity at large"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-6 rounded-md border border-gray-200 dark:border-gray-600 py-4 px-6 bg-white dark:bg-gray-800">
        {domains.map((domain) => (
          <div key={domain.id} className="flex items-center">
            <Radio
              id={domain.id}
              name="domain"
              value={domain.value}
              checked={value === domain.value}
              onChange={() => onChange(domain.value)}
              label={domain.label}
              className="mr-2"
            />
          </div>
        ))}
      </div>
      
      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
};