"use client";
import Button from "@/src/components/ui/button/Button";
import React from "react";

const PdfViewer = ({
  isOpen,
  selectedPdf,
  title,
  loadState,
  onClose,
  onLoad,
  onError,
  onDownload,
}) => {
  if (!isOpen || !selectedPdf) return null;

  // Google Docs Viewer URL
  const getGoogleDocsViewerUrl = (pdfUrl) => {
    return `https://docs.google.com/gview?url=${encodeURIComponent(
      pdfUrl
    )}&embedded=true`;
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-6xl h-[90vh] flex flex-col shadow-xl">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="sm:text-md text-sm font-bold text-brand-600 dark:brand-600 truncate">
            {title || "Document Viewer"}
          </h3>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-400"
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
        </div>

        {/* PDF VIEW */}
        <div className="flex-1 p-4 md:p-6 relative">
          {/* LOADING */}
          {loadState === "loading" && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-300">
                  Loading PDF document...
                </p>
              </div>
            </div>
          )}

          {/* ERROR */}
          {loadState === "error" && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <svg
                  className="w-16 h-16 text-red-500 mx-auto mb-4"
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
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Failed to load PDF
                </p>

                <button
                  onClick={() => window.open(selectedPdf, "_blank")}
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg"
                >
                  Open PDF in New Tab
                </button>
              </div>
            </div>
          )}

          {/* PDF IFRAME */}
          {(loadState === "loaded" || loadState === "loading") && (
            <iframe
              src={getGoogleDocsViewerUrl(selectedPdf)}
              className="w-full h-full border-0 rounded-lg"
              onLoad={onLoad}
              onError={onError}
            />
          )}
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-xl">
          <div className="flex justify-between items-center">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded-lg text-sm"
            >
              Close
            </button>
            <Button
              onClick={onDownload}
              className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition-colors text-sm"
            >
              <svg
                className="w-4 h-4"
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
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
