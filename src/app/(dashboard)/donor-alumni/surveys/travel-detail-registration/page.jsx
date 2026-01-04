"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  SelectNumberOfDays,
  SelectNumberOfPax,
  SelectCurrency,
  SelectPickupRequired,
  SelectPickupLocation,
  SelectDropRequired,
  SelectDropLocation,
} from "../SuverysFormComp";
import Label from "@/src/components/ui/input/Label";
import Input from "@/src/components/ui/input/InputField";
import DatePicker from "@/src/components/form/date-picker";
import TimePicker from "@/src/components/form/TimePicker";
import toast from "react-hot-toast";
import Button from "@/src/components/ui/button/Button";

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // Travel & Accommodation
    dateOfArrival: "",
    timeOfArrival: "",
    pickupRequired: "",
    pickupLocation: "",
    pickupLocationOther: "",
    dateOfDeparture: "",
    timeOfDeparture: "",
    dropOffRequired: "",
    dropLocation: "",
    dropLocationOther: "",
    numberOfDays: "",
    numberOfPax: "",
    currency: "",
    contributionAmount: "",
  });

  const [additionalPax, setAdditionalPax] = useState([]);

  // Calculate contribution amount whenever numberOfPax or numberOfDays changes
  useEffect(() => {
    if (formData.numberOfPax && formData.numberOfDays) {
      const paxCount = getPaxCount(formData.numberOfPax);
      const daysCount = getDaysCount(formData.numberOfDays);

      const calculatedAmount = paxCount * daysCount * 1000;
      handleInputChange("contributionAmount", calculatedAmount.toString());
    }
  }, [formData.numberOfPax, formData.numberOfDays]);

  // Get number of pax based on selection
  const getPaxCount = (paxValue) => {
    const paxMap = {
      "alumni-alone": 1,
      "alumni-alumni": 2,
      "alumni-spouse": 2,
      "alumni-partner-1kid": 3,
      "alumni-partner-2kids": 4,
    };
    return paxMap[paxValue] || 1;
  };

  // Get number of days based on selection
  const getDaysCount = (daysValue) => {
    const daysMap = {
      "2-nights": 3,
      "3-nights": 4,
    };
    return daysMap[daysValue] || 0;
  };

  // Handle additional pax when numberOfPax changes
  useEffect(() => {
    if (formData.numberOfPax) {
      const paxCount = getPaxCount(formData.numberOfPax);
      const additionalCount = paxCount - 1; // Subtract 1 for the main alumni

      if (additionalCount > 0) {
        // Add new additional pax forms if needed
        const newAdditionalPax = Array.from(
          { length: additionalCount },
          (_, index) =>
            additionalPax[index] || {
              tshirtSizePartner: "",
              dateOfArrival: "",
              timeOfArrival: "",
              dateOfDeparture: "",
              timeOfDeparture: "",
              pickupRequired: "",
              pickupLocation: "",
              pickupLocationOther: "",
              dropOffRequired: "",
              dropLocation: "",
              dropLocationOther: "",
            }
        );
        setAdditionalPax(newAdditionalPax);
      } else {
        setAdditionalPax([]);
      }
    }
  }, [formData.numberOfPax]);

  const handleInputChange = (field, value) => {
    console.log(`Field: ${field}, Value:`, value);
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (field, date) => {
    handleInputChange(field, date);
  };

  const handleTimeChange = (field, time) => {
    console.log(`Time field ${field} changed to:`, time);
    handleInputChange(field, time);
  };

  const handleAdditionalPaxChange = (index, updatedPax) => {
    const updatedAdditionalPax = [...additionalPax];
    updatedAdditionalPax[index] = updatedPax;
    setAdditionalPax(updatedAdditionalPax);
  };

  const handleRemoveAdditionalPax = (index) => {
    const updatedAdditionalPax = additionalPax.filter((_, i) => i !== index);
    setAdditionalPax(updatedAdditionalPax);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Travel & Accommodation Form Data:", formData);
    console.log("Additional Pax Data:", additionalPax);
    toast.success("Travel Details Submitted Successfully");
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    const requiredFields = [
      "dateOfArrival",
      "dateOfDeparture",
      "numberOfDays",
      "numberOfPax",
      "currency",
      "contributionAmount",
    ];

    const mainFormValid = requiredFields.every(
      (field) => formData[field] && formData[field].toString().trim() !== ""
    );

    // Check if all additional pax forms are filled
    const additionalPaxValid = additionalPax.every(
      (pax) => pax.dateOfArrival && pax.dateOfDeparture
    );

    return mainFormValid && additionalPaxValid;
  };

  return (
    <div className="w-full h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold text-brand-500">
              Travel Detail Registration
            </h1>
          </div>
        </div>

        <div className="sm:flex flex-row-reverse gap-5 hidden">
          <button
            onClick={() => router.back()}
            className="text-brand-600 dark:text-brand-400 hover:underline sm:text-md text-md"
          >
            ← Back to Survey
          </button>
        </div>
        <div className="sm:hidden flex">
          <button
            onClick={() => router.back()}
            className="text-brand-600 dark:text-brand-400 hover:underline sm:text-md text-md"
          >
            ← Back
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 md:px-4">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Travel & Accommodation Section */}
          <section>
            <h2 className="text-md font-bold text-brand-500 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              Travel & Accommodation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Date of Arrival */}
              <div>
                <Label htmlFor="dateOfArrival">Date of Arrival *</Label>
                <DatePicker
                  id="dateOfArrival"
                  value={formData.dateOfArrival}
                  onChange={(date) => handleDateChange("dateOfArrival", date)}
                  placeholder="Select arrival date"
                  minDate={new Date()}
                />
              </div>
              {/* Time of Arrival */}
              <div>
                <Label htmlFor="timeOfArrival">Time of Arrival</Label>
                <TimePicker
                  value={formData.timeOfArrival}
                  onChange={(value) => handleTimeChange("timeOfArrival", value)}
                  placeholder="Select arrival time"
                />
              </div>
              {/* Pickup Required */}
              <div>
                <Label htmlFor="pickupRequired">Pickup required</Label>
                <SelectPickupRequired
                  value={formData.pickupRequired}
                  onChange={(value) =>
                    handleInputChange("pickupRequired", value)
                  }
                />
              </div>
              {/* Pickup Location (conditional) */}
              {formData.pickupRequired === "yes" && (
                <div>
                  <Label htmlFor="pickupLocation">Pickup location</Label>
                  <SelectPickupLocation
                    value={formData.pickupLocation}
                    onChange={(value) =>
                      handleInputChange("pickupLocation", value)
                    }
                  />

                  {/* Other pickup location input */}
                  {formData.pickupLocation === "others" && (
                    <div className="mt-3">
                      <Label htmlFor="pickupLocationOther">
                        Specify pickup location *
                      </Label>
                      <Input
                        type="text"
                        name="pickupLocationOther"
                        value={formData.pickupLocationOther}
                        onChange={(e) =>
                          handleInputChange(
                            "pickupLocationOther",
                            e.target.value
                          )
                        }
                        required
                        placeholder="Enter pickup location"
                      />
                    </div>
                  )}
                </div>
              )}
              {/* Date of Departure */}
              <div>
                <Label htmlFor="dateOfDeparture">Date of Departure *</Label>
                <DatePicker
                  id="dateOfDeparture"
                  value={formData.dateOfDeparture}
                  onChange={(date) => handleDateChange("dateOfDeparture", date)}
                  placeholder="Select departure date"
                  minDate={new Date()}
                />
              </div>
              {/* Time of Departure */}
              <div>
                <Label htmlFor="timeOfDeparture">Time of departure</Label>
                <TimePicker
                  value={formData.timeOfDeparture}
                  onChange={(value) =>
                    handleTimeChange("timeOfDeparture", value)
                  }
                  placeholder="Select departure time"
                />
              </div>
              {/* Drop off required */}
              <div>
                <Label htmlFor="dropOffRequired">Drop off required</Label>
                <SelectDropRequired
                  value={formData.dropOffRequired}
                  onChange={(value) =>
                    handleInputChange("dropOffRequired", value)
                  }
                />
              </div>
              {/* Drop location (conditional) */}
              {formData.dropOffRequired === "yes" && (
                <div>
                  <Label htmlFor="dropLocation">Drop location</Label>
                  <SelectDropLocation
                    value={formData.dropLocation}
                    onChange={(value) =>
                      handleInputChange("dropLocation", value)
                    }
                  />

                  {/* Other drop location input */}
                  {formData.dropLocation === "others" && (
                    <div className="mt-3">
                      <Label htmlFor="dropLocationOther">
                        Specify drop location *
                      </Label>
                      <Input
                        type="text"
                        name="dropLocationOther"
                        value={formData.dropLocationOther}
                        onChange={(e) =>
                          handleInputChange("dropLocationOther", e.target.value)
                        }
                        required
                        placeholder="Enter drop location"
                      />
                    </div>
                  )}
                </div>
              )}
              {/* Number of Days */}
              <div>
                <Label htmlFor="numberOfDays">No of Days *</Label>
                <SelectNumberOfDays
                  value={formData.numberOfDays}
                  onChange={(value) => handleInputChange("numberOfDays", value)}
                />
              </div>
              {/* Number of Pax */}
              <div>
                <Label htmlFor="numberOfPax">Number of Pax *</Label>
                <SelectNumberOfPax
                  value={formData.numberOfPax}
                  onChange={(value) => handleInputChange("numberOfPax", value)}
                />
              </div>
              {/* Currency */}
              <div>
                <Label htmlFor="currency">Currency *</Label>
                <SelectCurrency
                  value={formData.currency}
                  onChange={(value) => handleInputChange("currency", value)}
                />
              </div>
              {/* Contribution Amount */}
              <div>
                <Label htmlFor="contributionAmount">
                  Contribution Amount *
                </Label>
                <Input
                  type="text"
                  defaultValue={formData.contributionAmount}
                  value={formData.contributionAmount}
                  disabled
                  placeholder={"Total Amount will be calculated"}
                />
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="submit"
              disabled={!isFormValid()}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Travel Details
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
