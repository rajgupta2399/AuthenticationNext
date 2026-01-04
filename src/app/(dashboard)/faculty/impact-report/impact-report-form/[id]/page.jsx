"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import StudentAward from "../StudentAward";
import FacultyAward from "../FacultyAward";
import LectureSeries from "../LectureSeries";
import DepartmentalFund from "../DepartmentalFund";
import CommunityWelfare from "../CommunityWelfare";
import FacultyChair from "../FacultyChair";


const categoryMap = {
  1: "Student Award/Scholarship",
  2: "Faculty Award", 
  3: "Lecture Series",
  4: "Departmental Fund",
  5: "Community Welfare",
  6: "Faculty Chair"
};

// Impact report data for additional information
const impactReportData = [
  {
    id: 1,
    cnProposal: "Student Award/Scholarship",
    requestId: "Faculty Futures Fund",
    deadline: "2024-03-15",
  },
  {
    id: 2,
    cnProposal: "Faculty Award",
    requestId: "Innovators' Insight Award",
    deadline: "2024-04-20",
  },
  {
    id: 3,
    cnProposal: "Lecture Series",
    requestId: "Perspectives: A Lecture Series",
    deadline: "2024-02-28",
  },
  {
    id: 4,
    cnProposal: "Departmental Fund",
    requestId: "Faculty Futures Fund",
    deadline: "2024-05-10",
  },
  {
    id: 5,
    cnProposal: "Community Welfare",
    requestId: "Scholarship of Excellence",
    deadline: "2024-03-30",
  },
  {
    id: 6,
    cnProposal: "Faculty Chair",
    requestId: "The Thought Leader Series",
    deadline: "2024-03-30",
  },
];

export default function FormPage() {
  const params = useParams();
  const { id } = params;
  
  // Convert id to number and find the category
  const categoryId = parseInt(id);
  const category = categoryMap[categoryId];
  
  // Find additional data from impactReportData
  const categoryData = impactReportData.find(item => item.id === categoryId);
  
  // If category not found, show 404
  if (!category || !categoryData) {
    notFound();
  }

  // Function to render form based on category using switch
  const renderForm = () => {
    switch (category) {
      case "Student Award/Scholarship":
        return <StudentAward/>
      case "Faculty Award":
        return <FacultyAward/>
      case "Lecture Series":
        return <LectureSeries/>
      case "Departmental Fund":
        return <DepartmentalFund/>
      case "Community Welfare":
        return <CommunityWelfare/>
      case "Faculty Chair":
        return <FacultyChair/>
      default:
        return <div>Form template not available for this category.</div>;
    }
  };

  return (
    <div className="">
      {/* Render the appropriate form */}
      <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm p-4">
        {renderForm()}
      </div>
    </div>
  );
}

