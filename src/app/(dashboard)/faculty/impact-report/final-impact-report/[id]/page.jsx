"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../../../components/ui/table";
import { Modal } from "@/src/components/ui/modal";
import Button from "@/src/components/ui/button/Button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Filter, Trash, X, Download } from "lucide-react";
import Checkbox from "@/src/components/ui/input/Checkbox";
import Input from "@/src/components/ui/input/InputField";

// Sample data for demonstration
const impactReportData = [
  {
    id: 1,
    cnProposal: "Student Award/Scholarship",
    requestId: "Faculty Futures Fund",
    // companyName: "Tech Innovations Ltd",
    deadline: "2024-03-15",
    // remarks: "Initial proposal submission for research collaboration",
    // requestedBy: "Dr. Sarah Johnson",
  },
  {
    id: 2,
    cnProposal: "Faculty Award",
    requestId: "Innovators’ Insight Award",
    deadline: "2024-04-20",
  },
  {
    id: 3,
    cnProposal: "Lecture Series",
    requestId: "Perspectives: A Lecture Series",
    // companyName: "EduTech Solutions",
    deadline: "2024-02-28",
    // remarks: "Scholarship program implementation",
    // requestedBy: "Dr. Priya Sharma",
  },
];

// Filter Types and Options
const filterOperators = [
  { value: "contains", label: "Contains" },
  { value: "isEmpty", label: "Is Empty" },
  { value: "isNotEmpty", label: "Is Not Empty" },
  { value: "startsWith", label: "Starts With" },
  { value: "endsWith", label: "Ends With" },
  { value: "equals", label: "Equals" },
  { value: "greaterThan", label: "Greater Than" },
  { value: "lessThan", label: "Less Than" },
];

const columnOptions = [
  { value: "cnProposal", label: "Category" },
  { value: "requestId", label: "Program" },
  // { value: "companyName", label: "Company Name" },
  { value: "deadline", label: "Deadline" },
  // { value: "remarks", label: "Remarks" },
  // { value: "requestedBy", label: "Requested By" },
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
                  <button
                    onClick={handleSelectAll}
                    className="text-sm text-brand-600 hover:text-brand-700 font-medium"
                  >
                    {selectedColumns.length === columnOptions.length
                      ? "Deselect All"
                      : "Select All"}
                  </button>
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
                                    {column.value === "deadline" ? (
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
        case "equals":
          return itemValue === filterValue;
        case "greaterThan":
          return new Date(itemValue) > new Date(filterValue);
        case "lessThan":
          return new Date(itemValue) < new Date(filterValue);
        default:
          return true;
      }
    });
  });
};

