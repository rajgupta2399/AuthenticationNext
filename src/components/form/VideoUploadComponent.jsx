"use client";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const VideoUploadComponent = ({
  onFilesChange,
  maxFiles = 2,
  maxSize = 100 * 1024 * 1024, // 100MB for video
  acceptedFiles = [
    "video/mp4",
    "video/mpeg",
    "video/ogg",
    "video/webm",
    "video/quicktime",
    "video/x-msvideo",
  ],
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState("");

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      setError("");

      // Handle rejected files
      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors[0].code === "file-too-large") {
          setError(
            `File is too large. Maximum size is ${maxSize / (1024 * 1024)}MB`
          );
        } else if (rejection.errors[0].code === "file-invalid-type") {
          setError(
            "Video format not supported. Supported: MP4, MPEG, OGG, WEBM, MOV, AVI"
          );
        } else if (rejection.errors[0].code === "too-many-files") {
          setError(`Maximum ${maxFiles} video files allowed`);
        }
        return;
      }

      // Check total files count
      const totalFiles = selectedFiles.length + acceptedFiles.length;
      if (totalFiles > maxFiles) {
        setError(`Maximum ${maxFiles} video files allowed`);
        return;
      }

      // Update selected files
      const newFiles = [...selectedFiles, ...acceptedFiles];
      setSelectedFiles(newFiles);

      // Notify parent component
      if (onFilesChange) {
        onFilesChange(newFiles);
      }
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
      "video/mp4": [".mp4"],
      "video/mpeg": [".mpeg", ".mpg"],
      "video/ogg": [".ogv"],
      "video/webm": [".webm"],
      "video/quicktime": [".mov"],
      "video/x-msvideo": [".avi"],
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
    <div className="transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500">
      <form
        {...getRootProps()}
        className={`dropzone rounded-xl border-dashed border-gray-300 p-7 lg:p-8
          ${
            isDragActive
              ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20"
              : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
          }
        `}
      >
        <input {...getInputProps()} />

        <div className="dz-message flex flex-col items-center m-0!">
          {/* Video Icon */}
          {/* <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div> */}

          <h4 className="mb-1 font-semibold text-gray-600 text-theme-xl dark:text-gray-400">
            {isDragActive ? "Drop Video Files" : "Upload Video Files"}
          </h4>

          <span className="text-center mb-1 block w-full max-w-[320px] text-sm text-gray-500 dark:text-gray-500">
            Drag and drop your video files here or browse. Max {maxFiles} files,{" "}
            {maxSize / (1024 * 1024)}MB each
          </span>

          <span className="text-sm text-brand-500 underline">
            Supported formats: MP4, MPEG, OGG, WEBM, MOV, AVI
          </span>
        </div>
      </form>

      {/* Error Message */}
      {error && <p className="mt-2 mx-5 text-sm text-red-500">{error}</p>}

      {/* Selected Files List */}
      {selectedFiles.length > 0 && (
        <div className="mt-4 p-4 border-t border-gray-200 dark:border-gray-700">
          <h5 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Selected Video Files ({selectedFiles.length}/{maxFiles})
          </h5>
          <ul className="space-y-3">
            {selectedFiles.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-3 text-sm bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-brand-500 dark:text-brand-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-700 dark:text-gray-300">
                      {file.name}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      {formatFileSize(file.size)}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1 rounded"
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

export default VideoUploadComponent;
