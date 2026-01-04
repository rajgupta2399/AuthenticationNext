"use client";
import React, { useState } from "react";
import { Globe, ExternalLink, AlertCircle, CheckCircle } from "lucide-react";

const UrlInput = ({
  value = "",
  onChange,
  onBlur,
  error = "",
  placeholder = "https://example.com or example.in",
  required = false,
  className = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    onChange(value);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    setTouched(true);
    if (onBlur) onBlur(e);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const getUrlStatus = () => {
    if (!value) return "empty";

    // Basic URL validation
    const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}/;
    if (!urlRegex.test(value)) return "invalid";

    return "valid";
  };

  const formatUrl = () => {
    if (!value) return "";

    // Add https:// if missing
    if (!value.startsWith("http://") && !value.startsWith("https://")) {
      return `https://${value}`;
    }
    return value;
  };

  const visitUrl = () => {
    const formattedUrl = formatUrl();
    if (formattedUrl) {
      window.open(formattedUrl, "_blank", "noopener,noreferrer");
    }
  };

  const status = getUrlStatus();
  const showError = error && touched;

  return (
    <div className={`w-full ${className}`}>
      {/* Input Container */}
      <div className="relative">
        <div
          className={`
          flex items-center border-2 dark:border-gray-700 rounded-lg transition-all duration-200 dark:bg-[#16181D]
      : ""
          }
        `}
        >
          {/* Icon */}
          <div className="pl-3 pr-2 text-gray-400 dark:text-gray-500">
            <Globe className="w-5 h-5" />
          </div>

          {/* Input Field */}
          <input
            type="text"
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholder={placeholder}
            className={`
              w-full py-2.5 pr-12 bg-transparent border-0 focus:outline-none focus:ring-0
              text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 
              ${showError ? "placeholder-red-300" : ""}
            `}
          />

          {/* Status Icon and Visit Button */}
          <div className="flex items-center pr-3">
            {status === "valid" && !showError && (
              <button
                type="button"
                onClick={visitUrl}
                className="p-1 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                title="Visit website"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            )}

            {showError && <AlertCircle className="w-4 h-4 text-red-500" />}

            {/* {status === "valid" && !showError && !showError && (
              <CheckCircle className="w-4 h-4 text-green-500 ml-1" />
            )} */}
          </div>
        </div>
      </div>

      {/* Helper Text and Error Message */}
      <div className="mt-1 min-h-[20px]">
        {showError ? (
          <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {error}
          </p>
        ) : value && status === "valid" ? (
          <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
            {/* <CheckCircle className="w-4 h-4" />
            Visit -{" "}
            <span
              className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline"
              onClick={visitUrl}
            >
              {formatUrl()}
            </span> */}
          </p>
        ) : (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Enter a valid website URL (e.g., example.com, domain.in, site.org)
          </p>
        )}
      </div>

      {/* URL Preview */}
      {/* {value && status === 'valid' && (
        <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-800 dark:text-blue-200">
            <strong>Full URL:</strong> {formatUrl()}
          </p>
        </div>
      )} */}
    </div>
  );
};

export default UrlInput;
