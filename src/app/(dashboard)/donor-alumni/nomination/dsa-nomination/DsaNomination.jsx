"use client";
import React, { useState } from "react";
import * as yup from "yup";
import Button from "@/src/components/ui/button/Button";
import Input from "@/src/components/ui/input/InputField";
import Label from "@/src/components/ui/input/Label";
import TextArea from "@/src/components/ui/input/TextArea";
import DropzoneComponent from "@/src/components/form/form-elements/DropZone";
import { useRouter } from "next/navigation";
import {
  SelectCountry,
  SelectDegree,
  SelectProgram,
  DonationSelectPrefix,
  SelectSolution,
} from "../CommonNominationLayout";

// Validation Schemas
const nominatorSchema = yup.object().shape({
  salutation: yup.string().required("Salutation is required"),
  nominatorName: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  nominatorEmail: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  nominatorMobile: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"),
  currentDesignation: yup.string().required("Current designation is required"),
  country: yup.string().required("Country is required"),
});

const nomineeSchema = yup.object().shape({
  solution: yup.string().required("Solution is required"),
  rollNumber: yup.string().optional(),
  nomineeName: yup
    .string()
    .required("Nominee name is required")
    .min(2, "Name must be at least 2 characters"),
  nomineeEmail: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  nomineeMobile: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"),
  nomineeDegree: yup.string().required("Degree is required"),
  nomineeDepartment: yup.string().required("Department is required"),
  nomineeGraduationYear: yup
    .string()
    .required("Graduation year is required")
    .matches(/^[0-9]{4}$/, "Please enter a valid year"),
  nomineeOrganization: yup.string().required("Organization is required"),
  nomineeCountry: yup.string().required("Country is required"),
});

const otherInfoSchema = yup.object().shape({
  linkedin: yup.string().url("Please enter a valid LinkedIn URL").nullable(),
  twitter: yup.string().url("Please enter a valid Twitter URL").nullable(),
  facebook: yup.string().url("Please enter a valid Facebook URL").nullable(),
  otherSocial: yup.string().url("Please enter a valid URL").nullable(),
  achievement1: yup
    .string()
    .required("Achievement 1 is required")
    .max(100, "Achievement must be 100 characters or less"),
  achievement2: yup
    .string()
    .required("Achievement 2 is required")
    .max(100, "Achievement must be 100 characters or less"),
  achievement3: yup
    .string()
    .required("Achievement 3 is required")
    .max(100, "Achievement must be 100 characters or less"),
  otherInformation: yup
    .string()
    .required("Additional information is required")
    .max(500, "Information must be 500 characters or less"),
});

const attachmentsSchema = yup.object().shape({
  recommendationDoc: yup
    .mixed()
    .required("Recommendation document is required")
    .test(
      "fileType",
      "Only PDF files are allowed",
      (value) => value?.type === "application/pdf"
    )
    .test(
      "fileSize",
      "File size must be less than 8MB",
      (value) => value?.size <= 8 * 1024 * 1024
    ),
  nomineeProfile: yup
    .mixed()
    .required("Nominee profile is required")
    .test(
      "fileType",
      "Only PDF files are allowed",
      (value) => value?.type === "application/pdf"
    )
    .test(
      "fileSize",
      "File size must be less than 8MB",
      (value) => value?.size <= 8 * 1024 * 1024
    ),
  nomineePhoto: yup
    .mixed()
    .required("Nominee photograph is required")
    .test("fileType", "Only JPG/PNG files are allowed", (value) =>
      ["image/jpeg", "image/png"].includes(value?.type)
    )
    .test(
      "fileSize",
      "File size must be less than 8MB",
      (value) => value?.size <= 8 * 1024 * 1024
    ),
  supportingDoc1: yup.mixed().nullable(),
  supportingDoc2: yup.mixed().nullable(),
  supportingDoc3: yup.mixed().nullable(),
  supportingDoc4: yup.mixed().nullable(),
  supportingDoc5: yup.mixed().nullable(),
});

