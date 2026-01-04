import { useState, useCallback } from "react";

export const useSignatureValidation = (initialValue = null, options = {}) => {
  const {
    required = false,
    minPoints = 10, // Minimum number of drawing points for valid signature
    customValidator = null,
  } = options;

  const [signature, setSignature] = useState(initialValue);
  const [error, setError] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const validateSignature = useCallback(
    (sig) => {
      if (required && !sig) {
        return "Signature is required";
      }

      if (customValidator) {
        const customError = customValidator(sig);
        if (customError) return customError;
      }

      return "";
    },
    [required, customValidator]
  );

  const handleChange = useCallback(
    (sig) => {
      setSignature(sig);
      const validationError = validateSignature(sig);
      setError(validationError);
    },
    [validateSignature]
  );

  const handleBlur = useCallback(() => {
    setIsTouched(true);
    const validationError = validateSignature(signature);
    setError(validationError);
  }, [signature, validateSignature]);

  const clearSignature = useCallback(() => {
    setSignature(null);
    setError(required ? "Signature is required" : "");
    setIsTouched(true);
  }, [required]);

  const isValid = !error;

  return {
    signature,
    error,
    isTouched,
    isValid,
    handleChange,
    handleBlur,
    clearSignature,
    setTouched: setIsTouched,
  };
};
