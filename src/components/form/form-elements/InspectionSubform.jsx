// components/form/InspectionSubform.jsx
"use client";
import React from "react";
import { Trash2, Plus, Upload, X } from "lucide-react";
import Button from "@/src/components/ui/button/Button";
import Input from "@/src/components/ui/input/InputField";
import Label from "@/src/components/ui/input/Label";

const InspectionEntry = ({ entry, index, onChange, onRemove, errors }) => {
  const handleFieldChange = (fieldName, value) => {
    const updatedEntry = { ...entry, [fieldName]: value };
    onChange(index, updatedEntry);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const currentImages = entry.inspectionImages || [];

    const newImages = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
      file: file,
    }));

    const updatedImages = [...currentImages, ...newImages].slice(0, 5); // Limit to 5 images
    handleFieldChange("inspectionImages", updatedImages);
  };

  const removeImage = (imageIndex) => {
    const updatedImages = entry.inspectionImages.filter(
      (_, i) => i !== imageIndex
    );
    handleFieldChange("inspectionImages", updatedImages);
  };

  const entryErrors = errors?.[index] || {};

  return (
    <div className="p-6 dark:bg-[#16181d59] bg-[#F9FAFB] border border-gray-200 rounded-md shadow-sm space-y-4">
      <div className="flex justify-between items-center border-b pb-3">
        <Label htmlFor="inspection"> Inspection Entry #{index + 1}</Label>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Main Inspection Fields */}
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="grid grid-cols-8 gap-4 min-w-[1200px] mb-5">
          <div>
            <Label htmlFor={`scanner-${index}`}>Scanner *</Label>
            <Input
              id={`scanner-${index}`}
              value={entry.scanner || ""}
              onChange={(e) => handleFieldChange("scanner", e.target.value)}
              placeholder="Enter scanner details"
            />
            {entryErrors.scanner && (
              <p className="mt-1 text-sm text-red-500">{entryErrors.scanner}</p>
            )}
          </div>

          <div>
            <Label htmlFor={`productSerialNo-${index}`}>Product S. No. *</Label>
            <Input
              id={`productSerialNo-${index}`}
              value={entry.productSerialNo || ""}
              onChange={(e) =>
                handleFieldChange("productSerialNo", e.target.value)
              }
              placeholder="Enter product serial number"
            />
            {entryErrors.productSerialNo && (
              <p className="mt-1 text-sm text-red-500">
                {entryErrors.productSerialNo}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor={`productGroup-${index}`}>Product Group *</Label>
            <Input
              id={`productGroup-${index}`}
              value={entry.productGroup || ""}
              onChange={(e) =>
                handleFieldChange("productGroup", e.target.value)
              }
              placeholder="Enter product group"
            />
            {entryErrors.productGroup && (
              <p className="mt-1 text-sm text-red-500">
                {entryErrors.productGroup}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor={`productName-${index}`}>Product Name *</Label>
            <Input
              id={`productName-${index}`}
              value={entry.productName || ""}
              onChange={(e) => handleFieldChange("productName", e.target.value)}
              placeholder="Enter product name"
            />
            {entryErrors.productName && (
              <p className="mt-1 text-sm text-red-500">
                {entryErrors.productName}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor={`actionTaken-${index}`}>Action Taken *</Label>
            <Input
              id={`actionTaken-${index}`}
              value={entry.actionTaken || ""}
              onChange={(e) => handleFieldChange("actionTaken", e.target.value)}
              placeholder="Enter action taken"
            />
            {entryErrors.actionTaken && (
              <p className="mt-1 text-sm text-red-500">
                {entryErrors.actionTaken}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor={`packingCondition-${index}`}>
              Packing Condition *
            </Label>
            <Input
              id={`packingCondition-${index}`}
              value={entry.packingCondition || ""}
              onChange={(e) =>
                handleFieldChange("packingCondition", e.target.value)
              }
              placeholder="Enter packing condition"
            />
            {entryErrors.packingCondition && (
              <p className="mt-1 text-sm text-red-500">
                {entryErrors.packingCondition}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor={`physicalCondition-${index}`}>
              Physical Condition *
            </Label>
            <Input
              id={`physicalCondition-${index}`}
              value={entry.physicalCondition || ""}
              onChange={(e) =>
                handleFieldChange("physicalCondition", e.target.value)
              }
              placeholder="Enter physical condition"
            />
            {entryErrors.physicalCondition && (
              <p className="mt-1 text-sm text-red-500">
                {entryErrors.physicalCondition}
              </p>
            )}
          </div>

          <div className="w-56">
            <Label>Inspection Images (Max 5)</Label>
            <div className="mt-2">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id={`inspection-images-${index}`}
              />
              <label
                htmlFor={`inspection-images-${index}`}
                className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-brand-500 transition-colors"
              >
                <Upload size={16} className=" text-brand-400" />
                <Label htmlFor="uploadInspectionImages">
                  Upload Inspection Images
                </Label>
              </label>
            </div>

            {/* Image Previews */}
            <div className="mt-3  w-full flex flex-wrap gap-3">
              {entry.inspectionImages?.map((image, imgIndex) => (
                <div key={imgIndex} className="relative group">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-20 h-20 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(imgIndex)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                  <p className="text-xs mt-1 truncate w-20 text-[#444] dark:text-[#fffefe]">
                    {image.name}
                  </p>
                </div>
              ))}
            </div>

            {entryErrors.inspectionImages && (
              <p className="mt-1 text-sm text-red-500">
                {entryErrors.inspectionImages}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Image Upload Section */}
    </div>
  );
};

export const InspectionSubform = ({
  inspectionEntries = [],
  onChange,
  errors,
}) => {
  const addNewEntry = () => {
    const newEntry = {
      scanner: "",
      productSerialNo: "",
      productGroup: "",
      productName: "",
      actionTaken: "",
      packingCondition: "",
      physicalCondition: "",
      inspectionImages: [],
    };

    const updatedEntries = [...inspectionEntries, newEntry];
    onChange(updatedEntries);
  };

  const updateEntry = (index, updatedEntry) => {
    const updatedEntries = [...inspectionEntries];
    updatedEntries[index] = updatedEntry;
    onChange(updatedEntries);
  };

  const removeEntry = (index) => {
    const updatedEntries = inspectionEntries.filter((_, i) => i !== index);
    onChange(updatedEntries);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label>Inspection Details SubForm *</Label>
      </div>

      {/* Display main array error */}
      {errors && typeof errors === "string" && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 font-medium">{errors}</p>
        </div>
      )}

      {/* Inspection Entries */}
      <div className="space-y-4">
        {inspectionEntries.map((entry, index) => (
          <InspectionEntry
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
      {inspectionEntries.length === 0 ? (
        <div className="text-center py-5 border border-dashed border-brand-300 rounded-lg dark:bg-[#16181D] bg-[#F9FAFB]">
          <h3 className="text-lg font-medium text-gray-500 mb-1">
            No Inspection Entries
          </h3>
          <p className="text-gray-500 mb-2">
            Click "Add New Entry" to start adding inspection details.
          </p>
          <Button onClick={addNewEntry}>
            <Plus size={16} className="mr-2" />
            Add First Entry
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          onClick={addNewEntry}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Add New Entry
        </Button>
      )}
    </div>
  );
};