// Tab Navigation Component
const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 1, label: "Nominator" },
    { id: 2, label: "Nominee" },
    { id: 3, label: "Other Info" },
    { id: 4, label: "Attachments" },
  ];

  return (
    <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => setActiveTab(tab.id)}
          className={`flex-1 min-w-[140px] py-3 px-2 text-center font-medium transition-colors text-sm sm:text-base ${
            activeTab === tab.id
              ? "border-b-2 border-brand-500 text-brand-600 dark:text-brand-400"
              : "text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

// Success Message Component
const SuccessMessage = () => (
  <div className="p-8 text-center">
    <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
      <svg
        className="w-16 h-16 text-green-500 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white/90 mb-2">
        DSA Nomination Submitted Successfully!
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        Thank you for submitting your DSA nomination. We'll review your
        submission and get back to you soon.
      </p>
    </div>
  </div>
);

// Form Field Component
const FormField = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

const DSANominationForm = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  // Form data state
  const [formData, setFormData] = useState({
    // Nominator Details
    salutation: "",
    nominatorName: "",
    nominatorEmail: "",
    nominatorMobile: "",
    currentDesignation: "",
    country: "",

    // Nominee Details
    solution: "",
    rollNumber: "",
    nomineeName: "",
    nomineeEmail: "",
    nomineeMobile: "",
    nomineeDegree: "",
    nomineeDepartment: "",
    nomineeGraduationYear: "",
    nomineeOrganization: "",
    nomineeCountry: "",

    // Other Information
    linkedin: "",
    twitter: "",
    facebook: "",
    otherSocial: "",
    achievement1: "",
    achievement2: "",
    achievement3: "",
    otherInformation: "",

    // Attachments
    recommendationDoc: null,
    nomineeProfile: null,
    nomineePhoto: null,
    supportingDoc1: null,
    supportingDoc2: null,
    supportingDoc3: null,
    supportingDoc4: null,
    supportingDoc5: null,
  });

  const [errors, setErrors] = useState({});
  const [tabCompletion, setTabCompletion] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle custom select changes
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user selects an option
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle file uploads for dropzone
  const handleFileUpload = (name, files) => {
    const file = files[0] || null;

    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));

    // Clear error when file is uploaded
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Validate the file immediately
    if (file) {
      validateFileField(name, file);
    }
  };

  // Validate individual file field
  const validateFileField = async (fieldName, file) => {
    try {
      let schema;
      switch (fieldName) {
        case "recommendationDoc":
          schema = yup
            .mixed()
            .required("Recommendation document is required")
            .test(
              "fileType",
              "Only PDF files are allowed",
              (value) => value?.type === "application/pdf"
            )
            .test(
              "fileSize",
              "File size must be less than 8MB",
              (value) => value?.size <= 8 * 1024 * 1024
            );
          break;
        case "nomineeProfile":
          schema = yup
            .mixed()
            .required("Nominee profile is required")
            .test(
              "fileType",
              "Only PDF files are allowed",
              (value) => value?.type === "application/pdf"
            )
            .test(
              "fileSize",
              "File size must be less than 8MB",
              (value) => value?.size <= 8 * 1024 * 1024
            );
          break;
        case "nomineePhoto":
          schema = yup
            .mixed()
            .required("Nominee photograph is required")
            .test("fileType", "Only JPG/PNG files are allowed", (value) =>
              ["image/jpeg", "image/png"].includes(value?.type)
            )
            .test(
              "fileSize",
              "File size must be less than 8MB",
              (value) => value?.size <= 8 * 1024 * 1024
            );
          break;
        default:
          return;
      }

      await schema.validate(file);
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setErrors((prev) => ({ ...prev, [fieldName]: error.message }));
      }
    }
  };

  // Validate current tab
  // const validateCurrentTab = async () => {
  //   let schema;
  //   switch (activeTab) {
  //     case 1:
  //       schema = nominatorSchema;
  //       break;
  //     case 2:
  //       schema = nomineeSchema;
  //       break;
  //     case 3:
  //       schema = otherInfoSchema;
  //       break;
  //     case 4:
  //       schema = attachmentsSchema;
  //       break;
  //     default:
  //       schema = nominatorSchema;
  //   }

  //   try {
  //     await schema.validate(formData, { abortEarly: false });
  //     setErrors({});
  //     setTabCompletion((prev) => ({ ...prev, [activeTab]: true }));
  //     return true;
  //   } catch (error) {
  //     if (error instanceof yup.ValidationError) {
  //       const newErrors = {};
  //       error.inner.forEach((err) => {
  //         if (err.path) {
  //           newErrors[err.path] = err.message;
  //         }
  //       });
  //       setErrors(newErrors);
  //     }
  //     return false;
  //   }
  // };

  // Navigate to next tab - NO VALIDATION
  const handleNext = () => {
    if (activeTab < 4) {
      setActiveTab(activeTab + 1);
    }
  };

  // Navigate to previous tab - NO VALIDATION
  const handlePrevious = () => {
    if (activeTab > 1) {
      setActiveTab(activeTab - 1);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate all tabs
      const tab1Valid = await nominatorSchema.isValid(formData);
      const tab2Valid = await nomineeSchema.isValid(formData);
      const tab3Valid = await otherInfoSchema.isValid(formData);
      const tab4Valid = await attachmentsSchema.isValid(formData);

      if (tab1Valid && tab2Valid && tab3Valid && tab4Valid) {
        // All validations passed - submit form
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsSubmitted(true);
      } else {
        // Collect all errors from all schemas
        const allErrors = {};

        try {
          await nominatorSchema.validate(formData, { abortEarly: false });
        } catch (error) {
          if (error instanceof yup.ValidationError) {
            error.inner.forEach((err) => {
              if (err.path) allErrors[err.path] = err.message;
            });
          }
        }

        try {
          await nomineeSchema.validate(formData, { abortEarly: false });
        } catch (error) {
          if (error instanceof yup.ValidationError) {
            error.inner.forEach((err) => {
              if (err.path) allErrors[err.path] = err.message;
            });
          }
        }

        try {
          await otherInfoSchema.validate(formData, { abortEarly: false });
        } catch (error) {
          if (error instanceof yup.ValidationError) {
            error.inner.forEach((err) => {
              if (err.path) allErrors[err.path] = err.message;
            });
          }
        }

        try {
          await attachmentsSchema.validate(formData, { abortEarly: false });
        } catch (error) {
          if (error instanceof yup.ValidationError) {
            error.inner.forEach((err) => {
              if (err.path) allErrors[err.path] = err.message;
            });
          }
        }

        setErrors(allErrors);

        // Navigate to the first tab with errors
        // if (!tab1Valid) setActiveTab(1);
        // else if (!tab2Valid) setActiveTab(2);
        // else if (!tab3Valid) setActiveTab(3);
        // else if (!tab4Valid) setActiveTab(4);
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return <SuccessMessage />;
  }

  return (
    <div className="border-gray-200 rounded-2xl dark:border-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center sm:mb-8 mb-2">
        <div>
          <h1 className="sm:text-xl text-md font-bold text-brand-500 dark:text-white mb-2">
            DSA Nomination Form
          </h1>
          <p className="text-gray-600 dark:text-gray-400 sm:block hidden">
            Please complete all sections of the DSA nomination form. Each tab
            must be completed before proceeding to the next.
          </p>
        </div>
        <div className="sm:block hidden">
          <button
            onClick={() => router.back()}
            className="text-brand-600 dark:text-brand-400 hover:underline  sm:text-md text-md"
          >
            ← Back to Nominations
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

      <p className="text-gray-600 dark:text-gray-400 sm:hidden block mb-4 text-sm">
        Please complete all sections of the DSA nomination form. Each tab must
        be completed before proceeding to the next.
      </p>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabCompletion={tabCompletion}
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tab 1: Nominator Details */}
          {activeTab === 1 && (
            <div className="space-y-6">
            <h2 className="sm:text-xl text-md dark:text-brand-500 font-semibold text-brand-500  mb-4">
                Nominator Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField>
                  <Label htmlFor="salutation">Salutation *</Label>
                  <DonationSelectPrefix
                    value={formData.salutation}
                    onChange={(value) =>
                      handleSelectChange("salutation", value)
                    }
                  />
                  {errors.salutation && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.salutation}
                    </p>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="nominatorName">Name *</Label>
                  <Input
                    id="nominatorName"
                    name="nominatorName"
                    type="text"
                    placeholder="Your full name"
                    value={formData.nominatorName}
                    onChange={handleChange}
                    required
                  />
                  {errors.nominatorName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.nominatorName}
                    </p>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="nominatorEmail">Email ID *</Label>
                  <Input
                    id="nominatorEmail"
                    name="nominatorEmail"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.nominatorEmail}
                    onChange={handleChange}
                    required
                  />
                  {errors.nominatorEmail && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.nominatorEmail}
                    </p>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="nominatorMobile">Mobile Number *</Label>
                  <Input
                    id="nominatorMobile"
                    name="nominatorMobile"
                    type="tel"
                    placeholder="9876543210"
                    value={formData.nominatorMobile}
                    onChange={handleChange}
                    required
                  />
                  {errors.nominatorMobile && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.nominatorMobile}
                    </p>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="currentDesignation">
                    Current Designation *
                  </Label>
                  <Input
                    id="currentDesignation"
                    name="currentDesignation"
                    type="text"
                    placeholder="Your current position"
                    value={formData.currentDesignation}
                    onChange={handleChange}
                    required
                  />
                  {errors.currentDesignation && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.currentDesignation}
                    </p>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="country">Country *</Label>
                  <SelectCountry
                    value={formData.country}
                    onChange={(value) => handleSelectChange("country", value)}
                  />
                  {errors.country && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.country}
                    </p>
                  )}
                </FormField>
              </div>
            </div>
          )}

          {/* Tab 2: Nominee Details */}
          {activeTab === 2 && (
            <div className="space-y-6">
                <h2 className="sm:text-xl text-md dark:text-brand-500 font-semibold text-brand-500  mb-4">
                Nominee Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField>
                  <Label htmlFor="solution">Solution *</Label>
                  <SelectSolution
                    value={formData.solution}
                    onChange={(value) => handleSelectChange("solution", value)}
                  />
                  {errors.solution && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.solution}
                    </p>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="rollNumber">Roll Number</Label>
                  <Input
                    id="rollNumber"
                    name="rollNumber"
                    type="text"
                    placeholder="Nominee's roll number"
                    value={formData.rollNumber}
                    onChange={handleChange}
                  />
                </FormField>

                <FormField>
                  <Label htmlFor="nomineeName">Name *</Label>
                  <Input
                    id="nomineeName"
                    name="nomineeName"
                    type="text"
                    placeholder="Nominee's full name"
                    value={formData.nomineeName}
                    onChange={handleChange}
                    required
                  />
                  {errors.nomineeName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.nomineeName}
                    </p>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="nomineeEmail">Email ID *</Label>
                  <Input
                    id="nomineeEmail"
                    name="nomineeEmail"
                    type="email"
                    placeholder="nominee.email@example.com"
                    value={formData.nomineeEmail}
                    onChange={handleChange}
                    required
                  />
                  {errors.nomineeEmail && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.nomineeEmail}
                    </p>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="nomineeMobile">Mobile Number *</Label>
                  <Input
                    id="nomineeMobile"
                    name="nomineeMobile"
                    type="tel"
                    placeholder="9876543210"
                    value={formData.nomineeMobile}
                    onChange={handleChange}
                    required
                  />
                  {errors.nomineeMobile && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.nomineeMobile}
                    </p>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="nomineeDegree">Degree *</Label>
                  <SelectDegree
                    value={formData.nomineeDegree}
                    onChange={(value) =>
                      handleSelectChange("nomineeDegree", value)
                    }
                  />
                  {errors.nomineeDegree && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.nomineeDegree}
                    </p>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="nomineeDepartment">Department *</Label>
                  <SelectProgram
                    value={formData.nomineeDepartment}
                    onChange={(value) =>
                      handleSelectChange("nomineeDepartment", value)
                    }
                  />
                  {errors.nomineeDepartment && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.nomineeDepartment}
                    </p>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="nomineeGraduationYear">
                    Year of Graduation *
                  </Label>
                  <Input
                    id="nomineeGraduationYear"
                    name="nomineeGraduationYear"
                    type="number"
                    placeholder="2020"
                    value={formData.nomineeGraduationYear}
                    onChange={handleChange}
                    min="1950"
                    max="2030"
                    required
                  />
                  {errors.nomineeGraduationYear && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.nomineeGraduationYear}
                    </p>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="nomineeOrganization">Organization *</Label>
                  <Input
                    id="nomineeOrganization"
                    name="nomineeOrganization"
                    type="text"
                    placeholder="Nominee's organization"
                    value={formData.nomineeOrganization}
                    onChange={handleChange}
                    required
                  />
                  {errors.nomineeOrganization && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.nomineeOrganization}
                    </p>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="nomineeCountry">Country *</Label>
                  <SelectCountry
                    value={formData.nomineeCountry}
                    onChange={(value) =>
                      handleSelectChange("nomineeCountry", value)
                    }
                  />
                  {errors.nomineeCountry && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.nomineeCountry}
                    </p>
                  )}
                </FormField>
              </div>
            </div>
          )}

          {/* Tab 3: Other Information */}
          {activeTab === 3 && (
            <div className="space-y-6">
              <h2 className="sm:text-xl text-md dark:text-brand-500 font-semibold text-brand-500  mb-4">
                Other Information
              </h2>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <FormField>
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    value={formData.linkedin}
                    onChange={handleChange}
                  />
                  {errors.linkedin && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.linkedin}
                    </p>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="twitter">Twitter URL</Label>
                  <Input
                    id="twitter"
                    name="twitter"
                    type="url"
                    placeholder="https://twitter.com/username"
                    value={formData.twitter}
                    onChange={handleChange}
                  />
                  {errors.twitter && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.twitter}
                    </p>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="facebook">Facebook URL</Label>
                  <Input
                    id="facebook"
                    name="facebook"
                    type="url"
                    placeholder="https://facebook.com/username"
                    value={formData.facebook}
                    onChange={handleChange}
                  />
                  {errors.facebook && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.facebook}
                    </p>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="otherSocial">Other Social Media URL</Label>
                  <Input
                    id="otherSocial"
                    name="otherSocial"
                    type="url"
                    placeholder="https://example.com/username"
                    value={formData.otherSocial}
                    onChange={handleChange}
                  />
                  {errors.otherSocial && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.otherSocial}
                    </p>
                  )}
                </FormField>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Significant Achievements (at least 3) (max 100 characters)
                </h3>

                <FormField>
                  <Label htmlFor="achievement1">Achievement 1 *</Label>
                  <TextArea
                    id="achievement1"
                    name="achievement1"
                    placeholder="Describe significant achievement 1"
                    rows={3}
                    value={formData.achievement1}
                    onChange={handleChange}
                    maxLength={100}
                    required
                  />
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {formData.achievement1.length} / 100
                  </div>
                  {errors.achievement1 && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.achievement1}
                    </p>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="achievement2">Achievement 2 *</Label>
                  <TextArea
                    id="achievement2"
                    name="achievement2"
                    placeholder="Describe significant achievement"
                    rows={3}
                    value={formData.achievement2}
                    onChange={handleChange}
                    maxLength={100}
                    required
                  />
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {formData.achievement2.length} / 100
                  </div>
                  {errors.achievement2 && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.achievement2}
                    </p>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="achievement3">Achievement 3 *</Label>
                  <TextArea
                    id="achievement3"
                    name="achievement3"
                    placeholder="Describe significant achievement 3"
                    rows={3}
                    value={formData.achievement3}
                    onChange={handleChange}
                    maxLength={100}
                    required
                  />
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {formData.achievement3.length} / 100
                  </div>
                  {errors.achievement3 && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.achievement3}
                    </p>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="otherInformation">
                    Any other information that will strengthen your
                    recommendation *
                  </Label>
                  <TextArea
                    id="otherInformation"
                    name="otherInformation"
                    placeholder="Additional information to support the nomination"
                    rows={4}
                    value={formData.otherInformation}
                    onChange={handleChange}
                    maxLength={500}
                    required
                  />
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {formData.otherInformation.length} / 500
                  </div>
                  {errors.otherInformation && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.otherInformation}
                    </p>
                  )}
                </FormField>
              </div>
            </div>
          )}

          {/* Tab 4: Attachments */}
          {activeTab === 4 && (
            <div className="space-y-6">
             <h2 className="sm:text-xl text-md dark:text-brand-500 font-semibold text-brand-500  mb-4">
                Attachments
              </h2>

              <div className="space-y-6">
                <FormField>
                  <Label htmlFor="recommendationDoc">
                    Recommendation document * (PDF, max 8MB)
                  </Label>
                  <DropzoneComponent
                    onFilesChange={(files) =>
                      handleFileUpload("recommendationDoc", files)
                    }
                    maxFiles={1}
                    maxSize={8 * 1024 * 1024}
                    acceptedFiles={["application/pdf"]}
                  />
                  {errors.recommendationDoc && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.recommendationDoc}
                    </p>
                  )}
                  {formData.recommendationDoc && (
                    <p className="mt-1 text-sm text-green-600">
                      ✓ {formData.recommendationDoc.name}
                    </p>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="nomineeProfile">
                    Upload a brief profile of nominee * (PDF, max 8MB)
                  </Label>
                  <DropzoneComponent
                    onFilesChange={(files) =>
                      handleFileUpload("nomineeProfile", files)
                    }
                    maxFiles={1}
                    maxSize={8 * 1024 * 1024}
                    acceptedFiles={["application/pdf"]}
                  />
                  {errors.nomineeProfile && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.nomineeProfile}
                    </p>
                  )}
                  {formData.nomineeProfile && (
                    <p className="mt-1 text-sm text-green-600">
                      ✓ {formData.nomineeProfile.name}
                    </p>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="nomineePhoto">
                    Upload a high resolution photograph of the nominee *
                    (JPG/PNG, max 8MB)
                  </Label>
                  <DropzoneComponent
                    onFilesChange={(files) =>
                      handleFileUpload("nomineePhoto", files)
                    }
                    maxFiles={1}
                    maxSize={8 * 1024 * 1024}
                    acceptedFiles={["image/jpeg", "image/png"]}
                  />
                  {errors.nomineePhoto && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.nomineePhoto}
                    </p>
                  )}
                  {formData.nomineePhoto && (
                    <p className="mt-1 text-sm text-green-600">
                      ✓ {formData.nomineePhoto.name}
                    </p>
                  )}
                </FormField>

                {/* Supporting Documents */}
                {[1, 2, 3, 4, 5].map((docNum) => (
                  <FormField key={docNum}>
                    <Label htmlFor={`supportingDoc${docNum}`}>
                      Supporting document {docNum} (PDF, max 8MB) - Optional
                    </Label>
                    <DropzoneComponent
                      onFilesChange={(files) =>
                        handleFileUpload(`supportingDoc${docNum}`, files)
                      }
                      maxFiles={1}
                      maxSize={8 * 1024 * 1024}
                      acceptedFiles={["application/pdf"]}
                    />
                    {formData[`supportingDoc${docNum}`] && (
                      <p className="mt-1 text-sm text-green-600">
                        ✓ {formData[`supportingDoc${docNum}`].name}
                      </p>
                    )}
                  </FormField>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <div>
              {activeTab > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={isSubmitting}
                  className="text-sm sm:text-base"
                >
                  Previous
                </Button>
              )}
            </div>

            <div className="flex gap-3">
              {activeTab < 4 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="text-sm sm:text-base"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-sm sm:text-base"
                >
                  {isSubmitting ? "Submitting..." : "Submit DSA Nomination"}
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DSANominationForm;
// "use client";
// import React, { useState } from "react";
// import * as yup from "yup";
// import Button from "@/src/components/ui/button/Button";
// import Input from "@/src/components/ui/input/InputField";
// import Label from "@/src/components/ui/input/Label";
// import TextArea from "@/src/components/ui/input/TextArea";
// import DropzoneComponent from "@/src/components/form/form-elements/DropZone";
// import { useRouter } from "next/navigation";

// // Create a simple Select component
// const Select = ({
//   id,
//   name,
//   value,
//   onChange,
//   options,
//   placeholder,
//   required = false,
// }) => {
//   return (
//     <select
//       id={id}
//       name={name}
//       value={value}
//       onChange={onChange}
//       required={required}
//       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
//     >
//       <option value="">{placeholder}</option>
//       {options.map((option) => (
//         <option key={option.value} value={option.value}>
//           {option.label}
//         </option>
//       ))}
//     </select>
//   );
// };

// // Validation Schemas for each tab
// const nominatorSchema = yup.object().shape({
//   salutation: yup.string().required("Salutation is required"),
//   nominatorName: yup
//     .string()
//     .required("Name is required")
//     .min(2, "Name must be at least 2 characters"),
//   nominatorEmail: yup
//     .string()
//     .required("Email is required")
//     .email("Please enter a valid email address"),
//   nominatorMobile: yup
//     .string()
//     .required("Mobile number is required")
//     .matches(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"),
//   currentDesignation: yup.string().required("Current designation is required"),
//   country: yup.string().required("Country is required"),
// });

// const nomineeSchema = yup.object().shape({
//   solution: yup.string().required("Solution is required"),
//   rollNumber: yup.string().optional(),
//   nomineeName: yup
//     .string()
//     .required("Nominee name is required")
//     .min(2, "Name must be at least 2 characters"),
//   nomineeEmail: yup
//     .string()
//     .required("Email is required")
//     .email("Please enter a valid email address"),
//   nomineeMobile: yup
//     .string()
//     .required("Mobile number is required")
//     .matches(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"),
//   nomineeDegree: yup.string().required("Degree is required"),
//   nomineeDepartment: yup.string().required("Department is required"),
//   nomineeGraduationYear: yup
//     .string()
//     .required("Graduation year is required")
//     .matches(/^[0-9]{4}$/, "Please enter a valid year"),
//   nomineeOrganization: yup.string().required("Organization is required"),
//   nomineeCountry: yup.string().required("Country is required"),
// });

// const otherInfoSchema = yup.object().shape({
//   linkedin: yup.string().url("Please enter a valid LinkedIn URL").nullable(),
//   twitter: yup.string().url("Please enter a valid Twitter URL").nullable(),
//   facebook: yup.string().url("Please enter a valid Facebook URL").nullable(),
//   otherSocial: yup.string().url("Please enter a valid URL").nullable(),
//   achievement1: yup
//     .string()
//     .required("Achievement 1 is required")
//     .max(100, "Achievement must be 100 characters or less"),
//   achievement2: yup
//     .string()
//     .required("Achievement 2 is required")
//     .max(100, "Achievement must be 100 characters or less"),
//   achievement3: yup
//     .string()
//     .required("Achievement 3 is required")
//     .max(100, "Achievement must be 100 characters or less"),
//   otherInformation: yup
//     .string()
//     .required("Additional information is required")
//     .max(500, "Information must be 500 characters or less"),
// });

// const attachmentsSchema = yup.object().shape({
//   recommendationDoc: yup
//     .mixed()
//     .required("Recommendation document is required")
//     .test("fileType", "Only PDF files are allowed", (value) => {
//       if (!value) return false;
//       return value.type === "application/pdf";
//     })
//     .test("fileSize", "File size must be less than 8MB", (value) => {
//       if (!value) return false;
//       return value.size <= 8 * 1024 * 1024;
//     }),
//   nomineeProfile: yup
//     .mixed()
//     .required("Nominee profile is required")
//     .test("fileType", "Only PDF files are allowed", (value) => {
//       if (!value) return false;
//       return value.type === "application/pdf";
//     })
//     .test("fileSize", "File size must be less than 8MB", (value) => {
//       if (!value) return false;
//       return value.size <= 8 * 1024 * 1024;
//     }),
//   nomineePhoto: yup
//     .mixed()
//     .required("Nominee photograph is required")
//     .test("fileType", "Only JPG/PNG files are allowed", (value) => {
//       if (!value) return false;
//       return ["image/jpeg", "image/png"].includes(value.type);
//     })
//     .test("fileSize", "File size must be less than 8MB", (value) => {
//       if (!value) return false;
//       return value.size <= 8 * 1024 * 1024;
//     }),
//   supportingDoc1: yup.mixed().nullable(),
//   supportingDoc2: yup.mixed().nullable(),
//   supportingDoc3: yup.mixed().nullable(),
//   supportingDoc4: yup.mixed().nullable(),
//   supportingDoc5: yup.mixed().nullable(),
// });

// // Options for dropdowns
// const salutationOptions = [
//   { value: "mr", label: "Mr." },
//   { value: "ms", label: "Ms." },
//   { value: "mrs", label: "Mrs." },
//   { value: "dr", label: "Dr." },
//   { value: "prof", label: "Prof." },
// ];

// const solutionOptions = [
//   { value: "algorithm-design", label: "Algorithm Design" },
//   { value: "data-structures", label: "Data Structures" },
//   { value: "problem-solving", label: "Problem Solving" },
//   { value: "competitive-programming", label: "Competitive Programming" },
//   { value: "system-design", label: "System Design" },
//   { value: "software-engineering", label: "Software Engineering" },
// ];

// const degreeOptions = [
//   { value: "btech", label: "B.Tech" },
//   { value: "mtech", label: "M.Tech" },
//   { value: "phd", label: "PhD" },
//   { value: "msc", label: "M.Sc" },
//   { value: "bsc", label: "B.Sc" },
//   { value: "ba", label: "B.A." },
//   { value: "ma", label: "M.A." },
//   { value: "mba", label: "MBA" },
// ];

// const departmentOptions = [
//   { value: "cse", label: "Computer Science & Engineering" },
//   { value: "ece", label: "Electronics & Communication Engineering" },
//   { value: "mech", label: "Mechanical Engineering" },
//   { value: "civil", label: "Civil Engineering" },
//   { value: "it", label: "Information Technology" },
//   { value: "mathematics", label: "Mathematics" },
//   { value: "physics", label: "Physics" },
//   { value: "chemistry", label: "Chemistry" },
// ];

// const countryOptions = [
//   { value: "india", label: "India" },
//   { value: "usa", label: "United States" },
//   { value: "uk", label: "United Kingdom" },
//   { value: "canada", label: "Canada" },
//   { value: "australia", label: "Australia" },
//   { value: "germany", label: "Germany" },
//   { value: "singapore", label: "Singapore" },
// ];

// const DSANominationForm = () => {
//   const [activeTab, setActiveTab] = useState(1);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const router = useRouter();

//   // Form data state
//   const [formData, setFormData] = useState({
//     // Nominator Details
//     salutation: "",
//     nominatorName: "",
//     nominatorEmail: "",
//     nominatorMobile: "",
//     currentDesignation: "",
//     country: "",

//     // Nominee Details
//     solution: "",
//     rollNumber: "",
//     nomineeName: "",
//     nomineeEmail: "",
//     nomineeMobile: "",
//     nomineeDegree: "",
//     nomineeDepartment: "",
//     nomineeGraduationYear: "",
//     nomineeOrganization: "",
//     nomineeCountry: "",

//     // Other Information
//     linkedin: "",
//     twitter: "",
//     facebook: "",
//     otherSocial: "",
//     achievement1: "",
//     achievement2: "",
//     achievement3: "",
//     otherInformation: "",

//     // Attachments
//     recommendationDoc: null,
//     nomineeProfile: null,
//     nomineePhoto: null,
//     supportingDoc1: null,
//     supportingDoc2: null,
//     supportingDoc3: null,
//     supportingDoc4: null,
//     supportingDoc5: null,
//   });

//   const [errors, setErrors] = useState({});
//   const [tabCompletion, setTabCompletion] = useState({
//     1: false,
//     2: false,
//     3: false,
//     4: false,
//   });

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         type === "checkbox" ? checked : type === "file" ? files[0] : value,
//     }));

//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   // Handle file uploads for dropzone
//   const handleFileUpload = (name, files) => {
//     const file = files[0] || null;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: file,
//     }));

//     // Clear error when file is uploaded
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }

//     // Validate the file immediately
//     if (file) {
//       validateFileField(name, file);
//     }
//   };

//   // Validate individual file field
//   const validateFileField = async (fieldName, file) => {
//     try {
//       let schema;
//       switch (fieldName) {
//         case "recommendationDoc":
//           schema = yup
//             .mixed()
//             .required("Recommendation document is required")
//             .test("fileType", "Only PDF files are allowed", (value) => {
//               return value?.type === "application/pdf";
//             })
//             .test("fileSize", "File size must be less than 8MB", (value) => {
//               return value?.size <= 8 * 1024 * 1024;
//             });
//           break;
//         case "nomineeProfile":
//           schema = yup
//             .mixed()
//             .required("Nominee profile is required")
//             .test("fileType", "Only PDF files are allowed", (value) => {
//               return value?.type === "application/pdf";
//             })
//             .test("fileSize", "File size must be less than 8MB", (value) => {
//               return value?.size <= 8 * 1024 * 1024;
//             });
//           break;
//         case "nomineePhoto":
//           schema = yup
//             .mixed()
//             .required("Nominee photograph is required")
//             .test("fileType", "Only JPG/PNG files are allowed", (value) => {
//               return ["image/jpeg", "image/png"].includes(value?.type);
//             })
//             .test("fileSize", "File size must be less than 8MB", (value) => {
//               return value?.size <= 8 * 1024 * 1024;
//             });
//           break;
//         default:
//           return;
//       }

//       await schema.validate(file);
//       setErrors((prev) => ({ ...prev, [fieldName]: "" }));
//     } catch (error) {
//       if (error instanceof yup.ValidationError) {
//         setErrors((prev) => ({ ...prev, [fieldName]: error.message }));
//       }
//     }
//   };

//   // Validate current tab
//   const validateCurrentTab = async () => {
//     let schema;
//     switch (activeTab) {
//       case 1:
//         schema = nominatorSchema;
//         break;
//       case 2:
//         schema = nomineeSchema;
//         break;
//       case 3:
//         schema = otherInfoSchema;
//         break;
//       case 4:
//         schema = attachmentsSchema;
//         break;
//       default:
//         schema = nominatorSchema;
//     }

//     try {
//       await schema.validate(formData, { abortEarly: false });
//       setErrors({});
//       setTabCompletion((prev) => ({ ...prev, [activeTab]: true }));
//       return true;
//     } catch (error) {
//       if (error instanceof yup.ValidationError) {
//         const newErrors = {};
//         error.inner.forEach((err) => {
//           if (err.path) {
//             newErrors[err.path] = err.message;
//           }
//         });
//         setErrors(newErrors);
//         console.log(`❌ Tab ${activeTab} Validation Errors:`, newErrors);
//       }
//       return false;
//     }
//   };

//   // Navigate to next tab
//   const handleNext = async () => {
//     const isValid = await validateCurrentTab();
//     if (isValid && activeTab < 4) {
//       console.log(`📋 DSA TAB ${activeTab} COMPLETED - ALL FIELDS:`);

//       switch (activeTab) {
//         case 1:
//           console.log("=== NOMINATOR DETAILS ===");
//           console.log("Salutation:", formData.salutation);
//           console.log("Name:", formData.nominatorName);
//           console.log("Email:", formData.nominatorEmail);
//           console.log("Mobile:", formData.nominatorMobile);
//           console.log("Current Designation:", formData.currentDesignation);
//           console.log("Country:", formData.country);
//           break;

//         case 2:
//           console.log("=== NOMINEE DETAILS ===");
//           console.log("Solution:", formData.solution);
//           console.log("Roll Number:", formData.rollNumber);
//           console.log("Name:", formData.nomineeName);
//           console.log("Email:", formData.nomineeEmail);
//           console.log("Mobile:", formData.nomineeMobile);
//           console.log("Degree:", formData.nomineeDegree);
//           console.log("Department:", formData.nomineeDepartment);
//           console.log("Graduation Year:", formData.nomineeGraduationYear);
//           console.log("Organization:", formData.nomineeOrganization);
//           console.log("Country:", formData.nomineeCountry);
//           break;

//         case 3:
//           console.log("=== OTHER INFORMATION ===");
//           console.log("LinkedIn:", formData.linkedin);
//           console.log("Twitter:", formData.twitter);
//           console.log("Facebook:", formData.facebook);
//           console.log("Other Social:", formData.otherSocial);
//           console.log("Achievement 1:", formData.achievement1);
//           console.log("Achievement 2:", formData.achievement2);
//           console.log("Achievement 3:", formData.achievement3);
//           console.log("Other Information:", formData.otherInformation);
//           break;
//       }

//       setActiveTab(activeTab + 1);
//     }
//   };

//   // Navigate to previous tab
//   const handlePrevious = () => {
//     if (activeTab > 1) {
//       setActiveTab(activeTab - 1);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       // Validate all tabs
//       const tab1Valid = await nominatorSchema.isValid(formData);
//       const tab2Valid = await nomineeSchema.isValid(formData);
//       const tab3Valid = await otherInfoSchema.isValid(formData);
//       const tab4Valid = await attachmentsSchema.isValid(formData);

//       console.log("🔍 DSA VALIDATION STATUS:", {
//         tab1: tab1Valid,
//         tab2: tab2Valid,
//         tab3: tab3Valid,
//         tab4: tab4Valid,
//       });

//       if (tab1Valid && tab2Valid && tab3Valid && tab4Valid) {
//         console.log("🚀 DSA NOMINATION FORM - FINAL SUBMISSION");
//         console.log("✅ ALL TABS VALIDATED SUCCESSFULLY");

//         // Log COMPLETE FORM DATA - ALL 4 TABS TOGETHER
//         console.log("📊 DSA COMPLETE FORM DATA - ALL TABS:");

//         console.log("=== TAB 1: NOMINATOR DETAILS ===");
//         console.log({
//           salutation: formData.salutation,
//           nominatorName: formData.nominatorName,
//           nominatorEmail: formData.nominatorEmail,
//           nominatorMobile: formData.nominatorMobile,
//           currentDesignation: formData.currentDesignation,
//           country: formData.country,
//         });

//         console.log("=== TAB 2: NOMINEE DETAILS ===");
//         console.log({
//           solution: formData.solution,
//           rollNumber: formData.rollNumber,
//           nomineeName: formData.nomineeName,
//           nomineeEmail: formData.nomineeEmail,
//           nomineeMobile: formData.nomineeMobile,
//           nomineeDegree: formData.nomineeDegree,
//           nomineeDepartment: formData.nomineeDepartment,
//           nomineeGraduationYear: formData.nomineeGraduationYear,
//           nomineeOrganization: formData.nomineeOrganization,
//           nomineeCountry: formData.nomineeCountry,
//         });

//         console.log("=== TAB 3: OTHER INFORMATION ===");
//         console.log({
//           linkedin: formData.linkedin,
//           twitter: formData.twitter,
//           facebook: formData.facebook,
//           otherSocial: formData.otherSocial,
//           achievement1: formData.achievement1,
//           achievement2: formData.achievement2,
//           achievement3: formData.achievement3,
//           otherInformation: formData.otherInformation,
//         });

//         console.log("=== TAB 4: ATTACHMENTS ===");
//         console.log({
//           recommendationDoc: formData.recommendationDoc
//             ? {
//                 name: formData.recommendationDoc.name,
//                 size: formData.recommendationDoc.size,
//                 type: formData.recommendationDoc.type,
//               }
//             : null,
//           nomineeProfile: formData.nomineeProfile
//             ? {
//                 name: formData.nomineeProfile.name,
//                 size: formData.nomineeProfile.size,
//                 type: formData.nomineeProfile.type,
//               }
//             : null,
//           nomineePhoto: formData.nomineePhoto
//             ? {
//                 name: formData.nomineePhoto.name,
//                 size: formData.nomineePhoto.size,
//                 type: formData.nomineePhoto.type,
//               }
//             : null,
//           supportingDocs: [
//             formData.supportingDoc1?.name,
//             formData.supportingDoc2?.name,
//             formData.supportingDoc3?.name,
//             formData.supportingDoc4?.name,
//             formData.supportingDoc5?.name,
//           ].filter(Boolean),
//         });

//         // Simulate API call
//         await new Promise((resolve) => setTimeout(resolve, 2000));

//         setIsSubmitted(true);
//         console.log("🎉 DSA NOMINATION SUBMITTED SUCCESSFULLY!");
//       } else {
//         console.log("❌ DSA FORM VALIDATION FAILED:");
//         console.log("Tab 1 (Nominator):", tab1Valid);
//         console.log("Tab 2 (Nominee):", tab2Valid);
//         console.log("Tab 3 (Other Info):", tab3Valid);
//         console.log("Tab 4 (Attachments):", tab4Valid);

//         // Find the first invalid tab and navigate to it
//         if (!tab1Valid) setActiveTab(1);
//         else if (!tab2Valid) setActiveTab(2);
//         else if (!tab3Valid) setActiveTab(3);
//         else if (!tab4Valid) setActiveTab(4);
//       }
//     } catch (error) {
//       console.error("💥 DSA SUBMISSION ERROR:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Tab Navigation Component
//   const TabNavigation = () => {
//     const canNavigateToTab = (targetTab) => {
//       if (targetTab === 1) return true; // Always allow first tab

//       // Check if all previous tabs are completed
//       for (let i = 1; i < targetTab; i++) {
//         if (!tabCompletion[i]) {
//           return false;
//         }
//       }
//       return true;
//     };

//     return (
//       <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 flex-wrap">
//         {[1, 2, 3, 4].map((tab) => (
//           <button
//             key={tab}
//             type="button"
//             onClick={() => {
//               if (canNavigateToTab(tab)) {
//                 setActiveTab(tab);
//               }
//             }}
//             className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
//               activeTab === tab
//                 ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
//                 : canNavigateToTab(tab)
//                 ? "text-green-600 dark:text-green-400 cursor-pointer"
//                 : "text-gray-500 dark:text-gray-400 cursor-not-allowed"
//             }`}
//             disabled={!canNavigateToTab(tab)}
//           >
//             {tab === 1 && "Nominator Details"}
//             {tab === 2 && "Nominee Details"}
//             {tab === 3 && "Other Information"}
//             {tab === 4 && "Attachments"}
//             {tabCompletion[tab] && (
//               <span className="ml-2 text-green-500">✓</span>
//             )}
//           </button>
//         ))}
//       </div>
//     );
//   };

