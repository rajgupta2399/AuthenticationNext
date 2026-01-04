import React from "react"

const DonationButton = ({
  children,
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false
}) => {
  // Size Classes
  const sizeClasses = {
    sm: "px-4 py-3 text-sm",
    md: "px-5 py-3.5 text-sm"
  }

  // Variant Classes
  const variantClasses = {
    primary:
      "bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600 text-white shadow-theme-xs hover:from-brand-500 hover:via-brand-600 hover:to-brand-700 disabled:from-brand-300 disabled:via-brand-300 disabled:to-brand-300 transition-all duration-300",
    outline:
      "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300"
  }

  return (
    <button
      className={`inline-flex items-center justify-center font-medium gap-2 rounded-lg ${className} ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  )
}

export default DonationButton