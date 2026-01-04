"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../../components/ui/table";
import Button from "@/src/components/ui/button/Button";
import Label from "@/src/components/ui/input/Label";
import Input from "@/src/components/ui/input/InputField";
import DropzoneComponent from "@/src/components/form/form-elements/DropZone";
import { Modal } from "@/src/components/ui/modal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Filter, Trash, X, Download } from "lucide-react";

const ProjectReportForm = () => {
  const router = useRouter();

  const [coPi, setCoPi] = useState({ co1: "", co2: "", co3: "" });
  const coPiRows = Object.values(coPi).filter((x) => x.trim() !== "").length;

  const [overviewFile, setOverviewFile] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [presentation, setPresentation] = useState(null);
  // const [previewModalOpen, setPreviewModalOpen] = useState(false);

  // PDF Viewer States
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [selectedReportTitle, setSelectedReportTitle] = useState("");
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [hasPdfLoaded, setHasPdfLoaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const openPdfViewer = async (pdfUrl, reportTitle) => {
    setSelectedPdf(pdfUrl);
    setSelectedReportTitle(reportTitle);
    setIsPdfViewerOpen(true);
    setIsPdfLoading(true);
    setHasPdfLoaded(false);
  };

  const closePdfViewer = () => {
    setIsPdfViewerOpen(false);
    setSelectedPdf("");
    setSelectedReportTitle("");
    setIsPdfLoading(false);
    setHasPdfLoaded(false);
    setIsDownloading(false);
  };

  const handlePdfLoad = () => {
    setIsPdfLoading(false);
    setHasPdfLoaded(true);
  };

  const handlePdfError = () => {
    setIsPdfLoading(false);
    setHasPdfLoaded(false);
  };

  // Enhanced PDF download function
  const handleDownloadPdf = async (pdfUrl, reportTitle) => {
    if (!pdfUrl) return;

    setIsDownloading(true);

    try {
      // Fetch the PDF as a blob
      const response = await fetch(pdfUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.status}`);
      }

      const blob = await response.blob();

      // Create a blob URL
      const blobUrl = URL.createObjectURL(blob);

      // Create download link
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${reportTitle.replace(/\s+/g, "_")}_Report.pdf`;
      link.target = "_blank";

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up blob URL
      URL.revokeObjectURL(blobUrl);

      console.log("PDF Downloaded Successfully");
    } catch (error) {
      console.error("Download error:", error);
      // Fallback: open in new tab
      window.open(pdfUrl, "_blank");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closePdfViewer();
    }
  };

  const getGoogleDocsViewerUrl = (pdfUrl) => {
    return `https://docs.google.com/gview?url=${encodeURIComponent(
      pdfUrl
    )}&embedded=true`;
  };

  const validatePDF = (file, maxSizeMB = 10) => {
    if (!file) return false;
    if (file.type !== "application/pdf") {
      toast.error("Only PDF file allowed!");
      return false;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`Max file size is ${maxSizeMB}MB!`);
      return false;
    }
    return true;
  };

  const validateImages = (file) => {
    if (!file) return false;
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      toast.error("Only JPG or PNG allowed!");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    toast.success("Form submitted!");
  };

  // 1️⃣ Add a validation function
  const isFormValid = () => {
    // Check coPi inputs: at least one filled
    const coPiValid = Object.values(coPi).every((v) => v.trim() !== "");

    // Check file uploads
    const filesValid = overviewFile && photos && presentation;

    // Return true only if all are filled
    return coPiValid && filesValid;
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center">
      {/* Scrollable form container */}
      <div className="w-full max-w-6xl overflow-y-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-brand-500">
            Project Report Form
          </h1>
          <button
            onClick={() => router.back()}
            className="text-brand-500 hover:underline"
          >
            ← Back to Report
          </button>
        </div>

        {/* ------------------------ FORM CONTAINER ------------------------ */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-8">
          {/* ------------------------ SECTION 1 ------------------------ */}
          <h2 className="text-md font-bold text-brand-500 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
            Project Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label>Project Title</Label>
              <Input
                defaultValue="Hemo Compatible Surfaces for LVAD"
                disabled
                readOnly
              />
            </div>

            <div>
              <Label>Project Duration</Label>
              <Input defaultValue="12 Months" disabled readOnly />
            </div>

            <div>
              <Label>Total Project Cost</Label>
              <Input defaultValue="2500000 INR" disabled readOnly />
            </div>

            <div>
              <Label>Name of Project Contributor</Label>
              <Input
                defaultValue="Portescap India Pvt. Ltd."
                disabled
                readOnly
              />
            </div>

            <div>
              <Label>Name of Project Investigator (PI)</Label>
              <Input defaultValue="Prof. Kantesh Balani" disabled readOnly />
            </div>

            <div>
              <Label>PI Email ID</Label>
              <Input defaultValue="kbalani@iitk.ac.in" disabled readOnly />
            </div>
          </div>

          {/* ------------------------ SECTION 2 ------------------------ */}
          <h2 className="text-md font-bold text-brand-500 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
            Co-Project investigators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <Label>Co-Project Investigator 1</Label>
              <Input
                placeholder="co-project Investigator 1"
                value={coPi.co1}
                onChange={(e) => setCoPi({ ...coPi, co1: e.target.value })}
              />
            </div>
            <div>
              <Label>Co-Project Investigator 2</Label>
              <Input
                placeholder="co-project Investigator 2"
                value={coPi.co2}
                onChange={(e) => setCoPi({ ...coPi, co2: e.target.value })}
              />
            </div>
            <div>
              <Label>Co-Project Investigator 3</Label>
              <Input
                placeholder="co-project Investigator 3"
                value={coPi.co3}
                onChange={(e) => setCoPi({ ...coPi, co3: e.target.value })}
              />
            </div>
          </div>

          {coPiRows > 0 && (
            <div className="bg-white dark:bg-gray-800 p-6 border rounded-lg shadow-sm space-y-4">
              <h3 className="text-md font-bold text-brand-500 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                Co-PI Details
              </h3>
              <Table>
                <TableHeader className="bg-white dark:bg-gray-800">
                  <TableRow>
                    <TableCell isHeader className="font-semibold">
                      Co-PI Name
                    </TableCell>
                    <TableCell isHeader className="font-semibold">
                      Co-PI Email
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: coPiRows }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="space-y-3 p-2">
                          <Input placeholder={`Name ${index + 1}`} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-3 p-2">
                          <Input placeholder={`Email ${index + 1}`} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* ------------------------ FILE UPLOADS ------------------------ */}
          <div className="space-y-6">
            <div>
              <Label>Project Overview Report (PDF only, max 5MB)</Label>
              <DropzoneComponent
                accept={{ "application/pdf": [".pdf"] }}
                maxSize={5 * 1024 * 1024}
                onChange={(file) => {
                  if (validatePDF(file, 5)) setOverviewFile(file);
                }}
              />
              <Button
                className="mt-2 px-4 py-1 text-sm bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors duration-200"
                onClick={() =>
                  openPdfViewer(
                    "https://publicbucket-development.zohostratus.in/pdf/Project_Reporting_Template.pdf",
                    "Project report Template"
                  )
                }
              >
                View Template
              </Button>
            </div>

            <div>
              <Label>Attach Project Photographs (JPG/PNG)</Label>
              <DropzoneComponent
                accept={{
                  "image/jpeg": [".jpg", ".jpeg"],
                  "image/png": [".png"],
                }}
                maxSize={5 * 1024 * 1024}
                onChange={(file) => {
                  if (validateImages(file)) setPhotos(file);
                }}
              />
            </div>

            <div>
              <Label>Attach Presentation (Max 4 Slides, PDF Only)</Label>
              <DropzoneComponent
                accept={{ "application/pdf": [".pdf"] }}
                maxSize={10 * 1024 * 1024}
                onChange={(file) => {
                  if (validatePDF(file, 10)) setPresentation(file);
                }}
              />
            </div>
          </div>

          {/* ------------------------ SUBMIT BUTTON ------------------------ */}
          <div className="flex justify-end pt-6">
            <Button
              className="px-6 py-2 text-sm bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={!isFormValid()} // ✅ disable until form is valid
            >
              Submit Form
            </Button>
          </div>

          {/* ------------------------ PDF PREVIEW MODAL ------------------------ */}
          {isPdfViewerOpen && (
            <div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-999 p-2 sm:p-4"
              onClick={handleBackdropClick}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-6xl sm:h-[90vh] h-[80vh] flex flex-col shadow-xl">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm sm:text-xl font-semibold text-brand-800 dark:text-white truncate pr-2">
                    {selectedReportTitle} - Document Viewer
                  </h3>
                  <button
                    onClick={closePdfViewer}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-500 dark:text-gray-400 flex-shrink-0"
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* PDF Viewer with Loading State */}
                <div className="flex-1 p-2 sm:p-4 relative">
                  {/* Loading Overlay */}
                  {isPdfLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg z-10">
                      <div className="text-center px-4">
                        <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-brand-600 mx-auto mb-3 sm:mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-300 font-medium text-sm sm:text-base">
                          Loading PDF document...
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">
                          This may take a few moments
                        </p>
                        <button
                          onClick={closePdfViewer}
                          className="mt-3 sm:mt-4 px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-xs sm:text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* PDF Error State */}
                  {!isPdfLoading && !hasPdfLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg z-10">
                      <div className="text-center px-4">
                        <svg
                          className="w-10 h-10 sm:w-16 sm:h-16 text-red-500 mx-auto mb-3 sm:mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                          />
                        </svg>
                        <p className="text-gray-600 dark:text-gray-300 font-medium mb-2 text-sm sm:text-base">
                          Failed to load PDF
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-4">
                          The document could not be loaded. Please try
                          downloading it instead.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2 justify-center">
                          <button
                            onClick={() =>
                              handleDownloadPdf(
                                selectedPdf,
                                selectedReportTitle
                              )
                            }
                            disabled={isDownloading}
                            className="flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isDownloading ? (
                              <>
                                <div className="animate-spin rounded-full h-3 w-3 sm:h-4 border-b-2 border-white mr-2"></div>
                                Downloading...
                              </>
                            ) : (
                              <>
                                <Download size={14} className="mr-2" />
                                Download PDF
                              </>
                            )}
                          </button>
                          <button
                            onClick={closePdfViewer}
                            className="flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-xs sm:text-sm"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PDF Viewer */}
                  {selectedPdf && (
                    <iframe
                      src={getGoogleDocsViewerUrl(selectedPdf)}
                      className={`w-full h-full rounded-lg border border-gray-200 dark:border-gray-700 ${
                        isPdfLoading ? "opacity-0" : "opacity-100"
                      } transition-opacity duration-300`}
                      title="PDF Viewer"
                      frameBorder="0"
                      onLoad={handlePdfLoad}
                      onError={handlePdfError}
                    />
                  )}
                </div>

                {/* Modal Footer */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
                    {isPdfLoading ? (
                      <span className="flex items-center justify-center sm:justify-start">
                        <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-brand-600 mr-2"></div>
                        Loading document...
                      </span>
                    ) : hasPdfLoaded ? (
                      `Viewing: ${selectedReportTitle}`
                    ) : (
                      "Ready to view"
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:space-x-3">
                    <button
                      onClick={() =>
                        handleDownloadPdf(selectedPdf, selectedReportTitle)
                      }
                      disabled={isPdfLoading || isDownloading}
                      className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isDownloading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download size={16} className="mr-2" />
                          Download PDF
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectReportForm;
