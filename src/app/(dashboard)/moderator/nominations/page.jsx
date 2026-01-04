"use client";
import React, { useState, useEffect, useMemo } from "react";
import Input from "@/src/components/ui/input/InputField";
import Button from "@/src/components/ui/button/Button";
import {
  X,
  Download,
  Eye,
  ArrowRight,
  ChevronUp,
  ChevronDown,
  Filter,
} from "lucide-react";
import TextArea from "@/src/components/ui/input/TextArea";
import toast from "react-hot-toast";
import Checkbox from "@/src/components/ui/input/Checkbox";

// Sample nomination data - Added "Received" category
const initialNominationData = [
  {
    id: 1,
    category: "YAA",
    awardCategory: "Received",
    name: "Ms. Kavita Paliwal",
    achievement: "Professional Excellence",
    organization: "Service of Humanity at Tech Corp",
    pdfUrl:
      "https://publicbucket-development.zohostratus.in/pdf/Awards%20Nominations%20Profile%20-%20Format.pdf",
    imageUrl:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    remarks: "",
  },
  {
    id: 2,
    category: "DSA",
    awardCategory: "Shortlisted",
    name: "Ms. Priya Sharma",
    achievement: "Research Excellence",
    organization: "Innovation Labs",
    pdfUrl:
      "https://publicbucket-development.zohostratus.in/pdf/Awards%20Nominations%20Profile%20-%20Format.pdf",
    imageUrl:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    remarks: "",
  },
  {
    id: 3,
    category: "DAA",
    awardCategory: "Grand Shortlist",
    name: "Dr. Anjali Mehta",
    achievement: "Academic Leadership",
    organization: "Global Education Trust",
    pdfUrl:
      "https://publicbucket-development.zohostratus.in/pdf/Awards%20Nominations%20Profile%20-%20Format.pdf",
    imageUrl:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
    remarks: "",
  },
  {
    id: 4,
    category: "SKDA",
    awardCategory: "Final Shortlist",
    name: "Prof. Rahul Yadav",
    achievement: "Professional Excellence",
    organization: "Service of Humanity at Edu Foundation",
    pdfUrl:
      "https://publicbucket-development.zohostratus.in/pdf/Awards%20Nominations%20Profile%20-%20Format.pdf",
    imageUrl:
      "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg",
    remarks: "",
  },
  {
    id: 5,
    category: "YAA",
    awardCategory: "Grand Shortlist",
    name: "Dr. Sanjay Verma",
    achievement: "Community Service",
    organization: "Social Welfare Organization",
    pdfUrl:
      "https://publicbucket-development.zohostratus.in/pdf/Awards%20Nominations%20Profile%20-%20Format.pdf",
    imageUrl:
      "https://images.pexels.com/photos/450212/pexels-photo-450212.jpeg",
    remarks: "",
  },
  {
    id: 6,
    category: "DSA",
    awardCategory: "Final Shortlist",
    name: "Mr. Amit Kumar",
    achievement: "Academics Excellence",
    organization: "Service of Humanity at Research Institute",
    pdfUrl:
      "https://publicbucket-development.zohostratus.in/pdf/Awards%20Nominations%20Profile%20-%20Format.pdf",
    imageUrl:
      "https://images.pexels.com/photos/34921100/pexels-photo-34921100.jpeg",
    remarks: "",
  },
  {
    id: 7,
    category: "YAA",
    awardCategory: "Received",
    name: "Ms. Neha Gupta",
    achievement: "Young Innovator",
    organization: "Startup Ventures",
    pdfUrl:
      "https://publicbucket-development.zohostratus.in/pdf/Awards%20Nominations%20Profile%20-%20Format.pdf",
    imageUrl:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    remarks: "",
  },
  {
    id: 8,
    category: "DAA",
    awardCategory: "Received",
    name: "Dr. Rajesh Kumar",
    achievement: "Industry Collaboration",
    organization: "Corporate Solutions Inc",
    pdfUrl:
      "https://publicbucket-development.zohostratus.in/pdf/Awards%20Nominations%20Profile%20-%20Format.pdf",
    imageUrl:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
    remarks: "",
  },
  {
    id: 9,
    category: "SKDA",
    awardCategory: "Received",
    name: "Prof. Meena Singh",
    achievement: "Educational Reform",
    organization: "National Education Board",
    pdfUrl:
      "https://publicbucket-development.zohostratus.in/pdf/Awards%20Nominations%20Profile%20-%20Format.pdf",
    imageUrl:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
    remarks: "",
  },
];

