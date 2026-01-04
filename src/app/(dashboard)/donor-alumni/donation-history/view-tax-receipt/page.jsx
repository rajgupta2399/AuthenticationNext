"use client";
import React, { useState, useRef } from "react";
import DonationReceipt from "./TaxReceipt";
import CoverLetter from "./CoverLetter";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Button from "@/src/components/ui/button/Button";

const Page = () => {
  const [activeComponent, setActiveComponent] = useState("receipt");
  const receiptRef = useRef(null);
  const coverLetterRef = useRef(null);
  const router = useRouter();

  const handlePrint = () => {
    toast.success("PDF Downloaded");
  };

  return (
    <div className=" ">
      {/* Switcher and Print Buttons */}
      <div className="flex justify-end">
        <button
          onClick={() => router.back()}
          className="text-brand-600 dark:text-brand-400 hover:underline mb-6"
        >
          ← Back to Donation History
        </button>
      </div>
      <div className="no-print flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex gap-2">
          <Button
            onClick={() => setActiveComponent("receipt")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeComponent === "receipt"
                ? "bg-brand-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Tax Receipt
          </Button>
          <Button
            onClick={() => setActiveComponent("cover")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeComponent === "cover"
                ? "bg-brand-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Cover Letter
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() =>
              handlePrint(
                activeComponent === "receipt" ? receiptRef : coverLetterRef
              )
            }
            className="px-4 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-colors flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            PDF
            {/* PDF {activeComponent === "receipt" ? "Receipt" : "Cover Letter"} */}
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full">
        {activeComponent === "receipt" && (
          <div ref={receiptRef}>
            <DonationReceipt />
          </div>
        )}
        {activeComponent === "cover" && (
          <div ref={coverLetterRef}>
            <CoverLetter />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