//   if (isSubmitted) {
//     return (
//       <div className="p-8 text-center">
//         <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
//           <svg
//             className="w-16 h-16 text-green-500 mx-auto mb-4"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M5 13l4 4L19 7"
//             ></path>
//           </svg>
//           <h3 className="text-2xl font-bold text-gray-800 dark:text-white/90 mb-2">
//             DSA Nomination Submitted Successfully!
//           </h3>
//           <p className="text-gray-600 dark:text-gray-400">
//             Thank you for submitting your DSA nomination. We'll review your
//             submission and get back to you soon.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className=" border-gray-200 rounded-2xl dark:border-gray-800">
//       <div className="sm:mb-8 mb-2 flex justify-between items-center">
//         <div>
//           <h1 className="text-xl font-bold text-brand-500 dark:text-white mb-2">
//             DSA Nomination Form
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400 sm:block hidden">
//             Please complete all sections of the DSA nomination form. Each tab
//             must be completed before proceeding to the next.
//           </p>
//         </div>
//         <div className="sm:block hidden">
//           <button
//             onClick={() => router.back()}
//             className="text-brand-600 dark:text-brand-400 hover:underline  sm:text-md text-md"
//           >
//             ← Back to Nominations
//           </button>
//         </div>
//         <div className="sm:hidden block">
//           <button
//             onClick={() => router.back()}
//             className="text-brand-600 dark:text-brand-400 hover:underline  sm:text-md text-md"
//           >
//             ← Back
//           </button>
//         </div>
//       </div>
//       <p className="text-gray-600 dark:text-gray-400 sm:hidden block mb-4">
//         Please complete all sections of the DSA nomination form. Each tab must
//         be completed before proceeding to the next.
//       </p>

