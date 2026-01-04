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
import MultiSelect from "../MultiSelect";

const DepartmentFund = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // Personal Information
    conceptOrProposal: "",
    projectCategory: "",
    projectCategoryOther: "",
    projectBudget: "",
    projectBudgetOther: "",
    facultyName: "",

    // SDG Section
    sdg: [],
    trl: [],
  });

  const [files, setFiles] = useState({
    conceptFile: [],
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

  // REQUIRED FIELDS (SDG & TRL are now MULTISELECT → arrays)
  const requiredFields = [
    "conceptOrProposal",
    "projectCategory",
    "projectBudget",
    "facultyName",
    "sdg",
    "trl",
  ];

  // VALIDATION FOR ALL REQUIRED FIELDS
  const isValid = requiredFields.every((field) => {
    // For MULTISELECT arrays
    if (Array.isArray(formData[field])) {
      return formData[field].length > 0;
    }

    // For normal text/select fields
    return formData[field] && formData[field].toString().trim() !== "";
  });

  if (!isValid) {
    toast.error("Please fill all required fields.");
    return;
  }

  // If project category is "others" → user must type text
  if (formData.projectCategory === "others" && !formData.projectCategoryOther) {
    toast.error("Please specify Project Category.");
    return;
  }

  // If project budget is "others" → user must type text
  if (formData.projectBudget === "others" && !formData.projectBudgetOther) {
    toast.error("Please specify Project Budget.");
    return;
  }

  // FILE check
  if (files.conceptFile.length === 0) {
    toast.error("Please upload the required PDF file.");
    return;
  }

  // FINAL submission
  console.log("Department Fund Report Form Data:", formData);
  console.log("Uploaded Files:", files);

  toast.success("Department Fund Report Submitted Successfully");

  router.push("/faculty/cn-proposals/cn-request-module");
};


  // Check if all required fields are filled
  const isFormValid = () => {
    const requiredFields = [
      "conceptOrProposal",
      "projectCategory",
      "projectBudget",
      "facultyName",
      "sdg",
      "trl",
    ];

    // Check if projectCategoryOther is required
    if (formData.projectCategory === "others" && !formData.projectCategoryOther) {
      return false;
    }

    // Check if projectBudgetOther is required
    if (formData.projectBudget === "others" && !formData.projectBudgetOther) {
      return false;
    }

    return (
      requiredFields.every(
        (field) => formData[field] && formData[field].toString().trim() !== ""
      ) && 
      files.conceptFile.length > 0
    );
  };

  // Dropdown options
  const conceptProposalOptions = [
    { value: "concept-note", label: "Concept Note" },
    { value: "proposal", label: "Proposal" },
  ];

  const projectCategoryOptions = [
    { value: "research", label: "Research" },
    { value: "infrastructure", label: "Infrastructure" },
    { value: "student-development", label: "Student Development" },
    { value: "faculty-development", label: "Faculty Development" },
    { value: "community-outreach", label: "Community Outreach" },
    { value: "others", label: "Others" },
  ];

  const projectBudgetOptions = [
    { value: "below-1lakh", label: "Below ₹1 Lakh" },
    { value: "1-5lakh", label: "₹1-5 Lakh" },
    { value: "5-10lakh", label: "₹5-10 Lakh" },
    { value: "10-25lakh", label: "₹10-25 Lakh" },
    { value: "25-50lakh", label: "₹25-50 Lakh" },
    { value: "above-50lakh", label: "Above ₹50 Lakh" },
    { value: "others", label: "Others" },
  ];

  const sdgOptions = [
    { value: "1", label: "1. No Poverty" },
    { value: "2", label: "2. Zero Hunger" },
    { value: "3", label: "3. Good Health and Well-being" },
    { value: "4", label: "4. Quality Education" },
    { value: "5", label: "5. Gender Equality" },
    { value: "6", label: "6. Clean Water and Sanitation" },
    { value: "7", label: "7. Affordable and Clean Energy" },
    { value: "8", label: "8. Decent Work and Economic Growth" },
    { value: "9", label: "9. Industry, Innovation and Infrastructure" },
    { value: "10", label: "10. Reduced Inequality" },
    { value: "11", label: "11. Sustainable Cities and Communities" },
    { value: "12", label: "12. Responsible Consumption and Production" },
    { value: "13", label: "13. Climate Action" },
    { value: "14", label: "14. Life Below Water" },
    { value: "15", label: "15. Life on Land" },
    { value: "16", label: "16. Peace and Justice Strong Institutions" },
    { value: "17", label: "17. Partnerships for the Goal" },
  ];

  const trlOptions = [
    { value: "trl-1", label: "TRL 1 - Basic Principles Observed" },
    { value: "trl-2", label: "TRL 2 - Technology Concept Formulated" },
    { value: "trl-3", label: "TRL 3 - Experimental Proof of Concept" },
    { value: "trl-4", label: "TRL 4 - Technology Validated in Lab" },
    { value: "trl-5", label: "TRL 5 - Technology Validated in Relevant Environment" },
    { value: "trl-6", label: "TRL 6 - Technology Demonstrated in Relevant Environment" },
    { value: "trl-7", label: "TRL 7 - System Prototype Demonstration in Operational Environment" },
    { value: "trl-8", label: "TRL 8 - System Complete and Qualified" },
    { value: "trl-9", label: "TRL 9 - Actual System Proven in Operational Environment" },
  ];

  const facultyOptions = [
    { value: "john-doe", label: "Dr. John Doe" },
    { value: "jane-smith", label: "Prof. Jane Smith" },
    { value: "robert-brown", label: "Dr. Robert Brown" },
    { value: "sarah-wilson", label: "Prof. Sarah Wilson" },
    { value: "michael-johnson", label: "Dr. Michael Johnson" },
    { value: "emily-davis", label: "Prof. Emily Davis" },
  ];

  return (
    <div className="w-full h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold text-brand-500">
              CN/Proposal Form
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
              <div>
                <Label htmlFor="name">Proposal Name</Label>
                <Input defaultValue={"pk"} disabled />
              </div>
              <div>
                <Label htmlFor="name">Proposal Title</Label>
                <Input defaultValue={"pk"} disabled />
              </div>
              <div>
                <Label htmlFor="name">Professor Name</Label>
                <Input defaultValue={"Abhishek Kr."} disabled />
              </div>
              <div>
                <Label htmlFor="name">Designation</Label>
                <Input defaultValue={"Professor"} disabled />
              </div>
              <div>
                <Label htmlFor="name">Phone Number</Label>
                <Input defaultValue={"7657846582"} disabled />
              </div>
              
              {/* New Fields */}
              <div>
                <Label htmlFor="conceptOrProposal">
                  Is it concept note or proposal? *
                </Label>
                <select
                  id="conceptOrProposal"
                  value={formData.conceptOrProposal}
                  onChange={(e) => handleInputChange("conceptOrProposal", e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                >
                  <option value="">Select Type</option>
                  {conceptProposalOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="projectCategory">Project Category *</Label>
                <select
                  id="projectCategory"
                  value={formData.projectCategory}
                  onChange={(e) => handleInputChange("projectCategory", e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                >
                  <option value="">Select Category</option>
                  {projectCategoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                
                {/* Other Project Category Input */}
                {formData.projectCategory === "others" && (
                  <div className="mt-3">
                    <Label htmlFor="projectCategoryOther">
                      Specify Project Category *
                    </Label>
                    <Input
                      type="text"
                      name="projectCategoryOther"
                      value={formData.projectCategoryOther}
                      onChange={(e) => handleInputChange("projectCategoryOther", e.target.value)}
                      required
                      placeholder="Enter project category"
                    />
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="projectBudget">Project Budget *</Label>
                <select
                  id="projectBudget"
                  value={formData.projectBudget}
                  onChange={(e) => handleInputChange("projectBudget", e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                >
                  <option value="">Select Budget Range</option>
                  {projectBudgetOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                
                {/* Other Project Budget Input */}
                {formData.projectBudget === "others" && (
                  <div className="mt-3">
                    <Label htmlFor="projectBudgetOther">
                      Specify Project Budget *
                    </Label>
                    <Input
                      type="text"
                      name="projectBudgetOther"
                      value={formData.projectBudgetOther}
                      onChange={(e) => handleInputChange("projectBudgetOther", e.target.value)}
                      required
                      placeholder="Enter project budget"
                    />
                  </div>
                )}
              </div>

              {/* Upload Concept File */}
              <div className="md:col-span-2">
                <Label htmlFor="conceptFile">
                  Upload {formData.conceptOrProposal === "concept-note" ? "Concept Note" : "Proposal"} File *
                </Label>
                <p className="text-sm text-gray-500 mb-2">
                  Document must be in PDF format
                </p>
                <DropzoneComponent
                  onFilesChange={(fileList) =>
                    handleFileUpload("conceptFile", fileList)
                  }
                  maxFiles={1}
                  maxSize={10 * 1024 * 1024} // 10MB
                  acceptedFiles={["application/pdf"]}
                />
                {files.conceptFile.length > 0 && (
                  <p className="mt-2 text-sm text-green-600">
                    ✓ {files.conceptFile[0].name}
                  </p>
                )}
                {files.conceptFile.length === 0 && (
                  <p className="mt-2 text-sm text-red-500">
                    * {formData.conceptOrProposal === "concept-note" ? "Concept note" : "Proposal"} file is required
                  </p>
                )}
              </div>

            </div>
          </section>

          {/* SDG Section */}
          {/* SDG & TRL Section */}
          <section>
            <h2 className="text-md font-bold text-brand-500 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              SDG & TRL
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* SDG MULTISELECT */}
              <div>
                <Label>SDG (Sustainable Development Goal) *</Label>
                <MultiSelect
                  options={sdgOptions}
                  value={formData.sdg}
                  onChange={(values) => handleInputChange("sdg", values)}
                  placeholder="Select SDG"
                />
                {formData.sdg.length === 0 && (
                  <p className="text-red-500 text-sm mt-1">* SDG is required</p>
                )}
              </div>

              {/* TRL MULTISELECT */}
              <div>
                <Label>TRL (Technology Readiness Level) *</Label>
                <MultiSelect
                  options={trlOptions}
                  value={formData.trl}
                  onChange={(values) => handleInputChange("trl", values)}
                  placeholder="Select TRL"
                />
                {formData.trl.length === 0 && (
                  <p className="text-red-500 text-sm mt-1">* TRL is required</p>
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

export default DepartmentFund;