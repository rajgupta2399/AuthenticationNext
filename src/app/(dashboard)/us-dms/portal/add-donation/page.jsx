"use client";
import React, { useEffect, useState } from "react";
import {
  MarkAnonymouseName,
  SelectList,
  DonationSelectPrefix,
  SelectPurpose,
  SelectDmsStatus,
  SelectSubCategory,
} from "../PortalComponents";
import Input from "@/src/components/ui/input/InputField";
import Label from "@/src/components/ui/input/Label";
import DatePicker from "@/src/components/form/date-picker";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import TextArea from "@/src/components/ui/input/TextArea";

const page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    accountType: "",
    salutation: "",
    email: "",
    financialYear: "",
    category: "",
    subCategory: "",
    transactionId: "",
    chequeDate: "",
    donationDate: "",
    purpose: "",
    dmsStatus: "",
    description: "",
    markAnonymous: "",
  });

  // Add this useEffect to debug form state
  useEffect(() => {
    console.log("Current form data:", formData);
    console.log("Is form valid?", isFormValid());
  }, [formData]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check validation on submit
    if (!isFormValid()) {
      toast.error("Please fill all required fields");
      return;
    }

    console.log("Complete Donation Form Data:", formData);

    // Save to localStorage
    saveDonationToStorage(formData);

    toast.success("Donation Submitted Successfully");
    router.push("/us-dms/portal/approved-donation");
  };

  // Save donation data to localStorage
  const saveDonationToStorage = (donationData) => {
    try {
      // Get existing donations from localStorage
      const existingDonations = JSON.parse(
        localStorage.getItem("donationData") || "[]"
      );

      // Create new donation with ID and timestamp
      const newDonation = {
        id: Date.now(), // Simple ID based on timestamp
        ...donationData,
        createdAt: new Date().toISOString(),
      };

      // Add new donation to the beginning of the array
      const updatedDonations = [newDonation, ...existingDonations];

      // Save back to localStorage
      localStorage.setItem("donationData", JSON.stringify(updatedDonations));

      console.log("Donation saved to localStorage:", newDonation);
    } catch (error) {
      console.error("Error saving donation to localStorage:", error);
      toast.error("Failed to save donation data");
    }
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    const requiredFields = [
      "accountType",
      "salutation",
      "email",
      "financialYear",
      "category",
      "subCategory",
      "donationDate",
      "purpose",
      "dmsStatus",
      "markAnonymous",
    ];

    const isValid = requiredFields.every((field) => {
      const value = formData[field];
      const isFilled = value && value.toString().trim() !== "";
      console.log(`Field: ${field}, Value: "${value}", Filled: ${isFilled}`);
      return isFilled;
    });

    console.log("Form validation result:", isValid);
    return isValid;
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="">
        <div className="bg-white/70 dark:bg-gray-800 rounded-md shadow-md p-6 md:p-4">
          <div className="flex justify-between">
            <div>
              <h1 className="text-md md:text-xl font-bold text-brand-500 dark:text-brand-500 mb-2">
                Donation Form
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Please fill out the form below to make your donation.
              </p>
            </div>
            <div className="sm:block hidden">
              <button
                onClick={() => router.back()}
                className="text-brand-600 dark:text-brand-400 hover:underline sm:text-md text-md"
              >
                ← Back to Report
              </button>
            </div>
            <div className="sm:hidden block">
              <button
                onClick={() => router.back()}
                className="text-brand-600 dark:text-brand-400 hover:underline sm:text-md text-md"
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
                {/* Salutation */}
                <div>
                  <Label htmlFor="salutation">Salutation *</Label>
                  <DonationSelectPrefix
                    value={formData.salutation}
                    onChange={(value) => handleInputChange("salutation", value)}
                  />
                </div>

                {/* Donor Name - First Name */}
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    required
                    placeholder="Enter First Name"
                  />
                </div>

                {/* Donor Name - Last Name */}
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    required
                    placeholder="Enter Last Name"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    placeholder="Enter Email Address"
                  />
                </div>
                {/* Account Type */}
                <div>
                  <Label htmlFor="accountType">Account Type *</Label>
                  <Input
                    type="text"
                    name="accountType"
                    value={formData.accountType}
                    onChange={(e) =>
                      handleInputChange("accountType", e.target.value)
                    }
                    required
                    placeholder="Enter Account Type"
                  />
                </div>
              </div>
            </section>

            {/* Donation Information Section */}
            <section>
              <h2 className="text-md font-semibold text-brand-600 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                Donation Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Financial Year */}
                <div>
                  <Label htmlFor="financialYear">Financial Year *</Label>
                  <Input
                    type="text"
                    name="financialYear"
                    value={formData.financialYear}
                    onChange={(e) =>
                      handleInputChange("financialYear", e.target.value)
                    }
                    placeholder="Enter Financial Year"
                    // min="2000"
                    // max="2100"
                    defaultValue={"2025-26"}
                    disabled={true}
                  />
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <SelectList
                    value={formData.category}
                    onChange={(value) => handleInputChange("category", value)}
                  />
                </div>

                {/* Sub Category */}
                <div>
                  <Label htmlFor="subCategory">Sub Category *</Label>
                  <SelectSubCategory
                    value={formData.subCategory}
                    onChange={(value) =>
                      handleInputChange("subCategory", value)
                    }
                  />
                </div>

                {/* Transaction ID/Cheque No. */}
                <div>
                  <Label htmlFor="transactionId">
                    Transaction ID/Cheque No.
                  </Label>
                  <Input
                    type="text"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={(e) =>
                      handleInputChange("transactionId", e.target.value)
                    }
                    placeholder="Enter Transaction ID or Cheque No."
                  />
                </div>

                {/* Cheque Date */}
                <div>
                  <Label htmlFor="chequeDate">Cheque Date</Label>
                  <DatePicker
                    id="chequeDate"
                    value={formData.chequeDate}
                    onChange={(date) => handleDateChange("chequeDate", date)}
                    placeholder="Select cheque date"
                  />
                </div>

                {/* Date of Donation */}
                <div>
                  <Label htmlFor="donationDate">Date of Donation *</Label>
                  <DatePicker
                    id="donationDate"
                    value={formData.donationDate}
                    onChange={(date) => handleDateChange("donationDate", date)}
                    placeholder="Select donation date"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Additional Information Section */}
            <section>
              <h2 className="text-md font-semibold text-brand-600 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                Additional Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Purpose */}
                <div>
                  <Label htmlFor="purpose">Purpose *</Label>
                  <SelectPurpose
                    value={formData.purpose}
                    onChange={(value) => handleInputChange("purpose", value)}
                  />
                </div>

                {/* DMS Status */}
                {/* <div>
                  <Label htmlFor="dmsStatus">DMS Status *</Label>
                  <SelectDmsStatus
                    value={formData.dmsStatus}
                    onChange={(value) => handleInputChange("dmsStatus", value)}
                  />
                </div> */}

                {/* Mark as Anonymous? */}
                <div>
                  <Label htmlFor="markAnonymous">Mark as Anonymous? *</Label>
                  <MarkAnonymouseName
                    value={formData.markAnonymous}
                    onChange={(value) =>
                      handleInputChange("markAnonymous", value)
                    }
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <Label htmlFor="description">Description</Label>
                <TextArea
                  name="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Enter any additional description or notes"
                  rows={4}
                />
              </div>
            </section>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="submit"
                className={`px-8 py-3 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transition-colors duration-200 ${
                  !isFormValid() ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!isFormValid()}
              >
                Submit Donation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
