import React, { useState } from "react";
import Label from "@/src/components/ui/input/Label";
import Input from "@/src/components/ui/input/InputField";
import DatePicker from "@/src/components/form/date-picker";
import {
  DonationSelectInput,
  DonationSelectPrefix,
} from "@/src/components/debitForm/DonationSelectInput";
import {
  DonationAnonymous,
  DonationTaxReciepts,
} from "@/src/components/debitForm/DebitRadio";

const BankTransfer = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    category: "",
    panNumber: "",
    amount: "",
    payeeBank: "",
    transactionRef: "",
    transactionDate: "",
    isAnonymous: "no",
    taxReceipt: "email",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  const bankDetails = [
    { label: "Account Name", value: "Endowment Fund Account, IIT Kanpur" },
    { label: "Account Number", value: "10426004735" },
    { label: "Branch Name", value: "IIT Kanpur" },
    { label: "Bank Name", value: "SBI" },
    { label: "IFS Code", value: "SBIN0001161" },
    { label: "SWIFT Code", value: "SBININBB499" },
  ];

  return (
    <div className="w-full sm:p-4 p-0 dark:bg-[#1D1F24] rounded-lg">
      {/* Header Section */}
      <div className="mb-8">
        <div className="dark:bg-[#16181D] bg-white border-l-4 border-blue-500 p-4 rounded ">
          <p className="text-sm text-gray-700 leading-relaxed dark:text-white/90  ">
            All donations qualify for a 100% tax deduction, with tax receipts
            issued upon receipt of funds, typically within 3-4 working days;
            please refer to the Tax Exemption tab for more details.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Personal Information Section */}
          <div className="dark:bg-[#1D1F24] p-6 rounded-lg border dark:border-[#344054]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Prefix *
                </Label>
                <DonationSelectPrefix />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Your First Name *
                </Label>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  // onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your First Name"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Last Name *
                </Label>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  // onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your Last Name"
                />
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email *
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  // onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Affiliation *
                </Label>
                <DonationSelectInput />
              </div>
            </div>

            <div className="mb-6">
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Amount *
              </Label>
              <Input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                required
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter donation amount in ₹"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Payee Bank *
                </Label>
                <Input
                  type="text"
                  name="payeeBank"
                  value={formData.payeeBank}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your bank name"
                />
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction Reference Number *
                </Label>
                <Input
                  type="text"
                  name="transactionRef"
                  value={formData.transactionRef}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter transaction reference number"
                />
              </div>
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Date of transaction *
              </Label>
              <DatePicker
                id="date-picker"
                placeholder="Select a date"
                minDate={new Date()}
              />
            </div>
          </div>

          <div className="dark:bg-[#1D1F24] px-2 py-2 sm:px-6 sm:py-6 rounded-lg border dark:border-[#344054]">
            {/* Bank Transfer Details Section */}
            <div className="">
              <h4 className="text-lg font-semibold text-[#0157ae] mb-4">
                Bank Transfer Details : NEFT/RTGS
              </h4>

              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden dark:border-[#344054]">
                <table className="w-full">
                  <tbody>
                    {bankDetails.map((detail, index) => (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0
                            ? "bg-gray-50 dark:bg-[#1D1F24]"
                            : "bg-white dark:bg-[#16181D]"
                        }
                      >
                        <td className="px-4 py-3 font-medium text-gray-700 dark:text-white/90 border-r border-gray-200  w-1/3 dark:border-[#344054]">
                          {detail.label}
                        </td>
                        <td className="px-4 py-3 text-gray-900 font-mono dark:text-white/90">
                          {detail.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="my-4 p-3 bg-yellow-50 border border-yellow-200 rounded dark:bg-[#16181D] dark:border-[#344054]">
                <p className="text-sm text-yellow-800 font-medium dark:text-white/90">
                  Please ensure you use the correct account details for
                  NEFT/RTGS transfer
                </p>
              </div>
            </div>

            <div className="mb-8">
              <div className="dark:bg-[#16181D] p-4 bg-white rounded-md">
                <p className="text-sm text-gray-700 leading-relaxed dark:text-white/90 ">
                  Annual-Gift Programme
                </p>
              </div>
            </div>
            {/* Annual Gift Programme Section */}
            <div className="">
              <div className="space-y-6">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-3">
                    Mark this donation as Anonymous *
                  </Label>
                  <DonationAnonymous />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className=" mt-5">
              <button
                type="submit"
                className="w-full bg-[#A9131E] text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 text-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BankTransfer;
