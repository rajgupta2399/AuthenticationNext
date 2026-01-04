"use client";
import { useTheme } from "@/src/context/ThemeContext";
import Checkbox from "../ui/input/Checkbox";
import Input from "../ui/input/InputField";
import Label from "../ui/input/Label";
import { ChevronLeftIcon } from "lucide-react";
import { EyeIcon, EyeOffIcon as EyeCloseIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import * as yup from "yup";
import Image from "next/image";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Validation schema
const formSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

  termsAccepted: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    termsAccepted: false,
  });

  const { login } = useAuth();
  const router = useRouter();
  const { colors } = useTheme();
  const primary = colors?.primaryColor;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateField = async (field, value) => {
    try {
      await formSchema.validateAt(field, { [field]: value });
      setErrors((prev) => ({ ...prev, [field]: "" }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [field]: error.message }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await formSchema.validate(formData, { abortEarly: false });

      // Form is valid, proceed with login using AuthContext
      const result = await login(formData.email, formData.password);

      if (result.success) {
        toast.success(`Welcome back! Logged in as ${result.user.role}`);
        // Redirect to dashboard based on role
        router.push(`/`);
      } else {
        toast.error(result.error);
        setErrors({ general: result.error });
      }
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-hidden">
      {/* Logo Section - Fixed positioning */}
      <div className="flex items-center justify-center w-full pt-8">
        <div className="relative w-32 h-32 md:w-32 md:h-32 sm:mt-16 md:mt-5 mt-0 sm:mb-10 mb-0">
          <Image
            className="hidden dark:block object-contain"
            src="https://www.iitk.ac.in/dora/newsletters/2020/december/images/logo.png"
            alt="Truact Logo"
            fill
            priority
            // sizes="(max-width: 768px) 128px, 160px"
          />
          <Image
            className="dark:hidden object-contain"
            src="https://publicbucket-development.zohostratus.in/Images/logo_black-removebg-preview.png"
            alt="Truact Logo"
            fill
            priority
            // sizes="(max-width: 768px) 128px, 160px"
          />
        </div>
      </div>

      {/* Login Form Section */}
      <div className="flex flex-col justify-center flex-1 w-full max-w-md px-4 mx-auto mb-40">
        <div>
          <div className="mb-6 sm:mb-8">
            <h1 className="mb-2 text-xl font-semibold text-center text-gray-800 md:text-2xl dark:text-white/90">
              Login to your account
            </h1>
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              Enter your email and password to Login!
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* Email */}
              <div>
                <Label htmlFor="email">
                  Email<span className="text-error-500">*</span>
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  onBlur={() => validateField("email", formData.email)}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-error-500">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password">
                  Password<span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    onBlur={() => validateField("password", formData.password)}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                    )}
                  </span>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-error-500">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Checkbox */}
              <div className="flex items-start gap-3">
                <Checkbox
                  className="w-5 h-5 mt-0.5"
                  checked={formData.termsAccepted}
                  onChange={(checked) => {
                    handleInputChange("termsAccepted", checked);
                    validateField("termsAccepted", checked);
                  }}
                />
                <div>
                  <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                    By creating an account means you agree to the{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      Terms and Conditions,
                    </span>{" "}
                    and our{" "}
                    <span className="text-gray-800 dark:text-white">
                      Privacy Policy
                    </span>
                  </p>
                  {errors.termsAccepted && (
                    <p className="mt-1 text-sm text-error-500">
                      {errors.termsAccepted}
                    </p>
                  )}
                </div>
              </div>

              {/* Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg shadow-theme-xs disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: primary }}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    // fix this ui for all small to large devices and no scroll
  );
}
