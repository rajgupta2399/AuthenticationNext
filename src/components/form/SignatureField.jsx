"use client";
import React, { useState, useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import {
  Edit2,
  Trash2,
  AlertCircle,
  CheckCircle,
  Download,
  FileText,
  X,
} from "lucide-react";
import {
  isSignatureValid,
  extractBase64FromDataURL,
  getBase64FileSize,
  downloadSignature,
  getSignatureInfo,
} from "@/src/utils/signatureUtils";

const SignatureField = ({
  label = "Signature",
  required = false,
  value = null,
  onChange,
  onBlur,
  error = "",
  width = 400,
  height = 150,
  validate = true,
  className = "",
  showFileInfo = true,
}) => {
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const [signature, setSignature] = useState(value);
  const [isTouched, setIsTouched] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);

  // Fix for signature canvas sync issues
  useEffect(() => {
    if (showSignaturePad) {
      // Small delay to ensure canvas is properly mounted
      const timer = setTimeout(() => {
        setCanvasReady(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showSignaturePad]);

  const handleSaveSignature = (signatureData) => {
    console.group("💾 Saving Signature");

    const signatureInfo = getSignatureInfo(signatureData);
    console.log("📊 Signature Info:", signatureInfo);

    if (isSignatureValid(signatureData)) {
      setSignature(signatureData);
      if (onChange) {
        onChange(signatureData);
      }
      setShowSignaturePad(false);
      setIsTouched(true);
      console.log("✅ Signature saved successfully");
    } else {
      console.warn("❌ Signature validation failed");
    }

    console.groupEnd();
  };

  const handleRemoveSignature = () => {
    console.log("🗑️ Removing signature");
    setSignature(null);
    if (onChange) {
      onChange(null);
    }
    setIsTouched(true);
  };

  const handleDownloadSignature = () => {
    if (signature) {
      downloadSignature(signature, `signature-${Date.now()}`);
    }
  };

  const handleBlur = () => {
    setIsTouched(true);
    if (onBlur) {
      onBlur();
    }
  };

  const showError = validate && required && isTouched && !signature;
  const isValidSignature = signature && isSignatureValid(signature);

  // Get file info for display
  const getFileInfo = () => {
    if (!signature) return null;

    const base64Data = extractBase64FromDataURL(signature);
    const fileSize = getBase64FileSize(base64Data);
    const fileSizeKB = (fileSize / 1024).toFixed(2);

    return {
      size: fileSizeKB,
      dimensions: `${width}×${height}px`,
      format: "PNG",
    };
  };

  const fileInfo = getFileInfo();

  return (
    <div className={`w-full ${className}`}>
      {/* Signature Display/Input Area */}
      <div
        className={`
          border border-dashed rounded-md transition-colors cursor-pointer
          ${
            showError
              ? "border-brand-300 bg-red-50 dark:bg-[#16181D]"
              : isValidSignature
              ? "border-brand-300 bg-green-50"
              : "border-brand-300 bg-gray-50 dark:bg-[#16181D] hover:border-gray-400"
          }
        `}
        onClick={() => setShowSignaturePad(true)}
        onBlur={handleBlur}
        tabIndex={0}
      >
        {isValidSignature ? (
          <div className="relative p-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              {/* Signature Preview */}
              <img
                src={signature}
                alt="Signature"
                className="max-h-32 object-contain border border-gray-200 rounded bg-white w-full "
              />

              {/* File Information */}
              {/* {showFileInfo && fileInfo && (
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                      Signature Details
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 text-xs text-gray-600 mt-5">
                    <div>
                      Size: <strong>{fileInfo.size} KB</strong>
                    </div>
                    <div>
                      Format: <strong>{fileInfo.format}</strong>
                    </div>
                    <div>
                      Dimensions: <strong>{fileInfo.dimensions}</strong>
                    </div>
                    <div>
                      Status: <strong className="text-green-600">Valid</strong>
                    </div>
                  </div>
                </div>
              )} */}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-2 right-2 flex gap-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownloadSignature();
                }}
                className="p-1 bg-white rounded shadow-sm hover:bg-gray-100 transition-colors border border-gray-200"
                title="Download signature"
              >
                <Download className="w-4 h-4 text-gray-600" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSignaturePad(true);
                }}
                className="p-1 bg-white rounded shadow-sm hover:bg-gray-100 transition-colors border border-gray-200"
                title="Edit signature"
              >
                <Edit2 className="w-4 h-4 text-gray-600" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveSignature();
                }}
                className="p-1 bg-white rounded shadow-sm hover:bg-red-100 transition-colors border border-gray-200"
                title="Remove signature"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-gray-200 rounded-full flex items-center justify-center">
              <Edit2 className="w-6 h-6 text-gray-500" />
            </div>
            <p className="text-gray-600 font-medium">Click to sign</p>
            <p className="text-sm text-gray-500 mt-1">
              {required
                ? "Signature is required"
                : "Add your signature (optional)"}
            </p>
          </div>
        )}
      </div>

      {/* Validation States */}
      <div className="mt-2">
        {showError && (
          <div className="flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="w-4 h-4" />
            <span>Signature is required</span>
          </div>
        )}

        {isValidSignature && !showError && (
          <div className="flex items-center gap-2 text-sm text-green-600">
            <CheckCircle className="w-4 h-4" />
            <span>Signature provided ({fileInfo?.size} KB)</span>
          </div>
        )}

        {signature && !isValidSignature && (
          <div className="flex items-center gap-2 text-sm text-amber-600">
            <AlertCircle className="w-4 h-4" />
            <span>Signature appears to be incomplete. Please sign again.</span>
          </div>
        )}
      </div>

      {/* Signature Pad Modal */}
      {showSignaturePad && (
        <SignaturePadModal
          onSave={handleSaveSignature}
          onClose={() => {
            setShowSignaturePad(false);
            setCanvasReady(false);
          }}
          width={width}
          height={height}
          required={required}
          validate={validate}
          canvasReady={canvasReady}
        />
      )}
    </div>
  );
};

