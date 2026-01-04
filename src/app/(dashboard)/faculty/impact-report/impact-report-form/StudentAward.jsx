"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { SelectDegree, SelectProgram } from "../ImpcatReportFormComp";
import Label from "@/src/components/ui/input/Label";
import Input from "@/src/components/ui/input/InputField";
import TextArea from "@/src/components/ui/input/TextArea";
import toast from "react-hot-toast";
import Button from "@/src/components/ui/button/Button";
import DropzoneComponent from "@/src/components/form/form-elements/DropZone";

const StudentAward = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [formData, setFormData] = useState({
    // Personal Information
    degree: "",
    program: "",
    contactNumber: "",

    // Brief Overview
    educationalBackground: "",
    familyBackground: "",
    academicAchievements: "",
    awardsRecognition: "",
    extracurricularActivities: "",
    dreamsAspirations: "",

    // Impact of Award
    journeyChallenges: "",
    awardImpact: "",

    // Gratitude
    gratitudeMessage: "",
  });
  const [showScholarSamples, setShowScholarSamples] = useState(false);

  const [files, setFiles] = useState({
    profilePhoto: [],
    researchPapers: [],
    photographs: [],
  });

  // Sample gratitude messages
  const gratitudeSamples = {
    scholarship: [
      "Deepest gratitude for your contribution. During the year, this support has helped me in achieving my goals at IIT Kanpur and created a positive impact on me as an individual. Taking inspiration from you, someday, I also envision to back to society in any capacity and creating a positive impact.",
      "I am genuinely grateful for the support I received from you. Despite coming from a humble background, this scholarship helped me alleviate the financial burden that comes with pursuing higher education.",
      "Growing up, I always dreamt of pursuing my education at a prestigious institute like IIT Kanpur. However, coming from a humble background financial constraints always seemed to stand in my way. Your support through this scholarship has not only eased the financial burden on my family but also provided me the opportunity to pursue my dreams and make them a reality. Thank you for making a difference and supporting me!",
      "Sincerest Gratitude! Beginning college can be overwhelming in many ways. However, offered support, gave me the confidence and motivation to work hard and strive for excellence in my studies.  You are an inspiration and look forward to giving back to society, someday!",
      "Thank you! Receiving this scholarship has given me a great sense of confidence. This support has enabled me to focus on my studies and take advantage of the opportunities around.",
    ],
  };

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

  const handleSampleMessageSelect = (message) => {
    setFormData((prev) => ({
      ...prev,
      gratitudeMessage: prev.gratitudeMessage
        ? `${prev.gratitudeMessage}\n\n${message}`
        : message,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student Award Form Data:", formData);
    console.log("Uploaded Files:", files);
    toast.success("Student Award Form Submitted Successfully");

    router.push(`/faculty/impact-report/final-impact-report/${id}`);
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    const requiredFields = [
      "educationalBackground",
      "familyBackground",
      "dreamsAspirations",
      "journeyChallenges",
      "awardImpact",
      "gratitudeMessage",
    ];

    return requiredFields.every(
      (field) => formData[field] && formData[field].toString().trim() !== ""
    );
  };

  return (
    <div className="w-full h-full overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold text-brand-500">
              Student Award/Scholarship
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
                <Label htmlFor="recipient">Current Recipient</Label>
                <Input defaultValue={"pk"} disabled />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input defaultValue={"pk@gmail.com"} disabled />
              </div>

              {/* Degree */}
              <div>
                <Label htmlFor="degree">Degree *</Label>
                {formData.degree ? (
                  <Input
                    defaultValue={formData.degree}
                    disabled
                    readOnly
                  />
                ) : (
                  <SelectDegree
                    value={formData.degree}
                    onChange={(value) => handleInputChange("degree", value)}
                    required
                  />
                )}
              </div>

              {/* Program */}
              <div>
                <Label htmlFor="department">Program/Department *</Label>
                {formData.department ? (
                  <Input
                    defaultValue={formData.department}
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

              {/* Contact Number */}
              <div>
                <Label htmlFor="contactNumber">Contact Number *</Label>
                <Input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={(e) =>
                    handleInputChange("contactNumber", e.target.value)
                  }
                  required
                  placeholder="Enter your contact number"
                />
              </div>

              {/* Profile Photo Upload */}
              <div className="md:col-span-3">
                <Label htmlFor="profilePhoto">Profile Photo *</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Upload a clear profile photograph (JPG, PNG only)
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
                  <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                    ✓ Profile photo selected
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Brief Overview Section */}
          <section>
            <h2 className="text-md font-bold text-brand-500 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              Brief Overview
            </h2>
            <div className="space-y-6">
              {/* Educational Background */}
              <div>
                <Label htmlFor="educationalBackground">
                  Your Educational Background *
                </Label>
                <TextArea
                  name="educationalBackground"
                  value={formData.educationalBackground}
                  onChange={(e) =>
                    handleInputChange("educationalBackground", e.target.value)
                  }
                  required
                  placeholder="Describe your educational journey and background..."
                  rows={4}
                />
              </div>

              {/* Family Background */}
              <div>
                <Label htmlFor="familyBackground">
                  Your Family Background and Home Town *
                </Label>
                <TextArea
                  name="familyBackground"
                  value={formData.familyBackground}
                  onChange={(e) =>
                    handleInputChange("familyBackground", e.target.value)
                  }
                  required
                  placeholder="Tell us about your family background and hometown..."
                  rows={4}
                />
              </div>

              {/* Academic Achievements */}
              <div>
                <Label htmlFor="academicAchievements">
                  Academic Achievements (if any)
                </Label>
                <TextArea
                  name="academicAchievements"
                  value={formData.academicAchievements}
                  onChange={(e) =>
                    handleInputChange("academicAchievements", e.target.value)
                  }
                  placeholder="List any notable academic achievements, research work, or projects..."
                  rows={3}
                />
              </div>

              {/* Awards and Recognition */}
              <div>
                <Label htmlFor="awardsRecognition">
                  Awards and Recognition (if any)
                </Label>
                <TextArea
                  name="awardsRecognition"
                  value={formData.awardsRecognition}
                  onChange={(e) =>
                    handleInputChange("awardsRecognition", e.target.value)
                  }
                  placeholder="Mention any awards, scholarships, or recognition received..."
                  rows={3}
                />
              </div>

              {/* Extracurricular Activities */}
              <div>
                <Label htmlFor="extracurricularActivities">
                  Extracurricular Activities (if any)
                </Label>
                <TextArea
                  name="extracurricularActivities"
                  value={formData.extracurricularActivities}
                  onChange={(e) =>
                    handleInputChange(
                      "extracurricularActivities",
                      e.target.value
                    )
                  }
                  placeholder="Describe your involvement in sports, clubs, volunteering, or other activities..."
                  rows={3}
                />
              </div>

              {/* Dreams and Aspirations */}
              <div>
                <Label htmlFor="dreamsAspirations">
                  Your Dreams and Aspirations *
                </Label>
                <TextArea
                  name="dreamsAspirations"
                  value={formData.dreamsAspirations}
                  onChange={(e) =>
                    handleInputChange("dreamsAspirations", e.target.value)
                  }
                  required
                  placeholder="Share your future goals, dreams, and career aspirations..."
                  rows={4}
                />
              </div>
            </div>
          </section>

          {/* Impact of Award Section */}
          <section>
            <h2 className="text-md font-bold text-brand-500 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              Impact of Award/Scholarship
            </h2>
            <div className="space-y-6">
              {/* Journey Challenges */}
              <div>
                <Label htmlFor="journeyChallenges">
                  How has your journey to pursue IITK been so far? (mention any
                  challenges, struggles, and how you overcame them) *
                </Label>
                <TextArea
                  name="journeyChallenges"
                  value={formData.journeyChallenges}
                  onChange={(e) =>
                    handleInputChange("journeyChallenges", e.target.value)
                  }
                  required
                  placeholder="Describe your journey, challenges faced, and how you overcame them (minimum 100 words)..."
                  rows={5}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Minimum 100 words required
                </p>
              </div>

              {/* Award Impact */}
              <div>
                <Label htmlFor="awardImpact">
                  How has this award/scholarship impacted/helped you? *
                </Label>
                <TextArea
                  name="awardImpact"
                  value={formData.awardImpact}
                  onChange={(e) =>
                    handleInputChange("awardImpact", e.target.value)
                  }
                  required
                  placeholder="Explain how this award or scholarship has made a difference in your life and studies (minimum 100 words)..."
                  rows={5}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Minimum 100 words required
                </p>
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
                  Acknowledgement to donors detailing the impact of the Award/Prize *
                </Label>
                <TextArea
                  name="gratitudeMessage"
                  value={formData.gratitudeMessage}
                  onChange={(e) => handleInputChange("gratitudeMessage", e.target.value)}
                  required
                  placeholder="Using the sample messages below, personalize your gratitude message to the donor..."
                  rows={6}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  **Using the sample message above, you may personalize your gratitude message to the donor.
                </p>
              </div>

              {/* SAMPLE MESSAGES TOGGLE */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-brand-500 dark:text-white">
                    Sample Scholarship Gratitude Messages
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowScholarSamples(!showScholarSamples)}
                    className="px-3 py-2 text-sm bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
                  >
                    {showScholarSamples ? "Hide Sample" : "Show Sample"}
                  </button>
                </div>

                {/* SCHOLARSHIP SAMPLE LIST */}
                {showScholarSamples && (
                  <div className="space-y-3">
                    {gratitudeSamples.scholarship.map((message, index) => (
                      <button
                        key={`scholar-${index}`}
                        type="button"
                        onClick={() => handleSampleMessageSelect(message)}
                        className="block w-full text-left p-3 text-sm bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded hover:bg-gray-100 dark:hover:bg-gray-500 transition"
                      >
                        {message}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Attachment Section */}
          <section>
            <h2 className="text-md font-bold text-brand-500 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
              Attachments
            </h2>
            <div className="space-y-6">
              {/* Research Papers */}
              <div>
                <Label htmlFor="researchPapers">
                  Attach any pertinent research papers, conferences, or academic
                  publications (PDF only)
                </Label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Note: DO NOT include any personal documents, such as identity
                  cards or mark sheets. Do not post any useless or offensive
                  documents. Disciplinary action will be taken in certain
                  situations.
                </p>
                <DropzoneComponent
                  onFilesChange={(fileList) =>
                    handleFileUpload("researchPapers", fileList)
                  }
                  maxFiles={5}
                  maxSize={10 * 1024 * 1024} // 10MB
                  acceptedFiles={["application/pdf"]}
                />
                {files.researchPapers.length > 0 && (
                  <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                    ✓ {files.researchPapers.length} file(s) selected
                  </p>
                )}
              </div>

              {/* Photographs */}
              <div>
                <Label htmlFor="photographs">
                  Attach photographs relevant to the program (PNG, JPG only)
                </Label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Note: DO NOT post any useless or offensive photographs.
                  Disciplinary action will be taken in certain situations.
                </p>
                <DropzoneComponent
                  onFilesChange={(fileList) =>
                    handleFileUpload("photographs", fileList)
                  }
                  maxFiles={10}
                  maxSize={5 * 1024 * 1024} // 5MB
                  acceptedFiles={["image/png", "image/jpeg", "image/jpg"]}
                />
                {files.photographs.length > 0 && (
                  <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                    ✓ {files.photographs.length} photo(s) selected
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
              Submit Award Report
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentAward;