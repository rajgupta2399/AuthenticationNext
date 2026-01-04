// components/form/TimeSlotsSubform.jsx
"use client";
import React from "react";
import { Trash2, Plus } from "lucide-react";
import Button from "@/src/components/ui/button/Button";
import Input from "@/src/components/ui/input/InputField";
import Label from "@/src/components/ui/input/Label";
import DatePicker from "@/src/components/form/date-picker";
import TimePicker from "@/src/components/form/TimePicker";
import toast from "react-hot-toast";

const TimeSlotEntry = ({ entry, index, onChange, onRemove, errors }) => {
  const handleFieldChange = (fieldName, value) => {
    const updatedEntry = { ...entry, [fieldName]: value };
    onChange(index, updatedEntry);
  };

  const entryErrors = errors?.[index] || {};

  return (
    <div className="p-6 dark:bg-[#16181d59] bg-[#F9FAFB] border border-gray-200 dark:border-gray-600 rounded-md shadow-sm space-y-4">
      <div className="flex justify-between items-center border-b dark:border-gray-600 pb-3">
        <Label>Time Slot #{index + 1}</Label>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm"
        >
          <Trash2 size={16} />
          Remove
        </button>
      </div>

      {/* Time Slot Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Field */}
        <div>
          <Label htmlFor={`date-${index}`}>Date *</Label>
          <DatePicker
            id={`date-${index}`}
            value={entry.date || ""}
            onChange={(e) => handleFieldChange("date", e.target.value)}
            placeholder="Select date"
          />
          {entryErrors.date && (
            <p className="mt-1 text-sm text-red-500">{entryErrors.date}</p>
          )}
        </div>

        {/* Start Time Field */}
        <div className="">
          <Label htmlFor={`startTime-${index}`}>Start Time *</Label>
          <TimePicker
            id={`startTime-${index}`}
            value={entry.startTime || ""}
            onChange={(e) => handleFieldChange("startTime", e.target.value)}
            placeholder="Select start time"
          />
          {entryErrors.startTime && (
            <p className="mt-1 text-sm text-red-500">{entryErrors.startTime}</p>
          )}
        </div>

        {/* End Time Field */}
        <div>
          <Label htmlFor={`endTime-${index}`}>End Time *</Label>
          <TimePicker
            id={`endTime-${index}`}
            value={entry.endTime || ""}
            onChange={(e) => handleFieldChange("endTime", e.target.value)}
            placeholder="Select end time"
          />
          {entryErrors.endTime && (
            <p className="mt-1 text-sm text-red-500">{entryErrors.endTime}</p>
          )}
        </div>

        {/* Serial Number Field */}
        <div>
          <Label htmlFor={`serialNumber-${index}`}>Serial Number *</Label>
          <Input
            id={`serialNumber-${index}`}
            value={entry.serialNumber || ""}
            onChange={(e) => handleFieldChange("serialNumber", e.target.value)}
            placeholder="Enter serial number"
          />
          {entryErrors.serialNumber && (
            <p className="mt-1 text-sm text-red-500">
              {entryErrors.serialNumber}
            </p>
          )}
        </div>
      </div>

      {/* Time Slot Display (Optional - shows the selected time range) */}
      {(entry.startTime || entry.endTime) && (
        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <strong>Time Slot:</strong> {entry.startTime || "Not set"} -{" "}
            {entry.endTime || "Not set"}
          </p>
        </div>
      )}
    </div>
  );
};

export const TimeSlots = ({ timeslotsEnteries = [], onChange, errors }) => {
  const addNewEntry = () => {
    const newEntry = {
      date: "",
      startTime: "",
      endTime: "",
      serialNumber: "",
    };

    const updatedEntries = [...timeslotsEnteries, newEntry];
    onChange(updatedEntries);
  };
  const submitEntry = () => {
    toast.success("Your Request has been submitted");
  };

  const updateEntry = (index, updatedEntry) => {
    const updatedEntries = [...timeslotsEnteries];
    updatedEntries[index] = updatedEntry;
    onChange(updatedEntries);
  };

  const removeEntry = (index) => {
    const updatedEntries = timeslotsEnteries.filter((_, i) => i !== index);
    onChange(updatedEntries);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label>Add Your Available Time Slots *</Label>
        {timeslotsEnteries.length > 0 && (
          <span className="text-sm text-gray-500">
            {timeslotsEnteries.length} slot
            {timeslotsEnteries.length !== 1 ? "s" : ""} added
          </span>
        )}
      </div>

      {/* Display main array error */}
      {errors && typeof errors === "string" && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 font-medium">{errors}</p>
        </div>
      )}

      {/* Time Slot Entries */}
      <div className="space-y-4">
        {timeslotsEnteries.map((entry, index) => (
          <TimeSlotEntry
            key={index}
            entry={entry}
            index={index}
            onChange={updateEntry}
            onRemove={removeEntry}
            errors={errors}
          />
        ))}
      </div>

      {/* Empty State */}
      {timeslotsEnteries.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg dark:bg-[#16181D] bg-[#F9FAFB]">
          <h3 className="text-lg font-medium text-gray-500 mb-1">
            No Time Slots Added
          </h3>
          <p className="text-gray-500 mb-4">
            Click below to add your first time slot.
          </p>
          <Button onClick={addNewEntry}>
            <Plus size={16} className="mr-2" />
            Add First Time Slot
          </Button>
        </div>
      ) : (
        <div className=" flex justify-between">
          <Button
            type="button"
            onClick={addNewEntry}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Add Another Time Slot
          </Button>
          <Button
            type="button"
            onClick={submitEntry}
            className="flex items-center gap-2"
          >
            Submit
          </Button>
        </div>
      )}
    </div>
  );
};
