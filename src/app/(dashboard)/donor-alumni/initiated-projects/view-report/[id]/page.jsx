"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Eye, Download } from "lucide-react";
import Button from "@/src/components/ui/button/Button";

const programNames = {
  "program-a": "HCL Foundation",
  "program-b": "Global Health Innovation Grants",
  "program-c": "CSR for Education",
  "program-d": "Gangwal School",
};

const reportsData = [
  {
    id: 1,
    title: "Scholarship Report",
    image:
      "https://images.unsplash.com/photo-1562788869-4ed32648eb72?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2Zlc3Npb25hbCUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    pdfPath:
      "https://publicbucket-development.zohostratus.in/pdf/Project_Reporting_Template.docx",
  },
  {
    id: 2,
    title: "Quarterly Progress Q1 2024",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHByb2Zlc3Npb25hbCUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    pdfPath:
      "https://publicbucket-development.zohostratus.in/pdf/Project_Reporting_Template.docx",
  },
  {
    id: 3,
    title: "Beneficiary Success Stories",
    image:
      "https://plus.unsplash.com/premium_photo-1682433070003-ebc1dff983ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fHByb2Zlc3Npb25hbCUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    pdfPath:
      "https://publicbucket-development.zohostratus.in/pdf/Project_Reporting_Template.docx",
  },
  {
    id: 4,
    title: "Financial Audit Report",
    image:
      "https://images.unsplash.com/photo-1642364861013-2c33f2dcfbcf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fHByb2Zlc3Npb25hbCUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    pdfPath:
      "https://publicbucket-development.zohostratus.in/pdf/Project_Reporting_Template.docx",
  },
];

const ProgramReportsPage = () => {
  const params = useParams();
  const programId = params.id;
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [selectedReportTitle, setSelectedReportTitle] = useState("");
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [hasPdfLoaded, setHasPdfLoaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const router = useRouter();

  const programName = programNames[programId] || "Report";

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
      // Fetch the file as a blob
      const response = await fetch(pdfUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.status}`);
      }

      const blob = await response.blob();

      // Create a blob URL
      const blobUrl = URL.createObjectURL(blob);

      // Create download link
      const link = document.createElement("a");
      link.href = blobUrl;

      // Check if it's a PDF or DOCX and set appropriate extension
      const isPdf = pdfUrl.toLowerCase().includes(".pdf");
      const extension = isPdf ? ".pdf" : ".docx";
      link.download = `${reportTitle.replace(/\s+/g, "_")}_Report${extension}`;
      link.target = "_blank";

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up blob URL
      URL.revokeObjectURL(blobUrl);

      console.log("File Downloaded Successfully");
    } catch (error) {
      console.error("Download error:", error);
      // Fallback: open in new tab
      window.open(pdfUrl, "_blank");
    } finally {
      setIsDownloading(false);
    }
  };

  // Function to create Google Docs viewer URL for DOCX files
  const getGoogleDocsViewerUrl = (fileUrl) => {
    return `https://docs.google.com/gview?url=${encodeURIComponent(
      fileUrl
    )}&embedded=true`;
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closePdfViewer();
    }
  };

  return (
    <div className="w-full h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-2">
        <div>
          <h1 className="sm:text-xl text-md font-bold text-brand-500">
            {programName}
          </h1>
        </div>
        <div className="sm:block hidden">
          <button
            onClick={() => router.back()}
            className="text-brand-600 dark:text-brand-400 hover:underline  sm:text-md text-md"
          >
            ← Back to Initiated Projects
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

      {/* Reports Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {reportsData.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-lg shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 group"
          >
            {/* Report Image */}
            <div className="relative h-48 sm:h-52 overflow-hidden">
              <img
                src={report.image}
                alt={report.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            {/* Report Content */}
            <div className="p-4">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base line-clamp-2 min-h-[2.5rem]">
                  {report.title}
                </h3>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col xs:flex-row gap-2">
                <Button
                  onClick={() => openPdfViewer(report.pdfPath, report.title)}
                  size="sm"
                  className="flex-1 flex items-center justify-center px-3 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition-colors duration-200 text-xs sm:text-sm font-medium"
                >
                  <Eye size={14} className="mr-1 sm:mr-2" />
                  View
                </Button>
                <Button
                  onClick={() =>
                    handleDownloadPdf(report.pdfPath, report.title)
                  }
                  size="sm"
                  variant="outline"
                  className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-xs sm:text-sm font-medium"
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-600 dark:border-gray-300 mr-1 sm:mr-2"></div>
                      <span className="text-xs">Downloading...</span>
                    </>
                  ) : (
                    <>
                      <Download size={14} className="mr-1 sm:mr-2" />
                      Download
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Document Viewer Modal */}
      {isPdfViewerOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-99 p-2 sm:p-4"
          onClick={handleBackdropClick}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-6xl h-[85vh] sm:h-[90vh] flex flex-col shadow-xl">
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

            {/* Document Viewer with Loading State */}
            <div className="flex-1 p-2 sm:p-4 relative">
              {/* Loading Overlay */}
              {isPdfLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg z-10">
                  <div className="text-center px-4">
                    <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-brand-600 mx-auto mb-3 sm:mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-300 font-medium text-sm sm:text-base">
                      Loading document...
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

              {/* Error State */}
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
                      Failed to load document
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-4">
                      The document could not be loaded. Please try downloading
                      it instead.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <button
                        onClick={() =>
                          handleDownloadPdf(selectedPdf, selectedReportTitle)
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
                            Download Document
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

              {/* Document Viewer */}
              {selectedPdf && (
                <iframe
                  src={getGoogleDocsViewerUrl(selectedPdf)}
                  className={`w-full h-full rounded-lg border border-gray-200 dark:border-gray-700 ${
                    isPdfLoading ? "opacity-0" : "opacity-100"
                  } transition-opacity duration-300`}
                  title="Document Viewer"
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
                      Download Document
                    </>
                  )}
                </button>
                <button
                  onClick={closePdfViewer}
                  className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-xs sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramReportsPage;