//       <TabNavigation />

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Tab 1: Nominator Details */}
//         {activeTab === 1 && (
//           <div className="space-y-6">
//             <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
//               Nominator Details
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               <div>
//                 <Label htmlFor="salutation">Salutation *</Label>
//                 <Select
//                   id="salutation"
//                   name="salutation"
//                   value={formData.salutation}
//                   onChange={handleChange}
//                   options={salutationOptions}
//                   placeholder="--Select Salutation--"
//                   required
//                 />
//                 {errors.salutation && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.salutation}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="nominatorName">Name *</Label>
//                 <Input
//                   id="nominatorName"
//                   name="nominatorName"
//                   type="text"
//                   placeholder="Your full name"
//                   value={formData.nominatorName}
//                   onChange={handleChange}
//                   required
//                 />
//                 {errors.nominatorName && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.nominatorName}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="nominatorEmail">Email ID *</Label>
//                 <Input
//                   id="nominatorEmail"
//                   name="nominatorEmail"
//                   type="email"
//                   placeholder="your.email@example.com"
//                   value={formData.nominatorEmail}
//                   onChange={handleChange}
//                   required
//                 />
//                 {errors.nominatorEmail && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.nominatorEmail}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="nominatorMobile">Mobile Number *</Label>
//                 <Input
//                   id="nominatorMobile"
//                   name="nominatorMobile"
//                   type="tel"
//                   placeholder="9876543210"
//                   value={formData.nominatorMobile}
//                   onChange={handleChange}
//                   required
//                 />
//                 {errors.nominatorMobile && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.nominatorMobile}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="currentDesignation">
//                   Current Designation *
//                 </Label>
//                 <Input
//                   id="currentDesignation"
//                   name="currentDesignation"
//                   type="text"
//                   placeholder="Your current position"
//                   value={formData.currentDesignation}
//                   onChange={handleChange}
//                   required
//                 />
//                 {errors.currentDesignation && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.currentDesignation}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="country">Country *</Label>
//                 <Select
//                   id="country"
//                   name="country"
//                   value={formData.country}
//                   onChange={handleChange}
//                   options={countryOptions}
//                   placeholder="--Select Country--"
//                   required
//                 />
//                 {errors.country && (
//                   <p className="mt-1 text-sm text-red-500">{errors.country}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Tab 2: Nominee Details */}
//         {activeTab === 2 && (
//           <div className="space-y-6">
//             <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
//               Nominee Details
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               <div>
//                 <Label htmlFor="solution">Solution *</Label>
//                 <Select
//                   id="solution"
//                   name="solution"
//                   value={formData.solution}
//                   onChange={handleChange}
//                   options={solutionOptions}
//                   placeholder="--Select Solution--"
//                   required
//                 />
//                 {errors.solution && (
//                   <p className="mt-1 text-sm text-red-500">{errors.solution}</p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="rollNumber">Roll Number</Label>
//                 <Input
//                   id="rollNumber"
//                   name="rollNumber"
//                   type="text"
//                   placeholder="Nominee's roll number"
//                   value={formData.rollNumber}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="nomineeName">Name *</Label>
//                 <Input
//                   id="nomineeName"
//                   name="nomineeName"
//                   type="text"
//                   placeholder="Nominee's full name"
//                   value={formData.nomineeName}
//                   onChange={handleChange}
//                   required
//                 />
//                 {errors.nomineeName && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.nomineeName}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="nomineeEmail">Email ID *</Label>
//                 <Input
//                   id="nomineeEmail"
//                   name="nomineeEmail"
//                   type="email"
//                   placeholder="nominee.email@example.com"
//                   value={formData.nomineeEmail}
//                   onChange={handleChange}
//                   required
//                 />
//                 {errors.nomineeEmail && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.nomineeEmail}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="nomineeMobile">Mobile Number *</Label>
//                 <Input
//                   id="nomineeMobile"
//                   name="nomineeMobile"
//                   type="tel"
//                   placeholder="9876543210"
//                   value={formData.nomineeMobile}
//                   onChange={handleChange}
//                   required
//                 />
//                 {errors.nomineeMobile && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.nomineeMobile}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="nomineeDegree">Degree *</Label>
//                 <Select
//                   id="nomineeDegree"
//                   name="nomineeDegree"
//                   value={formData.nomineeDegree}
//                   onChange={handleChange}
//                   options={degreeOptions}
//                   placeholder="--Select Degree--"
//                   required
//                 />
//                 {errors.nomineeDegree && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.nomineeDegree}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="nomineeDepartment">Department *</Label>
//                 <Select
//                   id="nomineeDepartment"
//                   name="nomineeDepartment"
//                   value={formData.nomineeDepartment}
//                   onChange={handleChange}
//                   options={departmentOptions}
//                   placeholder="--Select Department--"
//                   required
//                 />
//                 {errors.nomineeDepartment && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.nomineeDepartment}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="nomineeGraduationYear">
//                   Year of Graduation *
//                 </Label>
//                 <Input
//                   id="nomineeGraduationYear"
//                   name="nomineeGraduationYear"
//                   type="number"
//                   placeholder="2020"
//                   value={formData.nomineeGraduationYear}
//                   onChange={handleChange}
//                   min="1950"
//                   max="2030"
//                   required
//                 />
//                 {errors.nomineeGraduationYear && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.nomineeGraduationYear}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="nomineeOrganization">Organization *</Label>
//                 <Input
//                   id="nomineeOrganization"
//                   name="nomineeOrganization"
//                   type="text"
//                   placeholder="Nominee's organization"
//                   value={formData.nomineeOrganization}
//                   onChange={handleChange}
//                   required
//                 />
//                 {errors.nomineeOrganization && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.nomineeOrganization}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="nomineeCountry">Country *</Label>
//                 <Select
//                   id="nomineeCountry"
//                   name="nomineeCountry"
//                   value={formData.nomineeCountry}
//                   onChange={handleChange}
//                   options={countryOptions}
//                   placeholder="--Select Country--"
//                   required
//                 />
//                 {errors.nomineeCountry && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.nomineeCountry}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Tab 3: Other Information */}
//         {activeTab === 3 && (
//           <div className="space-y-6">
//             <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
//               Other Information
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <Label htmlFor="linkedin">LinkedIn URL</Label>
//                 <Input
//                   id="linkedin"
//                   name="linkedin"
//                   type="url"
//                   placeholder="https://linkedin.com/in/username"
//                   value={formData.linkedin}
//                   onChange={handleChange}
//                 />
//                 {errors.linkedin && (
//                   <p className="mt-1 text-sm text-red-500">{errors.linkedin}</p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="twitter">Twitter URL</Label>
//                 <Input
//                   id="twitter"
//                   name="twitter"
//                   type="url"
//                   placeholder="https://twitter.com/username"
//                   value={formData.twitter}
//                   onChange={handleChange}
//                 />
//                 {errors.twitter && (
//                   <p className="mt-1 text-sm text-red-500">{errors.twitter}</p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="facebook">Facebook URL</Label>
//                 <Input
//                   id="facebook"
//                   name="facebook"
//                   type="url"
//                   placeholder="https://facebook.com/username"
//                   value={formData.facebook}
//                   onChange={handleChange}
//                 />
//                 {errors.facebook && (
//                   <p className="mt-1 text-sm text-red-500">{errors.facebook}</p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="otherSocial">Other Social Media URL</Label>
//                 <Input
//                   id="otherSocial"
//                   name="otherSocial"
//                   type="url"
//                   placeholder="https://example.com/username"
//                   value={formData.otherSocial}
//                   onChange={handleChange}
//                 />
//                 {errors.otherSocial && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.otherSocial}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="space-y-4">
//               <h3 className="text-lg font-medium text-gray-900 dark:text-white">
//                 Significant Achievements (at least 3) (max 100 characters)
//               </h3>

