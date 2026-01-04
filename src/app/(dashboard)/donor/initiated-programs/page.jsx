// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import {
//   List,
//   Grid,
//   ChevronDown,
//   GraduationCap,
//   BanknoteIcon,
//   Network,
//   X,
//   Send,
// } from "lucide-react";
// import { FaChalkboardTeacher } from "react-icons/fa";
// import TextArea from "@/src/components/ui/input/TextArea";
// import toast from "react-hot-toast";

// const programsData = {
//   "2024-25": [
//     {
//       name: "Insight Scholarship",
//       impact: "12 Student Supported",
//       id: "program-a",
//       icon: GraduationCap,
//       bgColor: "bg-brand-400",
//       textColor: "text-white",
//     },
//     {
//       name: "Faculty Futures Fund",
//       impact: "8 Faculty Members Funded",
//       id: "program-b",
//       icon: BanknoteIcon,
//       bgColor: "bg-brand-400",
//       textColor: "text-white",
//     },
//     {
//       name: "Perspectives: A Lecture Series",
//       impact: "15 Sessions Conducted",
//       id: "program-c",
//       icon: FaChalkboardTeacher,
//       bgColor: "bg-brand-400",
//       textColor: "text-gray-800",
//     },
//     {
//       name: "India Network Foundation Travel Grant",
//       impact: "24 Travel Grants Awarded",
//       id: "program-d",
//       icon: Network,
//       bgColor: "bg-brand-400",
//       textColor: "text-gray-800",
//     },
//   ],
//   "2023-24": [
//     {
//       name: "Faculty Futures Fund",
//       impact: "10 Faculty Members Funded",
//       id: "program-b",
//       icon: BanknoteIcon,
//       bgColor: "bg-brand-400",
//       textColor: "text-white",
//     },
//     {
//       name: "Perspectives: A Lecture Series",
//       impact: "12 Sessions Conducted",
//       id: "program-c",
//       icon: FaChalkboardTeacher,
//       bgColor: "bg-brand-400",
//       textColor: "text-gray-800",
//     },
//     {
//       name: "India Network Foundation Travel Grant",
//       impact: "20 Travel Grants Awarded",
//       id: "program-d",
//       icon: Network,
//       bgColor: "bg-brand-400",
//       textColor: "text-gray-800",
//     },
//   ],
//   "2022-23": [
//     {
//       name: "Perspectives: A Lecture Series",
//       impact: "8 Sessions Conducted",
//       id: "program-c",
//       icon: FaChalkboardTeacher,
//       bgColor: "bg-brand-400",
//       textColor: "text-gray-800",
//     },
//     {
//       name: "India Network Foundation Travel Grant",
//       impact: "18 Travel Grants Awarded",
//       id: "program-d",
//       icon: Network,
//       bgColor: "bg-brand-400",
//       textColor: "text-gray-800",
//     },
//   ],
// };

// const financialYears = ["2024-25", "2023-24", "2022-23"];

// const Page = () => {
//   const [layout, setLayout] = useState("card");
//   const [selectedYear, setSelectedYear] = useState("2024-25");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
//   const [selectedProgram, setSelectedProgram] = useState(null);
//   const [feedbackData, setFeedbackData] = useState({
//     rating: 0,
//     comment: "",
//     suggestions: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const currentPrograms = programsData[selectedYear] || [];

//   const openFeedbackModal = (program) => {
//     setSelectedProgram(program);
//     setFeedbackData({
//       rating: 0,
//       comment: "",
//       suggestions: "",
//     });
//     setIsFeedbackModalOpen(true);
//   };

//   const closeFeedbackModal = () => {
//     setIsFeedbackModalOpen(false);
//     setSelectedProgram(null);
//     setFeedbackData({
//       rating: 0,
//       comment: "",
//       suggestions: "",
//     });
//   };

