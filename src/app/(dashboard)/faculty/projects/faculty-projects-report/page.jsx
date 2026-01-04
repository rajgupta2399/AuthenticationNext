"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../../components/ui/table";
import { Modal } from "@/src/components/ui/modal";
import Button from "@/src/components/ui/button/Button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Filter, Trash, X, Download } from "lucide-react";
import Checkbox from "@/src/components/ui/input/Checkbox";
import Input from "@/src/components/ui/input/InputField";

// Sample data for demonstration
const departmentFundData = [
  {
    id: 1,
    proposalTitle: "Education",
    duration: "5",
    
  },
  {
    id: 2,
    proposalTitle: "Technology",
    duration: "10",
    
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
];

const columnOptions = [
  { value: "proposalTitle", label: "Proposal Title" },
  { value: "duration", label: "Duration" },
  
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

// Main Component
const DepartmentFundReport = () => {
  const router = useRouter();
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  const [filteredData, setFilteredData] = useState(departmentFundData);

  const totalRecords = departmentFundData.length;
  const filteredRecords = filteredData.length;
  const hasActiveFilters = filters.filter((f) => f.isActive).length > 0;

    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [selectedReportId, setSelectedReportId] = useState(null);

    const handleYesClick = (id) => {
    setSelectedReportId(id);
    setUploadModalOpen(true);
    };

    const handleNoClick = (id) => {
    router.push(`/faculty/projects/faculty-projects-form`);
    };

    const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    const result = applyFilters(departmentFundData, newFilters);
    setFilteredData(result);
    setFilterSidebarOpen(false);
  };

  return (
    <div className="w-full flex flex-col">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-3">
        <h1 className="sm:text-xl text-md font-bold text-brand-500">
          Request Reports
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
      <div className="sm:mb-2 mb-3 flex justify-between items-center">
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
              setFilteredData(departmentFundData);
            }}
            className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </button>
        )}
      </div>

      {/* Table Section */}
      {/* Table Section */}
      <div className="flex-1 rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="sticky top-0 z-30 border-b border-gray-100 dark:border-white/[0.05] bg-gray-100 dark:bg-gray-800 shadow-sm">
              <TableRow>
                {/* Mobile first button column - hidden on desktop */}
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap sm:hidden"
                >
                  Report Submitted Offline?
                </TableCell>

                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                >
                  Project Title
                </TableCell>

                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                >
                  Duration
                </TableCell>

                {/* Desktop button column - hidden on mobile */}
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap hidden sm:table-cell"
                >
                  Report Submitted Offline?
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {filteredData.length > 0 ? (
                filteredData.map((report) => (
                  <TableRow
                    key={report.id}
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-all duration-300"
                  >
                    {/* Mobile first button column */}
                    <TableCell className="px-4 py-2 sm:hidden">
                      <div className="flex items-center gap-2">
                        <Button size="sm" onClick={() => handleYesClick(report.id)}>Yes</Button>
                        <Button size="sm" variant="outline" onClick={() => handleNoClick(report.id)}>No</Button>
                      </div>
                    </TableCell>

                    <TableCell className="px-4 py-2 text-start text-theme-sm dark:text-white/90 whitespace-nowrap">
                      {report.proposalTitle}
                    </TableCell>

                    <TableCell className="px-4 py-2 text-start text-theme-sm dark:text-white/90 whitespace-nowrap">
                      {report.duration}
                    </TableCell>

                    {/* Desktop button column */}
                    <TableCell className="px-4 py-2 text-start text-theme-sm dark:text-white/90 whitespace-nowrap hidden sm:table-cell">
                      <div className="flex items-center gap-2">
                        <Button size="sm" onClick={() => handleYesClick(report.id)}>Yes</Button>
                        <Button size="sm" variant="outline" onClick={() => handleNoClick(report.id)}>No</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={9}
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
                            setFilteredData(departmentFundData);
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

      {uploadModalOpen && (
        <Modal isOpen={uploadModalOpen} onClose={() => setUploadModalOpen(false)}>
          <div className="p-6 space-y-5 bg-white dark:bg-gray-900 rounded-lg">
            
            {/* Title */}
            <h2 className="text-lg font-semibold text-brand-500">
              Upload Offline Report
            </h2>

            {/* File Input */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                Attach Report (PDF only)
              </label>
              <input
                type="file"
                accept=".pdf"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                          text-sm dark:bg-gray-800 dark:border-gray-700"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setUploadModalOpen(false)}
                className="px-4 py-1 text-sm"
              >
                Cancel
              </Button>

              <Button
                className="px-4 py-1 text-sm bg-brand-500 hover:bg-brand-600 text-white"
                onClick={() => {
                  toast.success("File uploaded successfully");
                  setUploadModalOpen(false);
                }}
              >
                Upload
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );

};




export default DepartmentFundReport;