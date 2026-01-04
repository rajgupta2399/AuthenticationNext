"use client";
import { useState } from "react";
import DebitUPI from "./DebitUPI";
import ChequeDraft from "./ChequeDraft";
import BankTransfer from "./BankTransfer";
import TaxExemption from "./TaxExemption";
import { CreditCardIcon } from "lucide-react";

export default function DonationSwitch() {
  const [activeTab, setActiveTab] = useState("debit");

  const tabs = [
    { id: "debit", label: "Debit / Credit Card / Netbanking / UPI" },
    { id: "cheque", label: "Cheque/Draft" },
    { id: "bank", label: "Bank Transfer" },
    { id: "tax", label: "Tax Exemption" },
  ];

  const renderComponent = () => {
    switch (activeTab) {
      case "debit":
        return <DebitUPI />;
      case "cheque":
        return <ChequeDraft />;
      case "bank":
        return <BankTransfer />;
      case "tax":
        return <TaxExemption />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full rounded-lg shadow-md overflow-hidden">
      {/* Tab Buttons */}
      <div className="flex flex-wrap md:flex-nowrap w-full">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-5 py-3 text-sm font-semibold text-center transition-all
              ${
                activeTab === tab.id
                  ? "bg-[#A9131E] text-white"
                  : "bg-brand-100 hover:bg-[#F8F9FA]"
              }
            `}
          >
            <div className="flex justify-center items-center gap-2">
              <CreditCardIcon /> {tab.label}
            </div>
          </button>
        ))}
      </div>

      {/* Active Component */}
      <div className="sm:p-6 p-1 border-2 dark:border-[#344054] rounded-b-lg  min-h-[95vh]">
        {renderComponent()}
      </div>
    </div>
  );
}
