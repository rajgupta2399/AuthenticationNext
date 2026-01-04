"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../../components/ui/table";

// Sample data for KPI counts
const kpiData = {
  cnSubmitCount: 24,
  proposalSubmitCount: 18
};

// Sample data for Table 1 - Proposals
const proposalsData = [
  {
    id: 1,
    proposalName: "AI Research Initiative",
    title: "Advanced Machine Learning Applications",
    proposalConcept: "Proposal",
    company: "3"
  },
  {
    id: 2,
    proposalName: "Renewable Energy Project",
    title: "Solar Power Optimization System",
    proposalConcept: "Prposal",
    company: "2"
  },
  {
    id: 3,
    proposalName: "Educational Platform",
    title: "Digital Learning Ecosystem",
    proposalConcept: "Concept",
    company: "5"
  },
  {
    id: 4,
    proposalName: "Healthcare Mobile App",
    title: "Telemedicine Platform Development",
    proposalConcept: "Proposal",
    company: "6"
  },
  {
    id: 5,
    proposalName: "E-commerce Solution",
    title: "Next-Gen Retail Platform",
    proposalConcept: "Concept",
    company: "1"
  }
];

// Sample data for Table 2 - Company Budgets
const companyBudgetsData = [
  {
    id: 1,
    companyName: "Tech Innovations Ltd",
    status: "Approved",
    budget: "5,00,000 INR"
  },
  {
    id: 2,
    companyName: "Green Energy Corp",
    status: "Rejected",
    budget: "7,50,000 INR"
  },
  {
    id: 3,
    companyName: "EduTech Solutions",
    status: "Approved",
    budget: "3,00,000 INR"
  },
  {
    id: 4,
    companyName: "HealthTech Partners",
    status: "Pending",
    budget: "4,50,000 INR"
  },
  {
    id: 5,
    companyName: "Retail Dynamics Inc",
    status: "Approved",
    budget: "6,00,000 INR"
  },
  
];

const DemoReportsPage = () => {
  return (
    <div className="w-full flex flex-col space-y-8 p-6">
      {/* Page Header */}
      <div className="text-left">
        <h1 className="text-2xl font-bold text-brand-500 mb-2">
          CN Proposal Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Overview of proposals and company budgets
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CN Submit KPI */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                CN Submit
              </p>
              <p className="text-3xl font-bold text-brand-600 dark:text-brand-400">
                {kpiData.cnSubmitCount}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
              +12% from last month
            </span>
          </div>
        </div>

        {/* Proposal Submit KPI */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Proposal Submit
              </p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {kpiData.proposalSubmitCount}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
              +8% from last month
            </span>
          </div>
        </div>
      </div>

      {/* Table 1 - Proposals */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-brand-500">
          Proposals Overview
        </h2>
        <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-100 dark:bg-gray-800">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Proposal Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Title
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Proposal/Concept
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Company
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {proposalsData.map((proposal) => (
                  <TableRow
                    key={proposal.id}
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                  >
                    <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 font-medium">
                      {proposal.proposalName}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90">
                      {proposal.title}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90">
                      {proposal.proposalConcept}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90">
                      {proposal.company}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Table 2 - Company Budgets */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-brand-500">
          Company Budget Status
        </h2>
        <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-100 dark:bg-gray-800">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Company Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Approved/Reject
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-3 font-medium text-brand-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Budget
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {companyBudgetsData.map((company) => (
                  <TableRow
                    key={company.id}
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                  >
                    <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 font-medium">
                      {company.companyName}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start text-theme-sm">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          company.status === "Approved"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : company.status === "Rejected"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                      >
                        {company.status}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start text-theme-sm dark:text-white/90 font-semibold">
                      {company.budget}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoReportsPage;