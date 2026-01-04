"use client";
import {
  DonationAnonymous,
  DonationTaxReciepts,
  DonationWallDonars,
} from "@/src/components/debitForm/DebitRadio";
import {
  DonationRecurring,
  DonationRecurringDuration,
  DonationSelectInput,
  DonationSelectPrefix,
} from "@/src/components/debitForm/DonationSelectInput";
import Input from "@/src/components/ui/input/InputField";
import Label from "@/src/components/ui/input/Label";
import React, { useEffect, useState } from "react";

const DebitUPI = () => {
  // const searchParams = useSearchParams();
  const [programTitle, setProgramTitle] = useState("Annual-Gift Programme");

  // Dynamic based on URL parameters
  const programConfig = {
    "annual-gift-programme": {
      title: "Annual-Gift Programme",
    },
    "smart-classrooms-for-a-smarter-tomorrow": {
      title: "Smart Classrooms for a Smarter Tomorrow",
    },
    "professor-n-sathyamurthy-endowment-lecture-series": {
      title: "Professor N Sathyamurthy Endowment Lecture-Series",
    },
    "prof-vinod-k-singh-distinguish-lecture-series": {
      title: "Prof Vinod K Singh Distinguish Lecture Series",
    },
    "alumni-scholarship-for-girl-students": {
      title: "Alumni Scholarship for Girl Students",
    },
    "magik-programme": {
      title: "MAGIK Programme",
    },
  };

  const toSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[\s_]+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  useEffect(() => {
    const handleReceive = (event) => {
      if (event.data?.program) {
        const incoming = event.data.program;

        const slug = toSlug(incoming);

        if (programConfig[slug]) {
          setProgramTitle(programConfig[slug].title);
        }
      }
    };

    window.addEventListener("message", handleReceive);

    return () => window.removeEventListener("message", handleReceive);
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    affiliation: "",
    panNumber: "",
    amount: "",
    customAmount: "",
    donationType: "oneTime",
    frequency: "quarterly",
    isAnonymous: "no",
    displayAmount: "yes",
    taxReceipt: "email",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmountSelect = (amount) => {
    setFormData((prev) => ({
      ...prev,
      amount: amount,
      customAmount: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle payment processing logic here
  };

  // Predefined amount options
  const oneTimeAmounts = [
    { value: "500000", label: "₹ 5,00,000" },
    { value: "300000", label: "₹ 3,00,000" },
    { value: "100000", label: "₹ 1,00,000" },
    { value: "51000", label: "₹ 51,000" },
    { value: "21000", label: "₹ 21,000" },
    { value: "other", label: "Other" },
  ];

  const recurringAmounts = [
    { value: "1000", label: "₹ 1,000" },
    { value: "2000", label: "₹ 2,000" },
    { value: "5000", label: "₹ 5,000" },
    { value: "10000", label: "₹ 10,000" },
    { value: "25000", label: "₹ 25,000" },
    { value: "other", label: "Other" },
  ];

  const getFinalAmount = () => {
    return formData.amount === "other"
      ? formData.customAmount
      : formData.amount;
  };

  const formatIndianCurrency = (amount) => {
    return parseInt(amount).toLocaleString("en-IN");
  };

  return (
    <div className="w-full dark:bg-[#1D1F24] rounded-lg">
      {/* Header Section */}
      <div className="mb-8">
        <div className="dark:bg-[#16181D] bg-white border-l-4 border-blue-500 p-4 rounded ">
          <p className="text-sm text-gray-700 leading-relaxed dark:text-white/90  ">
            Please note that all donations are eligible for a 100% tax
            deduction, and tax receipts will be issued upon receipt of funds, a
            process that generally takes 3-4 working days.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information Section */}
        <div className="dark:bg-[#1D1F24] p-4 rounded-lg border dark:border-[#344054]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div>
              <DonationSelectPrefix />
            </div>

            <div>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                // onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your First name"
              />
            </div>
            <div>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                // onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your Last name"
              />
            </div>

            <div>
              <Input
                type="email"
                name="email"
                value={formData.email}
                // onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-0">
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-3">
                Select Affiliation
              </Label>
              <DonationSelectInput />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-3">
                Mark this donation as Anonymous*
              </Label>
              <DonationAnonymous />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-3">
                Display donated amount on Wall of Donors*
              </Label>
              <DonationWallDonars />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="dark:bg-[#16181D] p-4 bg-white rounded-md">
            <p className="text-sm text-gray-700 leading-relaxed dark:text-white/90  text-center  ">
              {programTitle}
            </p>
          </div>
        </div>

        <div className="gap-6 mb-6">
          {/* Donation Amount Section */}
          <div className="dark:bg-[#1D1F24] px-2 py-2 rounded-lg border dark:border-[#344054] w-full">
            {/* Donation Type Toggle */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden mb-6">
              <button
                type="button"
                className={`flex-1 py-3 px-4 font-medium transition-colors ${
                  formData.donationType === "oneTime"
                    ? "bg-[#A9131E] text-white"
                    : "bg-brand-100 hover:bg-brand-200"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, donationType: "oneTime" }))
                }
              >
                One Time
              </button>
              <button
                type="button"
                className={`flex-1 py-3 px-4 font-medium transition-colors ${
                  formData.donationType === "recurring"
                    ? "bg-[#A9131E] text-white"
                    : "bg-brand-100 hover:bg-brand-200"
                }`}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    donationType: "recurring",
                  }))
                }
              >
                Recurring
              </button>
            </div>

            {/* Amount Options */}
            <div className="mb-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 ">
                {(formData.donationType === "oneTime"
                  ? oneTimeAmounts
                  : recurringAmounts
                ).map((amount) => (
                  <button
                    key={amount.value}
                    type="button"
                    className={`py-3 px-4 border-2 rounded-lg font-medium transition-all ${
                      formData.amount === amount.value
                        ? "bg-[#A9131E] text-white"
                        : "bg-brand-100 hover:bg-brand-200"
                    }`}
                    onClick={() => handleAmountSelect(amount.value)}
                  >
                    {amount.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Frequency Options for Recurring */}
            {formData.donationType === "recurring" && (
              <div className="mb-6">
                <button
                  type="button"
                  className={`flex-1 py-3 px-4 font-medium transition-colors rounded-md mb-3 ${
                    formData.donationType === "recurring"
                      ? "bg-[#A9131E] text-white"
                      : "bg-brand-100 hover:bg-brand-200"
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      donationType: "oneTime",
                    }))
                  }
                >
                  Frequency
                </button>
                <div className=" gap-6 w-full hidden sm:flex">
                  <DonationRecurring />
                  <DonationRecurringDuration />
                </div>
                <div className=" gap-6 w-full flex flex-col sm:hidden">
                  <DonationRecurring />
                  <DonationRecurringDuration />
                </div>
              </div>
            )}

            {/* Custom Amount Input */}
            {formData.amount === "other" && (
              <div className="mb-4">
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Custom Amount *
                </Label>
                <Input
                  type="number"
                  name="customAmount"
                  value={formData.customAmount}
                  // onChange={handleInputChange}
                  required
                  min="1"
                  max="500000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter amount in ₹"
                />
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={!formData.amount}
                className="w-full bg-[#A9131E] disabled:bg-gray-400 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 text-lg"
              >
                Give Back Now
                {/* {getFinalAmount()
                  ? `₹ ${formatIndianCurrency(getFinalAmount())}`
                  : "Select Amount"} */}
              </button>
            </div>

            <div className="rounded-lg p-4 text-center mt-2">
              <p className="text-gray-600 dark:text-gray-300">
                <strong>
                  Max. transaction limit: ₹5,00,000.Use multiple payments or
                  bank transfer for higher amounts.
                </strong>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DebitUPI;

// remove the pan number and phone number and add prefix dropdown
// prefix value : Mr, Ms, Dr, Prof, Mrs, M/S, Shri
// remove tax receipt radio button
