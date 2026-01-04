"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SelectProgram } from "../ImpcatReportFormComp";
import Label from "@/src/components/ui/input/Label";
import Input from "@/src/components/ui/input/InputField";
import TextArea from "@/src/components/ui/input/TextArea";
import toast from "react-hot-toast";
import Button from "@/src/components/ui/button/Button";
import DropzoneComponent from "@/src/components/form/form-elements/DropZone";

const FacultyChair = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // Personal Information
    department: "",

    // Brief Overview
    briefIntroduction: "",
    majorHighlights: "",
    futureVision: "",

    // Significant Contribution
    thesisSupervision: "",

    // Gratitude
    gratitudeMessage: "",
  });

  const [files, setFiles] = useState({
    researchDocuments: [],
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
    console.log("Faculty Chair/Fellowship Form Data:", formData);
    console.log("Uploaded Files:", files);
    toast.success("Faculty Report Submitted Successfully");
    router.push(`/faculty/impact-report/final-impact-report/${id}`);
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    const requiredFields = [
      "department",
      "briefIntroduction",
      "majorHighlights",
      "futureVision",
      "thesisSupervision",
      "gratitudeMessage",
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
              Faculty Chair/Faculty Fellowship Report
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="occupation">Current occupant</Label>
                <Input defaultValue={"pk"} disabled />
              </div>

              {/* Department */}
              <div>
                <Label htmlFor="department">Department *</Label>
                {formData.department ? (
                  <Input
                    defaultValue={formData.department} // <-- use defaultValue here
                    disabled
                    readOnly
                  />
                ) : (
                  <SelectProgram
                    value={formData.department}
                    onChange={(value) => handleInputChange("department", value)}
                    required
                  />
                )}
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
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
              {/* Brief Introduction */}
              <div>
                <Label htmlFor="briefIntroduction">
                  Brief Introduction about yourself *<br />
                  <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
                    (mention any significant contribution towards Academia and
                    Research in the past year or Awards/honors received)
                  </span>
                </Label>
                <TextArea
                  name="briefIntroduction"
                  value={formData.briefIntroduction}
                  onChange={(e) =>
                    handleInputChange("briefIntroduction", e.target.value)
                  }
                  required
                  placeholder="Provide a brief introduction highlighting your academic contributions, research work, and any awards or honors received in the past year..."
                  rows={5}
                />
              </div>

              {/* Major Highlights */}
              <div>
                <Label htmlFor="majorHighlights">
                  Major Highlights or activities of the Faculty Chair/Faculty
                  Fellowship in the past year *
                </Label>
                <TextArea
                  name="majorHighlights"
                  value={formData.majorHighlights}
                  onChange={(e) =>
                    handleInputChange("majorHighlights", e.target.value)
                  }
                  required
                  placeholder="Describe the key activities, achievements, and highlights during your tenure as Faculty Chair/Faculty Fellowship..."
                  rows={5}
                />
              </div>

              {/* Future Vision */}
              <div>
                <Label htmlFor="futureVision">
                  Future vision as Faculty Chair/Faculty Fellowship of the
                  programme *
                </Label>
                <TextArea
                  name="futureVision"
                  value={formData.futureVision}
                  onChange={(e) =>
                    handleInputChange("futureVision", e.target.value)
                  }
                  required
                  placeholder="Share your vision, goals, and plans for the future development of the program..."
                  rows={5}
                />
              </div>
            </div>
          </section>

          {/* Significant Contribution Section */}
          <section>
            <h2 className="text-md font-bold text-brand-500 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              Significant Contribution
            </h2>
            <div className="space-y-6">
              {/* Thesis Supervision */}
              <div>
                <Label htmlFor="thesisSupervision">
                  Thesis topics supervised or guidance provided to students (if
                  any) *
                </Label>
                <TextArea
                  name="thesisSupervision"
                  value={formData.thesisSupervision}
                  onChange={(e) =>
                    handleInputChange("thesisSupervision", e.target.value)
                  }
                  required
                  placeholder="List the thesis topics you have supervised, research guidance provided to students, or any mentoring activities..."
                  rows={4}
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
                <Label htmlFor="gratitudeMessage">
                  Gratitude Message to Donor *
                </Label>
                <TextArea
                  name="gratitudeMessage"
                  value={formData.gratitudeMessage}
                  onChange={(e) =>
                    handleInputChange("gratitudeMessage", e.target.value)
                  }
                  required
                  placeholder="Express your gratitude to the donor for their support and describe the impact of their contribution..."
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
              {/* Research Documents */}
              <div>
                <Label htmlFor="researchDocuments">
                  Attach documents related to your research or teaching
                </Label>
                <p className="text-sm text-gray-500 mb-2">
                  Document must be in PDF format
                </p>
                <DropzoneComponent
                  onFilesChange={(fileList) =>
                    handleFileUpload("researchDocuments", fileList)
                  }
                  maxFiles={5}
                  maxSize={10 * 1024 * 1024} // 10MB
                  acceptedFiles={["application/pdf"]}
                />
                {files.researchDocuments.length > 0 && (
                  <p className="mt-2 text-sm text-green-600">
                    ✓ {files.researchDocuments.length} document(s) selected
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
              Submit Faculty Report
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FacultyChair;
