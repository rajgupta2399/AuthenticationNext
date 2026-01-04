"use client";
import React, { useState } from "react";
import ComponentCard from "@/src/components/common/ComponentCard";
import TimePicker from "@/src/components/form/TimePicker";
import { TimeRangePicker } from "@/src/components/form/TimeRangePicker";

export default function TimePickerComponents() {
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTimeRange, setSelectedTimeRange] = useState("");
  const [selectedTimeWithValidation, setSelectedTimeWithValidation] = useState("");

  const handleTimeChange = (timeString, timeDate) => {
    console.log("Selected time:", timeString, timeDate);
    setSelectedTime(timeString);
  };

  const handleTimeRangeChange = (rangeString, rangeDates) => {
    console.log("Selected time range:", rangeString, rangeDates);
    setSelectedTimeRange(rangeString);
  };

  const handleTimeWithValidationChange = (timeString, timeDate) => {
    console.log("Selected time with validation:", timeString, timeDate);
    setSelectedTimeWithValidation(timeString);
  };

  return (
    <div className="space-y-6">
      <ComponentCard title="Basic Time Picker">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TimePicker
            id="basic-time"
            label="Select Time"
            placeholder="Choose a time"
            value={selectedTime}
            onChange={handleTimeChange}
          />
          
          <TimePicker
            id="24h-time"
            label="24 Hour Format"
            placeholder="Select time (24h)"
            timeFormat="H:i"
            dateFormat="H:i"
            value={selectedTime}
            onChange={handleTimeChange}
          />
        </div>
      </ComponentCard>

      <ComponentCard title="Time Picker with Validation">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TimePicker
            id="min-time"
            label="Min Time (09:00 AM)"
            placeholder="Select time after 9 AM"
            minTime="09:00"
            value={selectedTimeWithValidation}
            onChange={handleTimeWithValidationChange}
          />
          
          <TimePicker
            id="max-time"
            label="Max Time (06:00 PM)"
            placeholder="Select time before 6 PM"
            maxTime="18:00"
            value={selectedTimeWithValidation}
            onChange={handleTimeWithValidationChange}
          />
        </div>
      </ComponentCard>

      <ComponentCard title="Time Range Picker">
        <TimeRangePicker
          id="time-range"
          label="Select Time Range"
          placeholder="Choose start and end time"
          value={selectedTimeRange}
          onChange={handleTimeRangeChange}
        />
        {selectedTimeRange && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Selected range: {selectedTimeRange}
          </p>
        )}
      </ComponentCard>

      <ComponentCard title="Time Picker States">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TimePicker
            id="required-time"
            label="Required Time"
            placeholder="This field is required"
            required={true}
          />
          
          <TimePicker
            id="disabled-time"
            label="Disabled Time Picker"
            placeholder="This is disabled"
            disable={true}
          />
        </div>
      </ComponentCard>

      <ComponentCard title="Time Picker with Error State">
        <TimePicker
          id="error-time"
          label="Time with Error"
          placeholder="This field has an error"
          error="Please select a valid time"
        />
      </ComponentCard>
    </div>
  );
}