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
import { Filter, X } from "lucide-react";

// Sample data for demonstration
const departmentFundData = [
  {
    id: 1,
    proposalName: "Skill Development",
    proposalTitle: "Education",
    conceptOrProposal: "Concept Note",
    
  },
  {
    id: 2,
    proposalName: "Research Innovation",
    proposalTitle: "Technology",
    conceptOrProposal: "Proposal",
    
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
  { value: "proposalName", label: "Proposal Name" },
  { value: "proposalTitle", label: "Proposal Title" },
  { value: "conceptOrProposal", label: "Concept/Proposal" },
  
];

// Filter Sidebar Component
const FilterSidebar = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onApplyFilters,
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const addFilter = () => {
    setLocalFilters([
      ...localFilters,
      {
        id: Date.now(),
        column: "",
        operator: "contains",
        value: "",
        isActive: true,
      },
    ]);
  };

  const updateFilter = (id, field, value) => {
    setLocalFilters(
      localFilters.map((filter) =>
        filter.id === id ? { ...filter, [field]: value } : filter
      )
    );
  };

  const removeFilter = (id) => {
    setLocalFilters(localFilters.filter((filter) => filter.id !== id));
  };

  const toggleFilterActive = (id) => {
    setLocalFilters(
      localFilters.map((filter) =>
        filter.id === id ? { ...filter, isActive: !filter.isActive } : filter
      )
    );
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
  };

  const handleReset = () => {
    const resetFilters = localFilters.map((filter) => ({
      ...filter,
      isActive: false,
    }));
    setLocalFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Filters
            </h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filters List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {localFilters.map((filter) => (
              <div
                key={filter.id}
                className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3"
              >
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filter.isActive}
                      onChange={() => toggleFilterActive(filter.id)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Filter
                    </span>
                  </label>
                  <button
                    onClick={() => removeFilter(filter.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <select
                  value={filter.column}
                  onChange={(e) => updateFilter(filter.id, "column", e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select Column</option>
                  {columnOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <select
                  value={filter.operator}
                  onChange={(e) => updateFilter(filter.id, "operator", e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {filterOperators.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  value={filter.value}
                  onChange={(e) => updateFilter(filter.id, "value", e.target.value)}
                  placeholder="Filter value"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  disabled={["isEmpty", "isNotEmpty"].includes(filter.operator)}
                />
              </div>
            ))}

            <button
              onClick={addFilter}
              className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
            >
              + Add Filter
            </button>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <button
              onClick={handleApply}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply Filters
            </button>
            <button
              onClick={handleReset}
              className="w-full py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Reset All
            </button>
          </div>
        </div>
      </div>
    </div>
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

  const handleViewDetails = (id) => {
    // Navigate to detailed view or open modal
    toast.success(`Viewing details for record ${id}`);
    router.push(`/faculty/cn-proposals/cn-proposal-form`);
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
      <div className="flex-1 rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="sticky top-0 z-30 border-b border-gray-100 dark:border-white/[0.05] bg-gray-100 dark:bg-gray-800 shadow-sm">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                >
                  Proposal Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                >
                  Proposal Title
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                >
                  Concept/Proposal
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
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
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-all duration-300"
                  >
                    <TableCell className="px-4 py-2 text-start text-theme-sm dark:text-white/90 whitespace-nowrap">
                      {report.proposalName}
                    </TableCell>
                    <TableCell className="px-4 py-2 text-start text-theme-sm dark:text-white/90 whitespace-nowrap">
                      {report.proposalTitle}
                    </TableCell>
                    <TableCell className="px-4 py-2 text-start text-theme-sm dark:text-white/90 whitespace-nowrap">
                      {report.conceptOrProposal}
                    </TableCell>
                    <TableCell className="px-4 py-2 text-start text-theme-sm dark:text-white/90 whitespace-nowrap">
                      <Button
                        onClick={() => handleViewDetails(report.id)}
                        size="sm"
                      >
                        View
                      </Button>
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
    </div>
  );
};

export default DepartmentFundReport;