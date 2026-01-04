"use client";
import React, { useState } from "react";
import PdfViewer from "./PdfViewer";
import toast from "react-hot-toast";
import { BadgePercent, Captions, ShieldCheckIcon } from "lucide-react";
import { PiCertificateFill, PiCertificateDuotone } from "react-icons/pi";
import { SiSemanticscholar } from "react-icons/si";
import { MdOutlineIntegrationInstructions } from "react-icons/md";

const Page = () => {
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [pdfLoadState, setPdfLoadState] = useState("idle");
  const [isDownloading, setIsDownloading] = useState(false);

  // Services data with PDF URLs
  const alumniServices = [
    {
      id: 1,
      name: "Apply for Transcripts",
      pdfUrl:
        "https://publicbucket-development.zohostratus.in/pdf/issue-transcript.pdf",
      icon: Captions,
    },
    {
      id: 2,
      name: "Apply for Bonafide Certificate",
      pdfUrl:
        "https://publicbucket-development.zohostratus.in/pdf/bonafide-certificate.pdf",
      icon: PiCertificateFill,
    },
    {
      id: 3,
      name: "Apply for Duplicate Degree",
      pdfUrl:
        "https://publicbucket-development.zohostratus.in/pdf/duplication-degree.pdf",
      icon: SiSemanticscholar,
    },
    {
      id: 4,
      name: "Apply for Migration Certificate",
      pdfUrl:
        "https://publicbucket-development.zohostratus.in/pdf/issue-migration.pdf",
      icon: PiCertificateDuotone,
    },
    {
      id: 5,
      name: "Apply for CPI to Percentage Conversion",
      pdfUrl:
        "https://publicbucket-development.zohostratus.in/pdf/cpi-conversion.pdf",
      icon: BadgePercent,
    },
    {
      id: 6,
      name: "Apply for Medium of instruction (MOI) Cert",
      pdfUrl:
        "https://publicbucket-development.zohostratus.in/pdf/medium-of-instruction.pdf",
      icon: MdOutlineIntegrationInstructions,
    },
    {
      id: 7,
      name: "Apply for Degree Verification",
      pdfUrl:
        "https://publicbucket-development.zohostratus.in/pdf/verification-degree.pdf",
      icon: ShieldCheckIcon,
    },
  ];

  const openPdfViewer = (pdfUrl, serviceName) => {
    setSelectedPdf(pdfUrl);
    setSelectedService(serviceName);
    setIsPdfViewerOpen(true);
    setPdfLoadState("loading");
  };

  const closePdfViewer = () => {
    setIsPdfViewerOpen(false);
    setSelectedPdf("");
    setSelectedService("");
    setPdfLoadState("idle");
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
      link.download = `${selectedService.replace(/\s+/g, "_")}.pdf`;
      link.target = "_blank";

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up blob URL
      URL.revokeObjectURL(blobUrl);

      toast.success("PDF Downloaded Successfully");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download PDF. Opening in new tab instead.");

      // Fallback: open in new tab
      window.open(selectedPdf, "_blank");
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePdfLoad = () => {
    setPdfLoadState("loaded");
  };

  const handlePdfError = () => {
    setPdfLoadState("error");
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="">
        {/* Header */}
        <div className="">
          <h1 className="text-md md:text-xl font-bold text-brand-600 dark:text-brand-400 mb-3">
            Our Services
          </h1>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {alumniServices.map((service) => {
            const IconComponent = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => openPdfViewer(service.pdfUrl, service.name)}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 text-left border border-gray-200 dark:border-gray-700 hover:border-brand-500 dark:hover:border-brand-400 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-brand-500 dark:bg-brand-900 rounded-lg flex items-center justify-center group-hover:bg-brand-500 dark:group-hover:bg-brand-600 transition-colors">
                    <IconComponent className="w-5 h-5 text-white/90" />
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>

                <h3 className="font-semibold text-gray-800 dark:text-white text-sm md:text-base leading-tight group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {service.name}
                </h3>
              </button>
            );
          })}
        </div>

        {/* PDF Viewer Modal */}
        <PdfViewer
          isOpen={isPdfViewerOpen}
          selectedPdf={selectedPdf}
          title={selectedService}
          loadState={pdfLoadState}
          onClose={closePdfViewer}
          onDownload={handleDownloadPdf}
          onLoad={handlePdfLoad}
          onError={handlePdfError}
          isDownloading={isDownloading}
        />
      </div>
    </div>
  );
};

export default Page;
