"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../../components/ui/table/index";
import Button from "@/src/components/ui/button/Button";
import { useRouter } from "next/navigation";

const FinalSubmitNomination = () => {
  const router = useRouter();
  // Sample nominations data
  const [nominations, setNominations] = useState([
    {
      id: 1,
      category: "YAA",
      nomineeName: "John Doe",
      nomineeEmail: "john.doe@example.com",
      nominatorName: "Jane Smith",
      nominatorEmail: "jane.smith@example.com",
      nomineeBatch: "2010",
      nomineeDegree: "B.Tech Computer Science",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      submissionDate: "2024-01-15",
    },
    {
      id: 2,
      category: "DSA",
      nomineeName: "Alice Johnson",
      nomineeEmail: "alice.johnson@example.com",
      nominatorName: "Bob Wilson",
      nominatorEmail: "bob.wilson@example.com",
      nomineeBatch: "2015",
      nomineeDegree: "MBA Finance",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      submissionDate: "2024-01-16",
    },
    {
      id: 3,
      category: "SKDA",
      nomineeName: "Michael Brown",
      nomineeEmail: "michael.brown@example.com",
      nominatorName: "Sarah Davis",
      nominatorEmail: "sarah.davis@example.com",
      nomineeBatch: "2012",
      nomineeDegree: "M.Tech Electrical",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      submissionDate: "2024-01-17",
    },
    {
      id: 4,
      category: "DAA",
      nomineeName: "Emily Wilson",
      nomineeEmail: "emily.wilson@example.com",
      nominatorName: "David Miller",
      nominatorEmail: "david.miller@example.com",
      nomineeBatch: "2018",
      nomineeDegree: "B.Arch",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      submissionDate: "2024-01-18",
    },
  ]);

  const awardCategories = [
    { id: "yaa", name: "YAA" },
    { id: "dsa", name: "DSA" },
    { id: "skda", name: "SKDA" },
    { id: "daa", name: "DAA" },
  ];

  const getCategoryFullName = (categoryId) => {
    const categoryNames = {
      yaa: "Young Alumni Award",
      dsa: "Distinguished Services Award",
      skda: "Satyendra K. Dubey Memorial Award",
      daa: "Distinguished Alumni Award",
    };
    return categoryNames[categoryId] || categoryId;
  };

  return (
    <div className="w-full ">
      <div className="flex justify-between mb-2">
        <h1 className="text-md sm:text-xl font-bold text-brand-500 dark:text-white mb-2">
          Final Nominations Report
        </h1>
        <div className="sm:block hidden">
          <button
            onClick={() => router.back()}
            className="text-brand-600 dark:text-brand-400 sm:text-md text-md"
          >
            ← Back to Nominations
          </button>
        </div>
        <div className="sm:hidden block">
          <button
            onClick={() => router.back()}
            className="text-brand-600 dark:text-brand-400 hover:underline  sm:text-md text-md"
          >
            ← Back
          </button>
        </div>
      </div>
      {/* Nominations Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-6 py-3 font-bold text-brand-800 dark:text-gray-300 text-center text-sm text-nowrap sm:hidden block"
                >
                  Actions
                </TableCell>
                <TableCell
                  isHeader
                  className="px-6 py-3 font-bold text-brand-800 dark:text-gray-300 text-center text-sm text-nowrap"
                >
                  Category
                </TableCell>
                <TableCell
                  isHeader
                  className="px-6 py-3 font-bold text-brand-800 dark:text-gray-300 text-center text-sm text-nowrap"
                >
                  Profile
                </TableCell>

                <TableCell
                  isHeader
                  className="px-6 py-3 font-bold text-brand-800 dark:text-gray-300 text-center text-sm text-nowrap"
                >
                  Nominee Details
                </TableCell>
                <TableCell
                  isHeader
                  className="px-6 py-3 font-bold text-brand-800 dark:text-gray-300 text-center text-sm text-nowrap"
                >
                  Nominator Details
                </TableCell>
                <TableCell
                  isHeader
                  className="px-6 py-3 font-bold text-brand-800 dark:text-gray-300 text-center text-sm text-nowrap"
                >
                  Batch & Degree
                </TableCell>
                <TableCell
                  isHeader
                  className="px-6 py-3 font-bold text-brand-800 dark:text-gray-300 text-center text-sm text-nowrap"
                >
                  Submission Date
                </TableCell>
                <TableCell
                  isHeader
                  className="px-6 py-3 font-bold text-brand-800 dark:text-gray-300 text-center text-sm text-nowrap sm:block hidden"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
              {nominations.map((nomination) => (
                <TableRow
                  key={nomination.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <TableCell className="px-6 py-2 text-center text-nowrap sm:hidden block">
                    <Button>Notify Nominee</Button>
                  </TableCell>
                  <TableCell className="px-6 py-2 text-center text-nowrap">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {nomination.category}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {getCategoryFullName(nomination.category.toLowerCase())}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-2 text-center text-nowrap">
                    <img
                      src={nomination.image}
                      alt={nomination.nomineeName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </TableCell>

                  <TableCell className="px-6 py-2 text-center text-nowrap">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {nomination.nomineeName}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {nomination.nomineeEmail}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-2 text-center text-nowrap">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {nomination.nominatorName}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {nomination.nominatorEmail}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-2 text-center text-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-900 dark:text-white">
                        Batch: {nomination.nomineeBatch}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {nomination.nomineeDegree}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-2 text-center text-nowrap">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {nomination.submissionDate}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-2 text-center text-nowrap sm:block hidden">
                    <Button>Notify Nominee</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Table Footer */}
        <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {nominations.length} of {nominations.length} nominations
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalSubmitNomination;
