"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Label from "@/src/components/ui/input/Label";
import Input from "@/src/components/ui/input/InputField";
import TextArea from "@/src/components/ui/input/TextArea";
import toast from "react-hot-toast";
import Button from "@/src/components/ui/button/Button";
import DropzoneComponent from "@/src/components/form/form-elements/DropZone";

const CommunityWelfare = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // Personal Information
    // name: "pk",

    // Brief Overview
    majorHighlights: "",

    // Objective
    financialYearPlan: "",

    // Gratitude
    acknowledgement: "",
  });

  const [files, setFiles] = useState({
    activityReport: [],
    photographs: [],
  });

  const handleInputChange = (field, value) => {
    console.log(`Field: ${field}, Value:`, value);
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (fileType, uploadedFiles) => {
    setFiles((prev) => ({
      ...prev,
      [fileType]: uploadedFiles,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Department Fund Report Form Data:", formData);
    console.log("Uploaded Files:", files);
    toast.success("Department Fund Report Submitted Successfully");
    router.push("/faculty/impact-report/final-impact-report");
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    const requiredFields = [
      "majorHighlights",
      "financialYearPlan",
      "acknowledgement",
    ];

    return (
      requiredFields.every(
        (field) => formData[field] && formData[field].toString().trim() !== ""
      ) && files.activityReport.length > 0
    );
  };

  return (
    <div className="w-full h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold text-brand-500">
              Community Welfare
            </h1>
          </div>
        </div>

        <div className="sm:flex flex-row-reverse gap-5 hidden">
          <button
            onClick={() => router.back()}
            className="text-brand-600 dark:text-brand-400 hover:underline sm:text-md text-md"
          >
            ← Back to Report
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
          {/* Personal Information Section */}
          <section>
            <h2 className="text-md font-bold text-brand-500 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email - Disabled Input Field */}
              <div>
                <Label htmlFor="name">Name of the Program</Label>
                <Input defaultValue={"pk@gmail.com"} disabled />
              </div>
            </div>
          </section>

          {/* Brief Overview Section */}
          <section>
            <h2 className="text-md font-bold text-brand-500 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              Brief Overview
            </h2>
            <div className="space-y-6">
              {/* Major Highlights */}
              <div>
                <Label htmlFor="majorHighlights">
                  Major highlights of activities undertaken *
                </Label>
                <TextArea
                  name="majorHighlights"
                  value={formData.majorHighlights}
                  onChange={(e) =>
                    handleInputChange("majorHighlights", e.target.value)
                  }
                  required
                  placeholder="Describe the major highlights, key activities, and significant achievements of the program..."
                  rows={5}
                />
              </div>
            </div>
          </section>

          {/* Objective Section */}
          <section>
            <h2 className="text-md font-bold text-brand-500 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              Future Plans
            </h2>
            <div className="space-y-6">
              {/* Financial Year Plan */}
              <div>
                <Label htmlFor="financialYearPlan">
                  Your plan for financial year 2025-26 *
                </Label>
                <TextArea
                  name="financialYearPlan"
                  value={formData.financialYearPlan}
                  onChange={(e) =>
                    handleInputChange("financialYearPlan", e.target.value)
                  }
                  required
                  placeholder="Outline your plans, objectives, and goals for the upcoming financial year 2025-26..."
                  rows={5}
                />
              </div>
            </div>
          </section>

          {/* Gratitude Section */}
          <section>
            <h2 className="text-md font-bold text-brand-500 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              Gratitude Message
            </h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="acknowledgement">
                  Acknowledgement to donors detailing the impact of the fund *
                </Label>
                <TextArea
                  name="acknowledgement"
                  value={formData.acknowledgement}
                  onChange={(e) =>
                    handleInputChange("acknowledgement", e.target.value)
                  }
                  required
                  placeholder="Express your acknowledgement to the donors and detail the impact of their fund on the program..."
                  rows={6}
                />
              </div>
            </div>
          </section>

          {/* Attachment Section */}
          <section>
            <h2 className="text-md font-bold text-brand-500 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              Attachments
            </h2>
            <div className="space-y-6">
              {/* Activity Report */}
              <div>
                <Label htmlFor="activityReport">
                  Attach an activity report for the program *
                </Label>
                <p className="text-sm text-gray-500 mb-2">
                  Document must be in PDF format
                </p>
                <DropzoneComponent
                  onFilesChange={(fileList) =>
                    handleFileUpload("activityReport", fileList)
                  }
                  maxFiles={1}
                  maxSize={10 * 1024 * 1024} // 10MB
                  acceptedFiles={["application/pdf"]}
                />
                {files.activityReport.length > 0 && (
                  <p className="mt-2 text-sm text-green-600">
                    ✓ {files.activityReport[0].name}
                  </p>
                )}
                {files.activityReport.length === 0 && (
                  <p className="mt-2 text-sm text-red-500">
                    * Activity report is required
                  </p>
                )}
              </div>

              {/* Photographs */}
              <div>
                <Label htmlFor="photographs">
                  Attach photographs related to the programme
                </Label>
                <p className="text-sm text-gray-500 mb-2">
                  .jpeg and .png only
                </p>
                <DropzoneComponent
                  onFilesChange={(fileList) =>
                    handleFileUpload("photographs", fileList)
                  }
                  maxFiles={10}
                  maxSize={5 * 1024 * 1024} // 5MB
                  acceptedFiles={["image/jpeg", "image/png"]}
                />
                {files.photographs.length > 0 && (
                  <p className="mt-2 text-sm text-green-600">
                    ✓ {files.photographs.length} photograph(s) selected
                  </p>
                )}
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
              Submit Department Fund Report
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommunityWelfare;
