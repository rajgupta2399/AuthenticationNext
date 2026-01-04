"use client";
import Button from "@/src/components/ui/button/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const SurveyForm = () => {
  const router = useRouter();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const nominationButtons = [
    {
      name: "Expression of interest and Save Date",
      path: "/donor-alumni/surveys/expression-interest-save-date",
    },
    {
      name: "Pre Registration Report",
      path: "/donor-alumni/surveys/pre-registration-report",
    },
    {
      name: "Registration Form Report",
      path: "/donor-alumni/surveys/registration-form-report",
    },
    {
      name: "Travel Details of Registration",
      path: "/donor-alumni/surveys/travel-detail-registration",
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
          <h1 className="sm:text-xl text-lg font-bold text-brand-500 dark:text-brand-400 mb-2">
            Survey & Reunion Center
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Access various survey and reunion management tools
          </p>
        </div>

        {/* 76th Reunion Box - Accordion on mobile */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-300 dark:border-gray-600 p-6 mb-6">
          {/* 76th Reunion Heading - Clickable on mobile */}
          <div 
            className="mb-6 text-center border-b border-gray-200 dark:border-gray-600 pb-4 cursor-pointer md:cursor-auto"
            onClick={toggleAccordion}
          >
            <div className="flex items-center sm:justify-center justify-between gap-2">
              <h2 className="sm:text-xl text-md font-bold text-brand-600 dark:text-brand-400 sm:text-center">
                76th Reunion
              </h2>
              {/* Mobile-only chevron icons */}
              <div className="md:hidden">
                {isAccordionOpen ? (
                  <ChevronUp className="w-5 h-5 text-brand-600 dark:text-white" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-brand-600 dark:text-white" />
                )}
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-xs mt-2 text-left sm:text-center">
              Manage 76th reunion activities and registrations
            </p>
          </div>

          {/* 4 Buttons Grid - Animated on mobile */}
          <div className={`
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4
            transition-all duration-300 ease-in-out overflow-hidden
            md:grid
            ${isAccordionOpen ? 'max-h-[650px] opacity-100' : 'max-h-0 opacity-0 md:max-h-[500px] md:opacity-100'}
          `}>
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
                    View Form
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

export default SurveyForm;