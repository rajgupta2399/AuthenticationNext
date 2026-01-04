"use client";
import React, { useEffect, useRef, useState } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { ClockIcon } from "lucide-react";
import Label from "../ui/input/Label";

const TimePicker = ({
  id,
  value,
  onChange,
  label,
  placeholder = "Select time",
  enableTime = true,
  noCalendar = true,
  dateFormat = "h:i K",
  timeFormat = "h:i K",
  minTime,
  maxTime,
  minuteIncrement = 1,
  disable = false,
  required = false,
  error = "",
  className = "",
}) => {
  const inputRef = useRef(null);
  const flatpickrInstance = useRef(null);
  const [selectedTime, setSelectedTime] = useState(value || "");

  useEffect(() => {
    if (inputRef.current && !flatpickrInstance.current) {
      const config = {
        enableTime: enableTime,
        noCalendar: noCalendar,
        dateFormat: dateFormat,
        time_24hr: timeFormat === "H:i",
        minuteIncrement: minuteIncrement,
        static: true,
        allowInput: true,
        clickOpens: true,
        onChange: (selectedDates, dateStr) => {
          setSelectedTime(dateStr);
          if (onChange) {
            onChange(dateStr, selectedDates[0]);
          }
        },
        onClose: (selectedDates, dateStr) => {
          if (selectedDates.length > 0 && onChange) {
            onChange(dateStr, selectedDates[0]);
          }
        },
      };

      if (minTime) {
        config.minTime = minTime;
      }

      if (maxTime) {
        config.maxTime = maxTime;
      }

      if (value) {
        config.defaultDate = value;
      }

      flatpickrInstance.current = flatpickr(inputRef.current, config);
    }

    return () => {
      if (flatpickrInstance.current) {
        flatpickrInstance.current.destroy();
        flatpickrInstance.current = null;
      }
    };
  }, [
    enableTime,
    noCalendar,
    dateFormat,
    timeFormat,
    minuteIncrement,
    minTime,
    maxTime,
  ]);

  useEffect(() => {
    if (flatpickrInstance.current && value !== selectedTime) {
      flatpickrInstance.current.setDate(value, false);
      setSelectedTime(value || "");
    }
  }, [value]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSelectedTime(newValue);

    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)?$/i;
    if (timeRegex.test(newValue) && onChange) {
      onChange(newValue, null);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <Label htmlFor={id} className="mb-2 block">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}

      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          type="text"
          placeholder={placeholder}
          value={selectedTime}
          onChange={handleInputChange}
          disabled={disable}
          className={`
            h-11 w-full rounded-lg border appearance-none px-4 py-2.5 pr-11 text-sm shadow-theme-xs 
            placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-transparent 
            border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 
            dark:border-gray-600 dark:focus:border-brand-500 dark:focus:ring-brand-500/20
            text-gray-900 dark:text-white
            ${
              disable
                ? "cursor-not-allowed opacity-50 bg-gray-100 dark:bg-gray-800"
                : "bg-white dark:bg-gray-800"
            }
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-400 dark:focus:border-red-400"
                : ""
            }
          `}
        />

        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
          <ClockIcon className="size-5" />
        </span>
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default TimePicker;
