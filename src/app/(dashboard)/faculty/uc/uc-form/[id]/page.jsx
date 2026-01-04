"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/src/components/ui/button/Button";
import toast from "react-hot-toast";

const IITKReportPage = () => {
  const router = useRouter();
  const [isRemarksModalOpen, setIsRemarksModalOpen] = useState(false);
  const [isRemarksSubmitted, setIsRemarksSubmitted] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [submittedRemarks, setSubmittedRemarks] = useState("");


  const handleApprove = () => {
    router.push("https://sign.zoho.in/zs/60036081159#/requests/all");
  };

  const handleRevise = () => {
    setIsRemarksModalOpen(true);
  };

  const handleSubmitRemarks = () => {
    if (!remarks.trim()) {
      toast.error("Please enter your remarks before submitting.");
      return;
    }

    setSubmittedRemarks(remarks); // SAVE before clearing
    setIsRemarksSubmitted(true);
    setIsRemarksModalOpen(false);
    setRemarks(""); // clears only textarea, NOT the submitted remarks

    toast.success("Remarks submitted successfully!");
  };


  return (
    <div className="max-w-4xl mx-auto p-6 relative">

      {/* 🔙 BACK BUTTON */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-brand-500">
            UC Document
          </h1>
          <button
            onClick={() => router.back()}
            className="text-brand-500 hover:underline"
          >
            ← Back to Report
          </button>
        </div>

      {/* APPROVE / REVISE BUTTONS */}
      <div className="flex justify-end gap-2 mb-4">
        <Button
          onClick={handleApprove}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Approve
        </Button>

        <Button
          onClick={handleRevise}
          disabled={isRemarksSubmitted}
          className={`${
            isRemarksSubmitted
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-600 hover:bg-orange-700"
          } text-white`}
        >
          {isRemarksSubmitted ? "Remarks Submitted" : "Revise"}
        </Button>
      </div>
      {/* SHOW SUBMITTED REMARKS */}
      {isRemarksSubmitted && submittedRemarks && (
        <div className="mt-3 p-3 bg-orange-50 border border-orange-300 text-orange-700 rounded-md">
          <p className="font-semibold">Submitted Remarks: <span className="mt-1 text-sm whitespace-pre-line">{submittedRemarks}</span></p>
        </div>
      )}


      {/* REPORT TEMPLATE */}
      <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-300 dark:border-gray-500">

        <h1 className="text-center font-bold text-xl sm:text-2xl mb-2 dark:text-white">
          INDIAN INSTITUTE OF TECHNOLOGY KANPUR
        </h1>

        <p className="text-center font-medium mb-6 dark:text-gray-300">
          Office of Dean of Resources & Alumni
        </p>

        <h2 className="text-center font-semibold mb-4 dark:text-white">UTILIZATION REPORT</h2>

        <p className="text-center font-medium mb-6 dark:text-gray-300">
          Financial Year: 2023-24
        </p>

        {/* Donation Details */}
        <div className="mb-4 space-y-1 dark:text-gray-200">
          <p>1. Name of Donation : Narayana Murthy Foundation</p>
          <p>2. Name of Donor : Mr. Narayana Murthy</p>
          <p>3. Purpose : Faculty Chair, CSE Building Fund, Corpus to Academic Department & IDP, Research I Foundation, Support for Excellence</p>
          <p>4. Year of Establishment : 1997-98</p>
          <p>5. Total Donation as on 31<sup>st</sup> March 2024 : ₹ 34,01,39,875.00</p>
        </div>

        {/* 📱 TABLE FULLY RESPONSIVE + NO OVERFLOW */}
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[600px] border border-gray-300 dark:border-gray-600 mb-6 text-sm sm:text-base dark:text-gray-200">
            <thead className="bg-gray-200 dark:bg-gray-800">
              <tr>
                <th className="border border-gray-300 dark:border-gray-600 p-2">SN.</th>
                <th className="border border-gray-300 dark:border-gray-600 p-2">Particulars</th>
                <th className="border border-gray-300 dark:border-gray-600 p-2">Amount (in ₹)</th>
                <th className="border border-gray-300 dark:border-gray-600 p-2">Amount (in ₹)</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 p-2">1.</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">
                  Balance at the beginning of the year (as on 01-04-2023)
                  <br />i. Corpus
                  <br />ii. Interest
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">
                  20,06,89,080.00 <br />12,83,36,688.00
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">
                  32,90,25,768.00
                </td>
              </tr>

              <tr>
                <td className="border border-gray-300 dark:border-gray-600 p-2">2.</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">
                  Funds received during the year
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">0.00</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2"></td>
              </tr>

              <tr>
                <td className="border border-gray-300 dark:border-gray-600 p-2">3.</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">
                  Interest earned during the year
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">
                  2,00,70,572.00
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-2"></td>
              </tr>

              <tr>
                <td className="border border-gray-300 dark:border-gray-600 p-2">4.</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">
                  Total funds available
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">
                  34,90,96,340.00
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-2"></td>
              </tr>

              <tr>
                <td className="border border-gray-300 dark:border-gray-600 p-2">5.</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">
                  Expenditure during the year
                  <br />i. Corpus
                  <br />ii. Interest
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">
                  0.00 <br />89,56,465.00
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">
                  89,56,465.00
                </td>
              </tr>

              <tr>
                <td className="border border-gray-300 dark:border-gray-600 p-2">6.</td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">
                  Balance at the end of the year (as on 31-03-2024)
                  <br />i. Corpus
                  <br />ii. Interest
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">
                  20,06,89,080.00 <br />13,94,50,795.00
                </td>
                <td className="border border-gray-300 dark:border-gray-600 p-2">
                  34,01,39,875.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mb-8 text-sm dark:text-gray-200">
          During the year 2023-24 total expenditure of ₹ 89,56,465.00 was incurred for the following purpose:
          <br />1. ₹ 3,00,000.00 towards Chair.
          <br />2. ₹ 2,28,717.00 towards Contingency.
          <br />3. ₹ 24,720.00 towards CSE building maintenance.
          <br />4. ₹ 74,60,528.00 towards Research I Foundation.
          <br />5. ₹ 9,22,500.00 towards Support for Excellence.
        </p>

        <p className="mt-8 text-right text-sm dark:text-gray-300">Assistance Registrar</p>

        <p className="text-right text-xs mt-2 dark:text-gray-400">
          (This is computer generated statement, no signature required.)
        </p>
      </div>

      {/* REMARKS MODAL */}
      {isRemarksModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-3 dark:text-white">
              Enter Revision Remarks
            </h3>

            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter your remarks..."
              className="w-full h-32 p-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-500 resize-none"
            />

            <div className="flex gap-3 mt-4 justify-end">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setIsRemarksModalOpen(false);
                  setRemarks("");
                }}
              >
                Cancel
              </Button>

              <Button
                className="flex-1 bg-orange-600 hover:bg-orange-700"
                disabled={!remarks.trim()}
                onClick={handleSubmitRemarks}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IITKReportPage;
