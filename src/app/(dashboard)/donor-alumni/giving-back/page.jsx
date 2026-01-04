"use client";
import React, { useState } from "react";
import GivingBackCards from "./GivingBackResource";
import GivingBackTime from "./GivingBackTime";

const GivingBackPage = () => {
  const [activeTab, setActiveTab] = useState("resources");

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="   ">
        <div className="flex justify-between sm:flex-row flex-col">
          <h1 className="sm:text-xl text-md font-bold text-brand-500 text-center mb-4">
            Giving Back
          </h1>
          <div className="flex justify-center">
            <div className="rounded-lg shadow-sm  p-2 flex dark:border dark:border-brand-400">
              <button
                onClick={() => setActiveTab("resources")}
                className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 ${
                  activeTab === "resources"
                    ? "bg-brand-500 text-white shadow-md"
                    : "dark:text-white text-gray-700"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  <span>Resources</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("time")}
                className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 ${
                  activeTab === "time"
                    ? "bg-brand-500 text-white shadow-md"
                    : "dark:text-white text-gray-700"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span> Time</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="my-10">
        {/* Tab Content */}
        <div className="transition-all duration-300">
          {activeTab === "resources" && <GivingBackCards />}
          {activeTab === "time" && <GivingBackTime />}
        </div>
      </div>
    </div>
  );
};

export default GivingBackPage;
