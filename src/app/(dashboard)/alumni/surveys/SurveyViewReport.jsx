"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { useModal } from "@/src/hooks/useModaol";
import { Modal } from "@/src/components/ui/modal";
import Button from "@/src/components/ui/button/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ViewSurveys = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const router = useRouter();
  const [selectedModalType, setSelectedModalType] = useState("");
  const [selectedReunion, setSelectedReunion] = useState("");

  // Sample data for surveys and reunions
  const surveysData = [
    {
      id: 1,
      reunion: "25th Reunion",
    },
    {
      id: 2,
      reunion: "55th Reunion",
    },
    {
      id: 3,
      reunion: "75th Reunion",
    },
    {
      id: 4,
      reunion: "20th Reunion",
    },
    {
      id: 5,
      reunion: "50th Reunion",
    },
    {
      id: 6,
      reunion: "27th Reunion",
    },
    {
      id: 7,
      reunion: "35th Reunion",
    },
    {
      id: 8,
      reunion: "99th Reunion",
    },
  ];

  // Registered Attendees Data for each reunion
  const registeredAttendeesData = {
    "25th Reunion": [
      "John Smith", "Sarah Johnson", "Michael Brown", "Emily Davis", "David Wilson",
      "Jennifer Miller", "Robert Taylor", "Lisa Anderson", "Christopher Thomas", "Amanda White"
    ],
    "55th Reunion": [
      "James Martin", "Patricia Clark", "Richard Rodriguez", "Linda Lewis", "Charles Lee",
      "Barbara Walker", "Daniel Hall", "Susan Allen", "Matthew Young", "Karen King"
    ],
    "75th Reunion": [
      "Donald Scott", "Betty Green", "George Adams", "Dorothy Baker", "Edward Nelson",
      "Helen Carter", "Brian Mitchell", "Deborah Perez", "Ronald Roberts", "Sharon Turner"
    ],
    "20th Reunion": [
      "Kevin Phillips", "Nancy Campbell", "Jason Parker", "Carol Evans", "Jeffrey Edwards",
      "Ruth Collins", "Gary Stewart", "Sandra Sanchez", "Timothy Morris", "Donna Rogers"
    ],
    "50th Reunion": [
      "Steven Reed", "Michelle Cook", "Paul Morgan", "Laura Bell", "Mark Murphy",
      "Donna Bailey", "Frank Rivera", "Kathleen Cooper", "Larry Richardson", "Brenda Cox"
    ],
    "27th Reunion": [
      "Scott Howard", "Teresa Ward", "Eric Torres", "Anna Peterson", "Stephen Gray",
      "Pamela James", "Andrew Watson", "Rebecca Brooks", "Raymond Kelly", "Virginia Sanders"
    ],
    "35th Reunion": [
      "Gregory Price", "Janice Bennett", "Joshua Wood", "Megan Barnes", "Patrick Ross",
      "Cheryl Henderson", "Dennis Coleman", "Evelyn Jenkins", "Jerry Perry", "Victoria Powell"
    ],
    "99th Reunion": [
      "Alexander Long", "Christine Patterson", "Benjamin Hughes", "Rachel Flores",
      "Samuel Butler", "Catherine Foster", "Jack Simmons", "Heather Gonzales", "Henry Alexander"
    ]
  };

  // Expression of Interest and Save Date Data
  const expressionOfInterestData = [
    {
      id: 1,
      reunion: "25th Reunion",
      name: "Prabhkirt",
      email: "prabh@test.com",
      waNumber: "+917896541230",
      planningToAttend: "Yes",
      amount: "500000",
      preRegistrationFeeRequired: "No",
      dateOfArrival: "12-Nov-2024",
    },
    {
      id: 2,
      reunion: "75th Reunion",
      name: "Rajesh Kumar",
      email: "rajesh@test.com",
      waNumber: "+917896541231",
      planningToAttend: "Yes",
      amount: "300000",
      preRegistrationFeeRequired: "Yes",
      dateOfArrival: "15-Nov-2024",
    },
    {
      id: 3,
      reunion: "20th Reunion",
      name: "Priya Sharma",
      email: "priya@test.com",
      waNumber: "+917896541232",
      planningToAttend: "Yes",
      amount: "400000",
      preRegistrationFeeRequired: "No",
      dateOfArrival: "10-Nov-2024",
    },
    {
      id: 4,
      reunion: "50th Reunion",
      name: "Amit Patel",
      email: "amit@test.com",
      waNumber: "+917896541233",
      planningToAttend: "Yes",
      amount: "600000",
      preRegistrationFeeRequired: "Yes",
      dateOfArrival: "18-Nov-2024",
    },
    {
      id: 5,
      reunion: "99th Reunion",
      name: "Vikram Singh",
      email: "vikram@test.com",
      waNumber: "+917896541234",
      planningToAttend: "Yes",
      amount: "450000",
      preRegistrationFeeRequired: "No",
      dateOfArrival: "20-Nov-2024",
    },
  ];

  // Pre Registration Report Data
  const preRegistrationData = [
    {
      id: 1,
      reunion: "55th Reunion",
      name: "Prabhkirt",
      email: "prabh@gmail.com",
      waNumber: "+917584965210",
      contributionAmount: "5000.00",
      degree: "B.Tech Computer Science",
      viewTravelDetails:
        "/alumni/surveys/travel-detail-registration/tdr-report",
    },
    {
      id: 2,
      reunion: "75th Reunion",
      name: "Sneha Verma",
      email: "sneha@test.com",
      waNumber: "+917584965211",
      contributionAmount: "7000.00",
      degree: "M.Tech Electrical",
      viewTravelDetails:
        "/alumni/surveys/travel-detail-registration/tdr-report",
    },
    {
      id: 3,
      reunion: "20th Reunion",
      name: "Rahul Mehta",
      email: "rahul@test.com",
      waNumber: "+917584965212",
      contributionAmount: "4500.00",
      degree: "B.Tech Mechanical",
      viewTravelDetails:
        "/alumni/surveys/travel-detail-registration/tdr-report",
    },
    {
      id: 4,
      reunion: "50th Reunion",
      name: "Anjali Singh",
      email: "anjali@test.com",
      waNumber: "+917584965213",
      contributionAmount: "8000.00",
      degree: "B.Tech Civil",
      viewTravelDetails:
        "/alumni/surveys/travel-detail-registration/tdr-report",
    },
    {
      id: 5,
      reunion: "99th Reunion",
      name: "Neha Reddy",
      email: "neha@test.com",
      waNumber: "+917584965214",
      contributionAmount: "5500.00",
      degree: "M.Tech Computer Science",
      viewTravelDetails:
        "/alumni/surveys/travel-detail-registration/tdr-report",
    },
  ];

  // Registration Form Report Data
  const registrationFormData = [
    {
      id: 1,
      reunion: "55th Reunion",
      name: "Prabhkirt",
      contributionAmount: "5000.00",
      degree: "B.Tech Computer Science",
      viewTravelDetails:
        "/alumni/surveys/travel-detail-registration/tdr-report",
    },
    {
      id: 2,
      reunion: "25th Reunion",
      name: "Sanjay Kumar",
      contributionAmount: "6000.00",
      degree: "M.Tech Electrical",
      viewTravelDetails:
        "/alumni/surveys/travel-detail-registration/tdr-report",
    },
    {
      id: 3,
      reunion: "75th Reunion",
      name: "Vikram Roy",
      contributionAmount: "5500.00",
      degree: "B.Tech Electronics",
      viewTravelDetails:
        "/alumni/surveys/travel-detail-registration/tdr-report",
    },
    {
      id: 4,
      reunion: "20th Reunion",
      name: "Neha Gupta",
      contributionAmount: "4800.00",
      degree: "M.Tech Computer Science",
      viewTravelDetails:
        "/alumni/surveys/travel-detail-registration/tdr-report",
    },
    {
      id: 5,
      reunion: "50th Reunion",
      name: "Karan Malhotra",
      contributionAmount: "7200.00",
      degree: "B.Tech Mechanical",
      viewTravelDetails:
        "/alumni/surveys/travel-detail-registration/tdr-report",
    },
    {
      id: 6,
      reunion: "27th Reunion",
      name: "Divya Joshi",
      contributionAmount: "5200.00",
      degree: "B.Tech IT",
      viewTravelDetails:
        "/alumni/surveys/travel-detail-registration/tdr-report",
    },
    {
      id: 7,
      reunion: "35th Reunion",
      name: "Rohit Sharma",
      contributionAmount: "5800.00",
      degree: "M.Tech Civil",
      viewTravelDetails:
        "/alumni/surveys/travel-detail-registration/tdr-report",
    },
    {
      id: 8,
      reunion: "99th Reunion",
      name: "Arun Kumar",
      contributionAmount: "4900.00",
      degree: "B.Tech Electrical",
      viewTravelDetails:
        "/alumni/surveys/travel-detail-registration/tdr-report",
    },
  ];

  // Travel Details of Registration Data
  const travelDetailsData = [
    {
      id: 1,
      alumni: "Batch - 2015 Dirtaj Verma (dirtaj.gamil.com)",
      alumniName: "Prabhkirt",
      dateOfArrival: "12-Nov-2024",
      dateOfDeparture: "14-Nov-2024",
    },
    {
      id: 2,
      alumni: "Batch - 1999 Mushan Yadav (muskan@gmail.com)",
      alumniName: "Aaradhna",
      dateOfArrival: "22-Oct-2024",
      dateOfDeparture: "21-Oct-2024",
    },
    {
      id: 3,
      alumni: "Batch - 2022 Kayita Poltava (kanta@gamil.com)",
      alumniName: "Kirt",
      dateOfArrival: "15-Oct-2024",
      dateOfDeparture: "22-Oct-2024",
    },
    {
      id: 4,
      alumni: "Batch - 2022 Kayita Poltava (kanta@gamil.com)",
      alumniName: "Piyush",
      dateOfArrival: "15-Oct-2024",
      dateOfDeparture: "22-Oct-2024",
    },
    {
      id: 5,
      alumni: "Batch - 2022 Kayita Poltava (kanta@gamil.com)",
      alumniName: "Manan",
      dateOfArrival: "15-Oct-2024",
      dateOfDeparture: "22-Oct-2024",
    },
    {
      id: 6,
      alumni: "Batch - 2022 Kayita Poltava (kanta@gamil.com)",
      alumniName: "Kirt",
      dateOfArrival: "15-Oct-2024",
      dateOfDeparture: "22-Oct-2024",
    },
    {
      id: 7,
      alumni: "Batch - 2022 Kayita Poltava (kanta@gamil.com)",
      alumniName: "Piyush",
      dateOfArrival: "15-Oct-2024",
      dateOfDeparture: "22-Oct-2024",
    },
    {
      id: 8,
      alumni: "Batch - 2022 Kayita Poltava (kanta@gamil.com)",
      alumniName: "Manan",
      dateOfArrival: "15-Oct-2024",
      dateOfDeparture: "22-Oct-2024",
    },
    {
      id: 9,
      alumni: "Batch - 1999 Rahul Sharma (rahul@test.com)",
      alumniName: "Rahul Sharma",
      dateOfArrival: "25-Nov-2024",
      dateOfDeparture: "28-Nov-2024",
    },
  ];

  // Helper function to check status for each reunion and modal type
  const getButtonConfig = (reunion, modalType) => {
    const config = {
      // 25th Reunion
      "25th Reunion": {
        expression: { type: "view", available: true },
        preregistration: { type: "not-applicable", available: false },
        registration: { type: "not-available", available: false },
        travel: { type: "not-available", available: false },
      },
      // 55th Reunion
      "55th Reunion": {
        expression: { type: "not-applicable", available: false },
        preregistration: { type: "view", available: true },
        registration: { type: "not-available", available: false },
        travel: { type: "not-available", available: false },
      },
      // 75th Reunion
      "75th Reunion": {
        expression: { type: "view", available: true },
        preregistration: { type: "apply", available: true },
        registration: { type: "not-available", available: true },
        travel: { type: "not-available", available: false },
      },
      // 20th Reunion
      "20th Reunion": {
        expression: { type: "view", available: true },
        preregistration: { type: "view", available: true },
        registration: { type: "view", available: true },
        travel: { type: "view", available: true },
      },
      // 50th Reunion
      "50th Reunion": {
        expression: { type: "view", available: true },
        preregistration: { type: "view", available: true },
        registration: { type: "qr", available: true },
        travel: { type: "not-available", available: false },
      },
      // 27th Reunion
      "27th Reunion": {
        expression: { type: "not-available", available: false },
        preregistration: { type: "not-available", available: false },
        registration: { type: "not-attended", available: true },
        travel: { type: "view", available: true },
      },
      // 35th Reunion
      "35th Reunion": {
        expression: { type: "not-available", available: false },
        preregistration: { type: "not-available", available: false },
        registration: { type: "qr", available: true },
        travel: { type: "view", available: true },
      },
      // 99th Reunion
      "99th Reunion": {
        expression: { type: "view", available: true },
        preregistration: { type: "view-attendance", available: true },
        registration: { type: "view-multi-id", available: true },
        travel: { type: "view", available: true },
      },
    };

    return (
      config[reunion]?.[modalType] || {
        type: "not-available",
        available: false,
      }
    );
  };

  const handleViewClick = (modalType, reunion) => {
    setSelectedModalType(modalType);
    setSelectedReunion(reunion);
    openModal();
  };

  const handleApplyClick = () => {
    router.push("/alumni/surveys/pre-registration-report");
  };

  const handleUpdateClick = () => {
    router.push("/alumni/surveys/travel-detail-registration");
  };

  // New function to handle Registered Attendees view
  const handleViewAttendees = (reunion) => {
    setSelectedModalType("attendees");
    setSelectedReunion(reunion);
    openModal();
  };

  const getModalTitle = (modalType) => {
    switch (modalType) {
      case "expression":
        return "Expression of Interest and Save Date";
      case "preregistration":
        return "Pre Registration Report";
      case "registration":
        return "Registration Form Report";
      case "travel":
        return "Travel Details of Registration";
      case "attendees":
        return "Registered Attendees";
      default:
        return "Report";
    }
  };

  // New modal content for Registered Attendees
  const renderAttendeesModal = () => {
    const attendees = registeredAttendeesData[selectedReunion] || [];

    return (
      <div className="flex flex-col h-full">
        <div className="flex-shrink-0 p-4 sm:p-6 pb-3 sm:pb-4">
          <h3 className="text-lg sm:text-xl font-bold text-brand-500 dark:text-white text-center sm:text-left">
            {selectedReunion} - Registered Attendees
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Total {attendees.length} attendees registered
          </p>
        </div>
        
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          {attendees.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
              {attendees.map((attendee, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center">
                    <span className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200">
                      {attendee}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-32">
              <div className="text-center">
                <div className="text-gray-400 text-lg mb-2">No attendees found</div>
                <div className="text-gray-500 text-sm">No one has registered for this reunion yet.</div>
              </div>
            </div>
          )}
        </div>

        <div className="flex-shrink-0 p-4 sm:p-6 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-center sm:justify-end">
            <Button
              onClick={closeModal}
              className="px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors w-full sm:w-auto"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderQRCodeModal = () => (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 p-4 sm:p-6 pb-3 sm:pb-4">
        <h3 className="text-lg sm:text-xl font-bold text-brand-500 dark:text-white text-center sm:text-left">
          QR Code - {selectedReunion}
        </h3>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 min-h-64 sm:h-80">
        <div className="text-center">
          <Image
            src="https://w7.pngwing.com/pngs/876/637/png-transparent-qr-code-barcode-scanners-2d-code-others-label-text-rectangle.png"
            alt="QR Code"
            width={250}
            height={250}
            className="mx-auto mb-4 rounded-lg w-48 h-48 sm:w-64 sm:h-64"
          />
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Scan this QR code for registration details
          </p>
        </div>
      </div>
      <div className="flex-shrink-0 p-4 sm:p-6 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-center sm:justify-end">
          <Button
            onClick={closeModal}
            className="px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors w-full sm:w-auto"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );

  const renderQRCodeWithIDModal = () => (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 p-4 sm:p-6 pb-3 sm:pb-4">
        <h3 className="text-lg sm:text-xl font-bold text-brand-500 dark:text-white text-center sm:text-left">
          Registration Details - {selectedReunion}
        </h3>
      </div>
      <div className="flex-1 flex flex-col gap-4 sm:gap-5 items-center justify-center p-4 sm:p-6 min-h-64">
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg dark:bg-gray-800 dark:border-gray-600 w-full">
          <div className="flex items-center justify-center">
            <div className="text-brand-600 font-semibold dark:text-white/80 text-sm sm:text-base text-center">
              Note: Sorry, You didn't attend this reunion
            </div>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 p-4 sm:p-6 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-center sm:justify-end">
          <Button
            onClick={closeModal}
            className="px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors w-full sm:w-auto"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );

  const renderMultiIDModal = () => (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 p-4 sm:p-6 pb-3 sm:pb-4">
        <h3 className="text-lg sm:text-xl font-bold text-brand-500 dark:text-white text-center sm:text-left">
          ID Cards - {selectedReunion}
        </h3>
      </div>
      <div className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* First ID Card */}
          <div className="text-center">
            <h4 className="text-brand-500 sm:text-lg font-bold mb-3 sm:mb-4">First ID Card</h4>
            <Image
              src="https://publicbucket-development.zohostratus.in/Images/gradient-optometrist-template-design_23-2150662153-removebg-preview.png"
              alt="Primary ID Card"
              width={280}
              height={180}
              className="mx-auto rounded-lg w-full max-w-[200px] sm:max-w-[250px]"
            />
          </div>

          {/* Second ID Card */}
          <div className="text-center">
            <h4 className="text-brand-500 sm:text-lg font-bold mb-3 sm:mb-4">Second ID Card</h4>
            <Image
              src="https://publicbucket-development.zohostratus.in/Images/gradient-halftone-technology-id-card_23-2149093008-removebg-preview.png"
              alt="Secondary ID Card"
              width={280}
              height={180}
              className="mx-auto rounded-lg w-full max-w-[200px] sm:max-w-[250px]"
            />
          </div>

          {/* Third ID Card */}
          <div className="text-center">
            <h4 className="text-brand-500 sm:text-lg font-bold mb-3 sm:mb-4">Third ID Card</h4>
            <Image
              src="https://publicbucket-development.zohostratus.in/Images/abstract-id-card-design-business-company_882866-280-removebg-preview.png"
              alt="Event ID Card"
              width={280}
              height={180}
              className="mx-auto rounded-lg w-full max-w-[200px] sm:max-w-[250px]"
            />
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 p-4 sm:p-6 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-center sm:justify-end">
          <Button
            onClick={closeModal}
            className="px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors w-full sm:w-auto"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );

  const renderModalContent = () => {
    // Handle special modals first
    if (selectedModalType === "attendees") {
      return renderAttendeesModal();
    }

    if (selectedModalType === "registration") {
      const buttonConfig = getButtonConfig(selectedReunion, "registration");
      if (buttonConfig.type === "qr") {
        return renderQRCodeModal();
      }
      if (buttonConfig.type === "qr-id") {
        return renderQRCodeWithIDModal();
      }
      if (buttonConfig.type === "view-multi-id") {
        return renderMultiIDModal();
      }
    }

    const getFilteredData = () => {
      switch (selectedModalType) {
        case "expression":
          return expressionOfInterestData.filter(
            (item) => item.reunion === selectedReunion
          );
        case "preregistration":
          return preRegistrationData.filter(
            (item) => item.reunion === selectedReunion
          );
        case "registration":
          return registrationFormData.filter(
            (item) => item.reunion === selectedReunion
          );
        case "travel":
          return travelDetailsData;
        default:
          return [];
      }
    };

    const data = getFilteredData();

    if (data.length === 0) {
      return (
        <div className="flex flex-col h-full">
          <div className="flex-shrink-0 p-4 sm:p-6 pb-3 sm:pb-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white text-center sm:text-left">
              {selectedReunion} - {getModalTitle(selectedModalType)}
            </h3>
          </div>
          <div className="flex-1 flex items-center justify-center p-4 sm:p-6 min-h-48">
            <div className="text-center">
              <div className="text-gray-400 text-base sm:text-lg mb-2">
                No Data Available
              </div>
              <div className="text-gray-500 text-sm sm:text-base">
                There is no data to display for this report.
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 p-4 sm:p-6 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-center sm:justify-end">
              <Button
                onClick={closeModal}
                className="px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors w-full sm:w-auto"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      );
    }

    // Responsive table container styles
    const tableContainerClass = "overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6";
    const tableClass = "min-w-full divide-y divide-gray-200 dark:divide-gray-700";

    switch (selectedModalType) {
      case "expression":
        return (
          <div className="flex flex-col h-full">
            <div className="flex-shrink-0 p-4 sm:p-6 pb-3 sm:pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-brand-500 dark:text-white text-center sm:text-left">
                {selectedReunion} - Expression of Interest
              </h3>
            </div>
            <div className="flex-1 overflow-auto p-4 sm:p-6 pt-0 sm:pt-4">
              <div className={tableContainerClass}>
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                    <Table className={tableClass}>
                      <TableHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                        <TableRow>
                          <TableCell
                            isHeader
                            className="px-3 sm:px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 text-center text-xs sm:text-sm text-nowrap"
                          >
                            Reunion
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-3 sm:px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 text-center text-xs sm:text-sm text-nowrap"
                          >
                            Name
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-3 sm:px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 text-center text-xs sm:text-sm text-nowrap"
                          >
                            Email
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-3 sm:px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 text-center text-xs sm:text-sm text-nowrap"
                          >
                            WA Number
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-3 sm:px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 text-center text-xs sm:text-sm text-nowrap"
                          >
                            Planning to Attend
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-3 sm:px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 text-center text-xs sm:text-sm text-nowrap"
                          >
                            Amount
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-3 sm:px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 text-center text-xs sm:text-sm text-nowrap"
                          >
                            Pre Reg Fee
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-3 sm:px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 text-center text-xs sm:text-sm text-nowrap"
                          >
                            Arrival Date
                          </TableCell>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {data.map((item) => (
                          <TableRow
                            key={item.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <TableCell className="px-3 sm:px-6 py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-nowrap text-center">
                              {item.reunion}
                            </TableCell>
                            <TableCell className="px-3 sm:px-6 py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-nowrap text-center">
                              {item.name}
                            </TableCell>
                            <TableCell className="px-3 sm:px-6 py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-nowrap text-center">
                              {item.email}
                            </TableCell>
                            <TableCell className="px-3 sm:px-6 py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-nowrap text-center">
                              {item.waNumber}
                            </TableCell>
                            <TableCell className="px-3 sm:px-6 py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-nowrap text-center">
                              {item.planningToAttend}
                            </TableCell>
                            <TableCell className="px-3 sm:px-6 py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-nowrap text-center">
                              {item.amount}
                            </TableCell>
                            <TableCell className="px-3 sm:px-6 py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-nowrap text-center">
                              {item.preRegistrationFeeRequired}
                            </TableCell>
                            <TableCell className="px-3 sm:px-6 py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-nowrap text-center">
                              {item.dateOfArrival}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 p-4 sm:p-6 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-center sm:justify-end">
                <Button
                  onClick={closeModal}
                  className="px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors w-full sm:w-auto"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        );

      case "preregistration":
        return (
          <div className="flex flex-col h-full">
            <div className="flex-shrink-0 p-4 sm:p-6 pb-3 sm:pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-brand-500 dark:text-white text-center sm:text-left">
                {selectedReunion} - Pre Registration
              </h3>
            </div>

            <div className="flex-1 overflow-auto p-4 sm:p-6 pt-0 sm:pt-4">
              <div className={tableContainerClass}>
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                    <Table className={tableClass}>
                      <TableHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                        <TableRow>
                          <TableCell
                            isHeader
                            className="px-3 sm:px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 text-center text-xs sm:text-sm text-nowrap"
                          >
                            Reunion
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-3 sm:px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 text-center text-xs sm:text-sm text-nowrap"
                          >
                            Name
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-3 sm:px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 text-center text-xs sm:text-sm text-nowrap"
                          >
                            Email
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-3 sm:px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 text-center text-xs sm:text-sm text-nowrap"
                          >
                            WA Number
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-3 sm:px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 text-center text-xs sm:text-sm text-nowrap"
                          >
                            Amount
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-3 sm:px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 text-center text-xs sm:text-sm text-nowrap"
                          >
                            Degree
                          </TableCell>
                        </TableRow>
                      </TableHeader>

                      <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {data.map((item) => (
                          <TableRow
                            key={item.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <TableCell className="px-3 sm:px-6 py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-nowrap text-center">
                              {item.reunion}
                            </TableCell>
                            <TableCell className="px-3 sm:px-6 py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-nowrap text-center">
                              {item.name}
                            </TableCell>
                            <TableCell className="px-3 sm:px-6 py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-nowrap text-center">
                              {item.email}
                            </TableCell>
                            <TableCell className="px-3 sm:px-6 py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-nowrap text-center">
                              {item.waNumber}
                            </TableCell>
                            <TableCell className="px-3 sm:px-6 py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-nowrap text-center">
                              {item.contributionAmount}
                            </TableCell>
                            <TableCell className="px-3 sm:px-6 py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-nowrap text-center">
                              {item.degree}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 p-4 sm:p-6 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-center sm:justify-end">
                <Button
                  onClick={closeModal}
                  className="px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors w-full sm:w-auto"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        );

      case "registration":
        const is27thReunion = selectedReunion === "27th Reunion";

        return (
          <div className="flex flex-col h-full">
            <div className="flex-shrink-0 p-4 sm:p-6 pb-3 sm:pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-brand-500 dark:text-white text-center sm:text-left">
                {selectedReunion} - Registration Form
              </h3>
            </div>

            <div className="flex-1 overflow-auto p-4 sm:p-6 pt-0 sm:pt-4">
              <div className={tableContainerClass}>
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                    <Table className={tableClass}>
                      <TableHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                        <TableRow>
                          <TableCell
                            isHeader
                            className="px-3 sm:px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 text-center text-xs sm:text-sm text-nowrap"
                          >
                            Reunion
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-3 sm:px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 text-center text-xs sm:text-sm text-nowrap"
                          >
                            Name
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-3 sm:px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 text-center text-xs sm:text-sm text-nowrap"
                          >
                            Amount
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-3 sm:px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 text-center text-xs sm:text-sm text-nowrap"
                          >
                            Degree
                          </TableCell>
                        </TableRow>
                      </TableHeader>

                      <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {data.map((item) => (
                          <TableRow
                            key={item.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <TableCell className="px-3 sm:px-6 py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-nowrap text-center">
                              {item.reunion}
                            </TableCell>
                            <TableCell className="px-3 sm:px-6 py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-nowrap text-center">
                              {item.name}
                            </TableCell>
                            <TableCell className="px-3 sm:px-6 py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-nowrap text-center">
                              {item.contributionAmount}
                            </TableCell>
                            <TableCell className="px-3 sm:px-6 py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-nowrap text-center">
                              {item.degree}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
              {/* Special message for 27th Reunion */}
              {is27thReunion && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg dark:bg-gray-800 dark:border-gray-600">
                  <div className="flex items-center justify-center">
                    <div className="text-brand-600 font-semibold dark:text-white/80 text-sm sm:text-base text-center">
                      Note: Sorry, You didn't attend this reunion
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex-shrink-0 p-4 sm:p-6 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-center sm:justify-end">
                <Button
                  onClick={closeModal}
                  className="px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors w-full sm:w-auto"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        );

      case "travel":
        const is27thReunion1 = selectedReunion === "27th Reunion";

        return (
          <div className="flex flex-col h-full">
            <div className="flex-shrink-0 p-4 sm:p-6 pb-3 sm:pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-brand-500 dark:text-white text-center sm:text-left">
                Travel Details of Registrations
              </h3>
            </div>

            <div className="flex-1 overflow-auto p-4 sm:p-6 pt-0 sm:pt-4">
              <div className={tableContainerClass}>
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                    <Table className={tableClass}>
                      <TableHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                        <TableRow>
                          <TableCell
                            isHeader
                            className="px-3 sm:px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 text-center text-xs sm:text-sm text-nowrap"
                          >
                            Alumni
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-3 sm:px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 text-center text-xs sm:text-sm text-nowrap"
                          >
                            Name
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-3 sm:px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 text-center text-xs sm:text-sm text-nowrap"
                          >
                            Arrival
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-3 sm:px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 text-center text-xs sm:text-sm text-nowrap"
                          >
                            Departure
                          </TableCell>
                        </TableRow>
                      </TableHeader>

                      <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {data.map((item) => (
                          <TableRow
                            key={item.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <TableCell className="px-3 sm:px-6 py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-nowrap text-center">
                              {item.alumni}
                            </TableCell>
                            <TableCell className="px-3 sm:px-6 py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-nowrap text-center">
                              {item.alumniName}
                            </TableCell>
                            <TableCell className="px-3 sm:px-6 py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-nowrap text-center">
                              {item.dateOfArrival}
                            </TableCell>
                            <TableCell className="px-3 sm:px-6 py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-nowrap text-center">
                              {item.dateOfDeparture}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
              {is27thReunion1 && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg dark:bg-gray-800 dark:border-gray-600">
                  <div className="flex items-center justify-center">
                    <div className="text-brand-600 font-semibold dark:text-white/80 text-sm sm:text-base text-center">
                      Note: Sorry, You didn't attend this reunion
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex-shrink-0 p-4 sm:p-6 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-center sm:justify-end">
                <Button
                  onClick={closeModal}
                  className="px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors w-full sm:w-auto"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 text-center sm:text-left">
                No data available
              </h3>
            </div>
            <div className="flex-shrink-0 p-4 sm:p-6 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-center sm:justify-end">
                <Button
                  onClick={closeModal}
                  className="px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors w-full sm:w-auto"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  const renderButton = (reunion, modalType) => {
    const config = getButtonConfig(reunion, modalType);

    switch (config.type) {
      case "view":
        return (
          <Button 
            size="sm"
            onClick={() => handleViewClick(modalType, reunion)}
            className="w-full sm:w-auto justify-center"
          >
            View
          </Button>
        );
      case "view-attendance":
        return (
          <Button 
            size="sm"
            onClick={() => handleViewClick(modalType, reunion)}
            className="w-full sm:w-auto justify-center"
          >
            View
          </Button>
        );
      case "view-multi-id":
        return (
          <Button 
            size="sm"
            onClick={() => handleViewClick(modalType, reunion)}
            className="w-full sm:w-auto justify-center"
          >
            View ID
          </Button>
        );
      case "apply":
        return (
          <Button 
            size="sm"
            onClick={handleApplyClick}
            className="w-full sm:w-auto justify-center"
          >
            Apply
          </Button>
        );
      case "qr":
        return (
          <Button 
            size="sm"
            onClick={() => handleViewClick(modalType, reunion)}
            className="w-full sm:w-auto justify-center"
          >
            View QR
          </Button>
        );
      case "qr-id":
        return (
          <Button 
            size="sm"
            onClick={() => handleViewClick(modalType, reunion)}
            className="w-full sm:w-auto justify-center"
          >
            View ID
          </Button>
        );
      case "view-update":
        return (
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              size="sm"
              onClick={() => handleViewClick(modalType, reunion)}
              className="w-full sm:w-auto justify-center"
            >
              View
            </Button>
            <Button 
              size="sm"
              onClick={handleUpdateClick}
              className="w-full sm:w-auto justify-center"
            >
              Update
            </Button>
          </div>
        );
      case "not-applicable":
        return (
          <span className="text-gray-400 text-xs sm:text-sm font-medium text-center block py-2">
            Not Applicable
          </span>
        );
      case "not-attended":
        return (
          <span className="text-gray-400 text-xs sm:text-sm font-medium text-center block py-2">
            Reunion Not Attended
          </span>
        );
      case "not-available":
      default:
        return (
          <span className="text-gray-400 text-xs sm:text-sm font-medium text-center block py-2">
            Not Available
          </span>
        );
    }
  };

  // Mobile Card Component
  const MobileSurveyCard = ({ survey }) => {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-4 shadow-sm">
        {/* Header */}
        <div className="text-center mb-4 pb-3 border-b border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-lg text-brand-600 dark:text-white">
            {survey.reunion}
          </h3>
        </div>

        {/* Buttons Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex-1 text-left">
              Expression of Interest:
            </span>
            <div className="flex-1 max-w-[120px]">
              {renderButton(survey.reunion, "expression")}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex-1 text-left">
              Pre Registration:
            </span>
            <div className="flex-1 max-w-[120px]">
              {renderButton(survey.reunion, "preregistration")}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex-1 text-left">
              Registration Form:
            </span>
            <div className="flex-1 max-w-[120px]">
              {renderButton(survey.reunion, "registration")}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex-1 text-left">
              Travel Details:
            </span>
            <div className="flex-1 max-w-[120px]">
              {renderButton(survey.reunion, "travel")}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex-1 text-left">
              Registered Attendees:
            </span>
            <div className="flex-1 max-w-[120px]">
              <Button 
                size="sm"
                onClick={() => handleViewAttendees(survey.reunion)}
                className="w-full sm:w-auto justify-center"
              >
                View
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <h1 className="text-lg sm:text-xl font-bold text-brand-500 dark:text-brand-500 mb-4 sm:mb-3">
        View Surveys
      </h1>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] shadow-sm mb-5">
          <div className="max-w-full overflow-x-auto">
            <div className="min-w-[900px]">
              <Table>
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-gray-800/50">
                  <TableRow>
                    <TableCell
                      isHeader
                      className="px-4 py-4 font-semibold text-brand-800 dark:text-gray-300 text-center text-nowrap text-sm"
                    >
                      Surveys and Reunions
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-4 py-4 font-semibold text-brand-800 dark:text-gray-300 text-center text-nowrap text-sm"
                    >
                      Expression of Interest and Save Date
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-4 py-4 font-semibold text-brand-800 dark:text-gray-300 text-center text-nowrap text-sm"
                    >
                      Pre Registration Report
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-4 py-4 font-semibold text-brand-800 dark:text-gray-300 text-center text-nowrap text-sm"
                    >
                      Registration Form Report
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-4 py-4 font-semibold text-brand-800 dark:text-gray-300 text-center text-nowrap text-sm"
                    >
                      Travel Details of Registration
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-4 py-4 font-semibold text-brand-800 dark:text-gray-300 text-center text-nowrap text-sm"
                    >
                      Registered Attendees
                    </TableCell>
                  </TableRow>
                </TableHeader>

                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {surveysData.map((survey) => (
                    <TableRow
                      key={survey.id}
                      className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <TableCell className="px-4 py-2.5 text-sm text-center font-medium text-gray-900 dark:text-white">
                        {survey.reunion}
                      </TableCell>

                      {/* Expression of Interest Button */}
                      <TableCell className="px-4 py-2.5 text-center">
                        {renderButton(survey.reunion, "expression")}
                      </TableCell>

                      {/* Pre Registration Button */}
                      <TableCell className="px-4 py-2.5 text-center">
                        {renderButton(survey.reunion, "preregistration")}
                      </TableCell>

                      {/* Registration Form Button */}
                      <TableCell className="px-4 py-2.5 text-center">
                        {renderButton(survey.reunion, "registration")}
                      </TableCell>

                      {/* Travel Details Button */}
                      <TableCell className="px-4 py-2.5 text-center">
                        {renderButton(survey.reunion, "travel")}
                      </TableCell>

                      {/* Registered Attendees Button */}
                      <TableCell className="px-4 py-2.5 text-center">
                        <Button 
                          size="sm"
                          onClick={() => handleViewAttendees(survey.reunion)}
                          className="w-full sm:w-auto justify-center"
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {surveysData.map((survey) => (
          <MobileSurveyCard key={survey.id} survey={survey} />
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[95vw] w-full mx-2 sm:max-w-[90vw] sm:mx-4 lg:max-w-[80vw]"
      >
        <div className="max-h-[85vh] flex flex-col">
          <div className="flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
            {renderModalContent().props.children[0]}
          </div>
          <div className="flex-1 overflow-auto">
            {React.cloneElement(renderModalContent(), {
              children: renderModalContent().props.children.slice(1),
            })}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ViewSurveys;