//               <div>
//                 <Label htmlFor="achievement1">Achievement 1 *</Label>
//                 <TextArea
//                   id="achievement1"
//                   name="achievement1"
//                   placeholder="Describe significant achievement 1"
//                   rows={3}
//                   value={formData.achievement1}
//                   onChange={handleChange}
//                   maxLength={100}
//                   required
//                 />
//                 <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                   {formData.achievement1.length} / 100
//                 </div>
//                 {errors.achievement1 && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.achievement1}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="achievement2">Achievement 2 *</Label>
//                 <TextArea
//                   id="achievement2"
//                   name="achievement2"
//                   placeholder="Describe significant achievement 2"
//                   rows={3}
//                   value={formData.achievement2}
//                   onChange={handleChange}
//                   maxLength={100}
//                   required
//                 />
//                 <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                   {formData.achievement2.length} / 100
//                 </div>
//                 {errors.achievement2 && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.achievement2}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="achievement3">Achievement 3 *</Label>
//                 <TextArea
//                   id="achievement3"
//                   name="achievement3"
//                   placeholder="Describe significant achievement 3"
//                   rows={3}
//                   value={formData.achievement3}
//                   onChange={handleChange}
//                   maxLength={100}
//                   required
//                 />
//                 <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                   {formData.achievement3.length} / 100
//                 </div>
//                 {errors.achievement3 && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.achievement3}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="otherInformation">
//                   Any other information that will strengthen your recommendation
//                   *
//                 </Label>
//                 <TextArea
//                   id="otherInformation"
//                   name="otherInformation"
//                   placeholder="Additional information to support the nomination"
//                   rows={4}
//                   value={formData.otherInformation}
//                   onChange={handleChange}
//                   maxLength={500}
//                   required
//                 />
//                 <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                   {formData.otherInformation.length} / 500
//                 </div>
//                 {errors.otherInformation && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.otherInformation}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Tab 4: Attachments */}
//         {activeTab === 4 && (
//           <div className="space-y-6">
//             <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
//               Attachments
//             </h2>