// Improved Signature Pad Modal with sync fixes
const SignaturePadModal = ({
  onSave,
  onClose,
  width,
  height,
  required,
  validate,
  canvasReady,
}) => {
  const sigCanvas = useRef(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);

  // Fix for canvas synchronization
  useEffect(() => {
    if (sigCanvas.current && canvasReady) {
      // Force canvas redraw and synchronization
      const canvas = sigCanvas.current.getCanvas();

      // Reset canvas properties to ensure proper sync
      canvas.style.touchAction = "none";
      canvas.style.msTouchAction = "none";

      // Force a redraw
      setTimeout(() => {
        if (sigCanvas.current) {
          sigCanvas.current.clear();
          sigCanvas.current.off();
          sigCanvas.current.on();
        }
      }, 50);
    }
  }, [canvasReady]);

  const clear = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      setIsEmpty(true);
      setIsDrawing(false);
    }
  };

  const save = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      const signatureData = sigCanvas.current.toDataURL("image/png");
      onSave(signatureData);
    }
  };

  const handleBeginDraw = () => {
    setIsEmpty(false);
    setIsDrawing(true);
  };

  const handleEndDraw = () => {
    setIsDrawing(false);
  };

  // Calculate responsive dimensions
  const getCanvasDimensions = () => {
    const maxWidth = Math.min(width, window.innerWidth - 80);
    const maxHeight = Math.min(height, window.innerHeight - 200);
    return { width: maxWidth, height: maxHeight };
  };

  const canvasDimensions = getCanvasDimensions();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Sign Here</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-4 text-sm text-gray-600">
            <p>
              Draw your signature in the box below using your mouse, touchpad,
              or touchscreen.
            </p>
          </div>

          <div
            className="border-2 border-gray-300 rounded-lg overflow-hidden bg-white"
            style={{
              width: canvasDimensions.width,
              height: canvasDimensions.height,
              margin: "0 auto",
            }}
          >
            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              backgroundColor="white"
              minWidth={2}
              maxWidth={3}
              velocityFilterWeight={0.7}
              canvasProps={{
                width: canvasDimensions.width,
                height: canvasDimensions.height,
                className: "sig-canvas w-full h-full",
                style: {
                  touchAction: "none",
                  cursor: "crosshair",
                },
              }}
              onBegin={handleBeginDraw}
              onEnd={handleEndDraw}
            />
          </div>

          {/* {isDrawing && (
            <div className="mt-2 text-xs text-green-600 text-center">
              Signature in progress...
            </div>
          )} */}
        </div>

        <div className="flex items-center justify-between p-4 border-t bg-gray-50 rounded-b-lg">
          <button
            type="button"
            onClick={clear}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors bg-white"
            disabled={isEmpty}
          >
            Clear
          </button>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors bg-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={save}
              disabled={isEmpty}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Save Signature
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatureField;
