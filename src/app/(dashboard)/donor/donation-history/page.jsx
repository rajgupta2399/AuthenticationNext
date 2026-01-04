"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { Modal } from "@/src/components/ui/modal";
import Button from "@/src/components/ui/button/Button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Filter, Trash, X } from "lucide-react";
import Checkbox from "@/src/components/ui/input/Checkbox";
import Input from "@/src/components/ui/input/InputField";
import DonationButton from "@/src/components/ui/button/DonationButton";
import { MdDocumentScanner } from "react-icons/md";

// Sample data for demonstration
const donationData = [
  {
    id: 1,
    purpose: "Scholarship Fund",
    donorName: "John Smith",
    email: "john.smith@email.com",
    accountType: "Individual",
    currency: "USD",
    amount: 5000,
    exchangeRate: 83.25,
    convertedAmount: 416250,
    donationDate: "2024-01-15",
    transactionMode: "Bank Transfer",
    panNumber: "ABCDE1234F",
    taxReceiptNo: "TRX001",
    coverLetterDate: "2024-01-20",
    receiptGeneratedDate: "2024-01-18",
    receiptType: "80G",
  },

  {
    id: 2,
    purpose: "Infrastructure Development",
    donorName: "Michael Brown",
    email: "m.brown@email.com",
    accountType: "Individual",
    currency: "INR",
    amount: 250000,
    exchangeRate: 1,
    convertedAmount: 250000,
    donationDate: "2024-01-08",
    transactionMode: "UPI",
    panNumber: "KLMNO9012P",
    taxReceiptNo: "TRX003",
    coverLetterDate: "2024-01-09",
    receiptGeneratedDate: "2024-01-09",
    receiptType: "80G",
  },
  {
    id: 3,
    purpose: "Infrastructure Development",
    donorName: "Jonathan Davis",
    email: "jonathan.davis@email.com",
    accountType: "Individual",
    currency: "INR",
    amount: 250000,
    exchangeRate: 1,
    convertedAmount: 250000,
    donationDate: "2024-01-08",
    transactionMode: "UPI",
    panNumber: "KLMNO9012P",
    taxReceiptNo: "TRX003",
    coverLetterDate: "2024-01-09",
    receiptGeneratedDate: "2024-01-09",
    receiptType: "80G",
  },
];

// Filter Types and Options
const filterOperators = [
  { value: "contains", label: "Contains" },
  { value: "isEmpty", label: "Is Empty" },
  { value: "isNotEmpty", label: "Is Not Empty" },
  { value: "startsWith", label: "Starts With" },
  { value: "endsWith", label: "Ends With" },
];

const columnOptions = [
  { value: "purpose", label: "Purpose" },
  { value: "donorName", label: "Donor Name" },
  { value: "email", label: "Email" },
  { value: "accountType", label: "Account Type" },
  { value: "currency", label: "Currency" },
  { value: "amount", label: "Amount" },
  { value: "exchangeRate", label: "Exchange Rate" },
  { value: "convertedAmount", label: "Converted Amount" },
  { value: "transactionMode", label: "Transaction Mode" },
  { value: "panNumber", label: "PAN No." },
  { value: "taxReceiptNo", label: "Tax Receipt No." },
  { value: "receiptGeneratedDate", label: "Receipt Date" },
  { value: "receiptType", label: "Receipt Type" },
  { value: "coverLetterDate", label: "Cover Letter Date" },
  { value: "donationDate", label: "Date of Donation" },
];

