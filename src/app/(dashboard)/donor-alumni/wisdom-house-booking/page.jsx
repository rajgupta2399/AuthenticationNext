"use client";
import Button from "@/src/components/ui/button/Button";
import { useState } from "react";

const Page = () => {
  const [isRedirecting, setIsRedirecting] = useState(null);
  const [popupBlocked, setPopupBlocked] = useState(null);

  const handleRedirect = (url, linkName) => {
    setIsRedirecting(linkName);

    // Try to open in new tab
    const newWindow = window.open(url, "_blank");

    // Check if popup was blocked
    if (
      !newWindow ||
      newWindow.closed ||
      typeof newWindow.closed === "undefined"
    ) {
      setPopupBlocked(linkName);
      setIsRedirecting(null);
    } else {
      setPopupBlocked(null);
      // Reset to default UI after a short delay
      setTimeout(() => {
        setIsRedirecting(null);
      }, 1500);
    }
  };

  const links = [
    {
      name: "Visitor Hostel Booking",
      url: "https://www.iitk.ac.in/vh/2-uncategorised?start=5",
      description: "Main visitor hostel booking portal",
    },
    {
      name: "Offline Form",
      url: "https://www.iitk.ac.in/vh/forms",
      description: "Download offline booking forms",
    },
    {
      name: "Online Form",
      url: "https://oag.iitk.ac.in/Vhbooking/",
      description: "Online booking application system",
    },
  ];

  return (
    <div className=" flex items-center justify-center">
      <div className="text-center mx-auto py-12">
        {isRedirecting ? (
          <>
            <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {isRedirecting} opened successfully!
            </p>
          </>
        ) : (
          <>
            <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                />
              </svg>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Wisdom House (Visitor Hostel) Booking
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Choose from the following options to book accommodation at Wisdom
              House (Visitor Hostel)
            </p>

            <div className="space-y-4">
              {links.map((link, index) => (
                <div key={index} className="text-center">
                  <Button
                    onClick={() => handleRedirect(link.url, link.name)}
                    disabled={isRedirecting}
                    className="w-full max-w-md bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {link.name}
                  </Button>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {link.description}
                  </p>

                  {popupBlocked === link.name && (
                    <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700 text-sm">
                        <strong>Popup blocked!</strong> Please allow popups for
                        this site and try again.
                      </p>
                      <Button
                        onClick={() => setPopupBlocked(null)}
                        className="mt-1 text-red-600 hover:text-red-800 text-sm underline"
                      >
                        Try Again
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
