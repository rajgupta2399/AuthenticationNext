"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import Button from "@/src/components/ui/button/Button";

const Page = () => {
  // Dummy data for the pledge report
  const dummyPledgeData = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "+1234567890",
      pledgeAmount: 5000,
      currency: "USD",
      numberOfYears: 3,
      date: "2024-01-15",
      markAnonymousName: "No",
      markAnonymousAmount: "No",
      hallOfResidence: "Main Hall",
      department: "Computer Science",
      pledgeList: "Annual Pledge",
      isDummy: true, // Flag to identify dummy data
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      phoneNumber: "+0987654321",
      pledgeAmount: 3000,
      currency: "EUR",
      numberOfYears: 2,
      date: "2024-01-16",
      markAnonymousName: "Yes",
      markAnonymousAmount: "No",
      hallOfResidence: "North Hall",
      department: "Electrical Engineering",
      pledgeList: "Monthly Pledge",
      isDummy: true,
    },
    {
      id: 3,
      firstName: "Mike",
      lastName: "Johnson",
      phoneNumber: "+1122334455",
      pledgeAmount: 7500,
      currency: "USD",
      numberOfYears: 5,
      date: "2024-01-17",
      markAnonymousName: "No",
      markAnonymousAmount: "Yes",
      hallOfResidence: "South Hall",
      department: "Mechanical Engineering",
      pledgeList: "One-time Pledge",
      isDummy: true,
    },
    {
      id: 4,
      firstName: "Sarah",
      lastName: "Williams",
      phoneNumber: "+5566778899",
      pledgeAmount: 2500,
      currency: "GBP",
      numberOfYears: 1,
      date: "2024-01-18",
      markAnonymousName: "Yes",
      markAnonymousAmount: "Yes",
      hallOfResidence: "East Hall",
      department: "Civil Engineering",
      pledgeList: "Quarterly Pledge",
      isDummy: true,
    },
  ];

  const [userPledgeData, setUserPledgeData] = useState([]);
  const router = useRouter();

  // Load user pledge data from localStorage on component mount
  useEffect(() => {
    loadUserPledgeData();
  }, []);

  const loadUserPledgeData = () => {
    try {
      const savedPledges = JSON.parse(
        localStorage.getItem("pledgeData") || "[]"
      );
      setUserPledgeData(savedPledges);
      console.log("Loaded user pledge data:", savedPledges);
    } catch (error) {
      console.error("Error loading user pledge data:", error);
      setUserPledgeData([]);
    }
  };

  // Combine dummy data and user data
  const allPledgeData = [...userPledgeData, ...dummyPledgeData];

  const handleAddPledge = () => {
    router.push("/donor-alumni/pledge-list/pledge-form");
  };

  const handleDeleteUserPledge = (id) => {
    try {
      const updatedPledges = userPledgeData.filter(
        (pledge) => pledge.id !== id
      );
      localStorage.setItem("pledgeData", JSON.stringify(updatedPledges));
      setUserPledgeData(updatedPledges);
      console.log("Deleted user pledge with ID:", id);
    } catch (error) {
      console.error("Error deleting user pledge:", error);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  // Format amount with currency
  const formatAmount = (amount, currency) => {
    if (!amount) return "N/A";
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum)) return "N/A";

    return `${amountNum.toLocaleString()} ${currency || ""}`.trim();
  };

  return (
    <div className="w-full">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="sm:text-xl text-md font-bold text-brand-500">
              Pledge Report
            </h1>
          </div>
        </div>
        <Button
          onClick={handleAddPledge}
          className="flex items-center gap-2 px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors font-medium text-sm sm:text-base whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          Add New Pledge
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] shadow-sm">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-full">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-gray-800/50">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    Pledge List
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    Currency
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    Pledge Amount
                  </TableCell>

                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    No. of Years
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center min-w-[120px]"
                  >
                    Date
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    Anonymous Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    Anonymous Amount
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    Hall of Residence
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    Department
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {allPledgeData.map((pledge) => (
                  <TableRow
                    key={pledge.id}
                    className={`hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors ${
                      pledge.isDummy ? "bg-gray-50/50 dark:bg-gray-800/30" : ""
                    }`}
                  >
                    <TableCell className="px-6 py-4 text-center text-nowrap text-theme-sm text-gray-600 dark:text-gray-300">
                      {pledge.pledgeList}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-center text-nowrap text-theme-sm text-gray-600 dark:text-gray-300 uppercase">
                      {pledge.currency}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-center text-nowrap text-theme-sm text-gray-600 dark:text-gray-300">
                      {pledge.pledgeAmount}
                    </TableCell>

                    <TableCell className="px-6 py-4 text-center text-nowrap text-theme-sm text-gray-600 dark:text-gray-300">
                      {pledge.numberOfYears}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-center text-nowrap text-theme-sm text-gray-600 dark:text-gray-300">
                      {formatDate(pledge.date)}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-center text-nowrap text-theme-sm text-gray-600 dark:text-gray-300 uppercase">
                      {pledge.markAnonymousName}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-center text-nowrap text-theme-sm text-gray-600 dark:text-gray-300 uppercase">
                      {pledge.markAnonymousAmount}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-center text-nowrap text-theme-sm text-gray-600 dark:text-gray-300">
                      {pledge.hallOfResidence}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-center text-nowrap text-theme-sm text-gray-600 dark:text-gray-300 capitalize">
                      {pledge.department}
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

export default Page;
