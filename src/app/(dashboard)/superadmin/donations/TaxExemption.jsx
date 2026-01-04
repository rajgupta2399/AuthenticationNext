import React from "react";

const TaxExemption = () => {
  const taxData = [
    {
      contributor: "Individual (Indian Residents)",
      beneficiary: "Endowment Fund Account, IIT Kanpur",
      deduction: "100%",
      section: "80G of Income Tax Act, 1961.",
      link: "Govt. notification",
    },
    {
      contributor: "Body Corporate (Corporate Donations)",
      beneficiary: "Endowment Fund Account, IIT Kanpur",
      deduction: "100%",
      section: "80G of Income Tax Act, 1961.",
      link: "Govt. notification",
    },
    {
      contributor: "Body Corporate (Corporate Donations for stated objective)",
      beneficiary: "Corporate Research Fund Account, IIT Kanpur",
      deduction: "100%",
      section: "35(1)(ii) of Income Tax Act, 1961.",
      link: "Govt. notification",
    },
    {
      contributor:
        "Body Corporate (Corporate Donations for scientific research)",
      beneficiary: "Corporate Research Fund Account, IIT Kanpur",
      deduction: "100%",
      section: "35(2AA) of Income Tax Act,1961.",
      link: "Form 3CG",
    },
  ];

  const handleViewPanCard = () => {
    // Handle PAN card view logic here
    console.log("View PAN Card clicked");
    // This would typically open a modal or redirect to PAN card image
  };

  const handleGovtNotification = (linkType) => {
    // Handle government notification link click
    console.log(`Clicked on ${linkType}`);
    // This would typically open the relevant government document
  };

  return (
    <div className="w-full mx-auto sm:p-5 p-2 dark:bg-[#1D1F24] rounded-lg  min-h-[95vh]">
      {/* Tax Exemption Table */}
      <div className="mb-8">
        <div className="overflow-hidden rounded-lg border dark:border-[#344054]">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="dark:bg-[#1D1F24] border-b dark:border-[#344054]">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-white/90 ">
                    Contributor
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-white/90 ">
                    Beneficiary
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-white/90 ">
                    Allowed deductions
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-white/90 ">
                    Sections/Classification of IRS
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-white/90 ">
                    Link
                  </th>
                </tr>
              </thead>
              <tbody className="dark:divide-y-[#344054] dark:border-[#344054]">
                {taxData.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-[#A9131E] hover:cursor-pointer transition-colors duration-150"
                  >
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium dark:text-white/90 ">
                      {item.contributor}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-white/90 ">
                      {item.beneficiary}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center dark:text-white/90  px-3 py-1 rounded-full text-sm font-medium ">
                        {item.deduction}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-white/90 ">
                      {item.section}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleGovtNotification(item.link)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium underline transition-colors duration-200"
                      >
                        {item.link}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            {taxData.map((item, index) => (
              <div
                key={index}
                className="border-b dark:border-[#344054] last:border-b-0"
              >
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-white/90 ">
                      Contributor
                    </h3>
                    <p className="text-sm text-gray-800 font-medium mt-1 dark:text-white/90 ">
                      {item.contributor}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-white/90 ">
                      Beneficiary
                    </h3>
                    <p className="text-sm text-gray-700 mt-1 dark:text-white/90 ">
                      {item.beneficiary}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 dark:text-white/90 ">
                        Deduction
                      </h3>
                      <span className="inline-flex items-center dark:text-white/90  px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                        {item.deduction}
                      </span>
                    </div>
                    <div>
                      <button
                        onClick={() => handleGovtNotification(item.link)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
                      >
                        {item.link}
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700">
                      Section
                    </h3>
                    <p className="text-sm text-gray-700 mt-1">{item.section}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border dark:border-[#344054]  mt-5">
          <div className=" md:block ">
            <table className="w-full">
              <thead>
                <tr className="dark:bg-[#1D1F24] border-b dark:border-[#344054]">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-white/90 ">
                    Corporate Social Responsibility(CSR)
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-white/90 ">
                    Link
                  </th>
                </tr>
              </thead>
              <tbody className="dark:divide-y-[#344054] dark:border-[#344054]">
                <tr className="hover:bg-gray-50 dark:hover:bg-[#A9131E] hover:cursor-pointer transition-colors duration-150">
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium dark:text-white/90 ">
                    IIT Kanpur is eligible to accept funding from Corporate
                    Social Responsibility Initiatives for the purpose of
                    education, as mentioned under Schedule VII & Section 135 of
                    Companies Act 2013.
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium dark:text-white/90 ">
                    <button
                      onClick={() => handleGovtNotification()}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium underline transition-colors duration-200"
                    >
                      Click here to view Pan Card of IIT Kanpur.
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CSR Section */}
      {/* <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 mb-8">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          Corporate Social Responsibility (CSR)
        </h2>

        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            IIT Kanpur is eligible to accept funding from Corporate Social
            Responsibility Initiatives for the purpose of education, as
            mentioned under Schedule VII & Section 135 of Companies Act 2013.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleGovtNotification("CSR Link")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              View CSR Details
            </button>

            <button
              onClick={handleViewPanCard}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              View PAN Card of IIT Kanpur
            </button>
          </div>
        </div>
      </div> */}

      {/* Additional Information */}
      {/* <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Important Notes
        </h3>
        <ul className="text-gray-700 space-y-2 list-disc list-inside">
          <li>
            All tax benefits are subject to the provisions of the Income Tax
            Act, 1961
          </li>
          <li>
            Tax receipts will be issued within 3-4 working days after receipt of
            funds
          </li>
          <li>PAN number is mandatory for claiming 80G deductions</li>
          <li>
            For corporate donations, additional documentation may be required
          </li>
          <li>Consult your tax advisor for specific tax planning advice</li>
        </ul>
      </div> */}

      {/* Contact Information */}
      {/* <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          For any queries related to tax exemption, please contact:
        </p>
        <p className="text-sm text-gray-700 font-medium mt-1">
          Office of Dean of Resources and Alumni | Phone: +91-512-6797289 |
          Email: dora@iitk.ac.in
        </p>
      </div> */}
    </div>
  );
};

export default TaxExemption;
