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

const LectureSeries = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // Personal Information
    facultyCoordinator: "pk",
    department: "any",
    email: "pk@gmail.com",

    // Information on Lecture
    lecturesConvened: "",

    // Gratitude
    acknowledgement: "",
  });

  const [files, setFiles] = useState({
    profilePhoto: [],
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
    console.log("Lecture Convenor Form Data:", formData);
    console.log("Uploaded Files:", files);
    toast.success("Lecture Report Submitted Successfully");
    router.push(`/faculty/impact-report/final-impact-report/${id}`);
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    const requiredFields = ["lecturesConvened", "acknowledgement"];

    return (
      requiredFields.every(
        (field) => formData[field] && formData[field].toString().trim() !== ""
      ) &&
      files.activityReport.length > 0 &&
      files.profilePhoto.length > 0
    );
  };

  return (
    <div className="w-full h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold text-brand-500">Lecture series</h1>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="name">Faculty Coordinator</Label>
                <Input defaultValue={"pk"} disabled />
              </div>
              <div>
                <Label htmlFor="name">Department</Label>
                <Input defaultValue={"any"} disabled />
              </div>
              {/* Email - Disabled Input Field */}
              <div>
                <Label htmlFor="name">Name of the Program</Label>
                <Input defaultValue={"pk@gmail.com"} disabled />
              </div>

              {/* Profile Photo Upload */}
              <div className="md:col-span-3">
                <Label htmlFor="profilePhoto">Profile Photo *</Label>
                <p className="text-sm text-gray-500 mb-2">
                  Upload a professional profile photograph (JPG, PNG only)
                </p>
                <DropzoneComponent
                  onFilesChange={(fileList) =>
                    handleFileUpload("profilePhoto", fileList)
                  }
                  maxFiles={1}
                  maxSize={2 * 1024 * 1024} // 2MB
                  acceptedFiles={["image/png", "image/jpeg", "image/jpg"]}
                />
                {files.profilePhoto.length > 0 && (
                  <p className="mt-2 text-sm text-green-600">
                    ✓ Profile photo selected
                  </p>
                )}
                {files.profilePhoto.length === 0 && (
                  <p className="mt-2 text-sm text-red-500">
                    * Profile photo is required
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Information on Lecture Section */}
          <section>
            <h2 className="text-md font-bold text-brand-500 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              Information on Lecture
            </h2>
            <div className="space-y-6">
              {/* Lectures Convened */}
              <div>
                <Label htmlFor="lecturesConvened">Lectures convened *</Label>
                <select
                  name="lecturesConvened"
                  value={formData.lecturesConvened}
                  onChange={(e) =>
                    handleInputChange("lecturesConvened", e.target.value)
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select status</option>
                  <option value="held">Held</option>
                  <option value="not-held">Not Held</option>
                </select>
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
                  placeholder="Express your acknowledgement to the donors and detail the impact of the fund on the lecture program..."
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
                  Attach photographs relevant to the program
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
              Submit Lecture Report
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LectureSeries;
