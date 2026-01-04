"use client";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const DropzoneComponent = ({
  onFilesChange,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024,
  acceptedFiles = [
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/svg+xml",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState("");

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      setError("");

      // Handle rejected files (validation errors)
      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors[0].code === "file-too-large") {
          setError(
            `File is too large. Maximum size is ${maxSize / (1024 * 1024)}MB`
          );
        } else if (rejection.errors[0].code === "file-invalid-type") {
          setError("File type not supported");
        } else if (rejection.errors[0].code === "too-many-files") {
          setError(`Too many files. Maximum ${maxFiles} files allowed`);
        }
        return;
      }

      // Check total files count
      const totalFiles = selectedFiles.length + acceptedFiles.length;
      if (totalFiles > maxFiles) {
        setError(`Maximum ${maxFiles} files allowed`);
        return;
      }

      // Update selected files
      const newFiles = [...selectedFiles, ...acceptedFiles];
      setSelectedFiles(newFiles);

      // Notify parent component
      if (onFilesChange) {
        onFilesChange(newFiles);
      }

      console.log("Files selected:", acceptedFiles);
    },
    [selectedFiles, maxFiles, maxSize, onFilesChange]
  );

  const removeFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setError("");

    if (onFilesChange) {
      onFilesChange(newFiles);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: maxFiles,
    maxSize: maxSize,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/webp": [".webp"],
      "image/svg+xml": [".svg"],
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
  });

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500 ">
      <form
        {...getRootProps()}
        className={`dropzone rounded-xl border-dashed border-gray-300 p-7 lg:p-8
            ${
              isDragActive
                ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
                : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
            }
          `}
        id="demo-upload"
      >
        {/* Hidden Input */}
        <input {...getInputProps()} />

        <div className="dz-message flex flex-col items-center m-0!">
          {/* Icon Container */}
          {/* <div className="mb-[22px] flex justify-center">
            <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
              <svg
                className="fill-current"
                width="29"
                height="28"
                viewBox="0 0 29 28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
                />
              </svg>
            </div>
          </div> */}

          <h4 className="mb-1 font-semibold text-gray-600 text-theme-xl dark:text-gray-400">
            {isDragActive ? "Drop Files Here" : "Drag & Drop Files Here"}
          </h4>

          <span className="text-center mb-1.5 block w-full max-w-[290px] text-sm text-gray-500 dark:text-gray-500">
            Drag and drop your files here or browse. Max {maxFiles} files,{" "}
            {maxSize / (1024 * 1024)}MB each
          </span>

          <span className="font-medium underline text-theme-sm text-brand-500">
            Browse File
          </span>
        </div>
      </form>

      {/* Error Message */}
      {error && <p className="mt-2 my-2 mx-5 text-sm text-red-500">{error}</p>}

      {/* Selected Files List */}
      {selectedFiles.length > 0 && (
        <div className="mt-2 p-4 border-t border-gray-200 dark:border-gray-700">
          <h5 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Selected Files ({selectedFiles.length}/{maxFiles}):
          </h5>
          <ul className="space-y-2">
            {selectedFiles.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-2 text-sm bg-white dark:bg-gray-800 rounded-lg"
              >
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {file.name}
                  </span>
                  <span className="ml-2 text-gray-500 dark:text-gray-400">
                    ({formatFileSize(file.size)})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropzoneComponent;
