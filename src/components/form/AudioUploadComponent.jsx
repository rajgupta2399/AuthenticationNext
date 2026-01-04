"use client";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const AudioUploadComponent = ({
  onFilesChange,
  maxFiles = 3,
  maxSize = 50 * 1024 * 1024, // 50MB for audio
  acceptedFiles = [
    "audio/mpeg",
    "audio/wav",
    "audio/ogg",
    "audio/aac",
    "audio/flac",
    "audio/x-m4a",
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
            "Audio format not supported. Supported: MP3, WAV, OGG, AAC, FLAC, M4A"
          );
        } else if (rejection.errors[0].code === "too-many-files") {
          setError(`Maximum ${maxFiles} audio files allowed`);
        }
        return;
      }

      // Check total files count
      const totalFiles = selectedFiles.length + acceptedFiles.length;
      if (totalFiles > maxFiles) {
        setError(`Maximum ${maxFiles} audio files allowed`);
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
      "audio/mpeg": [".mp3"],
      "audio/wav": [".wav"],
      "audio/ogg": [".ogg"],
      "audio/aac": [".aac"],
      "audio/flac": [".flac"],
      "audio/x-m4a": [".m4a"],
    },
  });

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getAudioDuration = (file) => {
    // This would typically be implemented by creating an audio element
    // and loading the file to get duration
    return "Loading...";
  };

  return (
    <div className="transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500">
      <form
        {...getRootProps()}
        className={`dropzone rounded-xl border-dashed border-gray-300 p-7 lg:p-8
          ${
            isDragActive
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
          }
        `}
      >
        <input {...getInputProps()} />

        <div className="dz-message flex flex-col items-center m-0!">
          {/* Audio Icon */}
          {/* <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
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
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            </div>
          </div> */}

          <h4 className="mb-1 font-semibold text-gray-600 text-theme-xl dark:text-gray-400">
            {isDragActive ? "Drop Audio Files" : "Upload Audio Files"}
          </h4>

          <span className="text-center mb-2 block w-full max-w-[320px] text-sm text-gray-500 dark:text-gray-500">
            Drag and drop your audio files here or browse. Max {maxFiles} files,{" "}
            {maxSize / (1024 * 1024)}MB each
          </span>

          <span className="text-sm text-brand-500 underline">
            Supported formats: MP3, WAV, OGG, AAC, FLAC, M4A
          </span>
        </div>
      </form>

      {/* Error Message */}
      {error && <p className="mt-2 mx-5 text-sm text-red-500">{error}</p>}

      {/* Selected Files List */}
      {selectedFiles.length > 0 && (
        <div className="mt-4 p-4 border-t border-gray-200 dark:border-gray-700">
          <h5 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Selected Audio Files ({selectedFiles.length}/{maxFiles})
          </h5>
          <ul className="space-y-3">
            {selectedFiles.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-3 text-sm bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-blue-600 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
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

export default AudioUploadComponent;
