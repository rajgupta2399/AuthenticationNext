"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  AreYouPlanningSelectInput,
  SelectCountry,
  SelectCurrency,
  SelectDegree,
  SelectDropLocation,
  SelectDropRequired,
  SelectFoodPreference,
  SelectGender,
  SelectNumberOfDays,
  SelectNumberOfPax,
  SelectPickupLocation,
  SelectPickupRequired,
  SelectProgram,
  SelectTshirtSizeAlumni,
  SelectTshirtSizePartner,
  PreRegistrationFeeReq,
} from "../SuverysFormComp";
import Label from "@/src/components/ui/input/Label";
import Input from "@/src/components/ui/input/InputField";
import DatePicker from "@/src/components/form/date-picker";
import TimePicker from "@/src/components/form/TimePicker";
import toast from "react-hot-toast";
import Button from "@/src/components/ui/button/Button";
import PledgeTimePicker from "../PledgeTimePicker";

// Additional Pax Subform Component
const AdditionalPaxForm = ({ pax, index, onChange, onRemove }) => {
  const handleFieldChange = (field, value) => {
    const updatedPax = { ...pax, [field]: value };
    onChange(index, updatedPax);
  };

  const handleDateChange = (field, date) => {
    handleFieldChange(field, date);
  };

  const handleTimeChange = (field, time) => {
    handleFieldChange(field, time);
  };

  return (
    <div className="p-6 dark:bg-[#16181d59] bg-[#F9FAFB] border border-gray-200 dark:border-gray-600 rounded-md shadow-sm space-y-4">
      <div className="flex justify-between items-center border-b dark:border-gray-600 pb-3">
        <Label>Additional Person #{index + 1}</Label>
        {/* <button
          type="button"
          onClick={() => onRemove(index)}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm"
        >
          <Trash2 size={16} />
          Remove
        </button> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* T-Shirt Size Partner */}
        <div>
          <Label htmlFor={`tshirtSizePartner-${index}`}>
            T Shirt Size (Partner) *
          </Label>
          <SelectTshirtSizePartner
            value={pax.tshirtSizePartner || ""}
            onChange={(value) => handleFieldChange("tshirtSizePartner", value)}
          />
        </div>

        {/* Date of Arrival */}
        <div>
          <Label htmlFor={`dateOfArrival-${index}`}>Date of Arrival *</Label>
          <DatePicker
            id={`dateOfArrival-${index}`}
            value={pax.dateOfArrival || ""}
            onChange={(date) => handleDateChange("dateOfArrival", date)}
            placeholder="Select arrival date"
            minDate={new Date()}
          />
        </div>

        {/* Time of Arrival */}
        <div>
          <Label htmlFor={`timeOfArrival-${index}`}>Time of Arrival</Label>
          <TimePicker
            value={pax.timeOfArrival || ""}
            onChange={(value) => handleTimeChange("timeOfArrival", value)}
            placeholder="Select arrival time"
          />
        </div>

        {/* Date of Departure */}
        <div>
          <Label htmlFor={`dateOfDeparture-${index}`}>
            Date of Departure *
          </Label>
          <DatePicker
            id={`dateOfDeparture-${index}`}
            value={pax.dateOfDeparture || ""}
            onChange={(date) => handleDateChange("dateOfDeparture", date)}
            placeholder="Select departure date"
            minDate={new Date()}
          />
        </div>

        {/* Time of Departure */}
        <div>
          <PledgeTimePicker
            label="Time of departure"
            value={pax.timeOfDeparture || ""}
            onChange={(value) => handleTimeChange("timeOfDeparture", value)}
            placeholder="Select departure time"
            minuteIncrement={30} // 30-minute intervals
            minTime="06:00" // Start at 6 AM
            maxTime="22:00" // End at 10 PM
          />
        </div>

        {/* Pickup Required */}
        <div>
          <Label htmlFor={`pickupRequired-${index}`}>Pickup Required</Label>
          <SelectPickupRequired
            value={pax.pickupRequired || ""}
            onChange={(value) => handleFieldChange("pickupRequired", value)}
          />
        </div>

        {/* Pickup Location (conditional) */}
        {pax.pickupRequired === "yes" && (
          <div>
            <Label htmlFor={`pickupLocation-${index}`}>Pickup Location</Label>
            <SelectPickupLocation
              value={pax.pickupLocation || ""}
              onChange={(value) => handleFieldChange("pickupLocation", value)}
            />

            {/* Other pickup location input */}
            {pax.pickupLocation === "others" && (
              <div className="mt-3">
                <Label htmlFor={`pickupLocationOther-${index}`}>
                  Specify Pickup Location *
                </Label>
                <Input
                  type="text"
                  name={`pickupLocationOther-${index}`}
                  value={pax.pickupLocationOther || ""}
                  onChange={(e) =>
                    handleFieldChange("pickupLocationOther", e.target.value)
                  }
                  required
                  placeholder="Enter pickup location"
                />
              </div>
            )}
          </div>
        )}

        {/* Drop Off Required */}
        <div>
          <Label htmlFor={`dropOffRequired-${index}`}>Drop Off Required</Label>
          <SelectDropRequired
            value={pax.dropOffRequired || ""}
            onChange={(value) => handleFieldChange("dropOffRequired", value)}
          />
        </div>

        {/* Drop Location (conditional) */}
        {pax.dropOffRequired === "yes" && (
          <div>
            <Label htmlFor={`dropLocation-${index}`}>Drop Location</Label>
            <SelectDropLocation
              value={pax.dropLocation || ""}
              onChange={(value) => handleFieldChange("dropLocation", value)}
            />

            {/* Other drop location input */}
            {pax.dropLocation === "others" && (
              <div className="mt-3">
                <Label htmlFor={`dropLocationOther-${index}`}>
                  Specify Drop Location *
                </Label>
                <Input
                  type="text"
                  name={`dropLocationOther-${index}`}
                  value={pax.dropLocationOther || ""}
                  onChange={(e) =>
                    handleFieldChange("dropLocationOther", e.target.value)
                  }
                  required
                  placeholder="Enter drop location"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // Personal Information
    attendingReunion: "",
    name: "",
    email: "",
    gender: "",
    rollNumber: "",
    currentDesignation: "",
    currentOrganization: "",
    whatsappNumber: "",
    address: "",
    city: "",
    country: "",
    tshirtSizeAlumni: "",

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

    // Academic & Preferences
    degree: "",
    program: "",
    yearOfGraduation: "",
    hallOfResidence: "",
    foodPreference: "",
    dietaryRestriction: "",
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
    console.log("Complete Form Data:", formData);
    console.log("Additional Pax Data:", additionalPax);
    toast.success("Form Submitted Successfully");
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    const requiredFields = [
      "attendingReunion",
      "name",
      "email",
      "gender",
      "currentDesignation",
      "currentOrganization",
      "whatsappNumber",
      "address",
      "city",
      "country",
      "tshirtSizeAlumni",
      "dateOfArrival",
      "dateOfDeparture",
      "numberOfDays",
      "numberOfPax",
      "currency",
      "contributionAmount",
      "hallOfResidence",
    ];

    const mainFormValid = requiredFields.every(
      (field) => formData[field] && formData[field].toString().trim() !== ""
    );

    // Check if all additional pax forms are filled
    const additionalPaxValid = additionalPax.every(
      (pax) => pax.tshirtSizePartner && pax.dateOfArrival && pax.dateOfDeparture
    );

    return mainFormValid && additionalPaxValid;
  };

  // In your component
  useEffect(() => {
    if (formData.days && formData.pax) {
      const calculatedAmount = calculateAmount(formData.days, formData.pax);
      handleInputChange("contributionAmount", calculatedAmount);
    }
  }, [formData.days, formData.pax]);

  // Your calculation function
  const calculateAmount = (days, pax) => {
    // Your calculation logic here
    return days * pax * 1000; // Example calculation
  };
  return (
    <div className="w-full h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className=" flex justify-between">
            <h1 className="text-xl font-bold text-brand-500">
              Registration Form Report
            </h1>
          </div>
        </div>

        <div className="sm:flex flex-row-reverse gap-5 hidden">
          <button
            onClick={() => router.back()}
            className="text-brand-600 dark:text-brand-400 hover:underline  sm:text-md text-md"
          >
            ← Back to Survey
          </button>
        </div>
        <div className="sm:hidden flex ">
          <button
            onClick={() => router.back()}
            className="text-brand-600 dark:text-brand-400 hover:underline  sm:text-md text-md"
          >
            ← Back
          </button>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 md:px-4">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information Section */}
          <section>
            <h2 className="text-md font-bold text-brand-500 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Are you planning to attend */}
              <div>
                <Label htmlFor="attendingReunion">
                  Are you planning to attend the reunion *
                </Label>
                <AreYouPlanningSelectInput
                  value={formData.attendingReunion}
                  onChange={(value) =>
                    handleInputChange("attendingReunion", value)
                  }
                />
              </div>

              {/* Name */}
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email ID *</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </div>

              {/* Gender */}
              <div>
                <Label htmlFor="gender">Gender *</Label>
                <SelectGender
                  value={formData.gender}
                  onChange={(value) => handleInputChange("gender", value)}
                />
              </div>

              {/* Roll Number */}
              <div>
                <Label htmlFor="rollNumber">Roll Number</Label>
                <Input
                  type="text"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={(e) =>
                    handleInputChange("rollNumber", e.target.value)
                  }
                  placeholder="Enter your roll number"
                />
              </div>

              {/* Current Designation */}
              <div>
                <Label htmlFor="currentDesignation">
                  Current Designation *
                </Label>
                <Input
                  type="text"
                  name="currentDesignation"
                  value={formData.currentDesignation}
                  onChange={(e) =>
                    handleInputChange("currentDesignation", e.target.value)
                  }
                  required
                  placeholder="Enter your designation"
                />
              </div>

              {/* Current Organization */}
              <div>
                <Label htmlFor="currentOrganization">
                  Current Organization *
                </Label>
                <Input
                  type="text"
                  name="currentOrganization"
                  value={formData.currentOrganization}
                  onChange={(e) =>
                    handleInputChange("currentOrganization", e.target.value)
                  }
                  required
                  placeholder="Enter your organization"
                />
              </div>

              {/* WhatsApp Number */}
              <div>
                <Label htmlFor="whatsappNumber">WhatsApp Number *</Label>
                <Input
                  type="tel"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={(e) =>
                    handleInputChange("whatsappNumber", e.target.value)
                  }
                  required
                  placeholder="Enter your WhatsApp number"
                />
              </div>

              {/* City */}
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  required
                  placeholder="Enter your city"
                />
              </div>

              {/* Address */}
              <div className="md:col-span-3">
                <Label htmlFor="address">Address *</Label>
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  required
                  placeholder="Enter your complete address"
                />
              </div>

              {/* Country */}
              <div>
                <Label htmlFor="country">Country *</Label>
                <SelectCountry
                  value={formData.country}
                  onChange={(value) => handleInputChange("country", value)}
                />
              </div>

              {/* T-Shirt Size Alumni */}
              <div>
                <Label htmlFor="tshirtSizeAlumni">
                  T Shirt Size (Alumni) *
                </Label>
                <SelectTshirtSizeAlumni
                  value={formData.tshirtSizeAlumni}
                  onChange={(value) =>
                    handleInputChange("tshirtSizeAlumni", value)
                  }
                />
              </div>
            </div>
          </section>

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

          {/* Additional Pax Section */}
          {additionalPax.length > 0 && (
            <section>
              <h2 className="text-md font-bold text-brand-500 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                Additional Person Details
              </h2>
              <div className="space-y-4">
                {additionalPax.map((pax, index) => (
                  <AdditionalPaxForm
                    key={index}
                    pax={pax}
                    index={index}
                    onChange={handleAdditionalPaxChange}
                    onRemove={handleRemoveAdditionalPax}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Academic & Preferences Section */}
          <section>
            <h2 className="text-md font-bold text-brand-500 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              Academic Information & Preferences
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Degree */}
              <div>
                <Label htmlFor="degree">Degree</Label>
                <SelectDegree
                  value={formData.degree}
                  onChange={(value) => handleInputChange("degree", value)}
                />
              </div>

              {/* Program */}
              <div>
                <Label htmlFor="program">Program</Label>
                <SelectProgram
                  value={formData.program}
                  onChange={(value) => handleInputChange("program", value)}
                />
              </div>

              {/* Year of Graduation */}
              <div>
                <Label htmlFor="yearOfGraduation">Year of Graduation</Label>
                <Input
                  type="number"
                  name="yearOfGraduation"
                  value={formData.yearOfGraduation}
                  onChange={(e) =>
                    handleInputChange("yearOfGraduation", e.target.value)
                  }
                  placeholder="Enter graduation year"
                  min="1950"
                  max={new Date().getFullYear()}
                />
              </div>

              {/* Hall of Residence */}
              <div>
                <Label htmlFor="hallOfResidence">
                  Hall of residence at the time of Graduation *
                </Label>
                <Input
                  type="text"
                  name="hallOfResidence"
                  value={formData.hallOfResidence}
                  onChange={(e) =>
                    handleInputChange("hallOfResidence", e.target.value)
                  }
                  required
                  placeholder="Enter hall name"
                />
              </div>

              {/* Food Preference */}
              <div>
                <Label htmlFor="foodPreference">Food Preference</Label>
                <SelectFoodPreference
                  value={formData.foodPreference}
                  onChange={(value) =>
                    handleInputChange("foodPreference", value)
                  }
                />
              </div>

              {/* Dietary Restriction */}
              <div className="">
                <Label htmlFor="dietaryRestriction">
                  Any Dietary restriction
                </Label>
                <Input
                  type="text"
                  name="dietaryRestriction"
                  value={formData.dietaryRestriction}
                  onChange={(e) =>
                    handleInputChange("dietaryRestriction", e.target.value)
                  }
                  placeholder="Please specify any dietary restrictions..."
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
              Submit Registration
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