// Filter configuration
const filterOperators = [
  { value: "contains", label: "Contains" },
  { value: "isEmpty", label: "Is Empty" },
  { value: "isNotEmpty", label: "Is Not Empty" },
  { value: "startsWith", label: "Starts With" },
  { value: "endsWith", label: "Ends With" },
];

const columnOptions = [
  { value: "category", label: "Category" },
  { value: "name", label: "Name" },
  { value: "achievement", label: "Achievement" },
  { value: "organization", label: "Organization" },
];

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
    onApplyFilters();
    onClose();
  };

  const handleReset = () => {
    setSelectedColumns([]);
    setLocalFilters([]);
    onFiltersChange([]);
    onApplyFilters();
    onClose();
  };

  return (
    <>
      {/* {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity"
          onClick={onClose}
        />
      )} */}

      <div
        className={`
          fixed top-[64px] right-0 h-full sm:w-96 w-72 bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Search Filters
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-300" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Select Columns
                  </h3>
                  <button
                    onClick={handleSelectAll}
                    className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    {selectedColumns.length === columnOptions.length
                      ? "Deselect All"
                      : "Select All"}
                  </button>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg max-h-80 overflow-y-auto">
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
                          <div className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
                            <div className="space-y-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
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
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                      Search Value
                                    </label>
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
                                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                                    />
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

const Page = () => {
  const [nominations, setNominations] = useState(initialNominationData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNomination, setSelectedNomination] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [hasPdfLoaded, setHasPdfLoaded] = useState(false);
  const [isRemarksVisible, setIsRemarksVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("pdf");
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  const [expandedSections, setExpandedSections] = useState({
    grandShortlist: true,
    finalShortlist: true,
    shortlisted: true,
    allReceived: true,
  });

  // Apply filters to nominations
  const filteredNominations = useMemo(() => {
    const result = applyFilters(nominations, filters);

    return {
      grandShortlist: result.filter(
        (nom) => nom.awardCategory === "Grand Shortlist"
      ),
      finalShortlist: result.filter(
        (nom) => nom.awardCategory === "Final Shortlist"
      ),
      shortlisted: result.filter((nom) => nom.awardCategory === "Shortlisted"),
      allReceived: result.filter((nom) => nom.awardCategory === "Received"),
    };
  }, [filters, nominations]);

  // Get counts for each category
  const { grandShortlist, finalShortlist, shortlisted, allReceived } =
    filteredNominations;

  const handleSubmitRemarks = () => {
    if (!remarks.trim()) {
      toast.error("Please enter your remarks before submitting.");
      return;
    }

    setNominations((prev) =>
      prev.map((nom) =>
        nom.id === selectedNomination.id
          ? { ...nom, remarks: remarks.trim() }
          : nom
      )
    );

    toast.success("Remarks submitted successfully!");
    closeModal();
  };

  const openModal = (nomination) => {
    setSelectedNomination(nomination);
    setRemarks(nomination.remarks || "");
    setIsModalOpen(true);
    setIsPdfLoading(true);
    setHasPdfLoaded(false);
    setActiveSection("pdf");
    setIsRemarksVisible(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNomination(null);
    setRemarks("");
    setIsPdfLoading(false);
    setHasPdfLoaded(false);
    setIsRemarksVisible(false);
    setActiveSection("pdf");
  };

  const moveToNextCategory = (nominationId) => {
    setNominations((prevNominations) =>
      prevNominations.map((nom) => {
        if (nom.id === nominationId) {
          if (nom.awardCategory === "Received") {
            return { ...nom, awardCategory: "Shortlisted" };
          } else if (nom.awardCategory === "Shortlisted") {
            return { ...nom, awardCategory: "Grand Shortlist" };
          } else if (nom.awardCategory === "Grand Shortlist") {
            return { ...nom, awardCategory: "Final Shortlist" };
          }
          return nom;
        }
        return nom;
      })
    );

    toast.success("Nomination moved successfully!");
    closeModal(); // Close modal after moving
  };

  const getGoogleDocsViewerUrl = (pdfUrl) => {
    return `https://docs.google.com/gview?url=${encodeURIComponent(
      pdfUrl
    )}&embedded=true`;
  };

  const handlePdfLoad = () => {
    setIsPdfLoading(false);
    setHasPdfLoaded(true);
  };

  const handlePdfError = () => {
    setIsPdfLoading(false);
    setHasPdfLoaded(false);
  };

  const getCategoryStyles = (awardCategory) => {
    switch (awardCategory) {
      case "Received":
        return {
          bg: "bg-brand-50 dark:bg-brand-900/20",
          border: "border-brand-200 dark:border-brand-800",
          text: "text-brand-800 dark:text-brand-300",
          badge:
            "bg-brand-100 text-brand-800 dark:bg-brand-800 dark:text-brand-100",
        };
      case "Shortlisted":
        return {
          bg: "bg-blue-50 dark:bg-blue-900/20",
          border: "border-blue-200 dark:border-blue-800",
          text: "text-blue-800 dark:text-blue-300",
          badge:
            "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
        };
      case "Grand Shortlist":
        return {
          bg: "bg-purple-50 dark:bg-purple-900/20",
          border: "border-purple-200 dark:border-purple-800",
          text: "text-purple-800 dark:text-purple-300",
          badge:
            "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100",
        };

      case "Final Shortlist":
        return {
          bg: "bg-green-50 dark:bg-green-900/20",
          border: "border-green-200 dark:border-green-800",
          text: "text-green-800 dark:text-green-300",
          badge:
            "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
        };
      default:
        return {
          bg: "bg-gray-50 dark:bg-gray-900/20",
          border: "border-gray-200 dark:border-gray-800",
          text: "text-gray-800 dark:text-gray-300",
          badge:
            "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
        };
    }
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleApplyFilters = () => {
    // Filters are already applied through the memo
  };

  const hasActiveFilters = filters.filter((f) => f.isActive).length > 0;

  const NominationCard = ({ nomination, showPromoteButton = false }) => {
    const styles = getCategoryStyles(nomination.awardCategory);

    return (
      <div
        className={`rounded-lg border-2 ${styles.border} ${styles.bg} p-4 hover:shadow-lg transition-all duration-300`}
      >
        <div className="flex gap-3">
          {/* Image */}
          <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden">
            <img
              src={nomination.imageUrl}
              alt={nomination.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                {nomination.category}
              </span>
            </div>

            <h3
              className={`font-semibold ${styles.text} text-sm mb-1 truncate`}
            >
              {nomination.name}
            </h3>

            <p className="text-gray-700 dark:text-gray-300 font-medium text-xs mb-1 truncate">
              {nomination.achievement}
            </p>

            <p className="text-gray-600 dark:text-gray-400 text-xs truncate">
              {nomination.organization}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-3">
          <Button
            onClick={() => openModal(nomination)}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white dark:border-gray-600 text-xs sm:text-sm py-2"
          >
            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
            View Details
          </Button>
        </div>
      </div>
    );
  };

  const SectionHeader = ({ title, count, isExpanded, onToggle, category }) => {
    const bgColor =
      category === "grandShortlist"
        ? "bg-purple-50 dark:bg-purple-900/70 dark:border-purple-700/30"
        : category === "finalShortlist"
        ? "bg-green-50 dark:bg-green-900/70 dark:border-green-700/30"
        : category === "shortlisted"
        ? "bg-blue-50 dark:bg-blue-900/70 dark:border-blue-700/30"
        : "bg-brand-50 dark:bg-brand-900/70 dark:border-brand-700/30";

    return (
      <div
        className={`p-3 sm:p-4 rounded-md shadow-sm cursor-pointer transition-colors ${bgColor}`}
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-brand-800 dark:text-gray-200 truncate">
              {title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-1">
              {count} candidate{count !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-2 ml-3">
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0 dark:text-white" />
            ) : (
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0 dark:text-white" />
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 ">
      {/* Header */}
      <div className="mb-3 sm:mb-4">
        <div className="flex flex-row sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <h1 className="text-md sm:text-xl font-bold text-brand-500 dark:text-white">
            Nomination Progress Report
          </h1>

          {/* Filter Button */}
          <button
            onClick={() => setFilterSidebarOpen(true)}
            className="flex items-center gap-2 px-1 sm:px-4 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base w-[120px] sm:w-auto justify-center"
          >
            <Filter className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="bg-brand-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {filters.filter((f) => f.isActive).length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Four Columns Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* All Received Nominations Column */}
        <div className="space-y-3 sm:space-y-4">
          <SectionHeader
            title="All Nominations"
            count={allReceived.length}
            isExpanded={expandedSections.allReceived}
            onToggle={() => toggleSection("allReceived")}
            category="allReceived"
          />
          {expandedSections.allReceived && (
            <div className="space-y-3 sm:space-y-4">
              {allReceived.map((nomination) => (
                <NominationCard
                  key={nomination.id}
                  nomination={nomination}
                  showPromoteButton={true}
                />
              ))}
              {allReceived.length === 0 && (
                <div className="text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400 text-sm">
                  No nominations found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Shortlisted Nominations Column */}
        <div className="space-y-3 sm:space-y-4">
          <SectionHeader
            title="Shortlisted"
            count={shortlisted.length}
            isExpanded={expandedSections.shortlisted}
            onToggle={() => toggleSection("shortlisted")}
            category="shortlisted"
          />
          {expandedSections.shortlisted && (
            <div className="space-y-3 sm:space-y-4">
              {shortlisted.map((nomination) => (
                <NominationCard
                  key={nomination.id}
                  nomination={nomination}
                  showPromoteButton={true}
                />
              ))}
              {shortlisted.length === 0 && (
                <div className="text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400 text-sm">
                  No nominations found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Grand Shortlist Nominations Column */}
        <div className="space-y-3 sm:space-y-4">
          <SectionHeader
            title="Grand Shortlisted"
            count={grandShortlist.length}
            isExpanded={expandedSections.grandShortlist}
            onToggle={() => toggleSection("grandShortlist")}
            category="grandShortlist"
          />
          {expandedSections.grandShortlist && (
            <div className="space-y-3 sm:space-y-4">
              {grandShortlist.map((nomination) => (
                <NominationCard
                  key={nomination.id}
                  nomination={nomination}
                  showPromoteButton={true}
                />
              ))}
              {grandShortlist.length === 0 && (
                <div className="text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400 text-sm">
                  No nominations found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Final Shortlist Nominations Column */}
        <div className="space-y-3 sm:space-y-4">
          <SectionHeader
            title="Final Shortlisted"
            count={finalShortlist.length}
            isExpanded={expandedSections.finalShortlist}
            onToggle={() => toggleSection("finalShortlist")}
            category="finalShortlist"
          />
          {expandedSections.finalShortlist && (
            <div className="space-y-3 sm:space-y-4">
              {finalShortlist.map((nomination) => (
                <NominationCard
                  key={nomination.id}
                  nomination={nomination}
                  showPromoteButton={false}
                />
              ))}
              {finalShortlist.length === 0 && (
                <div className="text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400 text-sm">
                  No nominations found
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedNomination && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
          <div
            className={`bg-white dark:bg-gray-800 rounded-xl w-full max-w-7xl shadow-2xl flex flex-col overflow-hidden ${
              selectedNomination.awardCategory === "Final Shortlist"
                ? "h-[80vh] sm:h-[90vh]"
                : "h-[80vh] sm:h-[90vh]"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                  <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white truncate">
                    {selectedNomination.name}
                  </h2>
                  <div className="flex gap-2">
                    <span className="text-xs font-medium px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 whitespace-nowrap">
                      {selectedNomination.category}
                    </span>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded whitespace-nowrap ${
                        selectedNomination.awardCategory === "Received"
                          ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                          : selectedNomination.awardCategory === "Shortlisted"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                          : selectedNomination.awardCategory ===
                            "Grand Shortlist"
                          ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                          : "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100"
                      }`}
                    >
                      {selectedNomination.awardCategory}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm truncate">
                  {selectedNomination.achievement} •{" "}
                  {selectedNomination.organization}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex-shrink-0 ml-2"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-300" />
              </button>
            </div>

            {/* Mobile Section Toggle - Show for all except Final Shortlist */}
            {selectedNomination.awardCategory !== "Final Shortlist" && (
              <div className="lg:hidden border-b border-gray-200 dark:border-gray-700">
                <div className="flex">
                  <button
                    onClick={() => setActiveSection("pdf")}
                    className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                      activeSection === "pdf"
                        ? "border-brand-500 text-brand-600 dark:text-brand-400"
                        : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    Document
                  </button>
                  <button
                    onClick={() => setActiveSection("remarks")}
                    className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                      activeSection === "remarks"
                        ? "border-brand-500 text-brand-600 dark:text-brand-400"
                        : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    Evaluation
                  </button>
                </div>
              </div>
            )}

            {/* Body */}
            <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
              {/* PDF Viewer */}
              <div
                className={`${
                  selectedNomination.awardCategory === "Final Shortlist"
                    ? "w-full"
                    : "flex-1 lg:flex-[2]"
                } p-2 sm:p-3 lg:p-4 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700 min-h-[40vh] sm:min-h-[50vh] lg:min-h-auto ${
                  selectedNomination.awardCategory === "Final Shortlist"
                    ? "block"
                    : activeSection === "pdf"
                    ? "block"
                    : "hidden lg:block"
                }`}
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
                  <h3 className="font-semibold dark:text-white text-sm sm:text-base">
                    Nomination Document
                  </h3>
                </div>

                <div className="relative w-full h-full min-h-[250px] sm:min-h-[350px] lg:min-h-[400px] rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 overflow-hidden">
                  {isPdfLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-700 z-10">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-brand-600 mx-auto mb-2 sm:mb-3"></div>
                        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                          Loading document...
                        </p>
                      </div>
                    </div>
                  )}

                  {!isPdfLoading && !hasPdfLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-700 z-10">
                      <div className="text-center p-3 sm:p-4">
                        <div className="text-red-500 mb-2">
                          <svg
                            className="w-8 h-8 sm:w-12 sm:h-12 mx-auto"
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
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 font-medium mb-2 text-sm sm:text-base">
                          Failed to load PDF
                        </p>
                        <Button
                          onClick={() =>
                            window.open(selectedNomination.pdfUrl, "_blank")
                          }
                          className="flex items-center gap-2 mx-auto text-xs sm:text-sm"
                        >
                          <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                          Open in New Tab
                        </Button>
                      </div>
                    </div>
                  )}

                  <iframe
                    src={getGoogleDocsViewerUrl(selectedNomination.pdfUrl)}
                    className="w-full h-full"
                    title="PDF Viewer"
                    frameBorder="0"
                    onLoad={handlePdfLoad}
                    onError={handlePdfError}
                  />
                </div>
              </div>

              {/* Evaluation Section - For Received, Shortlisted, and Grand Shortlist */}
              {selectedNomination.awardCategory !== "Final Shortlist" && (
                <div
                  className={`w-full lg:w-80 xl:w-96 p-3 sm:p-4 lg:p-6 bg-gray-50 dark:bg-gray-900 border-t lg:border-t-0 border-gray-200 dark:border-gray-700 flex-shrink-0 ${
                    activeSection === "remarks" ? "block" : "hidden lg:block"
                  }`}
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 text-sm sm:text-base lg:text-lg">
                    Evaluation
                  </h3>

                  <div className="space-y-3 sm:space-y-4">
                    {/* Remarks Button */}
                    <Button
                      onClick={() => setIsRemarksVisible(true)}
                      disabled={selectedNomination.remarks}
                      className="w-full bg-brand-600 hover:bg-brand-700 text-white text-sm sm:text-base disabled:bg-gray-400 disabled:cursor-not-allowed py-2 sm:py-3"
                    >
                      {selectedNomination.remarks
                        ? "Remarks Submitted"
                        : "Add Remarks"}
                    </Button>

                    {/* Remarks Form */}
                    {isRemarksVisible && !selectedNomination.remarks && (
                      <div className="space-y-3 sm:space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Evaluation Remarks
                          </label>
                          <TextArea
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            placeholder="Enter your evaluation remarks..."
                            className="w-full h-20 sm:h-24 lg:h-32 px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-brand-500 resize-none text-sm"
                          />
                        </div>

                        <div className="flex gap-2 sm:gap-3">
                          <Button
                            variant="outline"
                            className="flex-1 text-xs sm:text-sm"
                            onClick={() => {
                              setIsRemarksVisible(false);
                              setRemarks("");
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            className="flex-1 text-xs sm:text-sm"
                            disabled={!remarks.trim()}
                            onClick={handleSubmitRemarks}
                          >
                            Submit
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Show submitted remarks */}
                    {selectedNomination.remarks && (
                      <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">
                          Submitted Remarks:
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          {selectedNomination.remarks}
                        </p>
                      </div>
                    )}

                    {/* Promotion Button */}
                    <div className="pt-2">
                      <Button
                        onClick={() => {
                          moveToNextCategory(selectedNomination.id);
                        }}
                        disabled={!!selectedNomination.remarks}
                        className={`w-full flex items-center justify-center gap-2 ${
                          selectedNomination.awardCategory === "Received"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : selectedNomination.awardCategory === "Shortlisted"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-purple-600 hover:bg-purple-700"
                        } ${
                          selectedNomination.remarks
                            ? "opacity-50 cursor-not-allowed"
                            : "text-white"
                        } text-sm sm:text-base py-2 sm:py-3`}
                      >
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm">
                          {selectedNomination.awardCategory === "Received"
                            ? "Nominate to Shortlisted"
                            : selectedNomination.awardCategory === "Shortlisted"
                            ? "Nominate to Grand Shortlist"
                            : "Nominate to Final Shortlist"}
                        </span>
                      </Button>

                      {selectedNomination.remarks && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                          Evaluation completed - nomination cannot be moved
                          further
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Filter Sidebar */}
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

export default Page;
