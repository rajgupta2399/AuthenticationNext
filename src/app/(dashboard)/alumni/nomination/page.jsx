"use client";
import Button from "@/src/components/ui/button/Button";
import Input from "@/src/components/ui/input/InputField";
import Label from "@/src/components/ui/input/Label";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const router = useRouter();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [currentButtonIndex, setCurrentButtonIndex] = useState(null);
  const [emailData, setEmailData] = useState({ name: "", email: "" });
  const [sentButtons, setSentButtons] = useState(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nominationButtons = [
    {
      name: "YAA",
      path: "/alumni/nomination/yaa-nomination",
      description: "Young Alumni Award Nomination",
    },
    {
      name: "DSA",
      path: "/alumni/nomination/dsa-nomination",
      description: "Distinguished Service Award Nomination",
    },
    {
      name: "SKDA",
      path: "/alumni/nomination/skda-nomination",
      description: "Sri Krishna Dev Award Nomination",
    },
    {
      name: "DAA",
      path: "/alumni/nomination/daa-nomination",
      description: "Distinguished Alumnus Award Nomination",
    },
  ];

  const handleRedirect = (path) => {
    router.push(path);
  };

  const handleSendToSomeone = (index) => {
    setCurrentButtonIndex(index);
    setShowConfirmationModal(true);
  };

  const handleConfirmation = (confirmed) => {
    setShowConfirmationModal(false);
    if (confirmed) {
      setShowEmailModal(true);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Add to sent buttons
    setSentButtons((prev) => new Set([...prev, currentButtonIndex]));

    // Show success toast (you can use your preferred toast library)
    console.log("Link sent successfully!");

    // Reset and close
    setEmailData({ name: "", email: "" });
    setShowEmailModal(false);
    setIsSubmitting(false);
    setCurrentButtonIndex(null);
  };

  const handleEmailChange = (e) => {
    setEmailData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isButtonDisabled = (index) => sentButtons.has(index);

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto">
        <div className="mb-6">
          <h1 className="sm:text-xl text-lg font-bold text-brand-500 mb-2">
            Award Nominations
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Select an award category to submit your nomination
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {nominationButtons.map((button, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
                {button.name}
              </h3>

              {/* Nominate Button */}
              <Button
                onClick={() => handleRedirect(button.path)}
                className="w-full text-white font-medium py-3 px-6 rounded-lg mb-4"
              >
                Nominate for {button.name}
              </Button>

              {/* View Draft */}
              <Button
                onClick={() => handleRedirect(button.path)}
                className="w-full text-white font-medium py-3 px-6 rounded-lg mb-4"
              >
                View Draft Nomination
              </Button>

              {/* View Final Submission */}
              <Button
                onClick={() =>
                  handleRedirect("/alumni/nomination/final-submit-nomination")
                }
                className="w-full text-white font-medium py-3 px-6 rounded-lg"
              >
                View Final Submit Nomination
              </Button>

              {/* Send to Someone */}
              <Button
                onClick={() => handleSendToSomeone(index)}
                disabled={isButtonDisabled(index)}
                className={`w-full text-white font-medium mt-4 px-6 rounded-lg ${
                  isButtonDisabled(index) ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isButtonDisabled(index) ? "Link Sent" : "Send to Someone"}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-99 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Send External Link
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Do you want to send external link to someone?
            </p>
            <div className="flex gap-4 justify-end">
              <Button
                onClick={() => handleConfirmation(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg"
              >
                No
              </Button>
              <Button
                onClick={() => handleConfirmation(true)}
                className="px-4 py-2 text-white rounded-lg"
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-99 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Send Nomination Link
            </h3>
            <form onSubmit={handleEmailSubmit}>
              <div className="mb-4">
                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={emailData.name}
                  onChange={handleEmailChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter recipient's name"
                />
              </div>
              <div className="mb-6">
                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={emailData.email}
                  onChange={handleEmailChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter recipient's email"
                />
              </div>
              <div className="flex gap-4 justify-end">
                <Button
                  type="button"
                  onClick={() => setShowEmailModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-white rounded-lg disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
