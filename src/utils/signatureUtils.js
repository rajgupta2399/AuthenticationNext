// src/utils/signatureUtils.js

/**
 * Extract Base64 data from data URL with validation
 */
export const extractBase64FromDataURL = (dataURL) => {
  if (!dataURL) {
    console.warn("❌ No data URL provided");
    return null;
  }

  if (!dataURL.includes(",")) {
    console.warn("❌ Invalid data URL format - no comma found");
    return null;
  }

  const base64Data = dataURL.split(",")[1];
  // console.log("📊 Base64 data extracted:", {
  //   totalLength: dataURL.length,
  //   base64Length: base64Data.length,
  //   preview: base64Data,
  // });

  return base64Data;
};

/**
 * Get file size from Base64 data
 */
export const getBase64FileSize = (base64String) => {
  if (!base64String) return 0;

  // Calculate approximate file size in bytes
  const padding = base64String.endsWith("==")
    ? 2
    : base64String.endsWith("=")
    ? 1
    : 0;
  return (base64String.length * 3) / 4 - padding;
};

/**
 * Comprehensive signature validation with detailed logging
 */
export const isSignatureValid = (signatureData) => {
  // console.group("🔍 Signature Validation");

  if (!signatureData) {
    console.warn("❌ No signature data provided");
    console.groupEnd();
    return false;
  }

  if (!signatureData.startsWith("data:image/")) {
    console.warn("❌ Invalid data URL format - should start with data:image/");
    console.groupEnd();
    return false;
  }

  const base64Data = extractBase64FromDataURL(signatureData);
  if (!base64Data) {
    console.warn("❌ No Base64 data found");
    console.groupEnd();
    return false;
  }

  // Check if signature has meaningful content
  const isValid = base64Data.length > 500;

  // console.log("📈 Signature Analysis:", {
  //   dataURLLength: signatureData.length,
  //   base64Length: base64Data.length,
  //   fileSizeKB: (getBase64FileSize(base64Data) / 1024).toFixed(2),
  //   isValid: isValid,
  //   meetsMinimumLength: base64Data.length > 500,
  // });

  console.groupEnd();
  return isValid;
};

/**
 * Get detailed signature information for logging
 */
export const getSignatureInfo = (signatureData) => {
  if (!signatureData) return null;

  const base64Data = extractBase64FromDataURL(signatureData);
  const fileSizeBytes = getBase64FileSize(base64Data);

  return {
    exists: true,
    dataURLLength: signatureData.length,
    base64Length: base64Data?.length || 0,
    fileSize: {
      bytes: fileSizeBytes,
      kb: (fileSizeBytes / 1024).toFixed(2),
      mb: (fileSizeBytes / (1024 * 1024)).toFixed(4),
    },
    format: signatureData.match(/data:(image\/\w+);/)?.[1] || "unknown",
    isValid: isSignatureValid(signatureData),
    preview: {
      dataURL: signatureData.substring(0, 100) + "...",
      base64: base64Data?.substring(0, 100) + "..." || "none",
    },
  };
};

/**
 * Create a downloadable signature file
 */
export const downloadSignature = (signatureData, filename = "signature") => {
  if (!isSignatureValid(signatureData)) return false;

  const link = document.createElement("a");
  link.href = signatureData;
  link.download = `${filename}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  return true;
};
