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
import { Filter, Trash, X, Calendar, Clock } from "lucide-react";
import Checkbox from "@/src/components/ui/input/Checkbox";
import Input from "@/src/components/ui/input/InputField";
import TextArea from "@/src/components/ui/input/TextArea";

// Sample data for demonstration
const impactReportData = [
  {
    id: 1,
    cnProposal: "Student Award/Scholarship",
    requestId: "Faculty Futures Fund",
    deadline: "2025-12-2",
    extendedDeadline: null,
    extendRemarks: "",
  },
  {
    id: 2,
    cnProposal: "Faculty Award",
    requestId: "Innovators' Insight Award",
    deadline: "2025-12-20",
    extendedDeadline: null,
    extendRemarks: "",
  },
  {
    id: 3,
    cnProposal: "Lecture Series",
    requestId: "Perspectives: A Lecture Series",
    deadline: "2025-11-30",
    extendedDeadline: null,
    extendRemarks: "",
  },
  {
    id: 4,
    cnProposal: "Departmental Fund",
    requestId: "Faculty Futures Fund",
    deadline: "2025-12-12",
    extendedDeadline: null,
    extendRemarks: "",
  },
  {
    id: 5,
    cnProposal: "Community Welfare",
    requestId: "Scholarship of Excellence",
    deadline: "2025-12-1",
    extendedDeadline: null,
    extendRemarks: "",
  },
  {
    id: 6,
    cnProposal: "Faculty Chair",
    requestId: "The Thought Leader Series",
    deadline: "2025-12-30",
    extendedDeadline: null,
    extendRemarks: "",
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
  { value: "deadline", label: "Deadline" },
  { value: "extendedDeadline", label: "Extended Deadline" },
];

// Improved Extend Deadline Modal Component
const ExtendDeadlineModal = ({
  isOpen,
  onClose,
  currentDeadline,
  onExtendDeadline,
  reportId,
  programName,
}) => {
  const [extendedDate, setExtendedDate] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleSubmit = () => {
    if (!extendedDate) {
      toast.error("Please select an extended date");
      return;
    }

    if (new Date(extendedDate) <= new Date(currentDeadline)) {
      toast.error("Extended date must be after the current deadline");
      return;
    }

    onExtendDeadline(reportId, extendedDate, remarks);
    setExtendedDate("");
    setRemarks("");
    onClose();
  };

  const handleClose = () => {
    setExtendedDate("");
    setRemarks("");
    onClose();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Extend Deadline">
      <div className="p-1 sm:p-2 md:p-4 space-y-4 md:space-y-6">
        {/* Program Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 md:p-4 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 truncate">
                {programName}
              </h3>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                Current deadline:{" "}
                <span className="font-medium">
                  {formatDate(currentDeadline)}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Extended Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            New Deadline <span className="text-red-500">*</span>
          </label>
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-2 md:p-3">
            <DatePicker
              value={extendedDate}
              onChange={setExtendedDate}
              placeholder="Select extended date"
              minDate={currentDeadline}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Select a date after {formatDate(currentDeadline)}
          </p>
        </div>

        {/* Remarks */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Remarks <span className="text-gray-400">(Optional)</span>
          </label>
          <TextArea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Enter reason for extending deadline..."
            rows={3}
            className="w-full resize-none text-sm md:text-base"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1 py-2.5 sm:py-3 text-sm sm:text-base"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!extendedDate}
            className="flex-1 py-2.5 sm:py-3 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Extend Deadline
          </Button>
        </div>
      </div>
    </Modal>
  );
};

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

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(firstDay);
      prevDate.setDate(prevDate.getDate() - i - 1);
      days.push({ date: prevDate, isCurrentMonth: false });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(year, month, i);
      days.push({ date: currentDate, isCurrentMonth: true });
    }

    const totalCells = 42;
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
      <div
        className="w-full px-3 py-3 md:py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={
            value
              ? "text-gray-900 dark:text-white text-sm md:text-base"
              : "text-gray-500 text-sm md:text-base"
          }
        >
          {value ? formatDateDisplay(value) : placeholder}
        </span>
        <Calendar className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 w-80 sm:w-64 p-3 sm:p-4">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-1 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
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

            <div className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </div>

            <button
              onClick={() => navigateMonth(1)}
              className="p-1 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
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
                    w-8 h-8 sm:w-8 sm:h-8 text-xs sm:text-sm rounded transition-colors flex items-center justify-center
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
                        ? "cursor-not-allowed opacity-30"
                        : "cursor-pointer"
                    }
                  `}
                >
                  {day.date.getDate()}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
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
      setSelectedColumns((prev) => prev.filter((col) => col !== column));
      setLocalFilters((prev) =>
        prev.filter((filter) => filter.column !== column)
      );
    } else {
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
      setSelectedColumns([]);
      setLocalFilters([]);
    } else {
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
  };

  const handleReset = () => {
    setSelectedColumns([]);
    setLocalFilters([]);
    onFiltersChange([]);
    onApplyFilters([]);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-20 transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-[64px] right-0 h-full sm:w-96 w-72 bg-[#F9FAFB] dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
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

          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
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
                        <label className="flex items-center p-3 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                          <Checkbox
                            checked={isSelected}
                            onChange={() => handleColumnToggle(column.value)}
                          />
                          <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                            {column.label}
                          </span>
                        </label>

                        {isSelected && filter && (
                          <div className="bg-[#F2F4F7] dark:bg-blue-900/20 border-t border-blue-100 dark:border-blue-800 p-4">
                            <div className="space-y-3">
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
const Dummy = () => {
  const router = useRouter();
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  const [filteredData, setFilteredData] = useState(impactReportData);
  const [extendModalOpen, setExtendModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [recentlyExtended, setRecentlyExtended] = useState(new Set());

  const totalRecords = impactReportData.length;
  const filteredRecords = filteredData.length;
  const hasActiveFilters = filters.filter((f) => f.isActive).length > 0;

  const handleViewReport = (id) => {
    router.push(`/faculty/impact-report/impact-report-form/${id}`);
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    const result = applyFilters(impactReportData, newFilters);
    setFilteredData(result);
    setFilterSidebarOpen(false);
  };

  const handleExtendDeadline = (reportId, extendedDate, remarks) => {
    setFilteredData((prevData) =>
      prevData.map((report) =>
        report.id === reportId
          ? {
              ...report,
              deadline: extendedDate,
              extendedDeadline: extendedDate,
              extendRemarks: remarks,
            }
          : report
      )
    );

    const reportIndex = impactReportData.findIndex(
      (report) => report.id === reportId
    );
    if (reportIndex !== -1) {
      impactReportData[reportIndex] = {
        ...impactReportData[reportIndex],
        deadline: extendedDate,
        extendedDeadline: extendedDate,
        extendRemarks: remarks,
      };
    }

    setRecentlyExtended((prev) => new Set(prev.add(reportId)));
    toast.success("Deadline extended successfully!");
  };

  const openExtendModal = (report) => {
    setSelectedReport(report);
    setExtendModalOpen(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDeadlineDisplay = (report) => {
    const deadline = report.extendedDeadline || report.deadline;
    const isRecentlyExtended = recentlyExtended.has(report.id);

    return {
      date: deadline,
      isExtended: !!report.extendedDeadline,
      isRecent: isRecentlyExtended,
    };
  };

  return (
    <div className="w-full flex flex-col">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-3">
        <h1 className="sm:text-xl text-md font-bold text-brand-500">
          Impact Reports
        </h1>

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
      <div className="sm:mb-2 mb-3 flex justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {hasActiveFilters ? (
            <span>
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
                {/* Mobile-only headers */}
                <TableCell className="px-4 py-3 text-start text-theme-sm font-semibold text-gray-900 dark:text-white/90 whitespace-nowrap sm:hidden">
                  Actions
                </TableCell>
                <TableCell className="px-4 py-3 text-start text-theme-sm font-semibold text-gray-900 dark:text-white/90 whitespace-nowrap sm:hidden">
                  Extend
                </TableCell>

                {/* Desktop headers */}
                <TableCell className="px-4 py-3 text-start text-theme-sm font-semibold text-gray-900 dark:text-white/90 whitespace-nowrap">
                  Category
                </TableCell>
                <TableCell className="px-4 py-3 text-start text-theme-sm font-semibold text-gray-900 dark:text-white/90 whitespace-nowrap">
                  Program
                </TableCell>
                <TableCell className="px-4 py-3 text-start text-theme-sm font-semibold text-gray-900 dark:text-white/90 whitespace-nowrap">
                  Deadline
                </TableCell>
                <TableCell className="px-4 py-3 text-start text-theme-sm font-semibold text-gray-900 dark:text-white/90 whitespace-nowrap sm:table-cell hidden">
                  Extend Deadline
                </TableCell>
                <TableCell className="px-4 py-3 text-start text-theme-sm font-semibold text-gray-900 dark:text-white/90 whitespace-nowrap sm:table-cell hidden">
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {filteredData.length > 0 ? (
                filteredData.map((report) => {
                  const deadlineInfo = getDeadlineDisplay(report);
                  const isLectureSeries =
                    report.cnProposal?.toLowerCase() === "lecture series";

                  return (
                    <TableRow
                      key={report.id}
                      className={`hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-all duration-300
                  ${
                    deadlineInfo.isRecent
                      ? "bg-green-100 dark:bg-green-900/20 border-l-4 border-l-green-500"
                      : ""
                  }
                  ${
                    isLectureSeries
                      ? "bg-red-100 dark:bg-red-900/30 border-l-4 border-l-red-500"
                      : ""
                  }
                `}
                    >
                      {/* Mobile Actions - 1st Column */}
                      <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 whitespace-nowrap sm:hidden">
                        <Button
                          onClick={() => handleViewReport(report.id)}
                          size="sm"
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Submit
                        </Button>
                      </TableCell>

                      {/* Mobile Extend Deadline - 2nd Column */}
                      <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 whitespace-nowrap sm:hidden">
                        <Button
                          onClick={() => openExtendModal(report)}
                          variant="outline"
                          size="sm"
                          className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border-gray-300 text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>Extend</span>
                        </Button>
                      </TableCell>

                      {/* Category */}
                      <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 whitespace-nowrap">
                        {report.cnProposal}
                      </TableCell>

                      {/* Program */}
                      <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 whitespace-nowrap">
                        {report.requestId}
                      </TableCell>

                      {/* Deadline */}
                      <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-medium ${
                              deadlineInfo.isExtended
                                ? "text-green-600 dark:text-green-400"
                                : "text-gray-700 dark:text-gray-300"
                            } ${deadlineInfo.isRecent ? "animate-pulse" : ""}`}
                          >
                            {formatDate(deadlineInfo.date)}
                          </span>
                          {deadlineInfo.isExtended && (
                            <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full">
                              Extended
                            </span>
                          )}
                        </div>
                      </TableCell>

                      {/* Desktop Extend Deadline Button */}
                      <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 whitespace-nowrap sm:table-cell hidden">
                        <Button
                          onClick={() => openExtendModal(report)}
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2 bg-white hover:bg-gray-50 border-gray-300 text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>Extend</span>
                        </Button>
                      </TableCell>

                      {/* Desktop Actions */}
                      <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 whitespace-nowrap sm:table-cell hidden">
                        <Button
                          onClick={() => handleViewReport(report.id)}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Submit Report
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
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

      <FilterSidebar
        isOpen={filterSidebarOpen}
        onClose={() => setFilterSidebarOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        onApplyFilters={handleApplyFilters}
      />

      <ExtendDeadlineModal
        isOpen={extendModalOpen}
        onClose={() => setExtendModalOpen(false)}
        currentDeadline={selectedReport?.deadline}
        onExtendDeadline={handleExtendDeadline}
        reportId={selectedReport?.id}
        programName={selectedReport?.requestId}
      />
    </div>
  );
};

export default Dummy;
