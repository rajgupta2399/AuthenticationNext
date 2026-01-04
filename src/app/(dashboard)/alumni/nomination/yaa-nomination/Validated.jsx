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
  nominatorAge: yup
    .number()
    .required("Age is required")
    .min(18, "Must be at least 18 years old")
    .max(100, "Age must be reasonable"),
  rollNumber: yup.string().optional(),
  degree: yup.string().required("Degree is required"),
  department: yup.string().required("Department is required"),
  graduationYear: yup
    .string()
    .required("Graduation year is required")
    .matches(/^[0-9]{4}$/, "Please enter a valid year"),
  currentDesignation: yup.string().required("Current designation is required"),
  organization: yup.string().required("Organization is required"),
  country: yup.string().required("Country is required"),
});

const nomineeSchema = yup.object().shape({
  nomineeSalutation: yup.string().required("Salutation is required"),
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
  nomineeAge: yup
    .number()
    .required("Age is required")
    .min(18, "Must be at least 18 years old")
    .max(100, "Age must be reasonable"),
  nomineeDegree: yup.string().required("Degree is required"),
  nomineeDepartment: yup.string().required("Department is required"),
  nomineeGraduationYear: yup
    .string()
    .required("Graduation year is required")
    .matches(/^[0-9]{4}$/, "Please enter a valid year"),
  nomineeDesignation: yup.string().required("Current designation is required"),
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
    .max(100, "Information must be 100 characters or less"),
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
      "File size must be less than 5MB",
      (value) => value?.size <= 5 * 1024 * 1024
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
      "File size must be less than 5MB",
      (value) => value?.size <= 5 * 1024 * 1024
    ),
  nomineePhoto: yup
    .mixed()
    .required("Nominee photograph is required")
    .test("fileType", "Only JPG/PNG files are allowed", (value) =>
      ["image/jpeg", "image/png"].includes(value?.type)
    )
    .test(
      "fileSize",
      "File size must be less than 5MB",
      (value) => value?.size <= 5 * 1024 * 1024
    ),
  supportingDoc1: yup.mixed().nullable(),
  supportingDoc2: yup.mixed().nullable(),
  supportingDoc3: yup.mixed().nullable(),
  supportingDoc4: yup.mixed().nullable(),
  supportingDoc5: yup.mixed().nullable(),
});

