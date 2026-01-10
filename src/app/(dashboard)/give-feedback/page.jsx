"use client";
import React, { useState } from "react";
import TextArea from "@/src/components/ui/input/TextArea";
import Button from "@/src/components/ui/button/Button";
import toast from "react-hot-toast";
import Label from "@/src/components/ui/input/Label";

const GiveFeedback = () => {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Feedback submitted successfully!");
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Feedback submitted:", feedback);
      setFeedback("");
      setIsSubmitting(false);
      // Add your success toast/message here
    }, 1000);
  };

  const handleClear = () => {
    setFeedback("");
  };

  return (
    <div className=" bg-gray-50 dark:bg-gray-900">
      <div className="">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="sm:text-xl text-md font-bold text-brand-500 dark:text-white mb-2">
            Give Feedback
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-base">
            We'd love to hear your thoughts, suggestions, or concerns
          </p>
        </div>

        {/* Feedback Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* TextArea Section */}
            <div>
              <Label htmlFor="feedback">
                Your Feedback
                <span className="text-red-500 ml-1">*</span>
              </Label>

              <TextArea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Please share your feedback, suggestions, or any issues you've encountered..."
                className="w-full min-h-[120px] sm:min-h-[150px] lg:min-h-[180px] px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical text-sm sm:text-base"
                required
              />

              {/* Character count */}
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {feedback.length}/1000 characters
                </span>
                {feedback.length > 800 && (
                  <span className="text-xs text-amber-600 dark:text-amber-400">
                    {1000 - feedback.length} characters remaining
                  </span>
                )}
              </div>
            </div>

            {/* Buttons Section */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 justify-end">
              <Button
                // type="button"
                variant="outline"
                onClick={handleClear}
                disabled={!feedback.trim() || isSubmitting}
                // className=" sm:flex-1 py-3 px-6 text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear
              </Button>

              <Button
                // type="submit"
                disabled={
                  !feedback.trim() || isSubmitting || feedback.length > 1000
                }
                // className=" sm:flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </div>
                ) : (
                  "Submit Feedback"
                )}
              </Button>
            </div>

            {/* Help Text */}
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Your feedback helps us improve our services. We appreciate your
                input!
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GiveFeedback;