//   const handleFeedbackSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Simulate API call
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       console.log("Feedback submitted:", {
//         program: selectedProgram,
//         feedback: feedbackData,
//       });

//       // Show success message or handle response
//       toast.success("Thank you for your feedback!");
//       closeFeedbackModal();
//     } catch (error) {
//       console.error("Error submitting feedback:", error);
//       toast.error("Failed to submit feedback. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleRatingClick = (rating) => {
//     setFeedbackData((prev) => ({ ...prev, rating }));
//   };

//   const getProgramLinks = (programId, program) => {
//     const links = [];

//     // All programs have View Beneficiaries Detail
//     links.push(
//       <Link
//         key="beneficiaries"
//         href={`/donor/initiated-programs/view-beneficiaries-details/${programId}`}
//         className="inline-flex items-center justify-center px-3 py-2 bg-white border border-brand-500 text-brand-600 rounded-lg hover:bg-brand-50 font-medium text-sm transition-colors shadow-sm"
//       >
//         View Recipient
//       </Link>
//     );

//     switch (programId) {
//       case "program-a":
//         // Show only "No Report" for program-a
//         return [
//           <span
//             key="no-report"
//             className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium text-sm border border-gray-300"
//           >
//             No Data Available
//           </span>,
//           <button
//             key="feedback"
//             onClick={() => openFeedbackModal(programId)}
//             className="inline-flex items-center justify-center px-3 py-2 bg-white border border-brand-500 text-brand-600 rounded-lg hover:bg-brand-50 font-medium text-sm transition-colors shadow-sm"
//           >
//             Feedback
//           </button>,
//         ];

//       case "program-b":
//         // Only beneficiaries link and feedback (already added)
//         return links;

//       case "program-c":
//         // Add View Report and View FRL
//         links.push(
//           <Link
//             key="report"
//             href={`/donor/initiated-programs/view-report/${programId}`}
//             className="inline-flex items-center justify-center px-3 py-2 bg-white border border-brand-500 text-brand-600 rounded-lg hover:bg-brand-50 font-medium text-sm transition-colors shadow-sm"
//           >
//             View Report
//           </Link>,
//           <Link
//             key="frl"
//             href={`/donor/initiated-programs/view-frl/${programId}`}
//             className="inline-flex items-center justify-center px-3 py-2 bg-white border border-brand-500 text-brand-600 rounded-lg hover:bg-brand-50 font-medium text-sm transition-colors shadow-sm"
//           >
//             View FRL
//           </Link>,
//           <button
//             key="feedback"
//             onClick={() => openFeedbackModal(program)}
//             className="inline-flex items-center justify-center px-3 py-2 bg-white border border-brand-500 text-brand-600 rounded-lg hover:bg-brand-50 font-medium text-sm transition-colors shadow-sm"
//           >
//             Feedback
//           </button>
//         );
//         return links;

//       case "program-d":
//         // Add all links
//         links.push(
//           <Link
//             key="report"
//             href={`/donor/initiated-programs/view-report/${programId}`}
//             className="inline-flex items-center justify-center px-3 py-2 bg-white border border-brand-500 text-brand-600 rounded-lg hover:bg-brand-50 font-medium text-sm transition-colors shadow-sm"
//           >
//             View Report
//           </Link>,
//           <Link
//             key="frl"
//             href={`/donor/initiated-programs/view-frl/${programId}`}
//             className="inline-flex items-center justify-center px-3 py-2 bg-white border border-brand-500 text-brand-600 rounded-lg hover:bg-brand-50 font-medium text-sm transition-colors shadow-sm"
//           >
//             View FRL
//           </Link>,
//           <Link
//             key="uc"
//             href={`/donor/initiated-programs/view-uc/${programId}`}
//             className="inline-flex items-center justify-center px-3 py-2 bg-white border border-brand-500 text-brand-600 rounded-lg hover:bg-brand-50 font-medium text-sm transition-colors shadow-sm"
//           >
//             View UC
//           </Link>,
//           <button
//             key="feedback"
//             onClick={() => openFeedbackModal(program)}
//             className="inline-flex items-center justify-center px-3 py-2 bg-white border border-brand-500 text-brand-600 rounded-lg hover:bg-brand-50 font-medium text-sm transition-colors shadow-sm"
//           >
//             Feedback
//           </button>
//         );
//         return links;

//       default:
//         return links;
//     }
//   };

//   const getCardBackground = (program) => {
//     return program.bgColor;
//   };

//   return (
//     <div className="w-full h-full">
//       <div className="headingAndFilter flex justify-between items-center">
//         <h1 className="text-xl font-bold mb-6 text-brand-500">
//           Initiated Programs
//         </h1>

//         <div className="flex items-center gap-4 mb-6">
//           {/* Financial Year Filter */}
//           <div className="relative">
//             <div className="relative">
//               <button
//                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                 className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors min-w-[120px] justify-between"
//               >
//                 <span>FY {selectedYear}</span>
//                 <ChevronDown
//                   size={16}
//                   className={`transition-transform ${
//                     isDropdownOpen ? "rotate-180" : ""
//                   }`}
//                 />
//               </button>

//               {isDropdownOpen && (
//                 <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10">
//                   {financialYears.map((year) => (
//                     <button
//                       key={year}
//                       onClick={() => {
//                         setSelectedYear(year);
//                         setIsDropdownOpen(false);
//                       }}
//                       className={`w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
//                         selectedYear === year
//                           ? "bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400"
//                           : "text-gray-700 dark:text-gray-200"
//                       }`}
//                     >
//                       FY {year}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Layout switcher */}
//           <div className="filterAndLayout flex items-center gap-2">
//             <div className="flex bg-gray-100 dark:bg-white/10 rounded-lg p-1">
//               <button
//                 onClick={() => setLayout("card")}
//                 className={`p-2 rounded-md transition-colors ${
//                   layout === "card"
//                     ? "bg-white dark:bg-brand-500 shadow-sm"
//                     : "hover:bg-white/50 dark:hover:bg-white/5"
//                 }`}
//               >
//                 <Grid
//                   size={18}
//                   className={
//                     layout === "card"
//                       ? "text-brand-600 dark:text-white"
//                       : "text-gray-500"
//                   }
//                 />
//               </button>
//               <button
//                 onClick={() => setLayout("list")}
//                 className={`p-2 rounded-md transition-colors ${
//                   layout === "list"
//                     ? "bg-white dark:bg-brand-500 shadow-sm"
//                     : "hover:bg-white/50 dark:hover:bg-white/5"
//                 }`}
//               >
//                 <List
//                   size={18}
//                   className={
//                     layout === "list"
//                       ? "text-brand-600 dark:text-white"
//                       : "text-gray-500"
//                   }
//                 />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Close dropdown when clicking outside */}
//       {isDropdownOpen && (
//         <div
//           className="fixed inset-0 z-0"
//           onClick={() => setIsDropdownOpen(false)}
//         />
//       )}

//       {/* List Layout */}
//       {layout === "list" && (
//         <div className="space-y-4">
//           {currentPrograms.map((p) => {
//             const IconComponent = p.icon;
//             return (
//               <div
//                 key={p.id}
//                 className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 dark:bg-white/[0.03] dark:border-white/[0.05] hover:shadow-md transition-shadow"
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <div className={`p-3 rounded-lg ${getCardBackground(p)}`}>
//                       <IconComponent size={24} className={p.textColor} />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
//                         {p.name}
//                       </h3>
//                       <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//                         {p.impact}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex gap-3 flex-wrap justify-end">
//                     {getProgramLinks(p.id, p)}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Card Layout */}
//       {layout === "card" && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 cursor-pointer">
//           {currentPrograms.map((p) => {
//             const IconComponent = p.icon;
//             return (
//               <div
//                 key={p.id}
//                 className={`rounded-xl shadow-theme-sm p-6 border border-gray-200 dark:border-white/[0.05] bg-gradient-to-br from-brand-600 via-brand-500 to-brand-400 transition-all hover:shadow-md hover:scale-[1.02] ${p.textColor}`}
//               >
//                 {/* Icon and Title Section */}
//                 <div className="flex items-center gap-3 mb-4">
//                   <div
//                     className={`p-3 rounded-full ${
//                       p.textColor === "text-white" ? "bg-white/20" : "bg-white"
//                     }`}
//                   >
//                     <IconComponent
//                       size={25}
//                       className={
//                         p.textColor === "text-white"
//                           ? "text-white"
//                           : "text-brand-500"
//                       }
//                     />
//                   </div>
//                   <h3 className="text-lg font-semibold text-white/90">
//                     {p.name}
//                   </h3>
//                 </div>

//                 {/* Impact Section */}
//                 <p
//                   className={`text-sm mb-6 ${
//                     p.textColor === "text-white"
//                       ? "text-white/90"
//                       : "text-white/90"
//                   }`}
//                 >
//                   {p.impact}
//                 </p>

//                 {/* Action Buttons */}
//                 <div className="flex gap-5 flex-wrap">
//                   {getProgramLinks(p.id, p).map((link, index) => (
//                     <div key={index}>{link}</div>
//                   ))}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Empty State */}
//       {currentPrograms.length === 0 && (
//         <div className="text-center py-12 text-gray-500 dark:text-gray-400">
//           No programs found for FY {selectedYear}
//         </div>
//       )}

//       {/* Feedback Modal */}
//       {isFeedbackModalOpen && selectedProgram && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-99 p-4">
//           <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md shadow-xl">
//             {/* Modal Header */}
//             <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
//               <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
//                 {selectedProgram.name} Program Feedback
//               </h3>
//               <button
//                 onClick={closeFeedbackModal}
//                 className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-500 dark:text-gray-400"
//                 disabled={isSubmitting}
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             {/* Modal Content */}
//             <form onSubmit={handleFeedbackSubmit} className="p-6">
//               {/* Comment Section */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Your Feedback
//                 </label>
//                 <TextArea
//                   value={feedbackData.comment}
//                   onChange={(e) =>
//                     setFeedbackData((prev) => ({
//                       ...prev,
//                       comment: e.target.value,
//                     }))
//                   }
//                   placeholder="Share your thoughts about this program..."
//                   className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
//                   rows={3}
//                 />
//               </div>

//               {/* Modal Footer */}
//               <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
//                 <button
//                   type="button"
//                   onClick={closeFeedbackModal}
//                   className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
//                   disabled={isSubmitting}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="flex items-center px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                       Submitting...
//                     </>
//                   ) : (
//                     <>
//                       <Send size={16} className="mr-2" />
//                       Submit Feedback
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Page;

"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  List,
  Grid,
  ChevronDown,
  GraduationCap,
  BanknoteIcon,
  Network,
  X,
  Send,
} from "lucide-react";
import { FaChalkboardTeacher } from "react-icons/fa";
import TextArea from "@/src/components/ui/input/TextArea";
import toast from "react-hot-toast";
import Button from "@/src/components/ui/button/Button";

const programsData = {
  "2024-25": [
    {
      name: "Insight Scholarship",
      impact: "12 Student Supported",
      id: "program-a",
      icon: GraduationCap,
      bgColor: "bg-brand-400",
      textColor: "text-white",
    },
    {
      name: "Faculty Futures Fund",
      impact: "8 Faculty Members Funded",
      id: "program-b",
      icon: BanknoteIcon,
      bgColor: "bg-brand-400",
      textColor: "text-white",
    },
    {
      name: "Perspectives: A Lecture Series",
      impact: "15 Sessions Conducted",
      id: "program-c",
      icon: FaChalkboardTeacher,
      bgColor: "bg-brand-400",
      textColor: "text-white",
    },
    {
      name: "India Network Foundation Travel Grant",
      impact: "24 Travel Grants Awarded",
      id: "program-d",
      icon: Network,
      bgColor: "bg-brand-400",
      textColor: "text-white",
    },
  ],
  "2023-24": [
    {
      name: "Faculty Futures Fund",
      impact: "10 Faculty Members Funded",
      id: "program-b",
      icon: BanknoteIcon,
      bgColor: "bg-brand-400",
      textColor: "text-white",
    },
    {
      name: "Perspectives: A Lecture Series",
      impact: "12 Sessions Conducted",
      id: "program-c",
      icon: FaChalkboardTeacher,
      bgColor: "bg-brand-400",
      textColor: "text-gray-800",
    },
    {
      name: "India Network Foundation Travel Grant",
      impact: "20 Travel Grants Awarded",
      id: "program-d",
      icon: Network,
      bgColor: "bg-brand-400",
      textColor: "text-gray-800",
    },
  ],
  "2022-23": [
    {
      name: "Perspectives: A Lecture Series",
      impact: "8 Sessions Conducted",
      id: "program-c",
      icon: FaChalkboardTeacher,
      bgColor: "bg-brand-400",
      textColor: "text-gray-800",
    },
    {
      name: "India Network Foundation Travel Grant",
      impact: "18 Travel Grants Awarded",
      id: "program-d",
      icon: Network,
      bgColor: "bg-brand-400",
      textColor: "text-gray-800",
    },
  ],
};

const financialYears = ["2024-25", "2023-24", "2022-23"];

const Page = () => {
  const [layout, setLayout] = useState("card");
  const [selectedYear, setSelectedYear] = useState("2024-25");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [feedbackData, setFeedbackData] = useState({
    rating: 0,
    comment: "",
    suggestions: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentPrograms = programsData[selectedYear] || [];

  const getCardGradient = (index) => {
    // Odd index cards (1st, 3rd, 5th, etc.) - Custom gradient
    if (index % 2 === 0) {
      return "bg-gradient-to-l from-[#f6d55c] via-[#e6c55c] to-[#ca9752]";
    }
    // Even index cards (2nd, 4th, 6th, etc.) - Original brand gradient
    return "bg-gradient-to-br from-brand-600 via-brand-500 to-brand-400";
  };

  const openFeedbackModal = (program) => {
    setSelectedProgram(program);
    console.log(program);
    setFeedbackData({
      rating: 0,
      comment: "",
      suggestions: "",
    });
    setIsFeedbackModalOpen(true);
  };

  const closeFeedbackModal = () => {
    setIsFeedbackModalOpen(false);
    setSelectedProgram(null);
    setFeedbackData({
      rating: 0,
      comment: "",
      suggestions: "",
    });
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Feedback submitted:", {
        program: selectedProgram,
        feedback: feedbackData,
      });

      // Show success message or handle response
      toast.success("Thank you for your feedback!");
      closeFeedbackModal();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingClick = (rating) => {
    setFeedbackData((prev) => ({ ...prev, rating }));
  };

  const getProgramLinks = (programId, program) => {
    const links = [];

    // All programs have View Beneficiaries Detail
    links.push(
      <Link
        key="beneficiaries"
        href={`/donor/initiated-programs/view-beneficiaries-details/${programId}`}
        className="inline-flex items-center justify-center px-3 py-2 bg-white border border-brand-500 text-brand-600 rounded-lg hover:bg-brand-50 font-medium text-sm transition-colors shadow-sm"
      >
        View Recipient
      </Link>
    );

    switch (programId) {
      case "program-a":
        // Show only "No Report" for program-a
        return [
          <span
            key="no-report"
            className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium text-sm border border-gray-300"
          >
            No Data Available
          </span>,
          <button
            key="feedback"
            onClick={() => openFeedbackModal(programId)}
            className="inline-flex items-center justify-center px-3 py-2 bg-white border border-brand-500 text-brand-600 rounded-lg hover:bg-brand-50 font-medium text-sm transition-colors shadow-sm"
          >
            Feedback
          </button>,
        ];

      case "program-b":
        // Only beneficiaries link and feedback (already added)
        return links;

      case "program-c":
        // Add View Report and View FRL
        links.push(
          <Link
            key="report"
            href={`/donor/initiated-programs/view-report/${programId}`}
            className="inline-flex items-center justify-center px-3 py-2 bg-white border border-brand-500 text-brand-600 rounded-lg hover:bg-brand-50 font-medium text-sm transition-colors shadow-sm"
          >
            View Report
          </Link>,
          <Link
            key="frl"
            href={`/donor/initiated-programs/view-frl/${programId}`}
            className="inline-flex items-center justify-center px-3 py-2 bg-white border border-brand-500 text-brand-600 rounded-lg hover:bg-brand-50 font-medium text-sm transition-colors shadow-sm"
          >
            View FRL
          </Link>,
          <button
            key="feedback"
            onClick={() => openFeedbackModal(program)}
            className="inline-flex items-center justify-center px-3 py-2 bg-white border border-brand-500 text-brand-600 rounded-lg hover:bg-brand-50 font-medium text-sm transition-colors shadow-sm"
          >
            Feedback
          </button>
        );
        return links;

      case "program-d":
        // Add all links
        links.push(
          <Link
            key="report"
            href={`/donor/initiated-programs/view-report/${programId}`}
            className="inline-flex items-center justify-center px-3 py-2 bg-white border border-brand-500 text-brand-600 rounded-lg hover:bg-brand-50 font-medium text-sm transition-colors shadow-sm"
          >
            View Report
          </Link>,
          <Link
            key="frl"
            href={`/donor/initiated-programs/view-frl/${programId}`}
            className="inline-flex items-center justify-center px-3 py-2 bg-white border border-brand-500 text-brand-600 rounded-lg hover:bg-brand-50 font-medium text-sm transition-colors shadow-sm"
          >
            View FRL
          </Link>,
          <Link
            key="uc"
            href={`/donor/initiated-programs/view-uc/${programId}`}
            className="inline-flex items-center justify-center px-3 py-2 bg-white border border-brand-500 text-brand-600 rounded-lg hover:bg-brand-50 font-medium text-sm transition-colors shadow-sm"
          >
            View UC
          </Link>,
          <button
            key="feedback"
            onClick={() => openFeedbackModal(program)}
            className="inline-flex items-center justify-center px-3 py-2 bg-white border border-brand-500 text-brand-600 rounded-lg hover:bg-brand-50 font-medium text-sm transition-colors shadow-sm"
          >
            Feedback
          </button>
        );
        return links;

      default:
        return links;
    }
  };
  const getProgramLinksList = (programId, program) => {
    const links = [];

    // All programs have View Beneficiaries Detail
    links.push(
      <Link
        key="beneficiaries"
        href={`/donor/initiated-programs/view-beneficiaries-details/${programId}`}
      >
        <Button className="sm:w-36 w-full justify-center">View Recipient</Button>
      </Link>
    );

    switch (programId) {
      case "program-a":
        return [
          <div
            key="no-report"
            className="w-full flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium text-sm border border-gray-300 text-center"
          >
            No Data Available
          </div>,
          <Button
            onClick={() => openFeedbackModal(program)}
            key="feedback"
            className="w-full justify-center"
          >
            Feedback
          </Button>,
        ];

      case "program-b":
        return links;

      case "program-c":
        links.push(
          <Link
            key="report"
            href={`/donor/initiated-programs/view-report/${programId}`}
          >
            <Button className="w-full justify-center">View Report</Button>
          </Link>,
          <Link
            key="frl"
            href={`/donor/initiated-programs/view-frl/${programId}`}
          >
            <Button className="w-full justify-center">View FRL</Button>
          </Link>,
          <Button
            onClick={() => openFeedbackModal(program)}
            className="w-full justify-center"
          >
            Feedback
          </Button>
        );
        return links;

      case "program-d":
        links.push(
          <Link
            key="report"
            href={`/donor/initiated-programs/view-report/${programId}`}
          >
            <Button className="w-full justify-center">View Report</Button>
          </Link>,
          <Link
            key="frl"
            href={`/donor/initiated-programs/view-frl/${programId}`}
          >
            <Button className="w-full justify-center">View FRL</Button>
          </Link>,
          <Link
            key="uc"
            href={`/donor/initiated-programs/view-uc/${programId}`}
          >
            <Button className="w-full justify-center">View UC</Button>
          </Link>,
          <Button
            onClick={() => openFeedbackModal(program)}
            className="w-full justify-center"
          >
            Feedback
          </Button>
        );
        return links;

      default:
        return links;
    }
  };

  const getCardBackground = (program) => {
    return program.bgColor;
  };

  return (
    <div className="w-full h-full">
      <div className="headingAndFilter flex justify-between items-center">
        <h1 className="sm:text-xl text-md font-bold mb-6 text-brand-500">
          Initiated Programs
        </h1>

        <div className="flex items-center gap-4 mb-6 ">
          {/* Financial Year Filter */}
          <div className="relative sm:flex hidden">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors min-w-[120px] justify-between"
              >
                <span>FY {selectedYear}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10">
                  {financialYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => {
                        setSelectedYear(year);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        selectedYear === year
                          ? "bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400"
                          : "text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      FY {year}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Layout switcher */}
          <div className="filterAndLayout  items-center gap-2">
            <div className="flex bg-gray-100 dark:bg-white/10 rounded-lg p-1">
              <button
                onClick={() => setLayout("card")}
                className={`p-2 rounded-md transition-colors ${
                  layout === "card"
                    ? "bg-white dark:bg-brand-500 shadow-sm"
                    : "hover:bg-white/50 dark:hover:bg-white/5"
                }`}
              >
                <Grid
                  size={18}
                  className={
                    layout === "card"
                      ? "text-brand-600 dark:text-white"
                      : "text-gray-500"
                  }
                />
              </button>
              <button
                onClick={() => setLayout("list")}
                className={`p-2 rounded-md transition-colors ${
                  layout === "list"
                    ? "bg-white dark:bg-brand-500 shadow-sm"
                    : "hover:bg-white/50 dark:hover:bg-white/5"
                }`}
              >
                <List
                  size={18}
                  className={
                    layout === "list"
                      ? "text-brand-600 dark:text-white"
                      : "text-gray-500"
                  }
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}

      {/* List Layout */}
      {layout === "list" && (
        <div className="space-y-4">
          {currentPrograms.map((p) => {
            const IconComponent = p.icon;
            return (
              <div
                key={p.id}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 dark:bg-white/[0.03] dark:border-white/[0.05] hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  {/* Program Info */}
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${getCardBackground(p)}`}>
                      <IconComponent size={24} className={p.textColor} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-md sm:text-lg font-semibold text-gray-800 dark:text-white/90">
                        {p.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {p.impact}
                      </p>
                    </div>
                  </div>

                  {/* Buttons - Fixed equal width for all devices */}
                  <div className="flex flex-wrap sm:gap-5 gap-2 justify-end">
                    {getProgramLinksList(p.id, p).map((link, linkIndex) => (
                      <div
                        key={linkIndex}
                        className="w-full sm:w-[145px] flex-shrink-0"
                      >
                        {link}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Card Layout */}
      {layout === "card" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 cursor-pointer">
          {currentPrograms.map((p, index) => {
            const IconComponent = p.icon;
            const cardGradient = getCardGradient(index);

            return (
              <div
                key={p.id}
                className={`rounded-xl shadow-theme-sm p-6 border border-gray-200 dark:border-white/[0.05] ${cardGradient} transition-all hover:shadow-md hover:scale-[1.02] text-white`}
              >
                {/* Icon and Title Section */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-full ${"bg-white/20"}`}>
                    <IconComponent size={25} className={"text-white"} />
                  </div>
                  <h3 className="sm:text-lg text-md font-semibold text-white/90">
                    {p.name}
                  </h3>
                </div>

                {/* Impact Section */}
                <p className={`sm:text-sm mb-6 text-white/90 text-xs`}>
                  {p.impact}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-5 flex-wrap">
                  {getProgramLinks(p.id, p).map((link, linkIndex) => (
                    <div key={linkIndex}>{link}</div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {currentPrograms.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No programs found for FY {selectedYear}
        </div>
      )}

      {/* Feedback Modal */}
      {isFeedbackModalOpen && selectedProgram && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-99 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              {selectedProgram == "program-a" ? (
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Insight Scholarships Program Feedback
                </h3>
              ) : (
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {selectedProgram.name} Program Feedback
                </h3>
              )}

              <button
                onClick={closeFeedbackModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-500 dark:text-gray-400"
                disabled={isSubmitting}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleFeedbackSubmit} className="p-6">
              {/* Comment Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Insight Scholarship Your Feedback
                </label>
                <TextArea
                  value={feedbackData.comment}
                  onChange={(e) =>
                    setFeedbackData((prev) => ({
                      ...prev,
                      comment: e.target.value,
                    }))
                  }
                  placeholder="Share your thoughts about this program..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                  rows={3}
                />
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={closeFeedbackModal}
                  className="px-2 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  className="flex items-center px-2 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