// Tab Navigation Component
const TabNavigation = ({ activeTab, setActiveTab, tabCompletion }) => {
  const canNavigateToTab = (targetTab) => {
    if (targetTab === 1) return true;
    for (let i = 1; i < targetTab; i++) {
      if (!tabCompletion[i]) return false;
    }
    return true;
  };

  const tabs = [
    { id: 1, label: "Nominator Details" },
    { id: 2, label: "Nominee Details" },
    { id: 3, label: "Other Information" },
    { id: 4, label: "Attachments" },
  ];

  return (
    <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => canNavigateToTab(tab.id) && setActiveTab(tab.id)}
          className={`flex-1 min-w-[140px] py-3 px-2 text-center font-medium transition-colors text-sm sm:text-base ${
            activeTab === tab.id
              ? "border-b-2 border-brand-500 text-brand-600 dark:text-brand-400"
              : canNavigateToTab(tab.id)
              ? "text-green-600 dark:text-green-400 cursor-pointer hover:text-green-700"
              : "text-gray-500 dark:text-gray-400 cursor-not-allowed"
          }`}
          disabled={!canNavigateToTab(tab.id)}
        >
          <span className="flex items-center justify-center gap-1">
            {tab.label}
            {tabCompletion[tab.id] && (
              <span className="text-green-500 text-lg">✓</span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
};

// Success Component
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
        Nomination Submitted Successfully!
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        Thank you for submitting your YAA nomination. We'll review your
        submission and get back to you soon.
      </p>
    </div>
  </div>
);

// Custom Select Component for Mobile Responsiveness
const CustomSelect = ({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  required = false,
  error,
}) => {
  return (
    <div>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white text-sm sm:text-base"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

// Form Field Component for better organization
const FormField = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

const YaaNominationForm = () => {
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
    nominatorAge: "",
    rollNumber: "",
    degree: "",
    department: "",
    graduationYear: "",
    currentDesignation: "",
    organization: "",
    country: "",

    // Nominee Details
    nomineeSalutation: "",
    nomineeName: "",
    nomineeEmail: "",
    nomineeMobile: "",
    nomineeAge: "",
    nomineeDegree: "",
    nomineeDepartment: "",
    nomineeGraduationYear: "",
    nomineeDesignation: "",
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
    const { name, value, type, checked, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
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
              "File size must be less than 5MB",
              (value) => value?.size <= 5 * 1024 * 1024
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
              "File size must be less than 5MB",
              (value) => value?.size <= 5 * 1024 * 1024
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
              "File size must be less than 5MB",
              (value) => value?.size <= 5 * 1024 * 1024
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
  const validateCurrentTab = async () => {
    let schema;
    switch (activeTab) {
      case 1:
        schema = nominatorSchema;
        break;
      case 2:
        schema = nomineeSchema;
        break;
      case 3:
        schema = otherInfoSchema;
        break;
      case 4:
        schema = attachmentsSchema;
        break;
      default:
        schema = nominatorSchema;
    }

    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      setTabCompletion((prev) => ({ ...prev, [activeTab]: true }));
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  // Navigate to next tab
  const handleNext = async () => {
    const isValid = await validateCurrentTab();
    if (isValid && activeTab < 4) {
      setActiveTab(activeTab + 1);
    }
  };

  // Navigate to previous tab
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
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsSubmitted(true);
      } else {
        // Find the first invalid tab and navigate to it
        if (!tab1Valid) setActiveTab(1);
        else if (!tab2Valid) setActiveTab(2);
        else if (!tab3Valid) setActiveTab(3);
        else if (!tab4Valid) setActiveTab(4);
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
    <div className="border-gray-200 rounded-md dark:border-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center sm:mb-8 mb-2">
        <div>
          <h1 className="sm:text-xl text-md font-bold text-brand-500 dark:text-white/90 mb-2">
            YAA Nomination Form
          </h1>
          <p className="text-gray-600 dark:text-gray-400 sm:block hidden">
            Please complete all sections of the nomination form. Each tab must
            be completed before proceeding to the next.
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

      <p className="text-gray-600 dark:text-gray-400 sm:hidden block sm:mb-0 mb-4 text-sm">
        Please complete all sections of the nomination form. Each tab must be
        completed before proceeding to the next.
      </p>

      <TabNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabCompletion={tabCompletion}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tab 1: Nominator Details */}
        {activeTab === 1 && (
          <div className="space-y-6">
            <h2 className="sm:text-2xl text-md dark:text-brand-500 font-semibold text-gray-900  mb-4">
              Nominator Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField>
                <Label htmlFor="salutation">Salutation *</Label>
                <DonationSelectPrefix
                  value={formData.salutation}
                  onChange={(value) => handleSelectChange("salutation", value)}
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
                <Label htmlFor="nominatorAge">Age *</Label>
                <Input
                  id="nominatorAge"
                  name="nominatorAge"
                  type="number"
                  placeholder="25"
                  value={formData.nominatorAge}
                  onChange={handleChange}
                  required
                />
                {errors.nominatorAge && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.nominatorAge}
                  </p>
                )}
              </FormField>

              <FormField>
                <Label htmlFor="rollNumber">Roll Number</Label>
                <Input
                  id="rollNumber"
                  name="rollNumber"
                  type="text"
                  placeholder="Your roll number"
                  value={formData.rollNumber}
                  onChange={handleChange}
                />
              </FormField>

              <FormField>
                <Label htmlFor="degree">Degree *</Label>
                <SelectDegree
                  value={formData.degree}
                  onChange={(value) => handleSelectChange("degree", value)}
                />
                {errors.degree && (
                  <p className="mt-1 text-sm text-red-500">{errors.degree}</p>
                )}
              </FormField>

              <FormField>
                <Label htmlFor="department">Department *</Label>
                <SelectProgram
                  value={formData.department}
                  onChange={(value) => handleSelectChange("department", value)}
                />
                {errors.department && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.department}
                  </p>
                )}
              </FormField>

              <FormField>
                <Label htmlFor="graduationYear">Year of Graduation *</Label>
                <Input
                  id="graduationYear"
                  name="graduationYear"
                  type="number"
                  placeholder="2020"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  min="1950"
                  max="2030"
                  required
                />
                {errors.graduationYear && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.graduationYear}
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
                <Label htmlFor="organization">Organization *</Label>
                <Input
                  id="organization"
                  name="organization"
                  type="text"
                  placeholder="Your organization name"
                  value={formData.organization}
                  onChange={handleChange}
                  required
                />
                {errors.organization && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.organization}
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
                  <p className="mt-1 text-sm text-red-500">{errors.country}</p>
                )}
              </FormField>
            </div>
          </div>
        )}

        {/* Tab 2: Nominee Details */}
        {activeTab === 2 && (
          <div className="space-y-6">
            <h2 className="sm:text-2xl text-md dark:text-brand-500 font-semibold text-gray-900  mb-4">
              Nominee Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField>
                <Label htmlFor="nomineeSalutation">Salutation *</Label>
                <DonationSelectPrefix
                  value={formData.nomineeSalutation}
                  onChange={(value) =>
                    handleSelectChange("nomineeSalutation", value)
                  }
                />
                {errors.nomineeSalutation && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.nomineeSalutation}
                  </p>
                )}
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
                <Label htmlFor="nomineeAge">Age *</Label>
                <Input
                  id="nomineeAge"
                  name="nomineeAge"
                  type="number"
                  placeholder="25"
                  value={formData.nomineeAge}
                  onChange={handleChange}
                  required
                />
                {errors.nomineeAge && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.nomineeAge}
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
                <Label htmlFor="nomineeDesignation">
                  Current Designation *
                </Label>
                <Input
                  id="nomineeDesignation"
                  name="nomineeDesignation"
                  type="text"
                  placeholder="Nominee's current position"
                  value={formData.nomineeDesignation}
                  onChange={handleChange}
                  required
                />
                {errors.nomineeDesignation && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.nomineeDesignation}
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
            {/* <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4"> */}
            <h2 className="sm:text-2xl text-md dark:text-brand-500 font-semibold text-gray-900  mb-4">
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
                  <p className="mt-1 text-sm text-red-500">{errors.linkedin}</p>
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
                  <p className="mt-1 text-sm text-red-500">{errors.twitter}</p>
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
                  <p className="mt-1 text-sm text-red-500">{errors.facebook}</p>
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
                  placeholder="Describe significant achievement 2"
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
                  placeholder="Describe significant achievement"
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
                  Any other information that will strengthen your recommendation
                  *
                </Label>
                <TextArea
                  id="otherInformation"
                  name="otherInformation"
                  placeholder="Additional information to support the nomination"
                  rows={4}
                  value={formData.otherInformation}
                  onChange={handleChange}
                  maxLength={100}
                  required
                />
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {formData.otherInformation.length} / 100
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
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Attachments
            </h2>

            <div className="space-y-6">
              <FormField>
                <Label htmlFor="recommendationDoc">
                  Recommendation document * (PDF, max 5MB)
                </Label>
                <DropzoneComponent
                  onFilesChange={(files) =>
                    handleFileUpload("recommendationDoc", files)
                  }
                  maxFiles={1}
                  maxSize={5 * 1024 * 1024}
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
                  Upload a brief profile of nominee * (PDF, max 5MB)
                </Label>
                <DropzoneComponent
                  onFilesChange={(files) =>
                    handleFileUpload("nomineeProfile", files)
                  }
                  maxFiles={1}
                  maxSize={5 * 1024 * 1024}
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
                  Upload a high resolution photograph of the nominee * (JPG/PNG,
                  max 5MB)
                </Label>
                <DropzoneComponent
                  onFilesChange={(files) =>
                    handleFileUpload("nomineePhoto", files)
                  }
                  maxFiles={1}
                  maxSize={5 * 1024 * 1024}
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
                    Supporting document {docNum} (PDF, max 5MB) - Optional
                  </Label>
                  <DropzoneComponent
                    onFilesChange={(files) =>
                      handleFileUpload(`supportingDoc${docNum}`, files)
                    }
                    maxFiles={1}
                    maxSize={5 * 1024 * 1024}
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
                {isSubmitting ? "Submitting..." : "Submit Nomination"}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default YaaNominationForm;
