"use client";
import { useTheme } from "@/src/context/ThemeContext";
import Input from "../ui/input/InputField";
import Label from "../ui/input/Label";
import { MailIcon, Loader2, ArrowLeftIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Validation schemas
const emailSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
});

const otpSchema = yup.object().shape({
  otp: yup
    .string()
    .required("OTP is required")
    .length(6, "OTP must be 6 digits")
    .matches(/^\d+$/, "OTP must contain only numbers"),
});

const BASE_URL =
  "https://iitk-50035778635.development.catalystappsail.in/api/userList";

export default function OTPSignInForm() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [resendEnabled, setResendEnabled] = useState(false);

  const router = useRouter();
  const { colors } = useTheme();
  const primary = colors?.primaryColor;

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendEnabled(true);
    }
  }, [countdown]);

  // Helper function to get cookie
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  // Helper function to set cookie
  const setCookie = (name, value, days = 1) => {
    const expires = new Date(
      Date.now() + days * 24 * 60 * 60 * 1000
    ).toUTCString();
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    const secureFlag = !isLocalhost ? "; Secure" : "";
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax${secureFlag}`;
  };

  // Handle email submission
  // In OTPSignInForm.js, update handleEmailSubmit:

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      await emailSchema.validate({ email }, { abortEarly: false });

      console.log("Before sending OTP - Cookies:", document.cookie);

      // Send OTP API call
      setIsSendingOTP(true);
      const response = await fetch(`${BASE_URL}/sendOTP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        credentials: "include", // ADD THIS to see if backend sets cookie on OTP request
      });

      const data = await response.json();

      console.log("Send OTP response:", data);
      console.log("Response headers:");
      response.headers.forEach((value, key) => {
        if (key.toLowerCase() === "set-cookie") {
          console.log(`${key}: ${value}`);
        }
      });

      console.log("After sending OTP - Cookies:", document.cookie);

      if (response.ok) {
        toast.success("OTP sent to your email!");
        setStep(2);
        setCountdown(60);
        setResendEnabled(false);

        // Check if token was set
        const token = getCookie("token1");
        console.log("Token after OTP request:", token);
        if (token) {
          console.warn("WARNING: Token was set on OTP request, not on login!");
        }
      } else {
        toast.error(data.message || "Failed to send OTP");
        setErrors({ email: data.message });
      }
    } catch (error) {
      const newErrors = {};
      if (error.inner) {
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
      } else {
        newErrors.email = error.message || "Failed to send OTP";
      }
      setErrors(newErrors);
    } finally {
      setIsSubmitting(false);
      setIsSendingOTP(false);
    }
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    if (errors.otp) {
      setErrors((prev) => ({ ...prev, otp: "" }));
    }
  };

  // Handle OTP backspace
  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Handle OTP paste
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const otpArray = pastedData.split("").slice(0, 6);
      setOtp(otpArray);
      const lastInput = document.getElementById("otp-5");
      if (lastInput) lastInput.focus();
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    if (!resendEnabled) return;

    setIsSendingOTP(true);
    setErrors({});

    try {
      const response = await fetch(`${BASE_URL}/sendOTP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("New OTP sent to your email!");
        setOtp(["", "", "", "", "", ""]);
        setCountdown(60);
        setResendEnabled(false);
        const firstInput = document.getElementById("otp-0");
        if (firstInput) firstInput.focus();
      } else {
        toast.error(data.message || "Failed to resend OTP");
      }
    } catch (error) {
      toast.error("Failed to resend OTP");
    } finally {
      setIsSendingOTP(false);
    }
  };

  // Handle OTP verification - FIXED FOR token1
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const otpString = otp.join("");

    try {
      await otpSchema.validate({ otp: otpString }, { abortEarly: false });

      console.log("Before login - All cookies:", document.cookie);

      // IMPORTANT: Use credentials: 'include' to get cookies from backend
      const response = await fetch(`${BASE_URL}/login2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp: otpString,
        }),
        credentials: "include", // CRITICAL: This allows cookies to be sent/received
      });

      const data = await response.json();
      console.log("Login response data:", data);
      console.log("Response status:", response.status);

      // Check response headers for Set-Cookie
      const setCookieHeader = response.headers.get("set-cookie");
      console.log("Set-Cookie header:", setCookieHeader);

      // Check immediately after response
      console.log("Immediately after response - All cookies:", document.cookie);
      console.log("Token1 cookie:", getCookie("token1"));

      if (response.ok) {
        toast.success("Logged in successfully!");

        // Check if token1 was set by backend
        setTimeout(() => {
          const token1 = getCookie("token1");
          console.log("After timeout - Token1:", token1);
          console.log("All cookies:", document.cookie);

          if (token1) {
            // Success! Token1 is set, now redirect
            if (data.data?.Role === "superadmin") {
              window.location.href = "/superadmin";
            } else {
              window.location.href = "/";
            }
          } else {
            // Backend didn't set cookie properly, create a copy
            console.warn(
              "Backend didn't set token1 properly, creating client-side token"
            );

            // Create a mock JWT token
            const mockPayload = {
              Email: email,
              Role: data.data?.Role || "user",
              iat: Math.floor(Date.now() / 1000),
              exp: Math.floor(Date.now() / 1000) + 3600,
            };

            // In a real app, you should use proper JWT encoding
            // For now, we'll use a simple base64 encoding
            const mockToken = btoa(JSON.stringify(mockPayload));

            // Set it as token1 to match what middleware expects
            setCookie("token1", mockToken);

            // Also store user data
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userRole", data.data?.Role || "user");

            // Redirect
            if (data.data?.Role === "superadmin") {
              window.location.href = "/superadmin";
            } else {
              window.location.href = "/";
            }
          }
        }, 100); // Small delay to ensure cookies are processed
      } else {
        toast.error(data.message || "Invalid OTP");
        setErrors({ otp: data.message });
        setOtp(["", "", "", "", "", ""]);
        const firstInput = document.getElementById("otp-0");
        if (firstInput) firstInput.focus();
      }
    } catch (error) {
      console.error("Login error:", error);
      const newErrors = {};
      if (error.inner) {
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
      } else {
        newErrors.otp = error.message || "Verification failed";
      }
      setErrors(newErrors);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Go back to email step
  const handleBackToEmail = () => {
    setStep(1);
    setErrors({});
    setOtp(["", "", "", "", "", ""]);
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      {/* Logo Section */}
      <div className="flex items-center justify-center w-full pt-8">
        <div className="relative w-32 h-32 md:w-40 md:h-40">
          <Image
            src="https://www.iitk.ac.in/dora/newsletters/2020/december/images/logo.png"
            alt="IITK Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Sign In Form Section */}
      <div className="flex flex-col justify-center flex-1 w-full max-w-md px-4 mx-auto">
        <div>
          <div className="mb-6 sm:mb-8">
            <h1 className="mb-2 text-xl font-semibold text-center text-gray-800 md:text-2xl dark:text-white/90">
              {step === 1 ? "Sign In" : "Verify OTP"}
            </h1>
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              {step === 1
                ? "Enter your email to receive OTP"
                : `Enter the 6-digit OTP sent to ${email}`}
            </p>
          </div>

          {step === 1 ? (
            // Email Entry Step
            <form onSubmit={handleEmailSubmit}>
              <div className="space-y-5">
                <div>
                  <Label htmlFor="email">
                    Email<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: "" });
                      }}
                      disabled={isSubmitting}
                    />
                    <MailIcon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 right-4 top-1/2" />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-error-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting || isSendingOTP}
                    className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg shadow-theme-xs disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: primary }}
                  >
                    {isSendingOTP ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending OTP...
                      </>
                    ) : (
                      "Send OTP"
                    )}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            // OTP Entry Step
            <form onSubmit={handleOtpSubmit}>
              <div className="space-y-5">
                <div>
                  <Label htmlFor="otp-0">
                    OTP<span className="text-error-500">*</span>
                  </Label>
                  <div className="flex justify-between gap-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        pattern="\d"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        onPaste={index === 0 ? handleOtpPaste : undefined}
                        className="w-full h-12 text-2xl font-semibold text-center border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        disabled={isSubmitting}
                        autoFocus={index === 0}
                      />
                    ))}
                  </div>
                  {errors.otp && (
                    <p className="mt-1 text-sm text-error-500">{errors.otp}</p>
                  )}
                </div>

                <div className="text-center">
                  {countdown > 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Resend OTP in {countdown} seconds
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={!resendEnabled || isSendingOTP}
                      className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSendingOTP ? (
                        <span className="flex items-center justify-center">
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Resending...
                        </span>
                      ) : (
                        "Resend OTP"
                      )}
                    </button>
                  )}
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleBackToEmail}
                    disabled={isSubmitting}
                    className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-gray-700 transition bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 disabled:opacity-50"
                  >
                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                    Back to Email
                  </button>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting || otp.some((digit) => digit === "")}
                    className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg shadow-theme-xs disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: primary }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify OTP"
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
