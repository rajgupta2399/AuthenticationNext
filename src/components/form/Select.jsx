import React, { useState, useRef, useEffect } from "react";

const Select = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  defaultValue = "",
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (value) => {
    setSelectedValue(value);
    onChange(value);
    setIsOpen(false);
  };

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Select Trigger */}
      <button
        type="button"
        className={`h-10 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-11 text-left text-sm shadow-theme-xs transition-colors focus:border-brand-400 focus:outline-hidden focus:ring-3 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-600 ${
          selectedValue
            ? "text-gray-800 dark:text-white/90"
            : "text-gray-400 dark:text-gray-400"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <span className="truncate">
            {selectedValue ? selectedOption?.label : placeholder}
          </span>
          <svg
            className={`h-5 w-5 flex-shrink-0 transform transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
          <div className="max-h-60 overflow-y-auto">
            {" "}
            {/* Fixed height with scroll */}
            {/* Placeholder option */}
            <div
              className={`cursor-pointer px-4 py-2.5 text-sm first:rounded-t-lg last:rounded-b-lg ${
                selectedValue === ""
                  ? "bg-white text-gray-700 dark:bg-gray-800 dark:text-white"
                  : "text-gray-700 hover:bg-white hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
              }`}
              onClick={() => handleSelect("")}
            >
              {placeholder}
            </div>
            {/* Options */}
            {options.map((option) => (
              <div
                key={option.value}
                className={`cursor-pointer px-4 py-2.5 text-sm first:rounded-t-lg last:rounded-b-lg ${
                  selectedValue === option.value
                    ? "bg-brand-400 text-white"
                    : "text-gray-700 hover:bg-brand-400 hover:text-white dark:text-gray-400 dark:hover:bg-brand-400 dark:hover:text-white"
                }`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
