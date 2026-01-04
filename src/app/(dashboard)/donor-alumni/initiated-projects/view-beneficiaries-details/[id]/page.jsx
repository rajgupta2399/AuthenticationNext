"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../../../components/ui/table/index";
import Button from "@/src/components/ui/button/Button";

const programNames = {
  "program-a": "HCL Foundation",
  "program-b": "Global Health Innovation Grants",
  "program-c": "CSR for Education",
  "program-d": "Gangwal School",
};

const ProgramReportsPage = () => {
  // Sample PI Reports Data
  const piReports = [
    {
      id: 1,
      piName: "Dr. Rajesh Kumar",
      piContact: "+91-9876543210",
      piEmail: "rajesh.kumar@iitk.ac.in",
      report:
        "https://publicbucket-development.zohostratus.in/pdf/Project_Reporting_Template.docx",
    },
    {
      id: 2,
      piName: "Dr. Priya Sharma",
      piContact: "+91-9876543211",
      piEmail: "priya.sharma@iitk.ac.in",
      report: "Not Available",
    },
    {
      id: 3,
      piName: "Dr. Amit Patel",
      piContact: "+91-9876543212",
      piEmail: "amit.patel@iitk.ac.in",
      report:
        "https://publicbucket-development.zohostratus.in/pdf/Project_Reporting_Template.docx",
    },
    {
      id: 4,
      piName: "Dr. Sunita Verma",
      piContact: "+91-9876543213",
      piEmail: "sunita.verma@iitk.ac.in",
      report:
        "https://publicbucket-development.zohostratus.in/pdf/Project_Reporting_Template.docx",
    },
    {
      id: 5,
      piName: "Dr. Rohan Singh",
      piContact: "+91-9876543214",
      piEmail: "rohan.singh@iitk.ac.in",
      report: "Not Available",
    },
  ];

  const params = useParams();
  const programId = params.id;
  const programName = programNames[programId] || "Program";

  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [hasPdfLoaded, setHasPdfLoaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const router = useRouter();

  const openPdfViewer = async (pdfUrl) => {
    if (pdfUrl === "Not Available") {
      alert("Report is not available for this PI.");
      return;
    }

    setSelectedPdf(pdfUrl);
    setIsPdfViewerOpen(true);
    setIsPdfLoading(true);
    setHasPdfLoaded(false);
  };

  const closePdfViewer = () => {
    setIsPdfViewerOpen(false);
    setSelectedPdf("");
    setIsPdfLoading(false);
    setHasPdfLoaded(false);
  };

  const handlePdfLoad = () => {
    setIsPdfLoading(false);
    setHasPdfLoaded(true);
  };

  const handlePdfError = () => {
    setIsPdfLoading(false);
    setHasPdfLoaded(false);
  };

  const handleDownloadReport = (pdfUrl, piName) => {
    if (pdfUrl === "Not Available") {
      alert("Report is not available for download.");
      return;
    }

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `${piName.replace(/\s+/g, "_")}_Report.pdf`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closePdfViewer();
    }
  };

  const handleDownloadPdf = async () => {
    if (!selectedPdf) return;

    setIsDownloading(true);

    try {
      // Fetch the PDF as a blob
      const response = await fetch(selectedPdf);
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.status}`);
      }

      const blob = await response.blob();

      // Create a blob URL
      const blobUrl = URL.createObjectURL(blob);

      // Create download link
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${programName.replace(/\s+/g, "_")}_FRL_Report.pdf`;
      link.target = "_blank";

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up blob URL
      URL.revokeObjectURL(blobUrl);

      // Show success message (you can replace this with your toast implementation)
      console.log("PDF Downloaded Successfully");
      // toast.success("PDF Downloaded Successfully");
    } catch (error) {
      console.error("Download error:", error);
      // Show error message and fallback to new tab
      console.error("Failed to download PDF. Opening in new tab instead.");
      // toast.error("Failed to download PDF. Opening in new tab instead.");

      // Fallback: open in new tab
      window.open(selectedPdf, "_blank");
    } finally {
      setIsDownloading(false);
    }
  };

  // Function to create Google Docs viewer URL
  const getGoogleDocsViewerUrl = (pdfUrl) => {
    return `https://docs.google.com/gview?url=${encodeURIComponent(
      pdfUrl
    )}&embedded=true`;
  };

  return (
    <div className="w-full h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="sm:text-xl text-md font-bold text-brand-600">
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

      {/* Reports List */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] shadow-sm">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[600px] sm:min-w-0">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-gray-800/50">
                <TableRow>
                       <TableCell
                    isHeader
                    className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300 sm:text-start text-center text-sm whitespace-nowrap sm:hidden block"
                  >
                    View Report
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300 text-start text-sm whitespace-nowrap"
                  >
                    PI Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300 text-start text-sm whitespace-nowrap"
                  >
                    PI Contact
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300 text-start text-sm whitespace-nowrap"
                  >
                    PI Email
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300 sm:text-start text-center text-sm whitespace-nowrap sm:block hidden"
                  >
                    View Report
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {piReports.map((report) => (
                  <TableRow
                    key={report.id}
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                  >
                      <TableCell className="px-4 py-2 sm:text-start text-center text-theme-sm sm:hidden block">
                      {report.report === "Not Available" ? (
                        <span className="text-gray-400 dark:text-gray-500 italic text-sm">
                          Not Available
                        </span>
                      ) : (
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => openPdfViewer(report.report)}
                            // className="text-brand-600 hover:text-brand-700 font-medium whitespace-nowrap text-theme-sm px-3 py-1 border border-brand-200 dark:border-brand-600 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all duration-200"
                          >
                            View
                          </Button>
                          <Button
                            onClick={() =>
                              handleDownloadReport(report.report, report.piName)
                            }
                            // className="text-green-600 hover:text-green-700 font-medium text-theme-sm px-3 py-1 border border-green-200 dark:border-green-600 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200"
                          >
                            Download
                          </Button>
                        </div>
                      )}
                    </TableCell>

                    <TableCell className="px-4 py-2 ">
                      <button
                        // onClick={() => handleNameClick(report.piName, report)}
                        className="text-start text-theme-sm text-gray-600 dark:text-gray-300 font-medium whitespace-nowrap"
                      >
                        {report.piName}
                      </button>
                    </TableCell>
                    <TableCell className="px-4 py-2 ">
                      <button
                        // onClick={() => handleContactClick(report.piContact)}
                        className="text-start text-theme-sm text-gray-600 dark:text-gray-300 font-medium whitespace-nowrap"
                      >
                        {report.piContact}
                      </button>
                    </TableCell>
                    <TableCell className="px-4 py-2 ">
                      <button
                        // onClick={() => handleEmailClick(report.piEmail)}
                        className="text-start text-theme-sm text-gray-600 dark:text-gray-300 font-medium whitespace-nowrap"
                      >
                        {report.piEmail}
                      </button>
                    </TableCell>
                    <TableCell className="px-4 py-2 sm:text-start text-center text-theme-sm sm:block hidden">
                      {report.report === "Not Available" ? (
                        <span className="text-gray-400 dark:text-gray-500 italic text-sm">
                          Not Available
                        </span>
                      ) : (
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => openPdfViewer(report.report)}
                            // className="text-brand-600 hover:text-brand-700 font-medium whitespace-nowrap text-theme-sm px-3 py-1 border border-brand-200 dark:border-brand-600 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all duration-200"
                          >
                            View
                          </Button>
                          <Button
                            onClick={() =>
                              handleDownloadReport(report.report, report.piName)
                            }
                            // className="text-green-600 hover:text-green-700 font-medium text-theme-sm px-3 py-1 border border-green-200 dark:border-green-600 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200"
                          >
                            Download
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {isPdfViewerOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-999 p-4"
          onClick={handleBackdropClick}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-6xl h-[90vh] flex flex-col shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm sm:text-md font-semibold text-brand-500 dark:text-white">
                PI Doc Viewer
              </h3>
              <button
                onClick={closePdfViewer}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-500 dark:text-gray-400"
                // Removed disabled state so it can always be closed
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
            <div className="flex-1 p-4 sm:p-6 relative">
              {/* Loading Overlay */}
              {isPdfLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg z-10">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-brand-600 mx-auto mb-3 sm:mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-300 font-medium text-sm sm:text-base">
                      Loading PDF document...
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">
                      This may take a few moments
                    </p>
                    {/* Add close button in loading state */}
                    <button
                      onClick={closePdfViewer}
                      className="mt-4 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-sm"
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
                      className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mx-auto mb-3 sm:mb-4"
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
                      The document could not be loaded. Please try downloading
                      it instead.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <button
                        onClick={handleDownloadPdf}
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
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
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
                  `Viewing: ${programName} - PI Doc`
                ) : (
                  "Ready to view"
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:space-x-3">
                <button
                  onClick={handleDownloadPdf}
                  disabled={isPdfLoading || isDownloading}
                  className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed order-2 sm:order-1"
                >
                  {isDownloading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
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
  );
};

export default ProgramReportsPage;
