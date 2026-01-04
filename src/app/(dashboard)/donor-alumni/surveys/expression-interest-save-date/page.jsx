"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AreYouPlanningSelectInput,
  SelectCountry,
  PreRegistrationFeeReq,
  SelectGender,
} from "../SuverysFormComp";
import Label from "@/src/components/ui/input/Label";
import Input from "@/src/components/ui/input/InputField";
import DatePicker from "@/src/components/form/date-picker";
import toast from "react-hot-toast";
import Button from "@/src/components/ui/button/Button";

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // Basic Information
    name: "",
    email: "",
    whatsappNumber: "",
    planningToAttend: "",
    amount: "",
    preRegistration: "",

    // Dates
    dateOfArrival: "",
    dateOfDeparture: "",

    // Address
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",

    // Personal
    gender: "",
  });

  const handleInputChange = (field, value) => {
    // For amount field, prevent negative values
    if (field === "amount") {
      if (value === "" || (parseFloat(value) >= 0 && !isNaN(value))) {
        setFormData((prev) => ({
          ...prev,
          [field]: value,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleDateChange = (field, date) => {
    handleInputChange(field, date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    toast.success("Form Submitted Successfully");
    // Add your form submission logic here
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    const requiredFields = [
      "name",
      "email",
      "whatsappNumber",
      "planningToAttend",
      "amount",
      "preRegistration",
      "dateOfArrival",
      "dateOfDeparture",
      "addressLine1",
      "city",
      "state",
      "postalCode",
      "country",
      "gender",
    ];

    return requiredFields.every(
      (field) => formData[field] && formData[field].toString().trim() !== ""
    );
  };

  return (
    <div className="w-full h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold text-brand-500">
              Response-Expression Interest Save Date
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
          {/* Basic Information Section */}
          <section>
            <h2 className="text-md font-bold text-brand-500 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

              {/* whatsapp Number */}
              <div>
                <Label htmlFor="whatsappNumber">Whatsapp Number *</Label>
                <Input
                  type="tel"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={(e) =>
                    handleInputChange("whatsappNumber", e.target.value)
                  }
                  required
                  placeholder="Enter your whatsapp number"
                />
              </div>

              {/* Are you planning to attend */}
              <div>
                <Label htmlFor="planningToAttend">
                  Are you planning to attend the reunion? *
                </Label>
                <AreYouPlanningSelectInput
                  value={formData.planningToAttend}
                  onChange={(value) =>
                    handleInputChange("planningToAttend", value)
                  }
                />
              </div>

              {/* Amount */}
              <div>
                <Label htmlFor="amount">Amount *</Label>
                <Input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  onKeyDown={(e) => {
                    // Prevent negative sign, 'e', and decimal point
                    if (["-", "e", "E", "."].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  min="0"
                  step="1"
                  required
                  placeholder="Enter amount"
                />
              </div>

              {/* Pre-registration */}
              <div>
                <Label htmlFor="preRegistration">Pre-registration *</Label>
                <PreRegistrationFeeReq
                  value={formData.preRegistration}
                  onChange={(value) =>
                    handleInputChange("preRegistration", value)
                  }
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
            </div>
          </section>

          {/* Dates Section */}
          <section>
            <h2 className="text-md font-bold text-brand-500 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              Event Dates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>
          </section>

          {/* Address Section */}
          <section>
            <h2 className="text-md font-bold text-brand-500 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              Address Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Address Line 1 */}
              <div className="md:col-span-1">
                <Label htmlFor="addressLine1">Address Line 1 *</Label>
                <Input
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={(e) =>
                    handleInputChange("addressLine1", e.target.value)
                  }
                  required
                  placeholder="Enter street address"
                />
              </div>

              {/* Address Line 2 */}
              <div className="md:col-span-1">
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={(e) =>
                    handleInputChange("addressLine2", e.target.value)
                  }
                  placeholder="Enter apartment, suite, unit, etc."
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

              {/* State */}
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  required
                  placeholder="Enter your state"
                />
              </div>

              {/* Postal Code */}
              <div>
                <Label htmlFor="postalCode">Postal Code *</Label>
                <Input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={(e) =>
                    handleInputChange("postalCode", e.target.value)
                  }
                  required
                  placeholder="Enter postal code"
                />
              </div>
              {/* City */}
              <div>
                <Label htmlFor="city">City/District *</Label>
                <Input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  required
                  placeholder="Enter your city"
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

export default Page;