//             <div className="space-y-6">
//               <div>
//                 <Label htmlFor="recommendationDoc">
//                   Recommendation document * (PDF, max 8MB)
//                 </Label>
//                 <DropzoneComponent
//                   onFilesChange={(files) =>
//                     handleFileUpload("recommendationDoc", files)
//                   }
//                   maxFiles={1}
//                   maxSize={8 * 1024 * 1024}
//                   acceptedFiles={["application/pdf"]}
//                 />
//                 {errors.recommendationDoc && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.recommendationDoc}
//                   </p>
//                 )}
//                 {formData.recommendationDoc && (
//                   <p className="mt-1 text-sm text-green-600">
//                     ✓ {formData.recommendationDoc.name}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="nomineeProfile">
//                   Upload a brief profile of nominee * (PDF, max 8MB)
//                 </Label>
//                 <DropzoneComponent
//                   onFilesChange={(files) =>
//                     handleFileUpload("nomineeProfile", files)
//                   }
//                   maxFiles={1}
//                   maxSize={8 * 1024 * 1024}
//                   acceptedFiles={["application/pdf"]}
//                 />
//                 {errors.nomineeProfile && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.nomineeProfile}
//                   </p>
//                 )}
//                 {formData.nomineeProfile && (
//                   <p className="mt-1 text-sm text-green-600">
//                     ✓ {formData.nomineeProfile.name}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="nomineePhoto">
//                   Upload a high resolution photograph of the nominee * (JPG/PNG,
//                   max 8MB)
//                 </Label>
//                 <DropzoneComponent
//                   onFilesChange={(files) =>
//                     handleFileUpload("nomineePhoto", files)
//                   }
//                   maxFiles={1}
//                   maxSize={8 * 1024 * 1024}
//                   acceptedFiles={["image/jpeg", "image/png"]}
//                 />
//                 {errors.nomineePhoto && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.nomineePhoto}
//                   </p>
//                 )}
//                 {formData.nomineePhoto && (
//                   <p className="mt-1 text-sm text-green-600">
//                     ✓ {formData.nomineePhoto.name}
//                   </p>
//                 )}
//               </div>

