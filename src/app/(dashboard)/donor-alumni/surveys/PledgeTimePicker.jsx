"use client";
import React, { useState, useRef, useEffect } from "react";
import { Clock, ChevronDown, ChevronUp } from "lucide-react";
import Label from "@/src/components/ui/input/Label";

const PledgeTimePicker = ({
  id,
  value,
  onChange,
  label,
  placeholder = "Select time",
  minTime = "00:00",
  maxTime = "23:59",
  minuteIncrement = 30,
  disable = false,
  required = false,
  error = "",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(value || "");
  const dropdownRef = useRef(null);

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    const [minHour, minMinute] = minTime.split(":").map(Number);
    const [maxHour, maxMinute] = maxTime.split(":").map(Number);

    let currentHour = minHour;
    let currentMinute = minMinute;

    while (
      currentHour < maxHour ||
      (currentHour === maxHour && currentMinute <= maxMinute)
    ) {
      const period = currentHour >= 12 ? "PM" : "AM";
      const displayHour = currentHour % 12 || 12;
      const displayMinute = currentMinute.toString().padStart(2, "0");

      const time24 = `${currentHour.toString().padStart(2, "0")}:${currentMinute
        .toString()
        .padStart(2, "0")}`;
      const time12 = `${displayHour}:${displayMinute} ${period}`;

      slots.push({
        value: time24,
        display: time12,
      });

      // Increment time
      currentMinute += minuteIncrement;
      if (currentMinute >= 60) {
        currentMinute = 0;
        currentHour++;
      }
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTimeSelect = (time) => {
    setSelectedTime(time.display);
    if (onChange) {
      onChange(time.display, time.value);
    }
    setIsOpen(false);
  };

  const formatDisplayTime = (time24) => {
    if (!time24) return "";
    const [hour, minute] = time24.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minute.toString().padStart(2, "0")} ${period}`;
  };

  const displayValue = selectedTime || formatDisplayTime(value) || "";

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <Label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}

      <div className="relative" ref={dropdownRef}>
        {/* Custom Select Button */}
        <button
          type="button"
          onClick={() => !disable && setIsOpen(!isOpen)}
          disabled={disable}
          className={`
            w-full h-12 px-4 py-3 text-left bg-white dark:bg-gray-800 border rounded-lg
            transition-all duration-200 flex items-center justify-between
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${
              disable
                ? "cursor-not-allowed opacity-50 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                : "cursor-pointer border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
            }
            ${
              error
                ? "border-red-500 focus:ring-red-500/20"
                : "border-gray-300 dark:border-gray-600"
            }
          `}
        >
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-gray-400" />
            <span
              className={`text-sm ${
                displayValue ? "text-gray-900 dark:text-white" : "text-gray-500"
              }`}
            >
              {displayValue || placeholder}
            </span>
          </div>

          {!disable && (
            <div className="flex flex-col">
              <ChevronUp className="w-4 h-4 text-gray-400 -mb-1" />
              <ChevronDown className="w-4 h-4 text-gray-400 -mt-1" />
            </div>
          )}
        </button>

        {/* Dropdown Menu */}
        {isOpen && !disable && (
          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            <div className="py-2">
              {timeSlots.map((time, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleTimeSelect(time)}
                  className={`
                    w-full px-4 py-2 text-left text-sm transition-colors duration-150
                    hover:bg-blue-50 dark:hover:bg-blue-900/20
                    ${
                      time.display === displayValue
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                        : "text-gray-700 dark:text-gray-300"
                    }
                  `}
                >
                  {time.display}
                </button>
              ))}

              {timeSlots.length === 0 && (
                <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                  No available time slots
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default PledgeTimePicker;