// Main Dummy Component
const FinalReport = () => {
  const router = useRouter();
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  const [filteredData, setFilteredData] = useState(impactReportData);

  // PDF Viewer States
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [selectedReportTitle, setSelectedReportTitle] = useState("");
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [hasPdfLoaded, setHasPdfLoaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const totalRecords = impactReportData.length;
  const filteredRecords = filteredData.length;
  const hasActiveFilters = filters.filter((f) => f.isActive).length > 0;

  const handleViewReport = (id) => {
    router.push(`/faculty/impact-report/impact-report-form/${id}`);
  };

  const openPdfViewer = async (pdfUrl, reportTitle) => {
    setSelectedPdf(pdfUrl);
    setSelectedReportTitle(reportTitle);
    setIsPdfViewerOpen(true);
    setIsPdfLoading(true);
    setHasPdfLoaded(false);
  };

  const closePdfViewer = () => {
    setIsPdfViewerOpen(false);
    setSelectedPdf("");
    setSelectedReportTitle("");
    setIsPdfLoading(false);
    setHasPdfLoaded(false);
    setIsDownloading(false);
  };

  const handlePdfLoad = () => {
    setIsPdfLoading(false);
    setHasPdfLoaded(true);
  };

  const handlePdfError = () => {
    setIsPdfLoading(false);
    setHasPdfLoaded(false);
  };

  // Enhanced PDF download function
  const handleDownloadPdf = async (pdfUrl, reportTitle) => {
    if (!pdfUrl) return;

    setIsDownloading(true);

    try {
      // Fetch the PDF as a blob
      const response = await fetch(pdfUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.status}`);
      }

      const blob = await response.blob();

      // Create a blob URL
      const blobUrl = URL.createObjectURL(blob);

      // Create download link
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${reportTitle.replace(/\s+/g, "_")}_Report.pdf`;
      link.target = "_blank";

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up blob URL
      URL.revokeObjectURL(blobUrl);

      console.log("PDF Downloaded Successfully");
    } catch (error) {
      console.error("Download error:", error);
      // Fallback: open in new tab
      window.open(pdfUrl, "_blank");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closePdfViewer();
    }
  };

  const getGoogleDocsViewerUrl = (pdfUrl) => {
    return `https://docs.google.com/gview?url=${encodeURIComponent(
      pdfUrl
    )}&embedded=true`;
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    const result = applyFilters(impactReportData, newFilters);
    setFilteredData(result);
    setFilterSidebarOpen(false);
  };

  const isSignedUCDisabled = (id) => {
    return id === 1; // Disable for first record
  };

  return (
    <div className="w-full flex flex-col">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="sm:text-xl text-md font-bold text-brand-500">
          Final Submit Impact Reports
        </h1>

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
              setFilteredData(impactReportData);
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
                {/* Mobile first Actions column */}
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap sm:hidden"
                >
                  Actions
                </TableCell>

                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                >
                  Category
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                >
                  Program
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                >
                  Deadline
                </TableCell>

                {/* Desktop Actions column */}
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap hidden sm:table-cell"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {filteredData.length > 0 ? (
                filteredData.map((report) => (
                  <TableRow
                    key={report.id}
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                  >
                    {/* Mobile first Actions column */}
                    <TableCell className="px-4 py-2 sm:hidden">
                      {report.id === 1 ? (
                        <Button onClick={() => handleViewReport(report.id)}>
                          Revise
                        </Button>
                      ) : (
                        <Button
                          onClick={() =>
                            openPdfViewer(
                              "https://publicbucket-development.zohostratus.in/pdf/scholarship-report.pdf",
                              report.programName
                            )
                          }
                          disabled={isSignedUCDisabled(report.id)}
                          className={
                            isSignedUCDisabled(report.id)
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }
                        >
                          View
                        </Button>
                      )}
                    </TableCell>

                    <TableCell className="px-4 py-2 text-start text-theme-sm dark:text-white/90 whitespace-nowrap">
                      {report.cnProposal}
                    </TableCell>
                    <TableCell className="px-4 py-2 text-start text-theme-sm dark:text-white/90 whitespace-nowrap">
                      {report.requestId}
                    </TableCell>
                    <TableCell className="px-4 py-2 text-start text-theme-sm dark:text-white/90 whitespace-nowrap">
                      {new Date(report.deadline).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>

                    {/* Desktop Actions column */}
                    <TableCell className="px-4 py-2 text-start text-theme-sm dark:text-white/90 whitespace-nowrap hidden sm:table-cell">
                      {report.id === 1 ? (
                        <Button onClick={() => handleViewReport(report.id)}>
                          Revise
                        </Button>
                      ) : (
                        <Button
                          onClick={() =>
                            openPdfViewer(
                              "https://publicbucket-development.zohostratus.in/pdf/scholarship-report.pdf",
                              report.programName
                            )
                          }
                          disabled={isSignedUCDisabled(report.id)}
                          className={
                            isSignedUCDisabled(report.id)
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }
                        >
                          View
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
                        No records found
                      </p>
                      {hasActiveFilters && (
                        <button
                          onClick={() => {
                            setFilters([]);
                            setFilteredData(impactReportData);
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

      {/* PDF Viewer Modal */}
      {isPdfViewerOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-999 p-2 sm:p-4"
          onClick={handleBackdropClick}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-6xl sm:h-[90vh] h-[80vh] flex flex-col shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm sm:text-xl font-semibold text-brand-800 dark:text-white truncate pr-2">
                {selectedReportTitle} - Document Viewer
              </h3>
              <button
                onClick={closePdfViewer}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-500 dark:text-gray-400 flex-shrink-0"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* PDF Viewer with Loading State */}
            <div className="flex-1 p-2 sm:p-4 relative">
              {/* Loading Overlay */}
              {isPdfLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg z-10">
                  <div className="text-center px-4">
                    <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-brand-600 mx-auto mb-3 sm:mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-300 font-medium text-sm sm:text-base">
                      Loading PDF document...
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">
                      This may take a few moments
                    </p>
                    <button
                      onClick={closePdfViewer}
                      className="mt-3 sm:mt-4 px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-xs sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* PDF Error State */}
              {!isPdfLoading && !hasPdfLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg z-10">
                  <div className="text-center px-4">
                    <svg
                      className="w-10 h-10 sm:w-16 sm:h-16 text-red-500 mx-auto mb-3 sm:mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    <p className="text-gray-600 dark:text-gray-300 font-medium mb-2 text-sm sm:text-base">
                      Failed to load PDF
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-4">
                      The document could not be loaded. Please try downloading
                      it instead.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <button
                        onClick={() =>
                          handleDownloadPdf(selectedPdf, selectedReportTitle)
                        }
                        disabled={isDownloading}
                        className="flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isDownloading ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 sm:h-4 border-b-2 border-white mr-2"></div>
                            Downloading...
                          </>
                        ) : (
                          <>
                            <Download size={14} className="mr-2" />
                            Download PDF
                          </>
                        )}
                      </button>
                      <button
                        onClick={closePdfViewer}
                        className="flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-xs sm:text-sm"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* PDF Viewer */}
              {selectedPdf && (
                <iframe
                  src={getGoogleDocsViewerUrl(selectedPdf)}
                  className={`w-full h-full rounded-lg border border-gray-200 dark:border-gray-700 ${
                    isPdfLoading ? "opacity-0" : "opacity-100"
                  } transition-opacity duration-300`}
                  title="PDF Viewer"
                  frameBorder="0"
                  onLoad={handlePdfLoad}
                  onError={handlePdfError}
                />
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
                {isPdfLoading ? (
                  <span className="flex items-center justify-center sm:justify-start">
                    <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-brand-600 mr-2"></div>
                    Loading document...
                  </span>
                ) : hasPdfLoaded ? (
                  `Viewing: ${selectedReportTitle}`
                ) : (
                  "Ready to view"
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:space-x-3">
                <button
                  onClick={() =>
                    handleDownloadPdf(selectedPdf, selectedReportTitle)
                  }
                  disabled={isPdfLoading || isDownloading}
                  className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDownloading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download size={16} className="mr-2" />
                      Download PDF
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <FilterSidebar
        isOpen={filterSidebarOpen}
        onClose={() => setFilterSidebarOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
};

export default FinalReport;
