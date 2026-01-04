"use client";
import Button from "@/src/components/ui/button/Button";
import { Check, ExternalLink } from "lucide-react";
import { useState } from "react";

const Page = () => {
  const [isPopupBlocked, setIsPopupBlocked] = useState(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleRedirect = () => {
    setIsRedirecting(true);

    // Try to open in new tab
    const newWindow = window.open(
      "https://iitk.ac.in/dora/almakonnect/",
      "_blank"
    );

    // Check if popup was blocked
    if (
      !newWindow ||
      newWindow.closed ||
      typeof newWindow.closed === "undefined"
    ) {
      setIsPopupBlocked(true);
      setIsRedirecting(false);
    } else {
      setIsPopupBlocked(false);
      // Reset to default UI after a short delay
      setTimeout(() => {
        setIsRedirecting(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-[83vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        {isRedirecting ? (
          <>
            <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-5 h-5 text-white" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Volunteer portal opened successfully!
            </p>
          </>
        ) : (
          <>
            <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
              <ExternalLink className="w-5 h-5" />
            </div>

            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Volunteer/Mentorship Opportunities
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Click the button below to open the Volunteer and Mentorship portal
              in a new tab.
            </p>

            <Button
              onClick={handleRedirect}
              disabled={isRedirecting}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Open Volunteer Portal
            </Button>

            {isPopupBlocked && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">
                  <strong>Popup blocked!</strong> Please allow popups for this
                  site and try again.
                </p>
                <Button
                  onClick={() => setIsPopupBlocked(null)}
                  className="mt-2 text-red-600 hover:text-red-800 text-sm underline"
                >
                  Try Again
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
