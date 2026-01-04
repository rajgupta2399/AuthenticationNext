"use client";
import Button from "@/src/components/ui/button/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const page = () => {
  const router = useRouter();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const nominationButtons = [
    {
      name: "Add Donation",
      path: "/us-dms/portal/add-donation",
      buttonName: "Add Donation",
    },
    {
      name: "View Approved Donations",
      path: "/us-dms/portal/approved-donation",
      buttonName: "View",
    },
    {
      name: "View Rejected Donations",
      path: "/us-dms/portal/rejected-donation",
      buttonName: "View",
    },
    {
      name: "View Revision Required Donation",
      path: "/us-dms/portal/revision-required-donation",
      buttonName: "View",
    },
  ];

  const handleRedirect = (path) => {
    router.push(path);
  };

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 mb-10">
      <div className="mx-auto">
        <div className="mb-6">
          <h1 className="sm:text-xl text-md font-bold text-brand-500 dark:text-brand-400 mb-2">
            US-DMS Portal
          </h1>
        </div>

        {/* 76th Reunion Box - Accordion on mobile */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm   border border-gray-300 dark:border-gray-600 p-6 mb-6">
          {/* 76th Reunion Heading - Clickable on mobile */}

          {/* 4 Buttons Grid - Animated on mobile */}
          <div
            className={`
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4
            transition-all duration-300 ease-in-out overflow-hidden
            md:grid
            
          `}
          >
            {nominationButtons.map((button, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4 hover:shadow-md transition-all duration-300 flex flex-col h-full hover:border-brand-300 dark:hover:border-brand-500"
              >
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4 text-center leading-tight min-h-[40px] flex items-center justify-center">
                  {button.name}
                </h3>

                <div className="mt-auto">
                  <Button
                    onClick={() => handleRedirect(button.path)}
                    className="w-full bg-brand-500 hover:bg-brand-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm"
                  >
                    {button.buttonName}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