// Calendar Date Picker Component
const DatePicker = ({
  value,
  onChange,
  placeholder = "Select date",
  minDate = "",
  maxDate = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const today = new Date();
  const selectedDate = value ? new Date(value) : null;

  // Generate days for the current month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Add days from previous month
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(firstDay);
      prevDate.setDate(prevDate.getDate() - i - 1);
      days.push({ date: prevDate, isCurrentMonth: false });
    }

    // Add days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(year, month, i);
      days.push({ date: currentDate, isCurrentMonth: true });
    }

    // Add days from next month to complete the grid
    const totalCells = 42; // 6 weeks
    while (days.length < totalCells) {
      const lastDate = new Date(days[days.length - 1].date);
      lastDate.setDate(lastDate.getDate() + 1);
      days.push({ date: lastDate, isCurrentMonth: false });
    }

    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const handleDateSelect = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    onChange(formattedDate);
    setIsOpen(false);
  };

  const isDateDisabled = (date) => {
    if (minDate && date < new Date(minDate)) return true;
    if (maxDate && date > new Date(maxDate)) return true;
    return false;
  };

  const formatDateDisplay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="relative">
      {/* Date Input */}
      <div
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={value ? "text-gray-900 dark:text-white" : "text-gray-500"}
        >
          {value ? formatDateDisplay(value) : placeholder}
        </span>
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* Calendar Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 w-64 p-4">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="font-semibold text-gray-800 dark:text-white">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </div>

            <button
              onClick={() => navigateMonth(1)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-1"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              const isSelected =
                selectedDate &&
                day.date.toDateString() === selectedDate.toDateString();
              const isToday = day.date.toDateString() === today.toDateString();
              const isDisabled = isDateDisabled(day.date);

              return (
                <button
                  key={index}
                  onClick={() => !isDisabled && handleDateSelect(day.date)}
                  disabled={isDisabled}
                  className={`
                    w-8 h-8 text-sm rounded transition-colors flex items-center justify-center
                    ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : isToday
                        ? "border border-blue-500 text-blue-600 dark:text-blue-400"
                        : day.isCurrentMonth
                        ? "text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        : "text-gray-400 dark:text-gray-600"
                    }
                    ${
                      isDisabled
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer"
                    }
                  `}
                >
                  {day.date.getDate()}
                </button>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="flex justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => handleDateSelect(today)}
              className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Today
            </button>
            <button
              onClick={() => {
                onChange("");
                setIsOpen(false);
              }}
              className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

// Individual Filter Component for each column
const ColumnFilter = ({ column, filter, onUpdate, onRemove }) => {
  const isValueInputVisible =
    filter.operator !== "isEmpty" && filter.operator !== "isNotEmpty";

  // Check if column is a date field
  const isDateField = [
    "donationDate",
    "coverLetterDate",
    "receiptGeneratedDate",
  ].includes(filter.column);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={filter.isActive}
            onChange={(e) =>
              onUpdate({ ...filter, isActive: e.target.checked })
            }
            className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
          />

          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {column.label}
          </span>
        </div>
        <button
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 transition-colors p-1"
        >
          <Trash className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {/* Operator Selection */}
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            Condition
          </label>
          <select
            value={filter.operator}
            onChange={(e) =>
              onUpdate({ ...filter, operator: e.target.value, value: "" })
            }
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            {filterOperators.map((operator) => (
              <option key={operator.value} value={operator.value}>
                {operator.label}
              </option>
            ))}
          </select>
        </div>

        {/* Value Input - Hidden for isEmpty/isNotEmpty */}
        {isValueInputVisible && (
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Search Value
            </label>
            {isDateField ? (
              <DatePicker
                value={filter.value}
                onChange={(value) => onUpdate({ ...filter, value })}
                placeholder={`Select ${column.label}`}
              />
            ) : (
              <input
                type="text"
                value={filter.value}
                onChange={(e) => onUpdate({ ...filter, value: e.target.value })}
                placeholder={`Search in ${column.label}...`}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 text-sm"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Filter Sidebar Component
const FilterSidebar = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onApplyFilters,
}) => {
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [localFilters, setLocalFilters] = useState([]);

  // Initialize from existing filters when modal opens
  useEffect(() => {
    if (isOpen) {
      if (filters.length > 0) {
        setLocalFilters(filters);
        setSelectedColumns(filters.map((filter) => filter.column));
      } else {
        setLocalFilters([]);
        setSelectedColumns([]);
      }
    }
  }, [isOpen, filters]);

  const handleColumnToggle = (column) => {
    const columnObj = columnOptions.find((col) => col.value === column);

    if (selectedColumns.includes(column)) {
      // Remove column
      setSelectedColumns((prev) => prev.filter((col) => col !== column));
      setLocalFilters((prev) =>
        prev.filter((filter) => filter.column !== column)
      );
    } else {
      // Add column with default filter
      setSelectedColumns((prev) => [...prev, column]);
      setLocalFilters((prev) => [
        ...prev,
        {
          column,
          operator: "contains",
          value: "",
          isActive: true,
        },
      ]);
    }
  };

  const handleSelectAll = () => {
    if (selectedColumns.length === columnOptions.length) {
      // Deselect all
      setSelectedColumns([]);
      setLocalFilters([]);
    } else {
      // Select all
      const allColumns = columnOptions.map((col) => col.value);
      setSelectedColumns(allColumns);
      setLocalFilters(
        allColumns.map((column) => ({
          column,
          operator: "contains",
          value: "",
          isActive: true,
        }))
      );
    }
  };

  const updateFilter = (column, updatedFilter) => {
    setLocalFilters((prev) =>
      prev.map((filter) => (filter.column === column ? updatedFilter : filter))
    );
  };

  const removeFilter = (column) => {
    setSelectedColumns((prev) => prev.filter((col) => col !== column));
    setLocalFilters((prev) =>
      prev.filter((filter) => filter.column !== column)
    );
  };

  const handleApply = () => {
    if (localFilters.length === 0) {
      toast.error("Please select at least one column to filter");
      return;
    }

    onFiltersChange(localFilters);
    onApplyFilters(localFilters);
    console.log(localFilters);
  };

  const handleReset = () => {
    setSelectedColumns([]);
    setLocalFilters([]);
    onFiltersChange([]);
    onApplyFilters([]);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-20 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-[64px] right-0 h-full sm:w-96 w-72 bg-[#F9FAFB] dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-md font-semibold text-brand-800 dark:text-white">
              Search Filters
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-400/20 rounded-lg transition-colors dark:text-white/90"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filters Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Column Selection Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-brand-800 dark:text-white">
                    Select Columns
                  </h3>
                  {/* <button
                    onClick={handleSelectAll}
                    className="text-sm text-brand-600 hover:text-brand-700 font-medium"
                  >
                    {selectedColumns.length === columnOptions.length
                      ? "Deselect All"
                      : "Select All"}
                  </button> */}
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg max-h-full overflow-y-auto">
                  {columnOptions.map((column) => {
                    const isSelected = selectedColumns.includes(column.value);
                    const filter = localFilters.find(
                      (f) => f.column === column.value
                    );

                    return (
                      <div key={column.value}>
                        {/* Column Selection Row */}
                        <label className="flex items-center p-3 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                          <Checkbox
                            checked={isSelected}
                            onChange={() => handleColumnToggle(column.value)}
                          />
                          <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                            {column.label}
                          </span>
                        </label>

                        {/* Configure Filter Box - Shows exactly below selected column */}
                        {isSelected && filter && (
                          <div className="bg-[#F2F4F7] dark:bg-blue-900/20 border-t border-blue-100 dark:border-blue-800 p-4">
                            {/* <div className="flex items-center justify-between mb-3">
                              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                                Configure Filter for {column.label}
                              </h4>
                              <button
                                onClick={() => removeFilter(column.value)}
                                className="text-red-500 hover:text-red-700 transition-colors p-1"
                              >
                                <Trash className="w-3 h-3" />
                              </button>
                            </div> */}

                            <div className="space-y-3">
                              {/* Operator Selection */}
                              <div>
                                <label className="block text-xs font-medium text-brand-700 dark:text-brand-300 mb-1">
                                  Condition
                                </label>
                                <select
                                  value={filter.operator}
                                  onChange={(e) =>
                                    updateFilter(column.value, {
                                      ...filter,
                                      operator: e.target.value,
                                      value: "",
                                    })
                                  }
                                  className="w-full px-2 py-3 border border-blue-200 dark:border-blue-700 rounded-lg bg-white dark:bg-[#1D1F24] text-brand-800 dark:text-blue-200 text-xs"
                                >
                                  {filterOperators.map((operator) => (
                                    <option
                                      key={operator.value}
                                      value={operator.value}
                                    >
                                      {operator.label}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              {/* Value Input - Hidden for isEmpty/isNotEmpty */}
                              {filter.operator !== "isEmpty" &&
                                filter.operator !== "isNotEmpty" && (
                                  <div>
                                    <label className="block text-xs font-medium text-brand-700 dark:text-brand-300 mb-1">
                                      Search Value
                                    </label>
                                    {[
                                      "donationDate",
                                      "coverLetterDate",
                                      "receiptGeneratedDate",
                                    ].includes(filter.column) ? (
                                      <DatePicker
                                        value={filter.value}
                                        onChange={(value) =>
                                          updateFilter(column.value, {
                                            ...filter,
                                            value,
                                          })
                                        }
                                        placeholder={`Select ${column.label}`}
                                      />
                                    ) : (
                                      <Input
                                        type="text"
                                        value={filter.value}
                                        onChange={(e) =>
                                          updateFilter(column.value, {
                                            ...filter,
                                            value: e.target.value,
                                          })
                                        }
                                        placeholder={`Search in ${column.label}...`}
                                        className="w-full px-2 py-1 border border-brand-200 dark:border-brand-700 rounded bg-white dark:bg-brand-800/30 text-brand-800 dark:text-brand-200 placeholder-brand-400 text-xs"
                                      />
                                    )}
                                  </div>
                                )}

                              {/* Active/Inactive Toggle */}
                              <div className="flex items-center justify-between">
                                {/* <label className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    checked={filter.isActive}
                                    onChange={(e) =>
                                      updateFilter(column.value, {
                                        ...filter,
                                        isActive: e.target.checked,
                                      })
                                    }
                                    className="rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                                    Active Filter
                                  </span>
                                </label> */}

                                {/* Filter Status Indicator */}
                                {/* <div
                                  className={`text-xs px-2 py-1 rounded ${
                                    filter.isActive
                                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                                  }`}
                                >
                                  {filter.isActive ? "Active" : "Inactive"}
                                </div> */}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-3 mb-24">
            <Button
              onClick={handleApply}
              className="w-full"
              disabled={localFilters.filter((f) => f.isActive).length === 0}
            >
              Apply Filters
            </Button>
            <Button variant="outline" onClick={handleReset} className="w-full">
              Reset All
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

// Filter Logic
const applyFilters = (data, filters) => {
  const activeFilters = filters.filter(
    (filter) => filter.isActive && filter.column
  );

  if (!activeFilters.length) {
    return data;
  }

  return data.filter((item) => {
    return activeFilters.every((filter) => {
      const itemValue = String(item[filter.column] || "").toLowerCase();
      const filterValue = filter.value.toLowerCase();

      switch (filter.operator) {
        case "contains":
          return itemValue.includes(filterValue);
        case "isEmpty":
          return !itemValue.trim();
        case "isNotEmpty":
          return !!itemValue.trim();
        case "startsWith":
          return itemValue.startsWith(filterValue);
        case "endsWith":
          return itemValue.endsWith(filterValue);
        default:
          return true;
      }
    });
  });
};

// Tax Receipt Request Modal - Step 1
const TaxReceiptRequestModal = ({ isOpen, onClose, onConfirm }) => {
  const [receiptRequired, setReceiptRequired] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setReceiptRequired(null);
    }
  }, [isOpen]);

  const handleContinue = () => {
    if (receiptRequired === false) {
      // User selected "No" - close modal and proceed
      onConfirm(null);
      onClose();
    } else if (receiptRequired === true) {
      // User selected "Yes" - open receipt type modal
      onConfirm("open_receipt_type");
      onClose();
    }
  };

  const handleClose = () => {
    setReceiptRequired(null);
    onClose();
  };

  const isContinueEnabled = receiptRequired !== null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-md mx-4">
      <div className="rounded-3xl bg-white p-6 dark:bg-gray-900">
        <div className="mb-6">
          <h4 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90">
            Tax Receipt Request
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Do you need a tax receipt for this donation?
          </p>
        </div>
        {/* Step 1: Receipt Required Question */}
        <div className="mb-6">
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setReceiptRequired(true)}
              className={`flex-1 py-3 px-4 border-2 rounded-lg font-medium transition-colors ${
                receiptRequired === true
                  ? "border-brand-500 text-brand-600 bg-brand-50 dark:bg-brand-900/20 dark:text-brand-400 dark:border-brand-400"
                  : "border-gray-300 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setReceiptRequired(false)}
              className={`flex-1 py-3 px-4 border-2 rounded-lg font-medium transition-colors ${
                receiptRequired === false
                  ? "border-brand-500 text-brand-600 bg-brand-50 dark:bg-brand-900/20 dark:text-brand-400 dark:border-brand-400"
                  : "border-gray-300 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              }`}
            >
              No
            </button>
          </div>
        </div>
        {/* Footer Buttons */}
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleContinue} disabled={!isContinueEnabled}>
            Continue
          </Button>
        </div>
      </div>
    </Modal>
  );
};

// Receipt Type Modal - Step 2
const ReceiptTypeModal = ({ isOpen, onClose, onBack, onConfirm }) => {
  const [receiptType, setReceiptType] = useState("");

  useEffect(() => {
    if (isOpen) {
      setReceiptType("");
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (receiptType === "email") {
      toast.success("Your preference has been saved");
      onConfirm(receiptType);
      onClose();
    }
    // For hardcopy/both, we handle directly in the change handler
  };

  const handleReceiptTypeChange = (type) => {
    setReceiptType(type);

    // If user selects hardcopy or both, immediately open address modal
    if (type === "hardcopy" || type === "both") {
      onConfirm(type);
      onClose();
    }
  };

  const isSubmitEnabled = receiptType === "email";

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md mx-4">
      <div className="rounded-3xl bg-white p-6 dark:bg-gray-900">
        <div className="mb-6">
          <h4 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90">
            Receipt Delivery
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            How would you like to receive your tax receipt?
          </p>
        </div>

        {/* Receipt Type Selection */}
        <div className="mb-6">
          <div className="space-y-3">
            {["email", "hardcopy", "both"].map((type) => (
              <label
                key={type}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors dark:border-gray-700 dark:hover:bg-gray-800"
              >
                <input
                  type="radio"
                  name="receiptType"
                  value={type}
                  checked={receiptType === type}
                  onChange={(e) => handleReceiptTypeChange(e.target.value)}
                  className="mr-3 w-4 h-4 text-brand-600 focus:ring-brand-500 dark:text-brand-500 dark:focus:ring-brand-400"
                />
                <span className="text-sm font-medium text-gray-700 capitalize dark:text-gray-300">
                  {type === "both"
                    ? "Both Email & Hard Copy"
                    : type === "hardcopy"
                    ? "Hard Copy Only"
                    : "Email Only"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Footer Buttons - Only show for email selection */}
        {isSubmitEnabled && (
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

// Address Modal (unchanged)
const AddressModal = ({ isOpen, onClose, onSubmit }) => {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const handleSubmit = () => {
    onSubmit(address);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md mx-4">
      <div className="rounded-3xl bg-white p-6 dark:bg-gray-900">
        <div className="mb-6">
          <h4 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90">
            Shipping Address
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Please provide your address for hard copy delivery.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {["street", "city", "state", "country", "pincode"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 capitalize">
                {field === "pincode" ? "PIN Code" : field}
              </label>
              <input
                type="text"
                value={address[field]}
                onChange={(e) =>
                  setAddress({ ...address, [field]: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder={`Enter ${
                  field === "pincode" ? "PIN code" : field
                }`}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit Request</Button>
        </div>
      </div>
    </Modal>
  );
};

// Main Page Component
const Page = () => {
  const [selectedDonation, setSelectedDonation] = useState(null);
  const router = useRouter();
  const [taxReceiptModalOpen, setTaxReceiptModalOpen] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [receiptType, setReceiptType] = useState("");
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  const [filteredData, setFilteredData] = useState(donationData);
  const [receiptTypeModalOpen, setReceiptTypeModalOpen] = useState(false);

  const totalRecords = donationData.length;
  const filteredRecords = filteredData.length;
  const hasActiveFilters = filters.filter((f) => f.isActive).length > 0;

  const handleTaxReceiptRequest = (donation) => {
    setSelectedDonation(donation);
    setTaxReceiptModalOpen(true);
  };

  const handleTaxReceiptConfirm = (type) => {
    console.log("Tax receipt type selected:", type);

    if (type === null) {
      // User selected "No" for tax receipt
      toast.success("Your preference has been saved");
      return;
    }

    if (type === "open_receipt_type") {
      // User selected "Yes" - open receipt type modal
      setReceiptTypeModalOpen(true);
      return;
    }

    if (type === "hardcopy" || type === "both") {
      // Show address modal for hard copy requests
      setReceiptType(type);
      setAddressModalOpen(true);
    } else if (type === "email") {
      // Email-only request is already handled in the modal with toast
    }
  };

  const handleBackToReceiptType = () => {
    setReceiptTypeModalOpen(false);
    setTaxReceiptModalOpen(true);
  };

  const handleAddressSubmit = (address) => {
    console.log("Address submitted:", address);
    console.log("Receipt type:", receiptType);
    setAddressModalOpen(false);
    setSelectedDonation(null);
    toast.success("Your address has been submitted successfully");
  };

  const handleViewTaxReceipt = (donation) => {
    console.log("View tax receipt for:", donation.id);
    router.push("/donor/donation-history/view-tax-receipt");
  };

  const handleCancelReceipt = (donation) => {
    console.log("Cancel receipt for:", donation.id);
    toast.success("Your Request Has been Submitted");
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    const result = applyFilters(donationData, newFilters);
    setFilteredData(result);
    setFilterSidebarOpen(false);
  };

  const shouldShowTaxReceiptReq = (donation) => {
    return donation.receiptType === "80G";
  };

  return (
    <div className="w-full flex flex-col">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="sm:text-xl text-md font-bold text-brand-500">
          Contribution Logs
        </h1>

        <div className="flex items-center gap-3 ">
          <div className=" gap-5 sm:flex hidden">
            <div className="px-3 py-1 rounded-lg border border-green-200 bg-green-50">
              <p className="sm:text-base font-semibold text-green-700 tracking-wide text-sm">
                PAN: EWCPR5845E
              </p>
            </div>

            <button
              disabled
              className="px-3 py-1.5 rounded text-xs bg-gray-100 text-gray-400 border border-gray-300 cursor-not-allowed "
            >
              Verified
            </button>
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setFilterSidebarOpen(true)}
            className="flex items-center gap-2 px-4 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800 transition-colors text-brand-500 font-bold sm:text-sm text-sm"
          >
            <Filter className="sm:h-4 h-3.5 sm:w-4 w-3.5" />
            Filters
            {filters.filter((f) => f.isActive).length > 0 && (
              <span className="bg-brand-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {filters.filter((f) => f.isActive).length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Records Count */}
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {hasActiveFilters ? (
            <span className="">
              Showing{" "}
              <span className="font-semibold text-brand-600">
                {filteredRecords}
              </span>{" "}
              of <span className="font-semibold">{totalRecords}</span> records
            </span>
          ) : (
            <span>
              Total records:{" "}
              <span className="font-semibold text-brand-600">
                {totalRecords}
              </span>
            </span>
          )}
        </div>

        {/* Reset Filters Button - Only show when filters are active */}
        {hasActiveFilters && (
          <button
            onClick={() => {
              setFilters([]);
              setFilteredData(donationData);
            }}
            className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </button>
        )}
      </div>

      {/* Table Section */}
      <div className="flex-1 rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="sticky top-0 z-30 border-b border-gray-100 dark:border-white/[0.05] bg-gray-100 dark:bg-gray-800 shadow-sm">
              <TableRow>
                <TableCell
                  isHeader
                  className="sm:sticky left-0 z-10 sm:px-6 px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                >
                  Actions
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                >
                  Purpose
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                >
                  Donor Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                >
                  Email
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                >
                  Account Type
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                >
                  Currency
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                >
                  Amount
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                >
                  Exchange Rate
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                >
                  Converted Amount
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                >
                  Date of Donation
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                >
                  Transaction Mode
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                >
                  PAN No.
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                >
                  Tax Receipt No.
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                >
                  Cover Letter Date
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                >
                  Receipt Date
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                >
                  Receipt Type
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {filteredData.length > 0 ? (
                filteredData.map((donation) => (
                  <TableRow
                    key={donation.id}
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                  >
                    <TableCell className="sm:sticky left-0 z-20 px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                      <div className="flex gap-2 justify-center">
                        {shouldShowTaxReceiptReq(donation) && (
                          <div className="flex gap-3">
                            {/* Tax Receipt Req? Button - Enabled only for Scholarship */}
                            <DonationButton
                              onClick={() => handleTaxReceiptRequest(donation)}
                              disabled={
                                !donation.purpose.includes("Scholarship")
                              }
                              className={`font-medium text-theme-sm px-2 py-1 rounded transition-colors ${
                                !donation.purpose.includes("Scholarship")
                                  ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                                  : "text-blue-600 hover:bg-blue-50"
                              }`}
                            >
                              Tax Receipt Req?
                            </DonationButton>

                            {/* View TR&CI Button - Enabled only for Infrastructure */}
                            <DonationButton
                              onClick={() => handleViewTaxReceipt(donation)}
                              disabled={
                                !donation.purpose.includes("Infrastructure")
                              }
                              className={`font-medium text-theme-sm px-2 py-1 rounded transition-colors ${
                                !donation.purpose.includes("Infrastructure")
                                  ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                                  : "text-green-600 hover:bg-green-50"
                              }`}
                            >
                              View TR & CL
                            </DonationButton>

                            {/* Cancel Receipt Button - Enabled only for Infrastructure */}
                            <DonationButton
                              onClick={() => handleCancelReceipt(donation)}
                              disabled={
                                !donation.purpose.includes("Infrastructure")
                              }
                              className={`font-medium text-theme-sm px-2 py-1 rounded transition-colors ${
                                !donation.purpose.includes("Infrastructure")
                                  ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                                  : "text-red-600 hover:bg-red-50"
                              }`}
                            >
                              Cancel Receipt
                            </DonationButton>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 whitespace-nowrap">
                      {donation.purpose}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 whitespace-nowrap">
                      {donation.donorName}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 whitespace-nowrap">
                      {donation.email}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 whitespace-nowrap">
                      {donation.accountType}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 whitespace-nowrap">
                      {donation.currency}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 whitespace-nowrap">
                      {donation.amount.toLocaleString()} {donation.currency}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 whitespace-nowrap">
                      {donation.exchangeRate}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 whitespace-nowrap">
                      ₹{donation.convertedAmount.toLocaleString()}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 whitespace-nowrap">
                      {donation.donationDate}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 whitespace-nowrap">
                      {donation.transactionMode}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 whitespace-nowrap">
                      {donation.panNumber}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 whitespace-nowrap">
                      {donation.taxReceiptNo}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 whitespace-nowrap">
                      {donation.coverLetterDate}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 whitespace-nowrap">
                      {donation.receiptGeneratedDate}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 whitespace-nowrap">
                      {donation.receiptType}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                // Empty State Row
                <TableRow>
                  <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 whitespace-nowrap"></TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 whitespace-nowrap">
                    <div className=" flex-col justify-center sm:hidden flex">
                      <p className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
                        No records found
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 whitespace-nowrap"></TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 whitespace-nowrap"></TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 whitespace-nowrap"></TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 whitespace-nowrap"></TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 whitespace-nowrap"></TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 whitespace-nowrap"></TableCell>
                  <TableCell className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    <div className=" flex-col justify-center sm:flex hidden">
                      {/* <div>
                        <svg
                          className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div> */}

                      <p className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
                        No records found
                      </p>
                      {hasActiveFilters && (
                        <button
                          onClick={() => {
                            setFilters([]);
                            setFilteredData(donationData);
                          }}
                          className="mt-3 px-4 py-2 text-sm bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
                        >
                          Clear All Filters
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Footer Records Count */}
      {/* <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
          {hasActiveFilters ? (
            <span>
              Displaying{" "}
              <span className="font-semibold text-brand-600">
                {filteredRecords}
              </span>{" "}
              of <span className="font-semibold">{totalRecords}</span> total
              records
              {filteredRecords === 0 && " - No matching records found"}
            </span>
          ) : (
            <span>
              Total records:{" "}
              <span className="font-semibold text-brand-600">
                {totalRecords}
              </span>
            </span>
          )}
        </div>
      </div> */}

      {/* Modals */}
      <FilterSidebar
        isOpen={filterSidebarOpen}
        onClose={() => setFilterSidebarOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        onApplyFilters={handleApplyFilters}
      />

      <TaxReceiptRequestModal
        isOpen={taxReceiptModalOpen}
        onClose={() => {
          setTaxReceiptModalOpen(false);
          setSelectedDonation(null);
        }}
        onConfirm={handleTaxReceiptConfirm}
      />

      <ReceiptTypeModal
        isOpen={receiptTypeModalOpen}
        onClose={() => {
          setReceiptTypeModalOpen(false);
          setSelectedDonation(null);
        }}
        onBack={handleBackToReceiptType}
        onConfirm={handleTaxReceiptConfirm}
      />

      <AddressModal
        isOpen={addressModalOpen}
        onClose={() => {
          setAddressModalOpen(false);
          setSelectedDonation(null);
        }}
        onSubmit={handleAddressSubmit}
      />
    </div>
  );
};

export default Page;
