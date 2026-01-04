"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../../components/ui/table";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import Button from "@/src/components/ui/button/Button";

const Page = () => {
  // Dummy data for the pledge report
  const dummyPledgeData = [
    {
      id: 1,
      accountType: "Current",
      firstName: "John",
      lastName: "Doe",
      email: "prabkirtkaur@gmail.com",
      phoneNumber: "+1234567890",
      financialYear: 2024,
      category: "Donation",
      subCategory: "Online Transfer",
      transactionID: "KD3O4JDCJ4D55",
      checqueNumber: "DDDN34503455JJ",
      checqueDate: "2024-01-15",
      donationDate: "2024-01-15",
      purpose: "Annual Giving",
      dmsStatus: "Mapped",
      currency: "USD",
      description: "Scholarship Donation",
      markAnonymousAmount: "No",
      isDummy: true,
      redirectURL: "",
      remarks: "Not Required",
    },
    {
      id: 2,
      accountType: "Savings",
      firstName: "Aarav",
      lastName: "Sharma",
      email: "aarav.sharma@example.com",
      phoneNumber: "+919876543210",
      financialYear: 2023,
      category: "Charity",
      subCategory: "Bank Transfer",
      transactionID: "TXN9988776655",
      checqueNumber: "CHQ123456789",
      checqueDate: "2023-12-05",
      donationDate: "2023-12-06",
      purpose: "Education Fund",
      dmsStatus: "Pending",
      currency: "INR",
      description: "School books donation",
      markAnonymousAmount: "Yes",
      isDummy: true,
      redirectURL: "/us-dms/portal/add-donation",
      remarks: "Not Required",
    },
    {
      id: 3,
      accountType: "Current",
      firstName: "Emily",
      lastName: "Watson",
      email: "emily.watson@example.com",
      phoneNumber: "+447911123456",
      financialYear: 2022,
      category: "Donation",
      subCategory: "Online Transfer",
      transactionID: "UPI7788990011",
      checqueNumber: "",
      checqueDate: "",
      donationDate: "2022-09-10",
      purpose: "Medical Support",
      dmsStatus: "Completed",
      currency: "GBP",
      description: "Hospital fund",
      markAnonymousAmount: "No",
      isDummy: true,
      redirectURL: "/us-dms/portal/add-donation",
      remarks: "Not Required",
    },
    {
      id: 4,
      accountType: "Savings",
      firstName: "Rahul",
      lastName: "Verma",
      email: "rahul.verma@example.com",
      phoneNumber: "+918888777666",
      financialYear: 2024,
      category: "Donation",
      subCategory: "Online Transfer",
      transactionID: "CASH4455667788",
      checqueNumber: "",
      checqueDate: "",
      donationDate: "2024-03-20",
      purpose: "Temple Construction",
      dmsStatus: "Mapped",
      currency: "INR",
      description: "Religious donation",
      markAnonymousAmount: "Yes",
      isDummy: true,
      redirectURL: "",
      remarks: "Not Required",
    },
    {
      id: 5,
      accountType: "Current",
      firstName: "Sophia",
      lastName: "Martinez",
      email: "sophia.m@example.com",
      phoneNumber: "+14155552671",
      financialYear: 2021,
      category: "Charity",
      subCategory: "Bank Transfer",
      transactionID: "BNK123009988",
      checqueNumber: "",
      checqueDate: "",
      donationDate: "2021-07-12",
      purpose: "Disaster Relief",
      dmsStatus: "Failed",
      currency: "USD",
      description: "Flood relief fund",
      markAnonymousAmount: "No",
      isDummy: true,
      redirectURL: "/us-dms/portal/add-donation",
      remarks: "Not Required",
    },
    {
      id: 6,
      accountType: "Savings",
      firstName: "Kiran",
      lastName: "Kumar",
      email: "kiran.kumar@example.com",
      phoneNumber: "+917799665544",
      financialYear: 2025,
      category: "Donation",
      subCategory: "Online Transfer",
      transactionID: "ONL5566778899",
      checqueNumber: "CHQ556677",
      checqueDate: "2025-01-02",
      donationDate: "2025-01-02",
      purpose: "Animal Welfare",
      dmsStatus: "Mapped",
      currency: "INR",
      description: "Support for stray animals",
      markAnonymousAmount: "No",
      isDummy: true,
      redirectURL: "",
      remarks: "Not Required",
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
              Revision Required Donation Report
            </h1>
          </div>
        </div>
        <div className="sm:block hidden">
          <button
            onClick={() => router.back()}
            className="text-brand-600 dark:text-brand-400 hover:underline sm:text-md text-md"
          >
            ← Back to Report
          </button>
        </div>
        <div className="sm:hidden block">
          <button
            onClick={() => router.back()}
            className="text-brand-600 dark:text-brand-400 hover:underline sm:text-md text-md"
          >
            ← Back
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] shadow-sm">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-full">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-gray-800/50">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center "
                  >
                    Action
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    Remarks
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    Account Type
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    Donor Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    Email
                  </TableCell>

                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    Financial Year
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center min-w-[120px]"
                  >
                    Category
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    Sub-Category
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    Transaction ID
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    Cheque Number
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    Checque Date
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    Donation Date
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    Purpose
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    DMS Status
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    Description
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-sm text-nowrap text-center"
                  >
                    Mark Anonymous
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {allPledgeData.map((item) => (
                  <TableRow
                    key={item.id}
                    className={`hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors ${
                      item.isDummy ? "bg-gray-50/50 dark:bg-gray-800/30" : ""
                    }`}
                  >
                    <TableCell className="px-6 py-3 text-center text-theme-sm  text-gray-600 dark:text-gray-300">
                      {item.redirectURL ? (
                        <>
                          <Button onClick={() => router.push(item.redirectURL)}>
                            View
                          </Button>
                        </>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell className="px-6 py-3 text-center text-nowrap text-theme-sm text-gray-600 dark:text-gray-300">
                      {item.remarks ? item.remarks : "Not Available"}
                    </TableCell>
                    <TableCell className="px-6 py-3 text-center text-nowrap text-theme-sm text-gray-600 dark:text-gray-300">
                      {item.accountType}
                    </TableCell>
                    <TableCell className="px-6 py-3 text-center text-nowrap text-theme-sm text-gray-600 dark:text-gray-300">
                      {item.firstName + " " + item.lastName}
                    </TableCell>
                    <TableCell className="px-6 py-3 text-center text-nowrap text-theme-sm text-gray-600 dark:text-gray-300">
                      {item.email}
                    </TableCell>

                    <TableCell className="px-6 py-3 text-center text-nowrap text-theme-sm text-gray-600 dark:text-gray-300">
                      {item.financialYear}
                    </TableCell>
                    <TableCell className="px-6 py-3 text-center text-nowrap text-theme-sm text-gray-600 dark:text-gray-300">
                      {item.category}
                    </TableCell>
                    <TableCell className="px-6 py-3 text-center text-nowrap text-theme-sm text-gray-600 dark:text-gray-300">
                      {item.subCategory}
                    </TableCell>
                    <TableCell className="px-6 py-3 text-center text-nowrap text-theme-sm text-gray-600 dark:text-gray-300">
                      {item.transactionID}
                    </TableCell>
                    <TableCell className="px-6 py-3 text-center text-nowrap text-theme-sm text-gray-600 dark:text-gray-300">
                      {item.checqueNumber}
                    </TableCell>
                    <TableCell className="px-6 py-3 text-center text-nowrap text-theme-sm text-gray-600 dark:text-gray-300">
                      {formatDate(item.checqueDate)}
                    </TableCell>
                    <TableCell className="px-6 py-3 text-center text-nowrap text-theme-sm text-gray-600 dark:text-gray-300">
                      {formatDate(item.donationDate)}
                    </TableCell>
                    <TableCell className="px-6 py-3 text-center text-nowrap text-theme-sm text-gray-600 dark:text-gray-300 capitalize">
                      {item.purpose}
                    </TableCell>
                    <TableCell className="px-6 py-3 text-center text-nowrap text-theme-sm text-gray-600 dark:text-gray-300 capitalize">
                      {item.dmsStatus}
                    </TableCell>
                    <TableCell className="px-6 py-3 text-center text-nowrap text-theme-sm text-gray-600 dark:text-gray-300 capitalize">
                      {item.description}
                    </TableCell>
                    <TableCell className="px-6 py-3 text-center text-nowrap text-theme-sm text-gray-600 dark:text-gray-300">
                      {item.markAnonymousAmount}
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