//               {/* Supporting Documents */}
//               {[1, 2, 3, 4, 5].map((docNum) => (
//                 <div key={docNum}>
//                   <Label htmlFor={`supportingDoc${docNum}`}>
//                     Supporting document {docNum} (PDF, max 8MB) - Optional
//                   </Label>
//                   <DropzoneComponent
//                     onFilesChange={(files) =>
//                       handleFileUpload(`supportingDoc${docNum}`, files)
//                     }
//                     maxFiles={1}
//                     maxSize={8 * 1024 * 1024}
//                     acceptedFiles={["application/pdf"]}
//                   />
//                   {formData[`supportingDoc${docNum}`] && (
//                     <p className="mt-1 text-sm text-green-600">
//                       ✓ {formData[`supportingDoc${docNum}`].name}
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Navigation Buttons */}
//         <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
//           <div>
//             {activeTab > 1 && (
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={handlePrevious}
//                 disabled={isSubmitting}
//               >
//                 Previous
//               </Button>
//             )}
//           </div>

//           <div className="flex gap-3">
//             {activeTab < 4 ? (
//               <Button
//                 type="button"
//                 onClick={handleNext}
//                 disabled={isSubmitting}
//               >
//                 Next
//               </Button>
//             ) : (
//               <Button type="submit" disabled={isSubmitting}>
//                 {isSubmitting ? "Submitting..." : "Submit DSA Nomination"}
//               </Button>
//             )}
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default DSANominationForm;
