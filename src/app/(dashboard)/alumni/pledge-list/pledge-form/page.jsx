"use client";
import React, { useEffect, useState } from "react";
import {
  MarkAnonymouseAmount,
  MarkAnonymouseName,
  SelectCurrency,
  SelectDepartment,
  SelectHallResidence,
  SelectNumberOfYears,
  SelectList,
} from "../PledgeListForm";
import Input from "@/src/components/ui/input/InputField";
import Label from "@/src/components/ui/input/Label";
import DatePicker from "@/src/components/form/date-picker";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const PledgeForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    pledgeAmount: "",
    currency: "",
    numberOfYears: "",
    date: "",
    markAnonymousName: "",
    markAnonymousAmount: "",
    hallOfResidence: "",
    department: "",
    pledgeList: "",
  });
  const [amountError, setAmountError] = useState("");

  // Add this useEffect to debug form state
  useEffect(() => {
    console.log("Current form data:", formData);
    console.log("Is form valid?", isFormValid());
  }, [formData]);

  const handleInputChange = (field, value) => {
    console.log(`Field: ${field}, Value:`, value);
    
    // Special validation for pledge amount
    if (field === "pledgeAmount") {
      const amount = parseFloat(value);
      if (amount < 0) {
        setAmountError("Pledge amount cannot be negative");
      } else {
        setAmountError("");
      }
    }
    
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (date) => {
    handleInputChange("date", date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for negative amount
    const amount = parseFloat(formData.pledgeAmount);
    if (amount < 0) {
      toast.error("Pledge amount cannot be negative");
      return;
    }

    // Check validation on submit
    if (!isFormValid()) {
      toast.error("Please fill all required fields");
      return;
    }

    console.log("Complete Pledge Form Data:", formData);
    
    // Save to localStorage
    savePledgeToStorage(formData);
    
    toast.success("Pledge Submitted Successfully");
    router.push("/alumni/pledge-list/");
  };

  // Save pledge data to localStorage
  const savePledgeToStorage = (pledgeData) => {
    try {
      // Get existing pledges from localStorage
      const existingPledges = JSON.parse(localStorage.getItem('pledgeData') || '[]');
      
      // Create new pledge with ID and timestamp
      const newPledge = {
        id: Date.now(), // Simple ID based on timestamp
        ...pledgeData,
        createdAt: new Date().toISOString()
      };
      
      // Add new pledge to the beginning of the array
      const updatedPledges = [newPledge, ...existingPledges];
      
      // Save back to localStorage
      localStorage.setItem('pledgeData', JSON.stringify(updatedPledges));
      
      console.log("Pledge saved to localStorage:", newPledge);
    } catch (error) {
      console.error("Error saving pledge to localStorage:", error);
      toast.error("Failed to save pledge data");
    }
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    const requiredFields = [
      "pledgeAmount",
      "currency",
      "numberOfYears",
      "date",
      "markAnonymousName",
      "markAnonymousAmount",
      "hallOfResidence",
      "department",
      "pledgeList",
    ];

    const isValid = requiredFields.every((field) => {
      const value = formData[field];
      const isFilled = value && value.toString().trim() !== "";
      console.log(`Field: ${field}, Value: "${value}", Filled: ${isFilled}`);
      return isFilled;
    });

    console.log("Form validation result:", isValid);
    return isValid && !amountError;
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="">
        <div className="bg-white/70 dark:bg-gray-800 rounded-md shadow-md p-6 md:p-4">
          <div className="flex justify-between">
            <div>
              <h1 className="text-md md:text-xl font-bold text-brand-500 dark:text-brand-500 mb-2">
                Pledge Form
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Please fill out the form below to make your pledge.
              </p>
            </div>
            <div className="sm:block hidden">
              <button
                onClick={() => router.back()}
                className="text-brand-600 dark:text-brand-400 hover:underline  sm:text-md text-md"
              >
                ← Back to Report
              </button>
            </div>
            <div className="sm:hidden block">
              <button
                onClick={() => router.back()}
                className="text-brand-600 dark:text-brand-400 hover:underline  sm:text-md text-md"
              >
                ← Back
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <section>
              <h2 className="text-md font-semibold text-brand-600 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* First Name */}
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    defaultValue={"Prabhkirt"}
                    required
                    disabled={true}
                  />
                </div>

                {/* Last Name */}
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    defaultValue={"Prabhkirt"}
                    required
                    disabled={true}
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                    required
                    defaultValue={9970118387}
                    disabled={true}
                  />
                </div>
              </div>
            </section>

            {/* Pledge Information Section */}
            <section>
              <h2 className="text-md font-semibold text-brand-600 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                Pledge Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Pledge List */}
                <div>
                  <Label htmlFor="pledgeList">Pledge List *</Label>
                  <SelectList
                    value={formData.pledgeList}
                    onChange={(value) => handleInputChange("pledgeList", value)}
                  />
                </div>
                {/* Pledge Amount */}
                <div>
                  <Label htmlFor="pledgeAmount">Pledge Amount *</Label>
                  <Input
                    type="number"
                    name="pledgeAmount"
                    value={formData.pledgeAmount}
                    onChange={(e) =>
                      handleInputChange("pledgeAmount", e.target.value)
                    }
                    required
                    placeholder="Enter Pledge Amount"
                    min="0"
                    step="0.01"
                  />
                  {amountError && (
                    <p className="text-red-500 text-sm mt-1">{amountError}</p>
                  )}
                </div>
                {/* Currency */}
                <div>
                  <Label htmlFor="currency">Currency *</Label>
                  <SelectCurrency
                    value={formData.currency}
                    onChange={(value) => handleInputChange("currency", value)}
                  />
                </div>
                {/* Number of Years */}
                <div>
                  <Label htmlFor="numberOfYears">No. of Years *</Label>
                  <SelectNumberOfYears
                    value={formData.numberOfYears}
                    onChange={(value) =>
                      handleInputChange("numberOfYears", value)
                    }
                  />
                </div>
                {/* Date */}
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <DatePicker
                    id="date"
                    value={formData.date}
                    onChange={handleDateChange}
                    placeholder="Select date"
                  />
                </div>
              </div>
            </section>

            {/* Privacy Settings Section */}
            <section>
              <h2 className="text-md font-semibold text-brand-600 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                Privacy Settings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Mark as Anonymous Name */}
                <div>
                  <Label htmlFor="markAnonymousName">
                    Mark as Anonymous Name *
                  </Label>
                  <MarkAnonymouseName
                    value={formData.markAnonymousName}
                    onChange={(value) =>
                      handleInputChange("markAnonymousName", value)
                    }
                  />
                </div>

                {/* Mark as Anonymous Amount */}
                <div>
                  <Label htmlFor="markAnonymousAmount">
                    Mark as Anonymous Amount *
                  </Label>
                  <MarkAnonymouseAmount
                    value={formData.markAnonymousAmount}
                    onChange={(value) =>
                      handleInputChange("markAnonymousAmount", value)
                    }
                  />
                </div>
              </div>
            </section>

            {/* Academic Information Section */}
            <section>
              <h2 className="text-md font-semibold text-brand-600 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                Academic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Hall of Residence */}
                <div>
                  <Label htmlFor="hallOfResidence">
                    Hall of residence during your graduation year *
                  </Label>
                  <SelectHallResidence
                    value={formData.hallOfResidence}
                    onChange={(value) =>
                      handleInputChange("hallOfResidence", value)
                    }
                  />
                </div>

                {/* Department */}
                <div>
                  <Label htmlFor="department">Department *</Label>
                  <SelectDepartment
                    value={formData.department}
                    onChange={(value) => handleInputChange("department", value)}
                  />
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="submit"
                className={`px-8 py-3 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transition-colors duration-200 ${
                  !isFormValid() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!isFormValid()}
              >
                Submit Pledge
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PledgeForm;